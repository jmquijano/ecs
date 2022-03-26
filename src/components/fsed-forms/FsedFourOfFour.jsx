import React from 'react'
import {  Text, View, Font,StyleSheet } from '@react-pdf/renderer';
import {styles,NoLabelInput,InputRow,InputColumn,RegularCheckBox,TextAreaPdf,ChoicesCheckBox,DoubleInputRow} from '../pdf'

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

const FsedFourOfFour = ({pdfValue}) => {
    const {buildingServiceEquipment,hazardousArea,operatingFeatures,defectsAndDeficienciesNotedDuringInspection,recommendations,postludes} = pdfValue
    const {mechanicalSystem,otherBuildingServiceSystems} = buildingServiceEquipment
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

                {/* E. Mechanical System */}
                <Text style={{fontWeight:"bold",textDecoration:"underline"}}>E. Mechanical System </Text>

                <View style={styles.rowItem}>
                                   
                                   <ChoicesCheckBox
                                       choicesLabel={"Is there any mechanical hazard "}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:mechanicalSystem && mechanicalSystem.isThereAnyMechanicalHazard.yes
                                           },
                                           {
                                               label:"No",
                                               checked:mechanicalSystem && mechanicalSystem.isThereAnyMechanicalHazard.no
                                           },
                                       ]}
                                   /> 
                                   
                                   <InputRow 
                                       inputRowViewStyle={{width:"50%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={mechanicalSystem && mechanicalSystem.specifyLocation }  
                                       inputLabel="Specify location "
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   
                </View>

                <View style={styles.rowItem}>
                        <InputRow 
                            inputRowViewStyle={{width:"100%"}}
                            // inputRowLabelStyle={{fontSize:"11px"}}
                            inputRowStyle={styles.inputRowStyle} 
                            inputRowContentStyle={styles.inputRowContentStyle}
                            inputContent={mechanicalSystem && mechanicalSystem.noOfElevatorsProvided }  
                            inputLabel="No. of elevators provided"
                            // inputSuffix="gallons"
                            inputRowSuffixStyle={styles.inputRowSuffixStyle}
                        />             
                </View>

                <View style={styles.rowItem}>
                                   
                                   <ChoicesCheckBox
                                       choicesLabel={"Fireman's elevator provided"}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:mechanicalSystem && mechanicalSystem.firemansElevatorProvided.yes
                                           },
                                           {
                                               label:"No",
                                               checked:mechanicalSystem && mechanicalSystem.firemansElevatorProvided.no
                                           },
                                       ]}
                                   /> 
                                   
                                   <ChoicesCheckBox
                                       choicesLabel={"Fireman's key/switch provided "}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:mechanicalSystem && mechanicalSystem.firemansKeyAndSwitchProvided.yes
                                           },
                                           {
                                               label:"No",
                                               checked:mechanicalSystem && mechanicalSystem.firemansKeyAndSwitchProvided.no
                                           },
                                       ]}
                                   /> 
                                   
                </View>

                {/* F.Other Building Service Systems*/}
                <Text style={{fontWeight:"bold",textDecoration:"underline"}}>F.Other Building Service Systems</Text>
                
                <View style={styles.rowItem}>
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Water Treatment Facility'}
                                checked={otherBuildingServiceSystems && otherBuildingServiceSystems.waterTreatmentFacility}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"300px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Waste Water/Sewage Treatment Facility'}
                                checked={otherBuildingServiceSystems && otherBuildingServiceSystems.wasteWaterAndSewageTreatmentFacility}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"300px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />                             
                                   
                </View>

                {/* IX. HAZARDOUS AREA*/}
                <Text style={[styles.numberedHeading,{marginTop:"10px"}]}>IX. HAZARDOUS AREA</Text>

                <View style={styles.rowItem}>
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Kitchen'}
                                checked={hazardousArea && hazardousArea.kitchen}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"150px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Laundry'}
                                checked={hazardousArea && hazardousArea.laundry}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"150px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Windowless Basement'}
                                checked={hazardousArea && hazardousArea.windowlessBasement}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"300px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Storage Room'}
                                checked={hazardousArea && hazardousArea.storageRoom}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"200px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            /> 
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Others'}
                                checked={hazardousArea && hazardousArea.other.checked}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"100px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            /> 
                            <NoLabelInput 
                                inputStyle={{
                                width:"50%",
                                height:"12px"
                                }}
                                inputContent={hazardousArea && hazardousArea.other.value}
                                inputContentStyle={{fontSize:"8px"}}
                            />                                               
                </View>

                <View style={styles.rowItem}>
                                   
                                   <ChoicesCheckBox
                                       choicesLabel={"Separation Fire Rated "}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:hazardousArea && hazardousArea.separationFireRated.yes
                                           },
                                           {
                                               label:"No",
                                               checked:hazardousArea && hazardousArea.separationFireRated.no
                                           },
                                       ]}
                                   /> 
                                   
                                   <InputRow 
                                       inputRowViewStyle={{width:"70%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.typeOfFireProtectionProvided }  
                                       inputLabel="Type of Fire Protection provided"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   
                </View>

                <View style={styles.rowItem}>
                                   
                                    <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.noOfUnits }  
                                       inputLabel="No. of Units"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.capacity }  
                                       inputLabel="Capacity"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   <ChoicesCheckBox
                                       choicesLabel={"Accessible"}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"33%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:hazardousArea && hazardousArea.accessible.yes
                                           },
                                           {
                                               label:"No",
                                               checked:hazardousArea && hazardousArea.accessible.no
                                           },
                                       ]}
                                   /> 
                                   
                                   
                                   
                </View>

                <View style={styles.rowItem}>
                                   
                                    <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.fuelUsed }  
                                       inputLabel="Fuel Used"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.whereStored }  
                                       inputLabel="Where Stored"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.coveredByBFPPermit }  
                                       inputLabel="Covered by BFP Permit"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />          
                </View>

                <View style={styles.rowItem}>
                                   
                                    <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.chimneyMadeOf }  
                                       inputLabel="Chimney: Made of "
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.sparkArrester }  
                                       inputLabel="Spark Arrester"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                   <InputRow 
                                       inputRowViewStyle={{width:"30%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.smokeHood }  
                                       inputLabel="Smoke Hood"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />          
                </View>

                <View style={styles.rowItem}>
                                   
                                   <ChoicesCheckBox
                                       choicesLabel={"Presence of hazardous materials "}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:hazardousArea && hazardousArea.presenceOfHazardousMaterials.yes
                                           },
                                           {
                                               label:"No",
                                               checked:hazardousArea && hazardousArea.presenceOfHazardousMaterials.no
                                           },
                                       ]}
                                   /> 
                                   
                                   <ChoicesCheckBox
                                       choicesLabel={"Properly stored and handled"}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:hazardousArea && hazardousArea.properlyStoredAndHandled.yes
                                           },
                                           {
                                               label:"No",
                                               checked:hazardousArea && hazardousArea.properlyStoredAndHandled.no
                                           },
                                       ]}
                                   /> 
                                   
                </View>

                <View style={[styles.rowItem,{justifyContent:"space-around",marginTop:"10px"}]}> 
                        <Text>Kinds</Text>
                        <Text>Container</Text>
                        <Text>Volume</Text>
                        <Text>Location</Text>
                </View>

                <View style={[styles.rowItem]}> 
                                    <InputRow 
                                       inputRowViewStyle={{width:"20%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.kinds.one }  
                                       inputLabel="1."
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.container.one}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.volume.one}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.location.one}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                </View>

                <View style={[styles.rowItem]}> 
                                    <InputRow 
                                       inputRowViewStyle={{width:"20%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.kinds.two }  
                                       inputLabel="2."
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.container.two}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.volume.two}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.location.two}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                </View>

                <View style={[styles.rowItem]}> 
                                    <InputRow 
                                       inputRowViewStyle={{width:"20%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.kinds.three }  
                                       inputLabel="2."
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.container.three}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.volume.three}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                                    <NoLabelInput 
                                        inputStyle={{
                                        width:"20%",
                                        height:"12px"
                                        }}
                                        inputContent={hazardousArea && hazardousArea.location.three}
                                        inputContentStyle={{fontSize:"9px"}}
                                    />     
                </View>

                <View style={[styles.rowItem]}> 
                                    <InputRow 
                                       inputRowViewStyle={{width:"100%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.storagePermitForFlammablesAndCombustiblesCoveredByBFPPermit }  
                                       inputLabel="Storage Permit for Flammables/Combustibles Covered by BFP Permit "
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />                   
                </View>

                <View style={[styles.rowItem]}> 
                                    <InputRow 
                                       inputRowViewStyle={{width:"100%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={hazardousArea && hazardousArea.clearanceOfStocksFromCeiling }  
                                       inputLabel="Clearance of Stocks From Ceiling "
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />                   
                </View>

                <Text style={styles.italicText}>Minimum Ceiling Clearance: 1.0m for Flammable Liquids and 0.5m for Combustible Materials</Text>

                {/* X. OPERATING FEATURES*/}
                <Text style={[styles.numberedHeading,{marginTop:"10px"}]}>X. OPERATING FEATURES</Text>

                <Text >Fire Safety Program (Under the supervision of the Chief Local Fire Service)</Text>

                <View style={[styles.rowItem,{flexDirection:"column",paddingLeft:"30px"}]}>
                                   <ChoicesCheckBox
                                       choicesLabel={"Fire Brigade Organization"}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:operatingFeatures && operatingFeatures.fireBrigadeOrganization.yes
                                           },
                                           {
                                               label:"No",
                                               checked:operatingFeatures && operatingFeatures.fireBrigadeOrganization.no
                                           },
                                       ]}
                                   />
                                   <ChoicesCheckBox
                                       choicesLabel={"Fire Safety Seminar"}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:operatingFeatures && operatingFeatures.fireSafetySeminar.yes
                                           },
                                           {
                                               label:"No",
                                               checked:operatingFeatures && operatingFeatures.fireSafetySeminar.no
                                           },
                                       ]}
                                   />
                                   <ChoicesCheckBox
                                       choicesLabel={"Employees trained in emergency procedures"}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:operatingFeatures && operatingFeatures.employeesTrainedInEmergencyProcedures.yes
                                           },
                                           {
                                               label:"No",
                                               checked:operatingFeatures && operatingFeatures.employeesTrainedInEmergencyProcedures.no
                                           },
                                       ]}
                                   />
                                   <ChoicesCheckBox
                                       choicesLabel={"Fire/Evacuation Drill"}
                                       choicesLabelFirst={true}
                                       checkBoxLabelFirst={false}
                                       choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                                       choicesCheckBoxStyle={styles.choicesStyle}
                                       checkBoxLabelStyle={styles.choicesStyle}
                                       choices={[
                                           {   
                                               label:"Yes",
                                               checked:operatingFeatures && operatingFeatures.fireAndEvacuationDrill.yes
                                           },
                                           {
                                               label:"No",
                                               checked:operatingFeatures && operatingFeatures.fireAndEvacuationDrill.no
                                           },
                                       ]}
                                   /> 
                </View>

                <View style={[styles.rowItem,{paddingLeft:"30px",width:"85%"}]}>
                                  <InputRow 
                                       inputRowViewStyle={{width:"45%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={operatingFeatures && operatingFeatures.first }  
                                       inputLabel="1st"
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />   
                                    <InputRow 
                                       inputRowViewStyle={{width:"45%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={operatingFeatures && operatingFeatures.second }  
                                       inputLabel="2nd "
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   />              
                </View>

                {/*XI. DEFECTS / DEFICIENCIES NOTED DURING INSPECTION (Attached pictures, sketch and others)*/}
                <Text style={[styles.numberedHeading,{marginTop:"10px"}]}>XI. DEFECTS / DEFICIENCIES NOTED DURING INSPECTION (Attached pictures, sketch and others)</Text>
                {
                    defectsAndDeficienciesNotedDuringInspection.value !== "" ? 

                                   <TextAreaPdf
                                        textAreaPdfStyle={{}}
                                        inputContentStyle={{}}
                                        characterLimit={350}
                                        inputContent={defectsAndDeficienciesNotedDuringInspection && defectsAndDeficienciesNotedDuringInspection.value}
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

                {/* XII. RECOMMENDATIONS */}
                <Text style={[styles.numberedHeading,{marginTop:"10px"}]}>XII. RECOMMENDATIONS</Text>
                {
                    recommendations.value !== "" ? 

                                   <TextAreaPdf
                                        textAreaPdfStyle={{}}
                                        inputContentStyle={{}}
                                        characterLimit={350}
                                        inputContent={recommendations && recommendations.value}
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

                {/* ACKNOWLEDGED BY: */}
                <Text style={[styles.numberedHeading,{marginTop:"10px"}]}>ACKNOWLEDGED BY:</Text>

                <View style={[styles.rowItem,{marginTop:"15px"}]}>
                                    <InputColumn
                                        inputColumnViewStyle={{width:"50%"}}
                                        inputColumnLabelStyle={styles.inputColumnLabelStyle}
                                        inputColumnStyle={{ height:"13px" }} 
                                        inputColumnContentStyle={{fontSize:"10px",fontFamily:"Open Sans"}}
                                        inputContent={postludes && postludes.signatureOverPrintedNameOfOwnerOrRepresentative} 
                                        inputLabel="Signature Over Printed Name of Owner/Representative"
                                    />
                                    <InputColumn
                                        inputColumnViewStyle={{width:"40%"}}
                                        inputColumnLabelStyle={styles.inputColumnLabelStyle}
                                        inputColumnStyle={{ height:"13px" }} 
                                        inputColumnContentStyle={{fontSize:"10px",fontFamily:"Open Sans"}}
                                        inputContent={postludes && postludes.fireSafetyInspectors} 
                                        inputLabel="Fire Safety Inspector/s"
                                    />
                </View>

                <View style={[styles.rowItem,{marginTop:"15px"}]}>
                                <InputRow 
                                       inputRowViewStyle={{width:"40%"}}
                                       // inputRowLabelStyle={{fontSize:"11px"}}
                                       inputRowStyle={styles.inputRowStyle} 
                                       inputRowContentStyle={styles.inputRowContentStyle}
                                       inputContent={postludes && postludes.dateAndTime }  
                                       inputLabel="Date & Time "
                                       // inputSuffix="gallons"
                                       inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                   /> 
                                    <InputColumn
                                        inputColumnViewStyle={{width:"40%"}}
                                        inputColumnLabelStyle={styles.inputColumnLabelStyle}
                                        inputColumnStyle={{ height:"13px" }} 
                                        inputColumnContentStyle={{fontSize:"10px",fontFamily:"Open Sans"}}
                                        inputContent={postludes && postludes.teamLeader} 
                                        inputLabel="Team Leader"
                                    />
                </View>

                <View style={[styles.rowItem,{flexDirection:"column",marginLeft:"290px",marginTop:"30px"}]}>
                                    <Text style={[styles.numberedHeading,{marginVertical:"10px"}]}>RECOMMEND ISSUANCE OF FSIC/NTC/NTCV:</Text>
                                    
                                    <InputColumn
                                        inputColumnViewStyle={{width:"40%"}}
                                        inputColumnLabelStyle={styles.inputColumnLabelStyle}
                                        inputColumnStyle={{ height:"13px" }} 
                                        inputColumnContentStyle={{fontSize:"10px",fontFamily:"Open Sans"}}
                                        inputContent={postludes && postludes.chiefFireSafetyEnforcementSection} 
                                        inputLabel="CHIEF, FIRE SAFETY ENFORCEMENT SECTION"
                                    />

                                    <Text style={[styles.numberedHeading,{marginVertical:"10px"}]}>APPROVED / DISAPPROVED:</Text>
                                    
                                    <InputColumn
                                        inputColumnViewStyle={{width:"40%"}}
                                        inputColumnLabelStyle={{marginHorizontal:"auto",fontFamily:"Open Sans",fontWeight:"bold"}}
                                        inputColumnStyle={{ height:"13px" }} 
                                        inputColumnContentStyle={{fontSize:"10px",fontFamily:"Open Sans"}}
                                        inputContent={postludes && postludes.cityMunicipalFireMarshal} 
                                        inputLabel="CITY / MUNICIPAL FIRE MARSHAL"
                                    />
                </View>
               
                <Text style={{color:"red",textAlign:"center",marginTop:"35px",fontFamily:"Open Sans",fontWeight:"bold"}}>PAALALA: “MAHIGPIT NA IPINAGBABAWAL NG PAMUNUAN NG BUREAU OF FIRE PROTECTION SA MGA KAWANI NITO ANG MAGBENTA O MAGREKOMENDA NG ANUMANG BRAND NG FIRE EXTINGUISHER”</Text>
                <Text style={{color:"blue",fontSize:"15px",textAlign:"center",fontFamily:"Open Sans",fontWeight:"bold"}}>“FIRE SAFETY IS OUR MAIN CONCERN”</Text> 

                <View style={[styles.rowItem,{flexDirection:"column",marginTop:"10px",fontSize:"5px"}]}>
                           <Text>DISTRIBUTION:</Text> 
                           <Text>Original  (Applicant/Owner’s Copy)</Text> 
                           <Text>Duplicate (BO or BPLO, as the case may be) </Text> 
                           <Text>Triplicate (BFP Copy) </Text>     
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
            >BFP-QSF-FSED-027 Rev. 01 (07.05.19) Page 4 of 4</Text>
    </PageWrapper>
  )
}

export default FsedFourOfFour