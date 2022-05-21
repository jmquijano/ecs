import { ApiBaseUrl } from "./urlbase";

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

export { fetchCertificateType, fetchBusinessType };