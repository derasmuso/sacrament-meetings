import { Suspense } from 'react';
import { io } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getMeetings } from '@/lib/meetings-db';
import { currentSunday } from '@/lib/dates';

export const metadata: Metadata = {
    title: 'Current Meeting | Lakeview 9th Branch',
    description: "Redirects to this week's sacrament meeting agenda.",
};

export default function CurrentMeetingPage() {
    return (
        <Suspense fallback={<p className="text-gray-500 italic">Finding this week&apos;s meeting…</p>}>
            <CurrentMeetingRedirect />
        </Suspense>
    );
}

async function CurrentMeetingRedirect() {
    await io(); // work out "today" fresh for each visitor

    const sunday = currentSunday();          // e.g. "2026-11-08"
    const meeting = getMeetings(sunday)[0];  // exact date match, or undefined

    if (meeting) {
        redirect(`/meetings/${meeting.id}`);
    }

    return (
        <section className="text-center">
            <h1 className="text-2xl font-bold mb-2">No Meeting This Sunday</h1>
            <p className="text-gray-600 mb-4">
                There isn&apos;t a sacrament meeting scheduled for this Sunday yet.
            </p>
            <Link href="/meetings" className="text-blue-800 hover:underline">
                View all meetings
            </Link>
        </section>
    );
}