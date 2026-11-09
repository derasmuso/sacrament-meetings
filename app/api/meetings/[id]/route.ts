import type { NextRequest } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

// GET /api/meetings/3
export async function GET(
    _request: NextRequest,
    ctx: RouteContext<'/api/meetings/[id]'>
) {
    const { id } = await ctx.params; // always a string, e.g. "3"

    // 400: the id isn't a positive whole number ("abc", "1.5", "-2")
    if (!/^\d+$/.test(id)) {
        return Response.json(
            { error: 'Invalid meeting id. It must be a positive whole number.' },
            { status: 400 }
        );
    }

    const meeting = getMeetingById(Number(id));

    // 404: valid id, but no meeting has it
    if (!meeting) {
        return Response.json(
            { error: `Meeting ${id} not found.` },
            { status: 404 }
        );
    }

    // 200: valid and found
    return Response.json(meeting);
}