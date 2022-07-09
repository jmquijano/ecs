import React from "react";
import { BiPlus } from "react-icons/bi";
import FiledApplication from "../../../components/portal/application/index/FIledApplication";
import PageContainer from "../../../components/portal/reusable-layout/containers/PageContainer";

export default function ApplicationIndex() {
    return (
        <PageContainer
            title={'My Application'}
            heading={{
                title: 'My Application',
                menu: [
                    {
                        to: '/application/new',
                        icon: <BiPlus size={20} />,
                        text: 'Create',
                        visible: true
                    }
                ]
            }}
        >
            <FiledApplication />
        </PageContainer>
    );
}