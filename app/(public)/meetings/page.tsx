import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';


export const metadata: Metadata = {
    title: 'Meetings | Lakeview 9th Ward',
    description: 'Sacrament meeting agendas for the Lakeview 9th Ward.',
};

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) || 1;

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <section>
            <h1 className="text-3xl font-bold mb-6">Sacrament Meetings</h1>
            <MeetingSearch />
            {meetings.length > 0 ? (
                <ul className="space-y-4">
                    {meetings.map((m) => (
                        <li key={m.id}>
                            <MeetingCard meeting={m} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 italic">
                    {query
                        ? <>No meetings match &ldquo;{query}&rdquo;.</>
                        : 'No meetings have been scheduled yet.'}
                </p>
            )}
            <Pagination totalPages={totalPages} />
        </section>
    );
}