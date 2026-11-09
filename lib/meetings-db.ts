import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-11-01',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Ward temple night: May 10']
    },
    {
        id: 2,
        date: '2026-11-08',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Nelson',
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
        openingPrayer: 'Sister Taylor',
        wardBusiness: [
            { description: 'Release of Brother Clark as Sunday School president' },
            { description: 'Sustaining of Brother Adams as Sunday School president' }
        ],
        stakeBusiness: false,
        sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
        speakers: [{ name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
        { name: 'Youth Choir', topic: '', type: 'musical-number' }],
        closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
        closingPrayer: 'Brother Hall',
        announcements: [
            'Fast offerings may be given to any member of the bishopric',
            'Branch Christmas party sign-ups are in the foyer'
        ]
    },
    {
        id: 3,
        date: '2026-11-15',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 85, title: 'How Firm a Foundation' },
        openingPrayer: 'Sister Martinez',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
        speakers: [
            { name: 'Brother Wilson', topic: 'Ministering as the Savior Did', type: 'speaker' },
            { name: 'Sister Garcia', topic: 'Following the Living Prophet', type: 'speaker' },
            { name: 'Brother Lee', topic: 'The Blessings of Temple Worship', type: 'speaker' }
        ],
        closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
        closingPrayer: 'Sister Young',
        announcements: ['Stake conference: November 28-29']
    },
    {
        id: 4,
        date: '2026-11-22',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Nelson',
        openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
        openingPrayer: 'Brother Robinson',
        wardBusiness: [{ description: 'Sustaining of Sister King as Young Women adviser' }],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
        speakers: [
            { name: 'Sister Thompson', topic: 'Gratitude in All Circumstances', type: 'speaker' },
            { name: 'Primary Children', topic: 'I Am a Child of God', type: 'musical-number' },
            { name: 'Brother Walker', topic: 'Counting Our Blessings', type: 'speaker' }
        ],
        closingHymn: { number: 241, title: 'Count Your Blessings' },
        closingPrayer: 'Sister Allen'
    },
    {
        id: 5,
        date: '2026-11-29',
        meetingType: 'stake',
        presiding: 'President Anderson',
        conducting: 'President Anderson',
        openingHymn: { number: 94, title: 'Come, Ye Thankful People' },
        openingPrayer: 'Sister Wright',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
        speakers: [
            { name: 'Sister Anderson', topic: 'A Grateful Heart', type: 'speaker' },
            { name: 'Stake Choir', topic: 'Prayer of Thanksgiving', type: 'musical-number' },
            { name: 'Elder Hughes, Area Seventy', topic: 'Gathering Israel on Both Sides of the Veil', type: 'speaker' },
            { name: 'President Anderson', topic: 'Strengthening Our Homes', type: 'speaker' }
        ],
        closingHymn: { number: 92, title: 'For the Beauty of the Earth' },
        closingPrayer: 'Brother Scott',
        announcements: ['No branch meetings this week; all members attend stake conference']
    },
    {
        id: 6,
        date: '2026-12-06',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 201, title: 'Joy to the World' },
        openingPrayer: 'Brother Green',
        wardBusiness: [{ description: 'Release of Sister Baker as Relief Society secretary' }],
        stakeBusiness: false,
        sacramentHymn: { number: 196, title: 'Jesus, Once of Humble Birth' },
        speakers: [],
        closingHymn: { number: 209, title: 'Hark! The Herald Angels Sing' },
        closingPrayer: 'Sister Turner',
        announcements: [
            'Branch Christmas party: December 12 at 6:00 PM',
            'Christmas sacrament meeting program: December 20'
        ]
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}