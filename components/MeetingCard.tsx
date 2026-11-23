import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import DeleteMeetingButton from './DeleteMeetingButton';

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });

    return (
        <article className="p-4 border-l-4 border-blue-800 bg-gray-50 rounded">
            <h2 className="text-xl font-bold mb-2">{formattedDate}</h2>
            <p className="capitalize">{meeting.meetingType} meeting</p>
            <p>Conducting: {meeting.conducting}</p>
            <div className="mt-2 flex items-center justify-between gap-4">
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="text-blue-800 hover:underline"
                >
                    Meeting Details
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/meetings/${meeting.id}/edit`}
                        className="rounded border border-blue-800 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                    >
                        Edit<span className="sr-only"> meeting on {formattedDate}</span>
                    </Link>
                    <DeleteMeetingButton id={meeting.id} label={formattedDate} />
                </div>
            </div>
        </article>
    );
}