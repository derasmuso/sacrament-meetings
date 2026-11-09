import { headers } from 'next/headers';
import type { SacramentMeeting } from './types';

/**
 * Fetches one of this app's own API routes from the server.
 * Works locally, on Vercel preview deployments, and in production.
 */
async function apiFetch(path: string): Promise<Response> {
    const requestHeaders = await headers();

    // The domain the visitor used, e.g. "localhost:3000" or "my-app.vercel.app"
    const host = requestHeaders.get('host');
    if (!host) {
        throw new Error('Cannot build API URL: request has no Host header.');
    }

    // Vercel sets this to "https"; locally it's absent, so default to "http"
    const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';

    // Lets server-side requests through Vercel Deployment Protection (preview URLs)
    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

    return fetch(`${protocol}://${host}${path}`, {
        headers: bypassSecret
            ? { 'x-vercel-protection-bypass': bypassSecret }
            : undefined,
    });
}

/** GET /api/meetings → every meeting */
export async function fetchMeetings(): Promise<SacramentMeeting[]> {
    const res = await apiFetch('/api/meetings');

    if (!res.ok) {
        throw new Error(`Failed to load meetings (status ${res.status})`);
    }

    return (await res.json()) as SacramentMeeting[];
}

/** GET /api/meetings/[id] → one meeting, or null if it doesn't exist */
export async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
    const res = await apiFetch(`/api/meetings/${encodeURIComponent(id)}`);

    if (res.status === 404 || res.status === 400) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Failed to load meeting ${id} (status ${res.status})`);
    }

    return (await res.json()) as SacramentMeeting;
}