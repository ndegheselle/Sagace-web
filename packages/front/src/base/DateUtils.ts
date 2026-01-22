export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return '—';
    const d = new Date(date);
    return d.toLocaleDateString();
}