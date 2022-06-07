import { ApiBaseUrl, UrlWithParam } from "../urlbase";

const { Applicant } = ApiBaseUrl;

const fetchProvince = (clbk) => {
    clbk();

    const { url, method, headers } = Applicant?.Boundaries?.Province; 
    
    const _f = fetch(Applicant?.Base + url, {
        method: method,
        headers: headers
    });

    return _f;
}

const fetchCity = (parent, clbk) => {
    clbk();

    let { url, method, headers } = Applicant?.Boundaries?.City; 
    url = UrlWithParam({
        'parent': parent
    }, url);
    
    const _f = fetch(Applicant?.Base + url, {
        method: method,
        headers: headers
    });

    return _f;
}

const fetchBarangay = (parent, clbk) => {
    clbk()

    let { url, method, headers } = Applicant?.Boundaries?.Barangay; 
    url = UrlWithParam({
        'parent': parent
    }, url);
    
    const _f = fetch(Applicant?.Base + url, {
        method: method,
        headers: headers
    });

    return _f;
}

export { fetchProvince, fetchCity, fetchBarangay }