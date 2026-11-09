import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchMeetings } from '@/lib/api';
import MeetingCard from '@/components/MeetingCard';

export const metadata: Metadata = {
    title: 'Meetings | Lakeview 9th Branch',
    description: 'Sacrament meeting agendas for the Lakeview 9th Branch.',
};

export default function MeetingsPage() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-6">Sacrament Meetings</h1>
            <Suspense fallback={<MeetingListSkeleton />}>
                <MeetingList />
            </Suspense>
        </section>
    );
}

async function MeetingList() {
    const meetings = await fetchMeetings();

    if (meetings.length === 0) {
        return <p className="text-gray-500 italic">No meetings have been scheduled yet.</p>;
    }

    return (
        <ul className="space-y-4">
            {meetings.map((meeting) => (
                <li key={meeting.id}>
                    <MeetingCard meeting={meeting} />
                </li>
            ))}
        </ul>
    );
}

function MeetingListSkeleton() {
    return (
        <div role="status">
            <span className="sr-only">Loading meetings…</span>
            <ul className="space-y-4">
                {[1, 2, 3].map((n) => (
                    <li key={n} className="p-4 border-l-4 border-gray-300 bg-gray-50 rounded animate-pulse">
                        {/* ...same placeholder divs... */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
