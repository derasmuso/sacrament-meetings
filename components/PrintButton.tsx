'use client';

export default function PrintButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
        >
            Print program
        </button>
    );
}