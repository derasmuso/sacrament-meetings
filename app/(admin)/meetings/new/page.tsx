import type { Metadata } from 'next';
import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export const metadata: Metadata = {
    title: 'Create Meeting | Lakeview 9th Ward',
};

export default function NewMeetingPage() {
    return (
        <section className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create Meeting</h1>
            <MeetingForm action={createMeeting} submitLabel="Create meeting" />
        </section>
    );
}