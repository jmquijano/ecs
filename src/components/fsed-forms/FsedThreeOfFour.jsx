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

const FsedThreeOfFour = ({pdfValue}) => {
  const {lightingsAndSigns,featuresOfFIreProtection,buildingServiceEquipment} = pdfValue
  const {exitsSigns,warningAndSafetySigns} = lightingsAndSigns
  const {protectionOfVerticalOpenings,alarmSystem,standpipeSystem,firstAidFireProtectionEquipment,automaticFireSuppressionSystem,firewall} = featuresOfFIreProtection
  const {boiler,genetorSet,refuseGarbageHandlingFacilty,electricalSystem} = buildingServiceEquipment
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

                    {/* B. EXIT SIGNS  */}
                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Directional Exit Signs"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:exitsSigns && exitsSigns.directionalExitSigns.yes
                                    },
                                    {
                                        label:"No",
                                        checked:exitsSigns && exitsSigns.directionalExitSigns.no
                                    },
                                ]}
                                /> 
                                <InputRow 
                                    inputRowViewStyle={{width:"70%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={exitsSigns && exitsSigns.location2 }  
                                    inputLabel="Location"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                              
                    </View>

                    {/* C. WARNING/SAFETY SIGNS */}
                    <Text style={styles.textHeading}>C. WARNING/SAFETY SIGNS</Text>
                    <View style={styles.rowItem}>
                          <RegularCheckBox 
                                regularCheckBoxLabel={'”No Smoking”'}
                                checked={warningAndSafetySigns && warningAndSafetySigns.noSmoking}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"300px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />
                            <RegularCheckBox 
                                regularCheckBoxLabel={'“Dead End”'}
                                checked={warningAndSafetySigns && warningAndSafetySigns.deadEnd}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"300px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Elevator Sign'}
                                checked={warningAndSafetySigns && warningAndSafetySigns.elavatorSign}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"300px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />
                            <RegularCheckBox 
                                regularCheckBoxLabel={'Keep Door Closed'}
                                checked={warningAndSafetySigns && warningAndSafetySigns.keepDoorClosed}
                                checkBoxFirst={true}
                                regularCheckBoxStyle={{width:"300px"}}
                                checkBoxStyle={{marginHorizontal:"2px"}}
                                // checkBoxLabelStyle={{
                                //     fontFamily:"Open Sans",     
                                // }}
                            />      
                    </View>

                    <View style={styles.rowItem}>
                          <InputRow 
                                inputRowViewStyle={{width:"100%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={exitsSigns && exitsSigns.otherSpecify }  
                                inputLabel="Other, specify "
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View>

                    {/* VII. FEATURES OF FIRE PROTECTION */}
                    <Text style={styles.numberedHeading}>VII. FEATURES OF FIRE PROTECTION</Text>

                    {/* A. PROTECTION OF VERTICAL OPENINGS */}
                    <Text style={styles.textHeading}>A. PROTECTION OF VERTICAL OPENINGS</Text>
                    
                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Properly protected"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"38%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.properlyProtected.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.properlyProtected.no
                                    },
                                ]}
                            /> 
                            <ChoicesCheckBox
                                choicesLabel={"Atrium"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"30%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.atrium.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.atrium.no
                                    },
                                ]}
                            /> 
                            <ChoicesCheckBox
                                choicesLabel={"Fire Doors good condition"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.fireDoorsGoodCondition.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.fireDoorsGoodCondition.no
                                    },
                                ]}
                            />   
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Elevator opening protected"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.elevatorOpeningProtected.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.elevatorOpeningProtected.no
                                    },
                                ]}
                            /> 
                            <ChoicesCheckBox
                                choicesLabel={"Pipe Chase opening protected"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.pipeChaseOpeningProtected.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.pipeChaseOpeningProtected.no
                                    },
                                ]}
                            /> 
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Aircon Ducts system with damper "}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.airconDuctsSystemWithDamper.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.airconDuctsSystemWithDamper.no
                                    },
                                ]}
                            /> 
                            <ChoicesCheckBox
                                choicesLabel={"Dumb Waiter opening protected "}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.dumbWaiterOpeningProtected.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.dumbWaiterOpeningProtected.no
                                    },
                                ]}
                            /> 
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Garbage Chute opening protected"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.garbageChuteOpeningProtected.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.garbageChuteOpeningProtected.no
                                    },
                                ]}
                            />   
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Between Floor & Glass Curtain opening protected"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.betweenFloorAndGlassCurtainOpeningProtected.yes
                                    },
                                    {
                                        label:"No",
                                        checked:protectionOfVerticalOpenings && protectionOfVerticalOpenings.betweenFloorAndGlassCurtainOpeningProtected.no
                                    },
                                ]}
                            />   
                    </View>

                    <View style={styles.rowItem}>
                              <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={protectionOfVerticalOpenings && protectionOfVerticalOpenings.dateLastTested }  
                                    inputLabel="Date Last Tested"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                /> 
                    </View>

                    {/*B. ALARM SYSTEM*/}
                    <Text style={styles.textHeading}>B. ALARM SYSTEM</Text>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Fire Alarm Provided "}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:alarmSystem && alarmSystem.fireAlarmProvided.yes
                                    },
                                    {
                                        label:"No",
                                        checked:alarmSystem && alarmSystem.fireAlarmProvided.no
                                    },
                                ]}
                            /> 
                            <ChoicesCheckBox
                                choicesLabel={"Type:"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"33%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:alarmSystem && alarmSystem.type.yes
                                    },
                                    {
                                        label:"No",
                                        checked:alarmSystem && alarmSystem.type.no
                                    },
                                ]}
                            /> 
                            <ChoicesCheckBox
                                choicesLabel={"Centralized"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"33%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:alarmSystem && alarmSystem.centralized.yes
                                    },
                                    {
                                        label:"No",
                                        checked:alarmSystem && alarmSystem.centralized.no
                                    },
                                ]}
                            />   
                    </View>

                    <View style={styles.rowItem}>
                              <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.locationOfCentralControl }  
                                    inputLabel="Location of Central Control"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                /> 
                    </View>

                    <View style={styles.rowItem}>
                              <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.noOfBellsPerFloor }  
                                    inputLabel="No. of Bells per Floor"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                /> 
                                <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.location }  
                                    inputLabel="Location"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                    </View>

                    <View style={styles.rowItem}>
                               <ChoicesCheckBox
                                    choicesLabel={"Coverage:"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Budding",
                                            checked:alarmSystem && alarmSystem.coverage.budding
                                        },
                                        {
                                            label:"Air Handling Unit",
                                            checked:alarmSystem && alarmSystem.coverage.airHandlingUnit
                                        },
                                        {
                                          label:"Portion",
                                          checked:alarmSystem && alarmSystem.coverage.portion
                                      },
                                    ]}
                                /> 
                              <InputRow 
                                    inputRowViewStyle={{width:"20%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.specify }  
                                    inputLabel="Specify"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                /> 
                                <ChoicesCheckBox
                                    choicesLabel={"Monitored"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"25%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:alarmSystem && alarmSystem.monitored.yes
                                        },
                                        {
                                            label:"No",
                                            checked:alarmSystem && alarmSystem.monitored.no
                                        },
                                    ]}
                                /> 
                    </View>

                    <View style={styles.rowItem}>
                               <ChoicesCheckBox
                                    choicesLabel={"Type of Initiation Device"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"95%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Smoke",
                                            checked:alarmSystem && alarmSystem.typeOfInitiationDevice.smoke
                                        },
                                        {
                                            label:"Heat",
                                            checked:alarmSystem && alarmSystem.typeOfInitiationDevice.heat
                                        },
                                        {
                                          label:"Manual ",
                                          checked:alarmSystem && alarmSystem.typeOfInitiationDevice.manual
                                        },
                                        {
                                          label:"Water Flow",
                                          checked:alarmSystem && alarmSystem.typeOfInitiationDevice.waterflow
                                        },
                                        {
                                          label:"Others",
                                          checked:alarmSystem && alarmSystem.typeOfInitiationDevice.other.checked
                                        },
                                    ]}
                                /> 

                                <NoLabelInput 
                                    inputStyle={{
                                    width:"30%",
                                    height:"12px"
                                    }}
                                    inputContent={alarmSystem && alarmSystem.typeOfInitiationDevice.value}
                                    inputContentStyle={{fontSize:"8px"}}
                                /> 
                              
                    </View>

                    <View style={styles.rowItem}>
                              <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.noOfPullStationsPerFloor }  
                                    inputLabel="No. of Pull Stations per Floor"
                                    inputSuffix="Max. Horizontal Distance Bet. Pull Stations: 61.0 m"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />     
                    </View>

                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"Smoke Detectors"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"30%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:alarmSystem && alarmSystem.smokeDetectors.yes
                                        },
                                        {
                                            label:"No",
                                            checked:alarmSystem && alarmSystem.smokeDetectors.no
                                        },
                                        
                                    ]}
                                /> 
                              <InputRow 
                                    inputRowViewStyle={{width:"33%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.noOfUnitsPerRoom }  
                                    inputLabel="No. of Units per Room"
                                    // inputSuffix="Max. Horizontal Distance Bet. Pull Stations: 61.0 m"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />  
                                <ChoicesCheckBox
                                    choicesLabel={"Integrated "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"33%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:alarmSystem && alarmSystem.integrated.yes
                                        },
                                        {
                                            label:"No",
                                            checked:alarmSystem && alarmSystem.integrated.no
                                        },
                                        
                                    ]}
                                />    
                    </View>

                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"Heat Detectors"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"30%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:alarmSystem && alarmSystem.heatDetectors.yes
                                        },
                                        {
                                            label:"No",
                                            checked:alarmSystem && alarmSystem.heatDetectors.no
                                        },
                                        
                                    ]}
                                /> 
                              <InputRow 
                                    inputRowViewStyle={{width:"33%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.noOfUnitsPerRoom2 }  
                                    inputLabel="No. of Units per Room"
                                    // inputSuffix="Max. Horizontal Distance Bet. Pull Stations: 61.0 m"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />  
                                <ChoicesCheckBox
                                    choicesLabel={"Integrated"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"33%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:alarmSystem && alarmSystem.integrated2.yes
                                        },
                                        {
                                            label:"No",
                                            checked:alarmSystem && alarmSystem.integrated2.no
                                        },
                                        
                                    ]}
                                />    
                    </View>

                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"Power Source of Detectors "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"45%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"AC/DC ",
                                            checked:alarmSystem && alarmSystem.powerSourceOfDetectors.acAndDc
                                        },
                                        {
                                            label:"Others",
                                            checked:alarmSystem && alarmSystem.powerSourceOfDetectors.other.checked
                                        },
                                        
                                    ]}
                                />
                                <NoLabelInput 
                                    inputStyle={{
                                    width:"25%",
                                    height:"12px"
                                    }}
                                    inputContent={alarmSystem && alarmSystem.powerSourceOfDetectors.other.value}
                                    inputContentStyle={{fontSize:"8px"}}
                                />  
                              <InputRow 
                                    inputRowViewStyle={{width:"30%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.totalDetectorsPerFloor }  
                                    inputLabel="Total Detectors per Floor"
                                    // inputSuffix="Max. Horizontal Distance Bet. Pull Stations: 61.0 m"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />  
                                  
                    </View>

                    <View style={styles.rowItem}>
                               
                              <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={alarmSystem && alarmSystem.dateLastTested }  
                                    inputLabel="Date Last Tested"
                                    // inputSuffix="Max. Horizontal Distance Bet. Pull Stations: 61.0 m"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />  
                                  
                    </View>

                    {/*C. STANDPIPE SYSTEM*/}
                    <Text style={styles.textHeading}>C. STANDPIPE SYSTEM</Text>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Directional Exit Signs"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"33%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Wet",
                                        checked:standpipeSystem && standpipeSystem.type.wet
                                    },
                                    {
                                        label:"Dry",
                                        checked:standpipeSystem && standpipeSystem.type.dry
                                    },
                                ]}
                                /> 
                                <InputRow 
                                    inputRowViewStyle={{width:"30%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.tankCapacity }  
                                    inputLabel="Tank Capacity"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <InputRow 
                                    inputRowViewStyle={{width:"33%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.location }  
                                    inputLabel="Location"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                              
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Siamese Intake Provided "}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:standpipeSystem && standpipeSystem.siameseIntakeProvided.yes
                                    },
                                    {
                                        label:"No",
                                        checked:standpipeSystem && standpipeSystem.siameseIntakeProvided.no
                                    },
                                ]}
                                /> 
                                <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.location2 }  
                                    inputLabel="Location"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                
                              
                    </View>

                    <View style={styles.rowItem}>
                                <InputRow 
                                    inputRowViewStyle={{width:"30%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.size }  
                                    inputLabel="Size "
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <InputRow 
                                    inputRowViewStyle={{width:"30%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.noOfUnits }  
                                    inputLabel="No. of Units "
                                    // inputSuffix="(Requirement: 91 cm)"
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
                                            checked:standpipeSystem && standpipeSystem.accessible.yes
                                        },
                                        {
                                            label:"No",
                                            checked:standpipeSystem && standpipeSystem.accessible.no
                                        },
                                    ]}
                                /> 
                              
                    </View>

                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"Fire Hose Cabinets Provided "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:standpipeSystem && standpipeSystem.fireHoseCabinetsProvided.yes
                                        },
                                        {
                                            label:"No",
                                            checked:standpipeSystem && standpipeSystem.fireHoseCabinetsProvided.no
                                        },
                                    ]}
                                /> 
                                 <ChoicesCheckBox
                                    choicesLabel={"With Complete accessories"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:standpipeSystem && standpipeSystem.withCompleteAccessories.yes
                                        },
                                        {
                                            label:"No",
                                            checked:standpipeSystem && standpipeSystem.withCompleteAccessories.no
                                        },
                                    ]}
                                /> 
                              
                    </View>

                    <View style={styles.rowItem}>
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.location3 }  
                                    inputLabel="Location"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />   
                    </View>

                    <View style={styles.rowItem}>
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.noOfUnitsPerFloor }  
                                    inputLabel="No. of Units per Floor"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.sizeOfHose }  
                                    inputLabel="Size of Hose"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.lengthOfHose }  
                                    inputLabel="Length of Hose"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />   
                    </View>

                    <Text style={styles.italicText}>(Note: Min Required Size of Riser & Distribution Pipe: 2 1/2 inch and 1 1/2 inch in diameter, respectively)</Text>

                    <View style={styles.rowItem}>
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.typeOfNozzle }  
                                    inputLabel="Type of Nozzle"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.dateLastTested }  
                                    inputLabel="Date Last Tested"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                    </View>

                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"Fire Lane Provided:"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:standpipeSystem && standpipeSystem.fireLaneProvided.yes
                                        },
                                        {
                                            label:"No",
                                            checked:standpipeSystem && standpipeSystem.fireLaneProvided.no
                                        },
                                    ]}
                                /> 
                                <InputRow 
                                    inputRowViewStyle={{width:"70%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={standpipeSystem && standpipeSystem.locationOfNearestFireHydrant }  
                                    inputLabel="Location of nearest Fire Hydrant"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                    </View>

                    {/*D. FIRST AID FIRE PROTECTION EQUIPMENT (PORTABLE FIRE EXTINGUISHERS)*/}
                    <Text style={styles.textHeading}>D. FIRST AID FIRE PROTECTION EQUIPMENT (PORTABLE FIRE EXTINGUISHERS)</Text>
                    
                    <View style={styles.rowItem}>
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.type }  
                                    inputLabel="Type"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.capacity }  
                                    inputLabel="Capacity "
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.noOfUnits }  
                                    inputLabel="No. of Units"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />   
                    </View>

                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"With PS Mark"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.withPSMark.yes
                                        },
                                        {
                                            label:"No",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.withPSMark.no
                                        },
                                    ]}
                                /> 
                                 <ChoicesCheckBox
                                    choicesLabel={"With ISO Mark"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.withISOMark.yes
                                        },
                                        {
                                            label:"No",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.withISOMark.no
                                        },
                                    ]}
                                /> 
                              
                    </View>

                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"Properly Maintained "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"33%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.properlyMaintained.yes
                                        },
                                        {
                                            label:"No",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.properlyMaintained.no
                                        },
                                    ]}
                                /> 
                                 <ChoicesCheckBox
                                    choicesLabel={"Conspicuously Located "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"38%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.conspicuouslyLocated.yes
                                        },
                                        {
                                            label:"No",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.conspicuouslyLocated.no
                                        },
                                    ]}
                                /> 
                                 <ChoicesCheckBox
                                    choicesLabel={"Accessible"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"28%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.accessible.yes
                                        },
                                        {
                                            label:"No",
                                            checked:firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.accessible.no
                                        },
                                    ]}
                                /> 
                              
                    </View>

                    <View style={styles.rowItem}>
                               
                                <InputRow 
                                    inputRowViewStyle={{width:"100%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={firstAidFireProtectionEquipment && firstAidFireProtectionEquipment.otherTypesProvidedIfAny }  
                                    inputLabel="Other Types Provided, if any"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />   
                    </View>

                    {/*E. AUTOMATIC FIRE SUPPRESSION SYSTEM (SPRINKLER SYSTEM)*/}
                    <Text style={styles.textHeading}>E. AUTOMATIC FIRE SUPPRESSION SYSTEM (SPRINKLER SYSTEM)</Text>

                    <View style={styles.rowItem}>
                                <InputRow 
                                    inputRowViewStyle={{width:"45%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.typeOfExtinguishingAgentUsed }  
                                    inputLabel="Type of Extinguishing Agent Used"
                                    // inputSuffix="(Requirement: 91 cm)"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                <DoubleInputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    inputRowLabelOneStyle={{}}
                                    inputOneLabel="Jockey Pump Capacity"
                                    inputRowOneStyle={styles.inputRowStyle}
                                    inputRowOneContentStyle={styles.inputRowContentStyle} 
                                    inputOneContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.jockeyPumpCapacity.hp }  
                                    inputRowLabelTwoStyle={{}}
                                    inputTwoLabel="hp"
                                    inputRowTwoStyle={{}}
                                    // inputRowTwoContentStyle={{}}
                                    inputTwoContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.jockeyPumpCapacity.gpm }  
                                    // inputRowLabelThreeStyle={{}}
                                    inputThreeLabel="GPM"
                                />
                                
                    </View>

                    <View style={styles.rowItem}>
                                
                                <DoubleInputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    inputRowLabelOneStyle={{}}
                                    inputOneLabel="Jockey Pump Capacity"
                                    inputRowOneStyle={styles.inputRowStyle}
                                    inputRowOneContentStyle={styles.inputRowContentStyle} 
                                    inputOneContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.firePumpCapacity.hp }  
                                    inputRowLabelTwoStyle={{}}
                                    inputTwoLabel="hp"
                                    inputRowTwoStyle={{}}
                                    // inputRowTwoContentStyle={{}}
                                    inputTwoContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.firePumpCapacity.gpm }  
                                    // inputRowLabelThreeStyle={{}}
                                    inputThreeLabel="GPM"
                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"45%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.tankCapacity }  
                                    inputLabel="Tank Capacity"
                                    inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                
                    </View>

                    <View style={styles.rowItem}>        
                               <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.maintainingLinePressure }  
                                    inputLabel="Maintaining Line Pressure "
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"45%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.farthestSprinklerHeadPressure }  
                                    inputLabel="Farthest Sprinkler Head Pressure"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                
                    </View>

                    <View style={styles.rowItem}>        
                               <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.riserSize }  
                                    inputLabel="Riser Size "
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"45%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.typeOfHeadsInstalled }  
                                    inputLabel="Type of Heads Installed"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                
                    </View>

                    <View style={styles.rowItem}>        
                               <InputRow 
                                    inputRowViewStyle={{width:"33%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.noOfHeadsPerFloor }  
                                    inputLabel="No. of Heads per Floor"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"33%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.total }  
                                    inputLabel="Total"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                
                                <InputRow 
                                    inputRowViewStyle={{width:"33%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.spacingOfHeads }  
                                    inputLabel="Spacing of Heads"
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
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.locationOfFireDepartmentConnection }  
                                    inputLabel="Location of Fire Department Connection "
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />

                    
                    </View>

                    <View style={styles.rowItem}>        
                               <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.dateLastTested }  
                                    inputLabel="Date Last Tested "
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.conducted }  
                                    inputLabel="Conducted"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                
                               
                    </View>

                    <View style={styles.rowItem}>        
                               <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.planSubmitted }  
                                    inputLabel="Plan Submitted"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />

                                <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={automaticFireSuppressionSystem && automaticFireSuppressionSystem.certificateOfInstallation }  
                                    inputLabel="Certificate of Installation"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                
                               
                    </View>

                    <Text style={{textAlign:"center"}}>BFP AFSS Certificate payment under Section 13 B (5) and Fund Code No. D2531--151</Text>

                     {/*F. FIREWALL*/}
                    <Text style={styles.textHeading}>F. FIREWALL</Text>
                    
                    <View style={styles.rowItem}>
                                <ChoicesCheckBox
                                    choicesLabel={"Building required with firewalls "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:firewall && firewall.buildingRequiredWithFirewalls.yes
                                        },
                                        {
                                            label:"No",
                                            checked:firewall && firewall.buildingRequiredWithFirewalls.no
                                        },
                                    ]}
                                /> 
                                 <ChoicesCheckBox
                                    choicesLabel={"Provided"}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:firewall && firewall.provided.yes
                                        },
                                        {
                                            label:"No",
                                            checked:firewall && firewall.provided.no
                                        },
                                    ]}
                                /> 
                    </View>

                    <View style={styles.rowItem}>
                                    <ChoicesCheckBox
                                        choicesLabel={"Any Opening "}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:firewall && firewall.anyOpening.yes
                                            },
                                            {
                                                label:"No",
                                                checked:firewall && firewall.anyOpening.no
                                            },
                                        ]}
                                    /> 
                                    
                    </View>

                     {/*VIII. BUILDING SERVICE EQUIPMENT*/}
                    <Text style={styles.numberedHeading}>VIII. BUILDING SERVICE EQUIPMENT</Text>


                    {/* A. Boiler  */}

                    <View style={styles.rowItem}>
                                    <Text style={{width:"9%",fontWeight:"bold",textDecoration:"underline"}}>A. Boiler </Text>
                                    <ChoicesCheckBox
                                        choicesLabel={"Provided"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:boiler && boiler.provided.yes
                                            },
                                            {
                                                label:"No",
                                                checked:boiler && boiler.provided.no
                                            },
                                        ]}
                                    /> 
                                    <InputRow 
                                    inputRowViewStyle={{width:"70%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={boiler && boiler.noOfUnitsProvided }  
                                    inputLabel="No. of Units provided"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                    
                    </View>

                    <View style={styles.rowItem}>  
                                    <ChoicesCheckBox
                                        choicesLabel={"Fuel:"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"60%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Diesel",
                                                checked:boiler && boiler.fuel.diesel
                                            },
                                            {
                                                label:"Kerosene",
                                                checked:boiler && boiler.fuel.kerosene
                                            },
                                            {
                                                label:"Coal",
                                                checked:boiler && boiler.fuel.coal
                                            },
                                            {
                                                label:"Bunker",
                                                checked:boiler && boiler.fuel.bunker
                                            },
                                            {
                                                label:"LPG",
                                                checked:boiler && boiler.fuel.lpg
                                            },
                                        ]}
                                    /> 
                                    <InputRow 
                                    inputRowViewStyle={{width:"40%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={boiler && boiler.capacity }  
                                    inputLabel="Capacity"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                    
                    </View>

                    <View style={styles.rowItem}>  
                                    <ChoicesCheckBox
                                        choicesLabel={"Container:"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Above-ground",
                                                checked:boiler && boiler.container.aboveGround
                                            },
                                            {
                                                label:"Underground",
                                                checked:boiler && boiler.container.underGround
                                            },
                                           
                                        ]}
                                    /> 
                                    <InputRow 
                                    inputRowViewStyle={{width:"50%"}}
                                    // inputRowLabelStyle={{fontSize:"11px"}}
                                    inputRowStyle={styles.inputRowStyle} 
                                    inputRowContentStyle={styles.inputRowContentStyle}
                                    inputContent={boiler && boiler.location }  
                                    inputLabel="Location"
                                    // inputSuffix="gallons"
                                    inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                />
                                    
                    </View>

                    <View style={styles.rowItem}>  
                                    <ChoicesCheckBox
                                        choicesLabel={"LPG Installation Covered with Permit"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:boiler && boiler.lpgInstallationCoveredWithPermit.yes
                                            },
                                            {
                                                label:"No",
                                                checked:boiler && boiler.lpgInstallationCoveredWithPermit.no
                                            },
                                           
                                        ]}
                                    /> 
                                    <ChoicesCheckBox
                                        choicesLabel={"Fuel with Storage Permit "}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:boiler && boiler.fuelWithStoragePermit.yes
                                            },
                                            {
                                                label:"No",
                                                checked:boiler && boiler.fuelWithStoragePermit.no
                                            },
                                           
                                        ]}
                                    /> 
                                   
                                    
                    </View>

                    {/* B. Generator Set  */}

                    <View style={styles.rowItem}>
                                    <Text style={{width:"20%",fontWeight:"bold",textDecoration:"underline"}}>B. Generator Set</Text>
                                    <ChoicesCheckBox
                                        choicesLabel={"Provided"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:genetorSet && genetorSet.provided.yes
                                            },
                                            {
                                                label:"No",
                                                checked:genetorSet && genetorSet.provided.no
                                            },
                                        ]}
                                    /> 
                                   <RegularCheckBox 
                                        regularCheckBoxLabel={'Automatic '}
                                        checked={genetorSet && genetorSet.automatic}
                                        checkBoxFirst={true}
                                        regularCheckBoxStyle={{width:"100px"}}
                                        checkBoxStyle={{marginHorizontal:"2px"}}
                                        // checkBoxLabelStyle={{
                                        //     fontFamily:"Open Sans",     
                                        // }}
                                    />
                                     <RegularCheckBox 
                                        regularCheckBoxLabel={'Manual'}
                                        checked={genetorSet && genetorSet.manual}
                                        checkBoxFirst={true}
                                        regularCheckBoxStyle={{width:"100px"}}
                                        checkBoxStyle={{marginHorizontal:"2px"}}
                                        // checkBoxLabelStyle={{
                                        //     fontFamily:"Open Sans",     
                                        // }}
                                    />

                                    <ChoicesCheckBox
                                        choicesLabel={"Fuel:"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Diesel",
                                                checked:genetorSet && genetorSet.fuel.diesel
                                            },
                                            {
                                                label:"Gasoline",
                                                checked:genetorSet && genetorSet.fuel.gasoline
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
                                        inputContent={genetorSet && genetorSet.capacity }  
                                        inputLabel="Capacity"
                                        // inputSuffix="gallons"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />
                                     <InputRow 
                                        inputRowViewStyle={{width:"30%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={genetorSet && genetorSet.location }  
                                        inputLabel="Location"
                                        // inputSuffix="gallons"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />
                                    <ChoicesCheckBox
                                        choicesLabel={"Dikes/Bund wall Provided "}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"35%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:genetorSet && genetorSet.dikesAndBundWallProvided.yes
                                            },
                                            {
                                                label:"No",
                                                checked:genetorSet && genetorSet.dikesAndBundWallProvided.no
                                            },
                                        ]}
                                    /> 
                
                                    
                    </View>

                    <View style={styles.rowItem}>
                                    
                                    <ChoicesCheckBox
                                        choicesLabel={"Container:"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Above-ground ",
                                                checked:genetorSet && genetorSet.container.aboveGround
                                            },
                                            {
                                                label:"Underground",
                                                checked:genetorSet && genetorSet.container.underground
                                            },
                                        ]}
                                    /> 
                                     <ChoicesCheckBox
                                        choicesLabel={"Dispensing System "}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"By pump",
                                                checked:genetorSet && genetorSet.dispensingSystem.byPump
                                            },
                                            {
                                                label:"By gravity",
                                                checked:genetorSet && genetorSet.dispensingSystem.byGravity
                                            },
                                        ]}
                                    /> 
                
                                    
                    </View>

                    <View style={styles.rowItem}>
                                    <InputRow 
                                        inputRowViewStyle={{width:"40%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={genetorSet && genetorSet.outputCapacity }  
                                        inputLabel="Output Capacity"
                                        inputSuffix="kva"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />
                                    <InputRow 
                                        inputRowViewStyle={{width:"25%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={genetorSet && genetorSet.mechanicalPermit }  
                                        inputLabel="Mechanical Permit "
                                        // inputSuffix="kva"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />  
                                    <InputRow 
                                        inputRowViewStyle={{width:"25%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={genetorSet && genetorSet.dateIssued }  
                                        inputLabel="Date Issued"
                                        // inputSuffix="kva"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />             
                                  
                                    
                    </View>

                    <View style={styles.rowItem}> 
                                    <ChoicesCheckBox
                                        choicesLabel={"Fuel with Storage Permit"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:genetorSet && genetorSet.fuelWithStoragePermit.yes
                                            },
                                            {
                                                label:"No",
                                                checked:genetorSet && genetorSet.fuelWithStoragePermit.no
                                            },
                                        ]}
                                    /> 
                                    <InputRow 
                                        inputRowViewStyle={{width:"50%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={genetorSet && genetorSet.others }  
                                        inputLabel="Others (specify)"
                                        // inputSuffix="gallons"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />          
                    </View>

                    <View style={styles.rowItem}> 
                                    <ChoicesCheckBox
                                        choicesLabel={"Automatic Transfer Switch Provided"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:genetorSet && genetorSet.automaticTransferSwitchProvided.yes
                                            },
                                            {
                                                label:"No",
                                                checked:genetorSet && genetorSet.automaticTransferSwitchProvided.no
                                            },
                                        ]}
                                    /> 
                                    <InputRow 
                                        inputRowViewStyle={{width:"50%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={genetorSet && genetorSet.timeInterval }  
                                        inputLabel="Time Interval"
                                        inputSuffix="sec (Requirement: Max 10 secs)"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />          
                    </View>

                    {/* C. Refuse (Garbage) Handling Facility: */}

                    <View style={{display:"flex",flexDirection:"row",width:"100%"}}>
                                    <Text style={{width:"34%",fontWeight:"bold",textDecoration:"underline"}}>C. Refuse (Garbage) Handling Facility</Text>
                                    <ChoicesCheckBox
                                        choicesLabel={"Provided"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.provided.yes
                                            },
                                            {
                                                label:"No",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.provided.no
                                            },
                                        ]}
                                    /> 
                                   
                
                                    
                    </View>

                    <View style={styles.rowItem}>
                                   
                                    <ChoicesCheckBox
                                        choicesLabel={"Enclosure provided "}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.enclosureProvided.yes
                                            },
                                            {
                                                label:"No",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.enclosureProvided.no
                                            },
                                        ]}
                                    /> 
                                    <ChoicesCheckBox
                                        choicesLabel={"Fire resistive "}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.fireResistive.yes
                                            },
                                            {
                                                label:"No",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.fireResistive.no
                                            },
                                        ]}
                                    /> 
                                   
                
                                    
                    </View>

                    <View style={styles.rowItem}>
                                   
                                    <ChoicesCheckBox
                                        choicesLabel={"Fire protection provided"}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.fireProtectionProvided.yes
                                            },
                                            {
                                                label:"No",
                                                checked:refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.fireProtectionProvided.no
                                            },
                                        ]}
                                    /> 
                                     <InputRow 
                                        inputRowViewStyle={{width:"50%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.type }  
                                        inputLabel="Type"
                                        // inputSuffix="gallons"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />
                                   
                
                                    
                    </View>

                    <View style={styles.rowItem}>
                                   
                                    <InputRow 
                                        inputRowViewStyle={{width:"50%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.frequencyOfCollectionAndDisposal }  
                                        inputLabel="Frequency of collection/disposal"
                                        // inputSuffix="gallons"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />
                                     <InputRow 
                                        inputRowViewStyle={{width:"50%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={refuseGarbageHandlingFacilty && refuseGarbageHandlingFacilty.howCollected }  
                                        inputLabel="How collected"
                                        // inputSuffix="gallons"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />
                                   
                
                                    
                    </View>
                     
                     {/* D. Electrical System */}
                    <Text style={{fontWeight:"bold",textDecoration:"underline"}}>D. Electrical System </Text>
                    
                    <View style={styles.rowItem}>
                                   
                                    <ChoicesCheckBox
                                        choicesLabel={"Is there any electrical hazard "}
                                        choicesLabelFirst={true}
                                        checkBoxLabelFirst={false}
                                        choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                                        choicesCheckBoxStyle={styles.choicesStyle}
                                        checkBoxLabelStyle={styles.choicesStyle}
                                        choices={[
                                            {   
                                                label:"Yes",
                                                checked:electricalSystem && electricalSystem.isThereAnyElectricalHazard.yes
                                            },
                                            {
                                                label:"No",
                                                checked:electricalSystem && electricalSystem.isThereAnyElectricalHazard.no
                                            },
                                        ]}
                                    /> 
                                    
                                    <InputRow 
                                        inputRowViewStyle={{width:"50%"}}
                                        // inputRowLabelStyle={{fontSize:"11px"}}
                                        inputRowStyle={styles.inputRowStyle} 
                                        inputRowContentStyle={styles.inputRowContentStyle}
                                        inputContent={electricalSystem && electricalSystem.specifyLocation }  
                                        inputLabel="Specify location "
                                        // inputSuffix="gallons"
                                        inputRowSuffixStyle={styles.inputRowSuffixStyle}
                                    />
                                    
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
            >BFP-QSF-FSED-027 Rev. 01 (07.05.19) Page 3 of 4</Text>
    </PageWrapper>
  )
}

export default FsedThreeOfFour