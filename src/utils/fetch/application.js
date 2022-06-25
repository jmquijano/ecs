import axios from "axios";
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

const fetchUploadedFilesApplicationById = (clbk, id) => {
    clbk();

    let { url, method, headers } = Applicant?.Application?.UploadedFilesApplicationById;

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

const uploadFilesByApplicationId = async (clbk, id, doctype, body, uploadProgress) => {
    clbk();

    let { url, method, headers } = Applicant?.Application?.UploadFilesByApplicationId;

    const _f = await axios.request({
        method: method,
        url: Applicant?.Base + UrlWithParam({
            'id': id,
            'doctype': doctype,
        }, url),
        data: body,
        onUploadProgress: uploadProgress,
        headers: {
            Authorization: 'Bearer ' + localStorage?.getItem('token')
        }
    });

    return _f;
}

const deleteUploadedFile = async (clbk, id, fileId) => {
    clbk();

    let { url, method, headers } = Applicant?.Application?.DeleteUploadedFilesApplicationById;

    const _f = await fetch(Applicant?.Base + UrlWithParam({
        'id': id,
        'fileId': fileId
    }, url), {
        method: method,
        headers: {
            ...headers,
            Authorization: 'Bearer ' + localStorage?.getItem('token')
        }
    });

    return _f;
}

export { fetchApplicationById, fetchUploadedFilesApplicationById, uploadFilesByApplicationId, deleteUploadedFile}