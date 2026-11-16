import { Suspense } from 'react';
import NavLinks, { NavList, type NavLink } from '@/components/NavLinks';

const meetingLinks: NavLink[] = [
    { href: '/meetings', label: 'All meetings', exact: true },
    { href: '/meetings/current', label: 'This Sunday' },
];

export default function MeetingsLayout({ children }: LayoutProps<'/meetings'>) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 print:max-w-none print:p-0">
            <div className="mb-6 border-b border-gray-200 pb-3 text-blue-800 print:hidden">
                <Suspense
                    fallback={<NavList links={meetingLinks} label="Meetings" pathname={null} />}
                >
                    <NavLinks links={meetingLinks} label="Meetings" />
                </Suspense>
            </div>
            {children}
        </div>
    );
}