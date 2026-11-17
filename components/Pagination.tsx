'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const linkClasses =
    'inline-flex items-center gap-1 rounded border border-blue-800 px-4 py-2 font-medium text-blue-800 ' +
    'hover:bg-blue-800 hover:text-white ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    }

    return (
        <nav aria-label="Pagination" className="mt-8 grid grid-cols-3 items-center gap-4">
            {currentPage > 1 && (
                <Link href={createPageURL(currentPage - 1)} className={linkClasses + ' justify-self-start'}>
                    <span aria-hidden="true">&larr;</span> Previous
                </Link>
            )}
            <span className="col-start-2 text-center text-gray-700">
                Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
                <span className="font-semibold text-gray-900">{totalPages}</span>
            </span>
            {currentPage < totalPages && (
                <Link href={createPageURL(currentPage + 1)} className={linkClasses + ' justify-self-end'}>
                    Next <span aria-hidden="true">&rarr;</span>
                </Link>
            )}
        </nav>
    );
}