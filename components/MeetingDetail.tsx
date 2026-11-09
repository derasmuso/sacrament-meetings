import type { SacramentMeeting, Hymn } from '@/lib/types';

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

const meetingTypeLabels: Record<SacramentMeeting['meetingType'], string> = {
    regular: 'Sacrament Meeting',
    testimony: 'Fast and Testimony Meeting',
    stake: 'Stake Conference',
    general: 'General Conference',
};

function formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

function HymnLine({ label, hymn }: { label: string; hymn: Hymn }) {
    return (
        <div className="flex justify-between gap-4">
            <dt className="font-semibold">{label}</dt>
            <dd>
                #{hymn.number} &ldquo;{hymn.title}&rdquo;
            </dd>
        </div>
    );
}

function AgendaLine({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4">
            <dt className="font-semibold">{label}</dt>
            <dd>{value}</dd>
        </div>
    );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    return (
        <article className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            {/* Heading */}
            <header className="text-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold">{meetingTypeLabels[meeting.meetingType]}</h1>
                <p className="text-gray-600">{formatDate(meeting.date)}</p>
            </header>

            {/* Leadership */}
            <section className="mb-6">
                <dl className="space-y-1">
                    <AgendaLine label="Presiding" value={meeting.presiding} />
                    <AgendaLine label="Conducting" value={meeting.conducting} />
                </dl>
            </section>

            {/* Announcements (optional) */}
            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Announcements</h2>
                    <ul className="list-disc list-inside">
                        {meeting.announcements.map((announcement, i) => (
                            <li key={i}>{announcement}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Opening */}
            <section className="mb-6">
                <dl className="space-y-1">
                    <HymnLine label="Opening Hymn" hymn={meeting.openingHymn} />
                    <AgendaLine label="Invocation" value={meeting.openingPrayer} />
                </dl>
            </section>

            {/* Ward & Stake Business */}
            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">Ward Business</h2>
                {meeting.wardBusiness.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {meeting.wardBusiness.map((item, i) => (
                            <li key={i}>{item.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">No ward business</p>
                )}
                {meeting.stakeBusiness && (
                    <p className="mt-2 font-medium">Stake business will be conducted.</p>
                )}
            </section>

            {/* Sacrament */}
            <section className="mb-6">
                <dl className="space-y-1">
                    <HymnLine label="Sacrament Hymn" hymn={meeting.sacramentHymn} />
                </dl>
                <p className="text-center italic text-gray-600 mt-2">
                    Administration of the Sacrament
                </p>
            </section>

            {/* Speakers & Musical Numbers */}
            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">Program</h2>
                {meeting.speakers.length > 0 ? (
                    <ol className="space-y-2">
                        {meeting.speakers.map((item, i) => (
                            <li key={i} className="flex justify-between gap-4">
                                <span className="font-semibold">
                                    {item.type === 'musical-number' ? 'Musical Number' : 'Speaker'}
                                </span>
                                <span className="text-right">
                                    {item.name}
                                    {item.topic && (
                                        <span className="block text-sm text-gray-600">
                                            {item.topic}
                                        </span>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-gray-500 italic">No speakers assigned</p>
                )}
            </section>

            {/* Closing */}
            <section>
                <dl className="space-y-1">
                    <HymnLine label="Closing Hymn" hymn={meeting.closingHymn} />
                    <AgendaLine label="Benediction" value={meeting.closingPrayer} />
                </dl>
            </section>
        </article>
    );
}