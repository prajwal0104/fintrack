export default function normaldatetime(isoDate: string | undefined) {

    if (isoDate) {
        const date = new Date(isoDate);

        // Convert to a readable format
        return date.toLocaleString();
    }
    return ""
}