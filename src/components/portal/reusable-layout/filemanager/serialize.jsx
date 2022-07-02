export default function serialize(f) {
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
                    isRemoving: d?.isRemoving,
                    created_at: d?.created_at,
                    locale: 'en-ph'
                });
            }
            
        })
        // console.log(serialize);
        return serialize;
    }
}