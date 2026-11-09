export const BRANCH_TIME_ZONE = 'America/Denver';

/** This week's Sunday as 'YYYY-MM-DD' (today, if today is Sunday). */
export function currentSunday(timeZone: string = BRANCH_TIME_ZONE): string {
    // 1. Today's date where the branch is, e.g. "2026-11-09"
    const todayString = new Date().toLocaleDateString('en-CA', { timeZone });

    // 2. Rebuild it as midnight UTC, so no time zone can shift it
    const [year, month, day] = todayString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    // 3. Snippet's logic, using the UTC versions of the methods
    date.setUTCDate(date.getUTCDate() - date.getUTCDay());

    // 4. Safe now: the date is already midnight UTC, so toISOString() can't shift it
    return date.toISOString().slice(0, 10);
}