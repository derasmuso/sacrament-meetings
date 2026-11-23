'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NeonDbError } from '@neondatabase/serverless';
import type { SacramentMeeting } from '@/lib/types';
import {
    addMeeting,
    updateMeeting as updateMeetingRecord,
    deleteMeeting as deleteMeetingRecord,
} from '@/lib/meetings-db';

const requiredText = (label: string) =>
    z
        .string({ error: `${label} is required.` })
        .trim()
        .min(1, `${label} is required.`)
        .max(255, `${label} must be 255 characters or fewer.`);

const hymnNumber = (hymn: string) =>
    z.coerce
        .number({ error: `Enter a number for the ${hymn}.` })
        .int(`The ${hymn} number must be a whole number.`)
        .positive(`Enter a number for the ${hymn}.`);

const hymnTitle = (hymn: string) =>
    z
        .string({ error: `Enter a title for the ${hymn}.` })
        .trim()
        .min(1, `Enter a title for the ${hymn}.`);

const MeetingFormSchema = z.object({
    date: z.iso.date({ error: 'Enter a valid date.' }),
    meetingType: z.enum(['regular', 'testimony', 'stake', 'general', 'special'], {
        error: 'Choose a meeting type.',
    }),
    presiding: requiredText('Presiding'),
    conducting: requiredText('Conducting'),
    openingHymnNumber: hymnNumber('opening hymn'),
    openingHymnTitle: hymnTitle('opening hymn'),
    openingPrayer: requiredText('Invocation'),
    sacramentHymnNumber: hymnNumber('sacrament hymn'),
    sacramentHymnTitle: hymnTitle('sacrament hymn'),
    closingHymnNumber: hymnNumber('closing hymn'),
    closingHymnTitle: hymnTitle('closing hymn'),
    closingPrayer: requiredText('Benediction'),
    stakeBusiness: z.boolean(),
    announcements: z.array(z.string()),
    wardBusiness: z.array(z.string()),
});

const MeetingIdSchema = z.number().int().positive();

export type MeetingField = keyof z.input<typeof MeetingFormSchema>;

export type State = {
    message?: string | null;
    errors?: Partial<Record<MeetingField, string[]>>;
    values?: Record<string, string>;
};

function toLines(value: FormDataEntryValue | null): string[] {
    if (typeof value !== 'string') return [];
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}

function readMeetingForm(formData: FormData) {
    return {
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        openingHymnNumber: formData.get('openingHymnNumber'),
        openingHymnTitle: formData.get('openingHymnTitle'),
        openingPrayer: formData.get('openingPrayer'),
        sacramentHymnNumber: formData.get('sacramentHymnNumber'),
        sacramentHymnTitle: formData.get('sacramentHymnTitle'),
        closingHymnNumber: formData.get('closingHymnNumber'),
        closingHymnTitle: formData.get('closingHymnTitle'),
        closingPrayer: formData.get('closingPrayer'),
        stakeBusiness: formData.get('stakeBusiness') === 'on',
        announcements: toLines(formData.get('announcements')),
        wardBusiness: toLines(formData.get('wardBusiness')),
    };
}

function toMeeting(
    m: z.output<typeof MeetingFormSchema>
): Omit<SacramentMeeting, 'id' | 'speakers'> {
    return {
        date: m.date,
        meetingType: m.meetingType,
        presiding: m.presiding,
        conducting: m.conducting,
        announcements: m.announcements,
        openingHymn: { number: m.openingHymnNumber, title: m.openingHymnTitle },
        openingPrayer: m.openingPrayer,
        wardBusiness: m.wardBusiness.map((description) => ({ description })),
        stakeBusiness: m.stakeBusiness,
        sacramentHymn: { number: m.sacramentHymnNumber, title: m.sacramentHymnTitle },
        closingHymn: { number: m.closingHymnNumber, title: m.closingHymnTitle },
        closingPrayer: m.closingPrayer,
    };
}

function submittedValues(formData: FormData): Record<string, string> {
    const values: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string' && !key.startsWith('$')) {
            values[key] = value;
        }
    });
    return values;
}

function invalidForm(errors: State['errors'], formData: FormData): State {
    return {
        message: 'Some fields need attention. Please fix the errors below and try again.',
        errors,
        values: submittedValues(formData),
    };
}

function parseMeetingId(id: unknown): number {
    const parsed = MeetingIdSchema.safeParse(id);
    if (!parsed.success) {
        throw new Error('Invalid meeting id.');
    }
    return parsed.data;
}

function isDuplicateDate(error: unknown): boolean {
    return error instanceof NeonDbError && error.code === '23505';
}

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
    const parsed = MeetingFormSchema.safeParse(readMeetingForm(formData));
    if (!parsed.success) {
        return invalidForm(z.flattenError(parsed.error).fieldErrors, formData);
    }

    const meeting = toMeeting(parsed.data);

    try {
        await addMeeting({ ...meeting, speakers: [] });
    } catch (error) {
        console.error('Error creating meeting:', error);
        if (isDuplicateDate(error)) {
            return invalidForm(
                { date: [`A meeting is already scheduled for ${meeting.date}.`] },
                formData
            );
        }
        throw new Error('Failed to create meeting. Please try again later.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {
    const meetingId = parseMeetingId(id);

    const parsed = MeetingFormSchema.safeParse(readMeetingForm(formData));
    if (!parsed.success) {
        return invalidForm(z.flattenError(parsed.error).fieldErrors, formData);
    }

    const changes = toMeeting(parsed.data);

    let updated: SacramentMeeting | null;
    try {
        updated = await updateMeetingRecord(meetingId, changes);
    } catch (error) {
        console.error(`Error updating meeting ${meetingId}:`, error);
        if (isDuplicateDate(error)) {
            return invalidForm(
                { date: [`A meeting is already scheduled for ${changes.date}.`] },
                formData
            );
        }
        throw new Error('Failed to update meeting. Please try again later.');
    }

    if (!updated) {
        throw new Error(`Meeting ${meetingId} not found.`);
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${meetingId}`);
    redirect('/meetings');
}

export async function deleteMeeting(id: number) {
    const meetingId = parseMeetingId(id);

    try {
        await deleteMeetingRecord(meetingId);
    } catch (error) {
        console.error(`Error deleting meeting ${meetingId}:`, error);
        throw new Error('Failed to delete meeting. Please try again later.');
    }

    revalidatePath('/meetings');
}