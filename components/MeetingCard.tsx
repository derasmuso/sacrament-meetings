import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

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
            <h3 className="text-xl font-bold mb-2">{formattedDate}</h3>
            <p className="capitalize">{meeting.meetingType} meeting</p>
            <p>Conducting: {meeting.conducting}</p>
            <p className="mt-2">
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="text-blue-800 hover:underline"
                >
                    Meeting Details
                </Link>
            </p>
        </article>
    );
}