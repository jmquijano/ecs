export default function ZeroPadding (num, places) {
    return String(num).padStart(places, '0');
}