'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MeetingsError({
    error,
    reset,
}: {
    error: unknown;
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Meetings error:', error);
    }, [error]);

    return (
        <section role="alert" className="max-w-xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-700 mb-6">
                We couldn&apos;t load or save the meeting information. Any changes you just
                made may not have been saved. Please try again, or go back to the meetings list.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                    Try Again
                </button>
                <Link
                    href="/meetings"
                    className="rounded border border-blue-800 px-4 py-2 text-blue-800 hover:bg-blue-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                    Back to Meetings
                </Link>
            </div>
        </section>
    );
}