'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MeetingsError({
    error,
    retry,
}: {
    error: unknown;
    retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section role="alert" className="text-center">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
                We couldn&apos;t load the meeting information. Please try again.
            </p>
            <div className="flex justify-center gap-4">
                <button
                    type="button"
                    onClick={() => retry()}
                    className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
                >
                    Try again
                </button>
                <Link href="/" className="px-4 py-2 text-blue-800 hover:underline">
                    Go home
                </Link>
            </div>
        </section>
    );
}