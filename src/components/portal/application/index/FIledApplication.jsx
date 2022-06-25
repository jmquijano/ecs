import { Box, Button, Center, Grid, GridItem, Select, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiBaseUrl, UrlWithParam } from "../../../../utils/urlbase";
import { Loader } from "../../../loaders";
import PageLinkButton from "../../reusable-layout/button/PageLinkButton";
import DataTable from "../../reusable-layout/table/DataTable";

export default function FiledApplication(props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [totalItemCount, setTotalItemCount] = useState(0);

    const token = localStorage.getItem('token');

    const limitSelector = [2, 5, 10, 15, 20, 25, 30];

    const paginationSelector = (count) => {
        var c = [];
        for (let i = 0; i < count; i++) {
            c.push(i+1);
        }
        return c;
    }

    const fetchApplication = () => {
        setLoading(true);
        fetch(ApiBaseUrl.Applicant.Base + UrlWithParam({
            'limit': limit,
            'page': page,
            'paginate': true
        }, ApiBaseUrl.Applicant.Application.MySubmittedApplication.url), {
            method: ApiBaseUrl.Applicant.Application.MySubmittedApplication.method,
            headers: {
                ...ApiBaseUrl.Applicant.Application.MySubmittedApplication.headers,
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setData(res?.data);
                setPageCount(res?.last_page);
                setTotalItemCount(res?.total);
            }
            
        })
        .finally(res => {
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchApplication();
    }, [limit, page]);

    return (
        <DataTable 
            loading={loading}
            minHeight={'60vh'}
            tableProps={{
                variant: 'simple'
            }}
            theadProps={{
                background: 'gray.100'
            }}
            columns={[
                {
                    name: 'Application Reference Number',
                    width: '10%',
                    minWidth: '30px',
                    dataKey: 'application_reference_number',
                    dataType: 'text',
                    textProps: {
                        fontSize: 14
                    }
                },
                {
                    name: 'Taxpayer Name',
                    width: '30%',
                    dataKey: 'taxpayer_name',
                    dataType: 'text',
                    textProps: {
                        fontSize: 14
                    }
                },
                {
                    name: 'Business ID',
                    minWidth: '30px',
                    width: '10%',
                    dataKey: 'business_id',
                    dataType: 'text',
                    textProps: {
                        fontSize: 14
                    }
                },
                {
                    name: 'Ownership',
                    width: '10%',
                    dataKey: 'businesstype.fullname',
                    dataType: 'text',
                    textProps: {
                        fontSize: 14
                    }
                },
                {
                    name: 'Status',
                    width: '5%',
                    dataKey: 'status.fullname',
                    dataType: 'text',
                    textProps: {
                        fontSize: 14
                    }
                },
                {
                    name: 'Created',
                    width: '20%',
                    minWidth: '30px',
                    dataKey: 'created_at',
                    dataType: 'date',
                    dateProps: {
                        fontSize: 14,
                        locale: 'en-ph',
                        timeZone: 'Asia/Manila'
                    }
                },
                {
                    name: '',
                    width: '15%',
                    dataKey: 'id',
                    dataType: 'button-link',
                    buttonLinkProps: {
                        baseUrl: '/application/manage/',
                        text: 'Open'
                    }
                }
            ]}
            dataSource={data}
            pagination={{
                pageCount: pageCount,
                onPageChange: e => setPage(e),
                onPageLimitChange: e => setLimit(e),
                totalItemCount: totalItemCount,
                currentPage: page
            }}
        />
    )
}