export default function tinFormat(tin, position) {
    let tribus = tin?.match(/.{1,3}/g);

    return tribus?.[position] || '';
}