import { Suspense } from 'react';
import CurrentDate from './CurrentDate';
import NavLinks, { NavList, type NavLink } from './NavLinks';

const mainLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'Meetings' },
];

export default function Header() {
    return (
        <header className="bg-blue-800 text-white py-4 shadow-md print:hidden">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
                <div id="header-title" className="text-2xl font-bold">
                    Lakeview 9th Ward - <CurrentDate />
                </div>
                <Suspense fallback={<NavList links={mainLinks} label="Main" pathname={null} />}>
                    <NavLinks links={mainLinks} label="Main" />
                </Suspense>
            </div>
        </header>
    );
}