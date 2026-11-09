'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
    href: string;
    label: string;
}

const links: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'Meetings' },
    { href: '/meetings/current', label: 'Current' },
];

function matches(pathname: string, href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
}

/** Renders the links. Pass `null` to render them with nothing highlighted. */
export function NavList({ pathname }: { pathname: string | null }) {
    // Pick the most specific (longest) link that matches the current URL,
    // so /meetings/current highlights "Current" and not also "Meetings".
    const activeHref = pathname
        ? links
            .filter((link) => matches(pathname, link.href))
            .sort((a, b) => b.href.length - a.href.length)[0]?.href
        : undefined;

    return (
        <nav aria-label="Main navigation">
            <ul className="flex gap-6">
                {links.map((link) => {
                    const isActive = link.href === activeHref;

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={
                                    isActive
                                        ? 'font-bold underline underline-offset-4'
                                        : 'hover:underline underline-offset-4 opacity-90 hover:opacity-100'
                                }
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

/** Reads the current URL and highlights the matching link. */
export default function NavLinks() {
    const pathname = usePathname();
    return <NavList pathname={pathname} />;
}