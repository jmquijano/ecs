import { Box, Center, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { fetchUploadedFilesApplicationById } from "../../../../../utils/fetch/application";
import { Loader } from "../../../../loaders";
import FileManager from "../../../reusable-layout/filemanager";
import Viewer from "../../../reusable-layout/filemanager/viewer";
import ApplicationDetails from "./applicationdetails";

function serializeFile(f) {
    let serialize = [];
    if (f instanceof Object) {
        // Map
        f?.map((d) => {
            if (d?.context?.path !== null) {
                serialize.push({
                    id: d?.id,
                    path: d?.context?.path,
                    name: d?.context?.file?.name,
                    mimetype: d?.context?.file?.mime_type,
                    extension: d?.context?.file?.extension,
                    size: d?.context?.file?.size,
                    checksum: {
                        md5: d?.context?.hash?.md5,
                        sha1: d?.context?.hash?.sha1,
                        sha256: d?.context?.hash?.sha256
                    },
                    created_at: d?.created_at,
                    locale: 'en-ph'
                });
            }
            
        })
        console.log(serialize);
        return serialize;
    }
}

export default function FileUpload(props) {
    const { id, applicationData } = props;

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileViewer, setFileViewer] = useState({});

    useEffect(() => {
        fetchUploadedFilesApplicationById(
            () => setLoading(true),
            id
        )
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setFiles(res?.data);
                } else {

                }
            })
            .finally(e => setLoading(false))

    }, [id]);

    const handleOpenFile = (e) => {
        setFileViewer({
            ...e,
            isOpen: fileViewer?.isOpen ? false : true
        });
    }

    return (
        <Box minHeight={'40vh'} mt={'0 !important'}>
            {loading ?
                <Center height={'40vh'}>
                    <Loader.Default size={'xl'} thickness={'5px'} />
                </Center>
                :
                <>
                    <ApplicationDetails {...applicationData} />
                    <FileManager files={serializeFile(files)} onOpen={handleOpenFile} onRemove={e => console.log(e)}>
                        <Viewer {...fileViewer}/>
                    </FileManager>
                </>
            }
        </Box>
    );
}