import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchMeeting } from '@/lib/api';
import MeetingDetail from '@/components/MeetingDetail';

type Params = PageProps<'/meetings/[id]'>['params'];

// Per-meeting browser tab title
export async function generateMetadata({
    params,
}: PageProps<'/meetings/[id]'>): Promise<Metadata> {
    const { id } = await params;
    const meeting = await fetchMeeting(id);

    if (!meeting) {
        return { title: 'Meeting Not Found | Lakeview 9th Branch' };
    }

    return {
        title: `${meeting.date} Meeting | Lakeview 9th Branch`,
        description: `Sacrament meeting agenda for ${meeting.date}.`,
    };
}

export default function MeetingPage({ params }: PageProps<'/meetings/[id]'>) {
    return (
        <Suspense fallback={<MeetingDetailSkeleton />}>
            <MeetingContent params={params} />
        </Suspense>
    );
}

async function MeetingContent({ params }: { params: Params }) {
    const { id } = await params;
    const meeting = await fetchMeeting(id);

    if (!meeting) notFound();

    return <MeetingDetail meeting={meeting} />;
}

function MeetingDetailSkeleton() {
    return (
        <div
            role="status"
            className="max-w-2xl mx-auto p-6 bg-white rounded shadow animate-pulse"
        >
            <span className="sr-only">Loading meeting…</span>
            <div className="h-8 w-2/3 mx-auto bg-gray-200 rounded mb-3" />
            <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded mb-8" />
            {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded mb-3" />
            ))}
        </div>
    );
}