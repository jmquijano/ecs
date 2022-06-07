import base64 from 'base-64';

const goExternalLink = (e) => {
    return "/go/external?u=" + base64.encode(e);
}

export { goExternalLink }