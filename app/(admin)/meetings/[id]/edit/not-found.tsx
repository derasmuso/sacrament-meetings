import Link from 'next/link';

export default function MeetingNotFound() {
    return (
        <section className="max-w-xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Meeting not found</h1>
            <p className="text-gray-700 mb-6">
                We couldn&apos;t find the meeting you&apos;re trying to edit. It may have been
                deleted, or the link may be wrong.
            </p>
            <Link
                href="/meetings"
                className="inline-block rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
            >
                Back to Meetings
            </Link>
        </section>
    );
}