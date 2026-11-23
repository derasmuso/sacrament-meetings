'use client';

import { deleteMeeting } from '@/lib/actions';

interface DeleteMeetingButtonProps {
    id: number;
    label: string;
}

export default function DeleteMeetingButton({ id, label }: DeleteMeetingButtonProps) {
    const deleteThisMeeting = deleteMeeting.bind(null, id);

    return (
        <form
            action={deleteThisMeeting}
            onSubmit={(event) => {
                if (!window.confirm(`Delete the meeting on ${label}? This can't be undone.`)) {
                    event.preventDefault();
                }
            }}
        >
            <button
                type="submit"
                className="rounded border border-red-700 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
                Delete<span className="sr-only"> meeting on {label}</span>
            </button>
        </form>
    );
}