'use client';

import { useSyncExternalStore } from 'react';

const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

function subscribe() {
    return () => { };
}

function getToday() {
    return new Date().toLocaleDateString('en-US', dateFormat);
}

function getServerToday() {
    return '';
}

export default function CurrentDate() {
    const today = useSyncExternalStore(subscribe, getToday, getServerToday);
    return <span>{today}</span>;
}