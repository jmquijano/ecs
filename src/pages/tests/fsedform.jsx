import React, { Fragment, useState } from "react";
import Sampleform from "../../components/Sampleform";
import { Previewer } from "../../components/pdf";
import FsedOneOfFour from "../../components/fsed-forms/FsedOneOfFour";
import FsedTwoOfFour from "../../components/fsed-forms/FsedTwoOfFour";
import FsedThreeOfFour from "../../components/fsed-forms/FsedThreeOfFour";
import FsedFourOfFour from "../../components/fsed-forms/FsedFourOfFour";
import { useFsed } from "../../libs/fsed";
import { Document } from "@react-pdf/renderer";

export default function FSEDForm() {
    const {fsedValue} = useFsed()
    const [pdfValue,setPdfValue]= useState({});

    return (
        <Fragment>
            <Sampleform  />
            <Previewer pdfTitle={"FSED FORM"}>
                
                <Document>
                    <FsedOneOfFour pdfValue={fsedValue}/>
                    <FsedTwoOfFour pdfValue={fsedValue}/>
                    <FsedThreeOfFour pdfValue={fsedValue}/>
                    <FsedFourOfFour pdfValue={fsedValue}/>
                </Document>
            </Previewer>
        </Fragment>
    );
}