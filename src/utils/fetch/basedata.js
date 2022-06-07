import { ApiBaseUrl, UrlWithParam } from "../urlbase";

const { Applicant } = ApiBaseUrl;

const fetchCertificateType = () => {
    
    const { url, method, headers } = Applicant?.Basedata?.CertificateType; 
    const _f = fetch(Applicant?.Base + url, {
        method: method,
        headers: headers
    });

    return _f;
}

const fetchBusinessType = () => {
    const { url, method, headers } = Applicant?.Basedata?.BusinessType; 
    const _f = fetch(Applicant?.Base + url, {
        method: method,
        headers: headers
    });

    return _f;
}

const fetchBirRDO = () => {
    const { url, method, headers } = Applicant?.Basedata?.BIR_RDO; 
    const _f = fetch(Applicant?.Base + url, {
        method: method,
        headers: headers
    });

    return _f;
}

const fetchPSIC = (callback, keyword = '', limit = 10, page = 1) => {
    callback();
    const { url, method, headers } = Applicant?.Basedata?.PSIC; 
    const _f = fetch(Applicant?.Base + UrlWithParam({
        'keyword': keyword,
        'limit': limit,
        'page': page 
    }, url), {
        method: method,
        headers: headers
    });

    return _f;
}

const fetchPSICById = (callback, id = 0) => {
    callback();
    const { url, method, headers } = Applicant?.Basedata?.PSICByID; 
    const _f = fetch(Applicant?.Base + UrlWithParam({
        'id': id
    }, url), {
        method: method,
        headers: headers
    });

    return _f;
}

const fetchInspectionType = (callback) => {
    callback();

    const { url, method, headers } = Applicant?.Basedata?.InspectionType; 
    const _f = fetch(Applicant?.Base + url, {
        method: method,
        headers: headers
    });

    return _f;
}

export { 
    fetchCertificateType, 
    fetchBusinessType, 
    fetchBirRDO, 
    fetchPSIC, 
    fetchPSICById,
    fetchInspectionType
};