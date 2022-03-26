import React from 'react';
import {  Text, View, Font } from '@react-pdf/renderer';
import {styles,NoLabelInput,InputRow,InputColumn,RegularCheckBox,TextAreaPdf,ChoicesCheckBox} from '../pdf'
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
    const {prelude,generalInformation,buildingConstruction,sectionalOccupancy,classification,exitDetails} = pdfValue
    const {rowOne,rowTwo,rowThree} = prelude
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

                        {/* Region */}
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

                        {/* Prelude */}

                        {/* Row One */}
                        <View>
                            <View style={styles.rowItem}>
                                    <InputColumn
                                        inputColumnViewStyle={{width:"40%"}}
                                        inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto",fontFamily:"Open Sans",fontStyle:"italic"}}
                                        inputColumnStyle={{ height:"11px" }} 
                                        inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={rowOne && rowOne.nameOfOwner} 
                                        inputLabel="(Name of Owner)"
                                    />
                                    <InputColumn
                                        inputColumnViewStyle={{width:"30%",marginRight:"40px"}}
                                        inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto"}}
                                        inputColumnStyle={{ height:"11px" }} 
                                        inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                        inputContent={rowOne && rowOne.date}  
                                        inputLabel="DATE"
                                    />
                            </View>
                                    <InputColumn
                                            inputColumnViewStyle={{width:"40%"}}
                                            inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto",fontFamily:"Open Sans",fontStyle:"italic"}}
                                            inputColumnStyle={{ height:"11px" }} 
                                            inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                            inputContent={rowOne && rowOne.nameOfEstablishment} 
                                            inputLabel="(Name of Establishment)"
                                        />
                            
                                    <InputColumn
                                            inputColumnViewStyle={{width:"40%"}}
                                            inputColumnLabelStyle={{fontSize:"9px",marginHorizontal:"auto",fontFamily:"Open Sans",fontStyle:"italic"}}
                                            inputColumnStyle={{ height:"11px" }} 
                                            inputColumnContentStyle={{fontSize:"8px",fontStyle:"italic"}}
                                            inputContent={rowOne && rowOne.address} 
                                            inputLabel="(Address)"
                                        />
                        </View>
     

                            {/* Row Two*/}
                        <View
                        style={{
                            fontSize:"9px",
                            marginTop:"10px"
                        }}
                        >
                                <Text style={styles.noMarginTextHeading}>FOR	 : CITY/MUNICIPAL FIRE MARSHAL</Text>
                                <Text>ATTN 	 : CHIEF, FIRE SAFETY ENFORCEMENT SECTION</Text>
                        </View>

                        {/* Row Two*/}
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
                                        <Text style={[styles.noMarginTextHeading,{width:"20%"}]} >
                                            REFENCE:
                                        </Text>
                                        <InputRow 
                                            inputRowViewStyle={{width:"95%"}}
                                            // inputRowLabelStyle={{fontSize:"11px"}}
                                            inputRowStyle={styles.inputRowStyle} 
                                            inputRowContentStyle={styles.inputRowContentStyle}
                                            inputContent={rowTwo && rowTwo.inspectionOrderNo}  
                                            inputLabel="INSPECTION ORDER NO."
                                            // inputSuffix="(123)"
                                            inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                        />
                                        <InputRow 
                                            inputRowViewStyle={{width:"95%"}}
                                            // inputRowLabelStyle={{fontSize:"11px"}}
                                            inputRowStyle={styles.inputRowStyle} 
                                            inputRowContentStyle={styles.inputRowContentStyle}
                                            inputContent={rowTwo && rowTwo.dateIssued} 
                                            inputLabel="DATE ISSUED"
                                            // inputSuffix="(123)"
                                            inputRowSuffixStyle={{fontSize:"6px",fontWeight:"bold"}}
                                        />
                                    </View>
                                    <InputRow 
                                            inputRowViewStyle={{width:"100%"}}
                                            // inputRowLabelStyle={{fontSize:"11px"}}
                                            inputRowStyle={styles.inputRowStyle} 
                                            inputRowContentStyle={styles.inputRowContentStyle}
                                            inputContent={rowTwo && rowTwo.dateOfInspection} 
                                            inputLabel="DATE OF INSPECTION:"
                                            // inputSuffix="(123)"
                                            inputRowSuffixStyle={{fontSize:"6px",fontWeight:"bold"}}
                                        />
                        </View>

                        {/* Row Three */}
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
                                        <Text style={styles.noMarginTextHeading}>NATURE OF INSPECT ION CONDUCTED:</Text>
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
                                                checked={rowThree && rowThree.buildingUnderConstruction}
                                                checkBoxFirst={true}
                                                regularCheckBoxStyle={{width:"300px"}}
                                                checkBoxStyle={{marginHorizontal:"2px"}}
                                                checkBoxLabelStyle={{
                                                    fontFamily:"Open Sans",
                                                    
                                                }}
                                            />
                                            <RegularCheckBox 
                                                regularCheckBoxLabel={"Periodic Inspection of Occupancy"}
                                                checked={rowThree && rowThree.periodicInspectionOfOccupancy}
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
                                            checked={rowThree && rowThree.applicationForOccupancyPermit}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"300px"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                                
                                            }}
                                        />
                                        <RegularCheckBox 
                                            regularCheckBoxLabel={"Verification Inspection of Compliance to NTCV"}
                                            checked={rowThree && rowThree.verificationinspectionOfcomplianceToNTCV}
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
                                            checked={rowThree && rowThree.applicationForBusinessPermit}
                                            checkBoxFirst={true}
                                            regularCheckBoxStyle={{width:"300px"}}
                                            checkBoxStyle={{marginHorizontal:"2px"}}
                                            checkBoxLabelStyle={{
                                                fontFamily:"Open Sans",
                                            
                                            }}
                                            />
                                            <RegularCheckBox 
                                            regularCheckBoxLabel={"Verification Inspection of Complaint Received"}
                                            checked={rowThree && rowThree.verificationinspectionOfComplaintReceived}
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
                                            checked={rowThree && rowThree.others}
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
                                            inputContent={rowThree && rowThree.specify}
                                            inputContentStyle={{fontSize:"8px"}}
                                        /> 
                            </View>

                        </View> 

                            {/* I. GENERAL INFORMATION */}
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
                                    textAlign:"center",
                                    fontSize:"11px",
                                    marginTop:"10px",
                                }}
                                >
                                PLACES OF ASSEMBLY OCCUPANCY CHECKLIST
                                </Text>

                                <Text
                                    style={[styles.noMarginTextHeading,{marginTop:"5px"}]}
                                >
                                    I. GENERAL INFORMATION
                                </Text>

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={generalInformation && generalInformation.nameOfBuilding} 
                                    inputLabel="Name of Building"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={generalInformation && generalInformation.businessName} 
                                    inputLabel="Business Name"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                />
                                

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={generalInformation && generalInformation.address}  
                                    inputLabel="Address"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={generalInformation && generalInformation.natureOfBusiness} 
                                    inputLabel="Nature of Business"
                                    // inputSuffix="(123)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                />

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.nameOfOwnerOrOccupant} 
                                        inputLabel="Name of Owner/Occupant"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.contactNo}
                                        inputLabel="Contact No."
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.nameOfRepresentative}
                                        inputLabel="Name of Representative"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.contactNo2} 
                                        inputLabel="Contact No."
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.noOfStorey}  
                                        inputLabel="No. of Storey"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.heightOfBldg}   
                                        inputLabel="Height of B1dg"
                                        inputSuffix="(m)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.portionOccupied}  
                                        inputLabel="Portion Occupied"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.areaPerFlr} 
                                        inputLabel="Area per flr"
                                        inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.totalFlrArea}  
                                        inputLabel="Total Flr. Area"
                                        inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.buildingPermitNo} 
                                        inputLabel="Building Permit No"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssue}  
                                        inputLabel="Date Issue"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.occupancyPermitNo}  
                                        inputLabel="Occupancy Permit No."
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued} 
                                        inputLabel="Date Issued "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.latestFSICIssuedControlNo} 
                                        inputLabel="Latest FSIC Issued Control No. "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued2} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.fCFee} 
                                        inputLabel="FC Fee"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.certificateOfFireDrill} 
                                        inputLabel="Certificate of Fire Drill "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued3}
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.fCFee2}
                                        inputLabel="FC Fee"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.latestNoticeToCorrectViolationsControlNo} 
                                        inputLabel="Latest Notice to Correct Violations Control No. "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued4}  
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.nameOfFireInsuranceCoOrCoInsurer} 
                                        inputLabel="Name of Fire Insurance Co/Co-Insurer"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.policyNo}  
                                        inputLabel="Policy No"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued5} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.latestMayorsOrBusPermit}  
                                        inputLabel="Latest Mayor's/Bus. Permit "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"30%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued6} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"50%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.municipalLicenseNo} 
                                        inputLabel="Municipal License No"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"30%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued7} 
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.LatestCertificateofElectricalInspectionNo} 
                                        inputLabel="Latest Certificate of Electrical Inspection No. "
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.dateIssued8}  
                                        inputLabel="Date Issued"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

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
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={generalInformation && generalInformation.otherInformation}  
                                        inputLabel="Other Information"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    
                                    
                                </View>
                                
                            </View>

                            {/* II.BUILDING CONSTRUCTION */}
                             <View
                            style={{
                                marginTop:"10px"
                            }}
                            >
                            <Text
                                     style={[styles.noMarginTextHeading,{marginTop:"5px"}]}
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
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.beams}  
                                        inputLabel="Beams"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.columns}
                                        inputLabel="Columns"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.flooring} 
                                        inputLabel="Flooring"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.exteriorWalls}  
                                        inputLabel="Exterior Walls"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.corridorWalls}  
                                        inputLabel="Corridor Walls"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.roomPartitions} 
                                        inputLabel="Room Partitions"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.mainStair}  
                                        inputLabel="Main Stair"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.windows} 
                                        inputLabel="Windows"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.ceiling}  
                                        inputLabel="Ceiling"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    
                                    
                                </View>

                                <View
                                    style={{
                                    display:"flex",
                                    flexDirection:"row"
                                    }}
                                >
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.mainDoor} 
                                        inputLabel="Main Door"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%",marginRight:"5px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.trusses} 
                                        inputLabel="Trusses"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={buildingConstruction && buildingConstruction.roof} 
                                        inputLabel="Roof"
                                        // inputSuffix="sqm"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    
                                    
                                </View>    
                            </View> 

                            {/* III. SECTIONAL OCCUPANCY (Note: Indicate specific usage of each floor, section or rooms) */}
                             <View
                            style={{
                                marginTop:"10px"
                            }}
                            >
                                <Text
                                     style={[styles.noMarginTextHeading,{marginTop:"5px"}]}
                                    >
                                    III. SECTIONAL OCCUPANCY (Note: Indicate specific usage of each floor, section or rooms)
                                    </Text>
                                {
                                   sectionalOccupancy.sectionalOccupancy !== "" ? 

                                   <TextAreaPdf
                                   textAreaPdfStyle={{}}
                                   inputContentStyle={{}}
                                   characterLimit={350}
                                   inputContent={sectionalOccupancy && sectionalOccupancy.sectionalOccupancy}
                                   />
                                  :
                                  <View>
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

                            {/* IV. CLASSIFICATION*/}
                            <View
                            style={{
                                marginTop:"10px"
                            }}
                            >
                                <Text
                                     style={[styles.noMarginTextHeading,{marginTop:"5px"}]}
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
                                        inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={classification && classification.occupantLoad} 
                                        inputLabel="Occupant Load:"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"100%",marginRight:"10px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={classification && classification.egresscapacity}  
                                        inputLabel="Egress capacity"
                                        // inputSuffix="(123)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}

                                    />
                                </View>
                                <Text
                                    
                                    >
                                    (requirement: 0.65 sq.m. per person for concentrated use without fixed seat; 1.4 sq.m. per person for less concentrated use and 0.28 sq.m.  per person for standing room or waiting space)
                                    </Text>
                                    <View 
                                    style={styles.rowItem}
                                    >
                                    <ChoicesCheckBox
                                        choicesLabel="Any renovations:"
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                        {   
                                            label:"Yes",
                                            checked:classification && classification.anyRenovations.yes
                                        },
                                        {
                                            label:"No",
                                            checked:classification && classification.anyRenovations.no
                                        },
                                        ]}
                                />
                                <ChoicesCheckBox
                                choicesLabel="Windowless:"
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {
                                    label:"Yes",
                                    checked:classification && classification.windowless.yes
                                    },
                                    {
                                    label:"No",
                                    checked:classification && classification.windowless.no
                                    },
                                ]}
                            />

                                    </View>
                                

                            </View> 

                            {/* V. EXIT DETAILS */}
                             <View
                                style={{
                                marginTop:"10px"
                                }}
                            >
                                    <Text
                                     style={[styles.noMarginTextHeading,{marginTop:"5px"}]}
                                    >
                                    V. EXIT DETAILS
                                    </Text>
                                    <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"10px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={exitDetails && exitDetails.capacityOfHorizontalExit} 
                                    inputLabel="Capacity of Horizontal Exit (Corridor Hallway):"
                                    inputSuffix="(Requirement:100 persons per unit of exit width per min)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />

                                    <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={exitDetails && exitDetails.capacityOfExitStair}
                                    inputLabel="Capacity of Exit Stair:"
                                    inputSuffix="(Requirement:75 persons per unit of exit width per min)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />

                                    <View
                                    style={{
                                        display:"flex",
                                        flexDirection:"row"
                                    }}
                                    >
                                        <InputRow 
                                        inputRowViewStyle={{width:"70%"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={exitDetails && exitDetails.noOfExits}
                                        inputLabel="No. of Exits"
                                        inputSuffix=""
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                        />
                                        <ChoicesCheckBox
                                        choicesLabel="Remote"
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                        {
                                            label:"Yes",
                                            checked:exitDetails && exitDetails.remote.yes
                                        },
                                        {
                                            label:"No",
                                            checked:exitDetails && exitDetails.remote.no
                                        },
                                        ]}
                                />
                                    </View>

                                    <Text>
                                    Minimum Requirement: No. of Exits: Class A-at least 4 separate; Class B –at least 3; Class C-at least 2
                                    </Text>

                                    <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={exitDetails && exitDetails.locationOfExit} 
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