'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';
import {
    addMeeting,
    updateMeeting as updateMeetingRecord,
    deleteMeeting as deleteMeetingRecord,
} from '@/lib/meetings-db';

const requiredName = z.string().trim().min(1).max(255);
const hymnNumber = z.coerce.number().int().positive();
const hymnTitle = z.string().trim().min(1);

const MeetingFormSchema = z.object({
    date: z.iso.date(),
    meetingType: z.enum(['regular', 'testimony', 'stake', 'general', 'special']),
    presiding: requiredName,
    conducting: requiredName,
    openingHymnNumber: hymnNumber,
    openingHymnTitle: hymnTitle,
    openingPrayer: requiredName,
    sacramentHymnNumber: hymnNumber,
    sacramentHymnTitle: hymnTitle,
    closingHymnNumber: hymnNumber,
    closingHymnTitle: hymnTitle,
    closingPrayer: requiredName,
    stakeBusiness: z.boolean(),
    announcements: z.array(z.string()),
    wardBusiness: z.array(z.string()),
});

const MeetingIdSchema = z.number().int().positive();

function toLines(value: FormDataEntryValue | null): string[] {
    if (typeof value !== 'string') return [];
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}

function parseMeetingForm(formData: FormData): Omit<SacramentMeeting, 'id' | 'speakers'> {
    const parsed = MeetingFormSchema.safeParse({
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
    });

    if (!parsed.success) {
        throw new Error('Invalid meeting input.');
    }

    const m = parsed.data;

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

function parseMeetingId(id: unknown): number {
    const parsed = MeetingIdSchema.safeParse(id);
    if (!parsed.success) {
        throw new Error('Invalid meeting id.');
    }
    return parsed.data;
}

export async function createMeeting(formData: FormData) {
    const meeting = parseMeetingForm(formData);

    await addMeeting({ ...meeting, speakers: [] });

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(id: number, formData: FormData) {
    const meetingId = parseMeetingId(id);
    const changes = parseMeetingForm(formData);

    const updated = await updateMeetingRecord(meetingId, changes);
    if (!updated) {
        throw new Error(`Meeting ${meetingId} not found.`);
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${meetingId}`);
    redirect('/meetings');
}

export async function deleteMeeting(id: number) {
    const meetingId = parseMeetingId(id);

    await deleteMeetingRecord(meetingId);

    revalidatePath('/meetings');
}