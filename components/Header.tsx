import { Suspense } from 'react';
import CurrentDate from './CurrentDate';
import NavLinks, { NavList } from './NavLinks';

export default function Header() {
    return (
        <header className="bg-blue-800 text-white py-4 shadow-md">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
                <div id="header-title" className="text-2xl font-bold">
                    Lakeview 9th Ward - <CurrentDate />
                </div>
                <Suspense fallback={<NavList pathname={null} />}>
                    <NavLinks />
                </Suspense>
            </div>
        </header>
    );
}