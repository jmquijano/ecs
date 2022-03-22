import React from 'react';
import {  Text, View, Font } from '@react-pdf/renderer';
import {NoLabelInput,InputRow,InputColumn,RegularCheckBox,TextAreaPdf,ChoicesCheckBox} from '../pdf'
import FormHeader from './FormHeader';
import PageWrapper from './PageWrapper';

Font.register({
    family: 'Open Sans',
    fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle:"italic" }
    ]
    });
  
// KAILANGAN PA NIG CLEAN UP 

const FsedOneOfFour = ({pdfValue}) => {
    const {sectionOne,sectionTwo,sectionThree,sectionFour,sectionFive,sectionSix,sectionSeven} = pdfValue

    return (
    <PageWrapper> 
              <View
                style={{
                    width: '100%',
                    padding: 2,
                    border:"4px solid black"
                }}
              >
                  <View
                    style={{
                    border:"2px solid black",
                    width: '100%',
                    height: '100%',
                    padding:"5px"
                    }}
                    >
                        {/* Logo */}
                        <FormHeader/>

                        {/* 2 row */}
                        <View
                        style={{
                            textAlign:"center",
                            fontSize:"11px",
                            marginBottom:"10px"
                        }}
                        >
                                <Text>
                                    (Region)
                                </Text>
                                <Text>
                                    (District/Province Office)
                                </Text>
                                <Text>
                                    (Station)
                                </Text>
                                <Text>
                                    (Station Address)
                                </Text>
                                <Text>
                                    (Telephone No./Email Address)
                                </Text>
                        </View>

                        {/* 3 row */}
                        <View
                        >
                            <View
                                style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                
                                }}
                            >
                                    <InputColumn
                                        inputColumnViewStyle={{width:"40%"}}
                                        inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto",fontFamily:"Open Sans",fontStyle:"italic"}}
                                        inputColumnStyle={{ height:"11px" }} 
                                        inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionOne && sectionOne.nameOfOwner} 
                                        inputLabel="(Name of Owner)"
                                    />
                                    <InputColumn
                                        inputColumnViewStyle={{width:"30%",marginRight:"40px"}}
                                        inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto"}}
                                        inputColumnStyle={{ height:"11px" }} 
                                        inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionOne && sectionOne.date}  
                                        inputLabel="DATE"
                                    />
                            </View>
                                    <InputColumn
                                            inputColumnViewStyle={{width:"40%"}}
                                            inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto",fontFamily:"Open Sans",fontStyle:"italic"}}
                                            inputColumnStyle={{ height:"11px" }} 
                                            inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                            inputContent={sectionOne && sectionOne.nameOfEstablishment} 
                                            inputLabel="(Name of Establishment)"
                                        />
                            
                                    <InputColumn
                                            inputColumnViewStyle={{width:"40%"}}
                                            inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto",fontFamily:"Open Sans",fontStyle:"italic"}}
                                            inputColumnStyle={{ height:"11px" }} 
                                            inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                            inputContent={sectionOne && sectionOne.address} 
                                            inputLabel="(Address)"
                                        />
                        </View>
     

                            {/* 4 row */}
                        <View
                        style={{
                            fontSize:"11px",
                            marginTop:"10px"
                        }}
                        >
                                <Text
                                style={{
                                    fontFamily:"Open Sans",
                                    fontWeight:"bold"
                                }}
                                >FOR	 : CITY/MUNICIPAL FIRE MARSHAL</Text>
                                <Text>ATTN 	 : CHIEF, FIRE SAFETY ENFORCEMENT SECTION</Text>
                        </View>

                        {/* 5 row */}
                        <View
                            style={{
                                marginTop:"10px"
                            }}
                        >
                            <View 
                                style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    alignItems:"center",
                                }}
                            >
                                        <Text
                                        style={{ 
                                            fontSize:"11px",
                                            fontFamily:"Open Sans",
                                            fontWeight:"bold",
                                            width:"20%",
                                            marginRight:"5px"
                                        }}
                                        >
                                            REFENCE:
                                        </Text>
                                        <InputRow 
                                            inputRowViewStyle={{width:"95%"}}
                                            inputRowLabelStyle={{fontSize:"11px"}}
                                            inputRowStyle={{ height:"13px" }} 
                                            inputRowContentStyle={{fontSize:"9px",fontStyle:"italic"}}
                                            inputContent={sectionOne && sectionOne.inspectionOrderNo}  
                                            inputLabel="INSPECTION ORDER NO."
                                            // inputSuffix="(123)"
                                            inputRowSuffixStyle={{fontSize:"6px",fontWeight:"bold"}}
                                        />
                                        <InputRow 
                                            inputRowViewStyle={{width:"95%"}}
                                            inputRowLabelStyle={{fontSize:"11px"}}
                                            inputRowStyle={{ height:"13px" }} 
                                            inputRowContentStyle={{fontSize:"9px",fontStyle:"italic"}}
                                            inputContent={sectionOne && sectionOne.dateIssued} 
                                            inputLabel="DATE ISSUED"
                                            // inputSuffix="(123)"
                                            inputRowSuffixStyle={{fontSize:"6px",fontWeight:"bold"}}
                                        />
                                    </View>
                                    <InputRow 
                                            inputRowViewStyle={{width:"100%"}}
                                            inputRowLabelStyle={{fontSize:"11px"}}
                                            inputRowStyle={{ height:"13px" }} 
                                            inputRowContentStyle={{fontSize:"9px",fontStyle:"italic"}}
                                            inputContent={sectionOne && sectionOne.dateOfInspection} 
                                            inputLabel="DATE OF INSPECTION:"
                                            // inputSuffix="(123)"
                                            inputRowSuffixStyle={{fontSize:"6px",fontWeight:"bold"}}
                                        />
                        </View>

                        {/* 6 row */}
                        <View
                            style={{
                            marginTop:"10px"
                            }}
                        >
                            
                            <View
                                style={{
                                    display:"flex",
                                    flexDirection:"row"
                                }}
                            >
                                        <Text
                                            style={{
                                                fontFamily:"Open Sans",
                                                fontWeight:"bold"
                                            }}
                                        >NATURE OF INSPECT ION CONDUCTED:</Text>
                                        <RegularCheckBox 
                                            regularCheckBoxLabel={"Check Appropriate Box"}
                                            checked={false}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"300px"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                                fontWeight:"bold"
                                            }}
                                        />
                            </View>

                            <View
                                style={{
                                    display:"flex",
                                    flexDirection:"row"
                                }}
                            >
                                            <RegularCheckBox 
                                                regularCheckBoxLabel={"Building Under Construction"}
                                                checked={sectionTwo && sectionTwo.buildingUnderConstruction}
                                                checkBoxFirst={true}
                                                regularCheckBoxStyle={{width:"300px"}}
                                                checkBoxStyle={{marginHorizontal:"2px"}}
                                                checkBoxLabelStyle={{
                                                    fontFamily:"Open Sans",
                                                    
                                                }}
                                            />
                                            <RegularCheckBox 
                                                regularCheckBoxLabel={"Periodic Inspection of Occupancy"}
                                                checked={sectionTwo && sectionTwo.periodicInspectionOfOccupancy}
                                                checkBoxFirst={true}
                                                regularCheckBoxStyle={{width:"300px"}}
                                                checkBoxStyle={{marginHorizontal:"2px"}}
                                                checkBoxLabelStyle={{
                                                    fontFamily:"Open Sans",
                                                
                                                }}
                                            />
                            </View>
                            <View
                                style={{
                                    display:"flex",
                                    flexDirection:"row"
                                }}
                            >
                                        <RegularCheckBox 
                                            regularCheckBoxLabel={"Application for Occupancy Permit"}
                                            checked={sectionTwo && sectionTwo.applicationForOccupancyPermit}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"300px"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                                
                                            }}
                                        />
                                        <RegularCheckBox 
                                            regularCheckBoxLabel={"Verification Inspection of Compliance to NTCV"}
                                            checked={sectionTwo && sectionTwo.verificationinspectionOfcomplianceToNTCV}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"300px"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                                
                                            }}
                                        />
                            </View>
                            <View
                            style={{
                                display:"flex",
                                flexDirection:"row"
                            }}
                            >
                                        <RegularCheckBox 
                                            regularCheckBoxLabel={"Application for Business Permit"}
                                            checked={sectionTwo && sectionTwo.applicationForBusinessPermit}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"300px"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                            
                                            }}
                                            />
                                            <RegularCheckBox 
                                            regularCheckBoxLabel={"Verification Inspection of Complaint Received"}
                                            checked={sectionTwo && sectionTwo.verificationinspectionOfComplaintReceived}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"300px"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                                
                                            }}
                                            />
                            </View>
                            <View
                                style={{
                                    display:"flex",
                                    flexDirection:"row"
                                }}
                            >
                                        <RegularCheckBox 
                                            regularCheckBoxLabel={"Others (Specify)"}
                                            checked={sectionTwo && sectionTwo.others}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"20%"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                            
                                            }}
                                            />
                                            <NoLabelInput 
                                            inputStyle={{
                                            width:"100%",
                                            height:"12px"
                                            }}
                                            inputContent={sectionTwo && sectionTwo.specify}
                                            inputContentStyle={{fontSize:"8px"}}
                                        /> 
                            </View>

                        </View>

                            {/* 7 row */}
                            <View
                                style={{
                                marginTop:"10px"
                                }}
                            >
                                <Text
                                style={{
                                    fontFamily:"Open Sans",
                                    fontWeight:"bold",
                                    textDecoration:"underline",
                                    textAlign:"center"
                                }}
                                >
                                PLACES OF ASSEMBLY OCCUPANCY CHECKLIST
                                </Text>

                                <Text
                                    style={{
                                    fontFamily:"Open Sans",
                                    fontWeight:"bold",
                                    marginTop:"5px"
                                    
                                    }}
                                >
                                    I. GENERAL INFORMATION
                                </Text>

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={{ height:"10px" }} 
                                    inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                    inputContent={sectionThree && sectionThree.nameOfBuilding} 
                                    inputLabel="Name of Building"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={{ height:"10px" }} 
                                    inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                    inputContent={sectionThree && sectionThree.businessName} 
                                    inputLabel="Business Name"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                />
                                

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={{ height:"10px" }} 
                                    inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                    inputContent={sectionThree && sectionThree.address}  
                                    inputLabel="Address"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={{ height:"10px" }} 
                                    inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                    inputContent={sectionThree && sectionThree.natureOfBusiness} 
                                    inputLabel="Nature of Business"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                />

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.nameOfOwnerOrOccupant} 
                                        inputLabel="Name of Owner/Occupant"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.contactNo}
                                        inputLabel="Contact No."
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.nameOfRepresentative}
                                        inputLabel="Name of Representative"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.contactNo2} 
                                        inputLabel="Contact No."
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.noOfStorey}  
                                        inputLabel="No. of Storey"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.heightOfBldg}   
                                        inputLabel="Height of B1dg"
                                        inputSuffix="(m)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.portionOccupied}  
                                        inputLabel="Portion Occupied"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.areaPerFlr} 
                                        inputLabel="Area per flr"
                                        inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.totalFlrArea}  
                                        inputLabel="Total Flr. Area"
                                        inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.buildingPermitNo} 
                                        inputLabel="Building Permit No"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssue}  
                                        inputLabel="Date Issue"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.occupancyPermitNo}  
                                        inputLabel="Occupancy Permit No."
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued} 
                                        inputLabel="Date Issued "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.latestFSICIssuedControlNo} 
                                        inputLabel="Latest FSIC Issued Control No. "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued2} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.fCFee} 
                                        inputLabel="FC Fee"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.certificateOfFireDrill} 
                                        inputLabel="Certificate of Fire Drill "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued3}
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.fCFee2}
                                        inputLabel="FC Fee"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.latestNoticeToCorrectViolationsControlNo} 
                                        inputLabel="Latest Notice to Correct Violations Control No. "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued4}  
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.nameOfFireInsuranceCoOrCoInsurer} 
                                        inputLabel="Name of Fire Insurance Co/Co-Insurer"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.policyNo}  
                                        inputLabel="Policy No"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued5} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"60%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.latestMayorsOrBusPermit}  
                                        inputLabel="Latest Mayor's/Bus. Permit "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"30%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued6} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"50%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.municipalLicenseNo} 
                                        inputLabel="Municipal License No"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"30%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued7} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.LatestCertificateofElectricalInspectionNo} 
                                        inputLabel="Latest Certificate of Electrical Inspection No. "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.dateIssued8}  
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionThree && sectionThree.otherInformation}  
                                        inputLabel="Other Information"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>
                                
                            </View>

                            {/* 8 row */}
                            <View
                            style={{
                                marginTop:"10px"
                            }}
                            >
                            <Text
                                    style={{
                                    fontFamily:"Open Sans",
                                    fontWeight:"bold",
                                    
                                    }}
                                >
                                    II.BUILDING CONSTRUCTION
                                </Text>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.beams}  
                                        inputLabel="Beams"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.columns}
                                        inputLabel="Columns"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.flooring} 
                                        inputLabel="Flooring"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.exteriorWalls}  
                                        inputLabel="Exterior Walls"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.corridorWalls}  
                                        inputLabel="Corridor Walls"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.roomPartitions} 
                                        inputLabel="Room Partitions"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.mainStair}  
                                        inputLabel="Main Stair"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.windows} 
                                        inputLabel="Windows"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.ceiling}  
                                        inputLabel="Ceiling"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.mainDoor} 
                                        inputLabel="Main Door"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }}
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.trusses} 
                                        inputLabel="Trusses"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"11px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionFour && sectionFour.roof} 
                                        inputLabel="Roof"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}

                                    />
                                    
                                    
                                </View>    
                            </View>

                            {/* 9 row */}
                            <View
                            style={{
                                marginTop:"10px"
                            }}
                            >
                                <Text
                                    style={{
                                        fontFamily:"Open Sans",
                                        fontWeight:"bold",
                                        
                                    }}
                                    >
                                    III. SECTIONAL OCCUPANCY (Note: Indicate specific usage of each floor, section or rooms)
                                    </Text>
                                {
                                   sectionFive ? 

                                   <TextAreaPdf
                                   textAreaPdfStyle={{}}
                                   inputContentStyle={{}}
                                   characterLimit={350}
                                   inputContent={sectionFive && sectionFive.sectionalOccupancy}
                                   />
                                  :
                                  <View>
                                    <NoLabelInput 
                                    inputStyle={{
                                    width:"100%",
                                    height:"12px"
                                    }}
                                    inputContent={sectionFive && sectionFive.sectionalOccupancy}
                                    inputContentStyle={{fontSize:"8px"}}
                                />  

                                <NoLabelInput 
                                    inputStyle={{
                                    width:"100%",
                                    height:"12px"
                                    }}
                                    inputContent={""}
                                    inputContentStyle={{fontSize:"8px"}}
                                />  

                                <NoLabelInput 
                                    inputStyle={{
                                    width:"100%",
                                    height:"12px"
                                    }}
                                    inputContent={""}
                                    inputContentStyle={{fontSize:"8px"}}
                                />   

                                </View>
                                }
                                  
                                   
                            </View>

                            {/* 10 row */}
                            <View
                            style={{
                                marginTop:"10px"
                            }}
                            >
                                <Text
                                    style={{
                                        fontFamily:"Open Sans",
                                        fontWeight:"bold",
                                        
                                    }}
                                    >
                                    IV. CLASSIFICATION
                                    </Text>

                                    <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionSix && sectionSix.occupantLoad} 
                                        inputLabel="Occupant Load:"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"10px" }} 
                                        inputRowContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={sectionSix && sectionSix.egresscapacity}  
                                        inputLabel="Egress capacity"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={{fontSize:"9px",fontWeight:"bold"}}

                                    />
                                </View>
                                <Text
                                    
                                    >
                                    (requirement: 0.65 sq.m. per person for concentrated use without fixed seat; 1.4 sq.m. per person for less concentrated use and 0.28 sq.m.  per person for standing room or waiting space)
                                    </Text>
                                    <View 
                                    style={{
                                        display:"flex",
                                        flexDirection:"row"
                                    }}
                                    >
                                    <ChoicesCheckBox
                                        choicesLabel="Any renovations:"
                                        choicesLabelFirst={true}
                                        choicesCheckBoxStyle={{marginHorizontal:"3px"}}
                                        choices={[
                                        {   
                                            label:"Yes",
                                            checked:sectionSix && sectionSix.anyRenovations.yes
                                        },
                                        {
                                            label:"No",
                                            checked:sectionSix && sectionSix.anyRenovations.no
                                        },
                                        ]}
                                />
                                <ChoicesCheckBox
                                choicesLabel="Windowless:"
                                choicesLabelFirst={true}
                                choicesCheckBoxStyle={{marginHorizontal:"3px"}}
                                choicesLabelStyle={{marginLeft:"10px"}}
                                choices={[
                                    {
                                    label:"Yes",
                                    checked:sectionSix && sectionSix.windowless.yes
                                    },
                                    {
                                    label:"No",
                                    checked:sectionSix && sectionSix.windowless.no
                                    },
                                ]}
                            />

                                    </View>
                                

                            </View>

                            {/* 11 row */}
                            <View
                                style={{
                                marginTop:"10px"
                                }}
                            >
                                    <Text
                                    style={{
                                        fontFamily:"Open Sans",
                                        fontWeight:"bold",
                                        
                                    }}
                                    >
                                    V. EXIT DETAILS
                                    </Text>
                                    <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={{ height:"13px" }} 
                                    inputRowContentStyle={{fontSize:"9px",fontStyle:"italic"}}
                                    inputContent={sectionSeven && sectionSeven.capacityOfHorizontalExit} 
                                    inputLabel="Capacity of Horizontal Exit (Corridor Hallway):"
                                    inputSuffix="(Requirement:100 persons per unit of exit width per min)"
                                    inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}
                                    />

                                    <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={{ height:"13px" }} 
                                    inputRowContentStyle={{fontSize:"9px",fontStyle:"italic"}}
                                    inputContent={sectionSeven && sectionSeven.capacityOfExitStair}
                                    inputLabel="Capacity of Exit Stair:"
                                    inputSuffix="(Requirement:75 persons per unit of exit width per min)"
                                    inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}
                                    />

                                    <View
                                    style={{
                                        display:"flex",
                                        flexDirection:"row"
                                    }}
                                    >
                                        <InputRow 
                                        inputRowViewStyle={{width:"70%"}}
                                        inputRowLabelStyle={{fontSize:"10px"}}
                                        inputRowStyle={{ height:"13px" }} 
                                        inputRowContentStyle={{fontSize:"9px",fontStyle:"italic"}}
                                        inputContent={sectionSeven && sectionSeven.noOfExits}
                                        inputLabel="No. of Exits"
                                        inputSuffix=""
                                        inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        />
                                        <ChoicesCheckBox
                                        choicesLabel="Remote"
                                        choicesLabelFirst={true}
                                        choicesLabelStyle={{marginHorizontal:"5px"}}
                                        choicesCheckBoxStyle={{marginHorizontal:"3px"}}
                                        choices={[
                                        {
                                            label:"Yes",
                                            checked:sectionSeven && sectionSeven.remote.yes
                                        },
                                        {
                                            label:"No",
                                            checked:sectionSeven && sectionSeven.remote.no
                                        },
                                        ]}
                                />
                                    </View>

                                    <Text>
                                    Minimum Requirement: No. of Exits: Class A-at least 4 separate; Class B –at least 3; Class C-at least 2
                                    </Text>

                                    <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={{ height:"13px" }} 
                                    inputRowContentStyle={{fontSize:"9px",fontStyle:"italic"}}
                                    inputContent={sectionSeven && sectionSeven.locationOfExit} 
                                    inputLabel="Location of Exit"
                                    inputSuffix=""
                                    inputRowSuffixStyle={{fontSize:"8px",fontStyle:"italic"}}
                                    />
                                    <Text
                                    style={{
                                        textAlign:"center"
                                    }}
                                    >
                                    Maximum Travel Distance Requirement from Farthest Room: 46 m without AFSS & 61m with AFSS
                                    </Text>
                            </View>
                </View>
              </View>
         {/* Footer */}
        <Text
             style={{
               fontFamily:"Open Sans",
               fontWeight:"bold",
               color:"gray"
             }}
            >BFP-QSF-FSED-027 Rev. 01 (07.05.19) Page 1 of 4</Text>
       </PageWrapper>  
 )
 
   
}

export default FsedOneOfFour