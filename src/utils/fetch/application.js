import { ApiBaseUrl, UrlWithParam } from "../urlbase";

const { Applicant } = ApiBaseUrl;

const fetchApplicationById = (clbk, id) => {
    clbk();

    let { url, method, headers } = Applicant?.Application?.ApplicationById;

    const _f = fetch(Applicant?.Base + UrlWithParam({
        'id': id
    }, url), {
        method: method,
        headers: {
            ...headers,
            Authorization: 'Bearer ' + localStorage?.getItem('token')
        }
    });

    return _f;
}

export { fetchApplicationById }