import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';
import { updateMeeting } from '@/lib/actions';

type Params = PageProps<'/meetings/[id]/edit'>['params'];

export const metadata: Metadata = {
    title: 'Edit Meeting | Lakeview 9th Ward',
};

export default function EditMeetingPage({ params }: PageProps<'/meetings/[id]/edit'>) {
    return (
        <section className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Meeting</h1>
            <Suspense fallback={<p role="status" className="text-gray-500 italic">Loading meeting…</p>}>
                <EditMeetingForm params={params} />
            </Suspense>
        </section>
    );
}

async function EditMeetingForm({ params }: { params: Params }) {
    const { id } = await params;

    if (!/^\d+$/.test(id)) notFound();

    const meetingId = Number(id);
    const meeting = await getMeetingById(meetingId);

    if (!meeting) notFound();

    return (
        <MeetingForm
            action={updateMeeting.bind(null, meetingId)}
            meeting={meeting}
            submitLabel="Save changes"
        />
    );
}