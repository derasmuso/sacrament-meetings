'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavLink {
    href: string;
    label: string;
    /** Only highlight on this exact URL, not on pages below it. */
    exact?: boolean;
}

interface NavListProps {
    links: NavLink[];
    label: string;
    pathname: string | null;
}

function matches(pathname: string, link: NavLink): boolean {
    if (pathname === link.href) return true;
    if (link.exact) return false;
    return pathname.startsWith(`${link.href}/`);
}

/** Renders a list of links. Pass `pathname={null}` to render them with nothing highlighted. */
export function NavList({ links, label, pathname }: NavListProps) {
    // Pick the most specific (longest) link that matches the current URL.
    const activeHref = pathname
        ? links
            .filter((link) => matches(pathname, link))
            .sort((a, b) => b.href.length - a.href.length)[0]?.href
        : undefined;

    return (
        <nav aria-label={label}>
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
export default function NavLinks({ links, label }: Omit<NavListProps, 'pathname'>) {
    const pathname = usePathname();
    return <NavList links={links} label={label} pathname={pathname} />;
}