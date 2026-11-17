import type { NextRequest } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

// GET /api/meetings
// GET /api/meetings?date=2026-11-15
export async function GET(request: NextRequest) {
    const date = request.nextUrl.searchParams.get('date'); // "2026-11-15" or null

    const meetings = await getMeetings(date);
    return Response.json(meetings);
}