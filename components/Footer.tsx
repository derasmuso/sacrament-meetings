import { cacheLife } from 'next/cache';

export default async function Footer() {
    'use cache';
    cacheLife('days');

    return (
        <footer className="bg-gray-800 text-white py-4 mt-12">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p>Copyright &copy; {new Date().getFullYear()} | Daniel Rasmuson | Sacrament Meeting Planner | All rights reserved</p>
            </div>
        </footer>
    );
}