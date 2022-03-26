import React from 'react'
import {  Text, View, Font,StyleSheet } from '@react-pdf/renderer';
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

const FsedTwoOfFour = ({pdfValue}) => {
    
    const {exitDetails,lightingsAndSigns} = pdfValue

    const {rowOne,meansOfEgress,verticalExits,horizontalExits,ramps,areaOfSafeRefuge} = exitDetails
    const {emergencyLights,exitsSigns} = lightingsAndSigns
    const meansOfEgressChoices = [
        { 
          labelOne:"Readily accessible", 
          choicesOne:{
            yes:meansOfEgress.readilyAccessible.yes,
            no:meansOfEgress.readilyAccessible.no,
          },
          labelTwo:"Obstructed",
          choicesTwo:{
            yes:meansOfEgress.obstructed.yes,
            no:meansOfEgress.obstructed.no,
          }
        },
        { 
          labelOne:"Travel distance within limits", 
          choicesOne:{
            yes:meansOfEgress.travelDistanceWithinLimits.yes,
            no:meansOfEgress.travelDistanceWithinLimits.no,
          },
          labelTwo:"Dead-ends within limits",
          choicesTwo:{
            yes:meansOfEgress.deadEndsWithInlimits.yes,
            no:meansOfEgress.deadEndsWithInlimits.no,
          }
        },
        { 
          labelOne:"Adequate illumination", 
          choicesOne:{
            yes:meansOfEgress.adequateIllumination.yes,
            no:meansOfEgress.adequateIllumination.no,
          },
          labelTwo:"Proper rating of illumination",
          choicesTwo:{
            yes:meansOfEgress.properRatingOfIllumination.yes,
            no:meansOfEgress.properRatingOfIllumination.no,
          }
        },
        { 
          labelOne:"Panic hardware operational", 
          choicesOne:{
            yes:meansOfEgress.panicHardwareOperational.yes,
            no:meansOfEgress.panicHardwareOperational.no,
          },
          labelTwo:"Door swing in the direction of exit",
          choicesTwo:{
            yes:meansOfEgress.doorSwingInTheDirectionOfExit.yes,
            no:meansOfEgress.doorSwingInTheDirectionOfExit.no,
          }
        },
        { 
          labelOne:"Doors open easily", 
          choicesOne:{
            yes:meansOfEgress.doorsOpenEasily.yes,
            no:meansOfEgress.doorsOpenEasily.no,
          },
          labelTwo:"Self-closure operational",
          choicesTwo:{
            yes:meansOfEgress.selfClosureOperational.yes,
            no:meansOfEgress.selfClosureOperational.no,
          }
        },
        { 
          labelOne:"Bldg w/Mezzanine", 
          choicesOne:{
            yes:meansOfEgress.bldgWithMezzanine.yes,
            no:meansOfEgress.bldgWithMezzanine.no,
          },
          labelTwo:"Mezzanine with proper exits",
          choicesTwo:{
            yes:meansOfEgress.mezzanineWithProperExits.yes,
            no:meansOfEgress.mezzanineWithProperExits.no,
          }
        },
        { 
          labelOne:"Corridors & aisles of sufficient size", 
          choicesOne:{
            yes:meansOfEgress.corridorsAndAislesOfSufficientSize.yes,
            no:meansOfEgress.corridorsAndAislesOfSufficientSize.no,
          },
         
        },
        
    ]

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

                 {/* row 1 */}
                 <View style={styles.rowItem}>

                     <ChoicesCheckBox
                        choicesLabel="Any Enclosure Provided"
                        choicesLabelFirst={true}
                        checkBoxLabelFirst={false}
                        choicesViewStyle={{width:"40%"}}
                        choicesCheckBoxStyle={styles.choicesStyle}
                        choices={[
                            {   
                                label:"Yes",
                                checked:exitDetails.anyEnclosureProvided.yes
                            },
                            {
                                label:"No",
                                checked:exitDetails.anyEnclosureProvided.no
                            },
                        ]}
                     />

                     <Text style={styles.italicText}>Min of 2-hr fire rating- 4-storey or more, Min of 1 hr, fire rung- less than 4-storey</Text>
                 </View>

                  {/*MEANS OF EGRESS*/}
                  <Text style={styles.textHeading}>MEANS OF EGRESS</Text>

                
                    {meansOfEgressChoices?.map(i=>(
                    <View style={styles.rowItem} key={i?.labelOne}>
                          <ChoicesCheckBox
                              choicesLabel={i.labelOne && i?.labelOne}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={styles.spacedChoices}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:i.choicesOne && i?.choicesOne.yes
                                  },
                                  {
                                      label:"No",
                                      checked:i.choicesOne &&i?.choicesOne.yes
                                  },
                              ]}
                          />
                          <ChoicesCheckBox
                              choicesLabel={i.labelTwo && i.labelTwo}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={styles.spacedChoices}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={i.choicesTwo && [
                                {   
                                    label:"Yes",
                                    checked:i.choicesTwo && i?.choicesTwo.yes
                                },
                                {
                                    label:"No",
                                    checked:i.choicesTwo && i?.choicesTwo.yes
                                },
                            ]}
                          />
                      </View>
                    ))}

                    {/* VERTICAL EXITS */}
                    {/* Main stairway */}
                    <Text style={styles.textHeading}>A. VERTICAL EXITS</Text>

                    <View style={styles.rowItem}>
                          <Text style={{width:"20%", fontWeight:"bold"}}>1.Main stairway:</Text>
                          <InputRow 
                              inputRowViewStyle={{width:"60%"}}
                              // inputRowLabelStyle={{fontSize:"11px"}}
                              inputRowStyle={styles.inputRowStyle} 
                              inputRowContentStyle={styles.inputRowContentStyle}
                              inputContent={verticalExits && verticalExits.mainStairway.width}  
                              inputLabel="Width"
                              // inputSuffix="(123)"
                              inputRowSuffixStyle={styles.inputRowSuffixStyle}
                          />
                          <InputRow 
                              inputRowViewStyle={{width:"60%"}}
                              // inputRowLabelStyle={{fontSize:"11px"}}
                              inputRowStyle={styles.inputRowStyle} 
                              inputRowContentStyle={styles.inputRowContentStyle}
                              inputContent={verticalExits && verticalExits.mainStairway.construction}  
                              inputLabel="Construction"
                              // inputSuffix="(123)"
                              inputRowSuffixStyle={styles.inputRowSuffixStyle}
                          />
                    </View>

                    <View style={styles.rowItem}>
                           <ChoicesCheckBox
                              choicesLabel={"Are there railings provided "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={styles.spacedChoices}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.mainStairway.areThereRailingsProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.mainStairway.areThereRailingsProvided.no
                                  },
                              ]}
                            />
                          <InputRow 
                              inputRowViewStyle={{width:"75%"}}
                              // inputRowLabelStyle={{fontSize:"11px"}}
                              inputRowStyle={styles.inputRowStyle} 
                              inputRowContentStyle={styles.inputRowContentStyle}
                              inputContent={verticalExits && verticalExits.mainStairway.madeOf}  
                              inputLabel="Made of"
                              // inputSuffix="(123)"
                              inputRowSuffixStyle={styles.inputRowSuffixStyle}
                          />
                    </View>

                    <View style={styles.rowItem}>
                           <ChoicesCheckBox
                              choicesLabel={"Any enclosure provided"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row"}}
                              choicesCheckBoxStyle={{ marginHorizontal:"3px"}}
                              checkBoxLabelStyle={{ marginHorizontal:"3px"}}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.mainStairway.anyEnclosureProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.mainStairway.anyEnclosureProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"40%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.mainStairway.enclosureConstruction}  
                                inputLabel="Enclosure construction"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <ChoicesCheckBox
                                choicesLabel={"Any opening"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row"}}
                                choicesCheckBoxStyle={{ marginHorizontal:"3px"}}
                                checkBoxLabelStyle={{ marginHorizontal:"3px"}}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:verticalExits && verticalExits.mainStairway.anyOpening.yes
                                    },
                                    {
                                        label:"No",
                                        checked:verticalExits && verticalExits.mainStairway.anyOpening.no
                                    },
                                ]}
                              />
                    </View>

                    <View style={styles.rowItem}>
                          <InputRow 
                              inputRowViewStyle={{width:"50%"}}
                              // inputRowLabelStyle={{fontSize:"11px"}}
                              inputRowStyle={styles.inputRowStyle} 
                              inputRowContentStyle={styles.inputRowContentStyle}
                              inputContent={verticalExits && verticalExits.mainStairway.fireDoorConstruction}  
                              inputLabel="Fire door construction"
                              // inputSuffix="(123)"
                              inputRowSuffixStyle={styles.inputRowSuffixStyle}
                          />
                           <ChoicesCheckBox
                              choicesLabel={"Door equipped w/ Self-closing device"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={styles.spacedChoices}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.mainStairway.doorEquippedWithSelfClosingDevice.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.mainStairway.doorEquippedWithSelfClosingDevice.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                           <ChoicesCheckBox
                              choicesLabel={"Door proper rating:"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row"}}
                              choicesCheckBoxStyle={{ marginHorizontal:"3px"}}
                              checkBoxLabelStyle={{ marginHorizontal:"3px"}}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.mainStairway.doorProperRating.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.mainStairway.doorProperRating.no
                                  },
                              ]}
                            />
                             <ChoicesCheckBox
                                choicesLabel={"Door provided w/ vision panel: "}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row"}}
                                choicesCheckBoxStyle={{ marginHorizontal:"3px"}}
                                checkBoxLabelStyle={{ marginHorizontal:"3px"}}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:verticalExits && verticalExits.mainStairway.doorProvidedWithVisionPanel.yes
                                    },
                                    {
                                        label:"No",
                                        checked:verticalExits && verticalExits.mainStairway.doorProvidedWithVisionPanel.no
                                    },
                                ]}
                              />
                            <InputRow 
                                inputRowViewStyle={{width:"30%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.mainStairway.ifYesMadeOF}  
                                inputLabel="If Yes, made of"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                           
                    </View>
                    
                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Door swing in the direction of exit travel (when required)"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{ display:"flex",flexDirection:"row",width:"80%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:verticalExits && verticalExits.mainStairway.doorSwingInTheDirectionOfExitTravel.yes
                                    },
                                    {
                                        label:"No",
                                        checked:verticalExits && verticalExits.mainStairway.doorSwingInTheDirectionOfExitTravel.no
                                    },
                                ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                choicesLabel={"Stairways Pressurized"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{ display:"flex",flexDirection:"row",width:"50%"}}
                                choicesCheckBoxStyle={styles.choicesStyle}
                                checkBoxLabelStyle={styles.choicesStyle}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:verticalExits && verticalExits.mainStairway.stairwaysPressurized.yes
                                    },
                                    {
                                        label:"No",
                                        checked:verticalExits && verticalExits.mainStairway.stairwaysPressurized.no
                                    },
                                    {
                                      label:"N/A",
                                      checked:verticalExits && verticalExits.mainStairway.stairwaysPressurized.notApplicable
                                  },
                                ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.mainStairway.ifPressurizedWhatTypeOrMethod}  
                                inputLabel="If pressurized, what type or method"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <InputRow 
                                inputRowViewStyle={{width:"100%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.mainStairway.dateLastTested}  
                                inputLabel="Date Last Tested"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View>
                  {/* Main stairway */}

                  {/*  Secondary Stair/Fire Escape  */}
                  <View style={styles.rowItem}>
                          <Text style={{width:"40%", fontWeight:"bold"}}>2. Secondary Stair/Fire Escape:</Text>
                          <InputRow 
                              inputRowViewStyle={{width:"55%"}}
                              // inputRowLabelStyle={{fontSize:"11px"}}
                              inputRowStyle={styles.inputRowStyle} 
                              inputRowContentStyle={styles.inputRowContentStyle}
                              inputContent={verticalExits && verticalExits.secondStairAndFireEscape.number}  
                              inputLabel="Number"
                              // inputSuffix="(123)"
                              inputRowSuffixStyle={styles.inputRowSuffixStyle}
                          />
                          <InputRow 
                              inputRowViewStyle={{width:"55%"}}
                              // inputRowLabelStyle={{fontSize:"11px"}}
                              inputRowStyle={styles.inputRowStyle} 
                              inputRowContentStyle={styles.inputRowContentStyle}
                              inputContent={verticalExits && verticalExits.secondStairAndFireEscape.width}  
                              inputLabel="Width"
                              // inputSuffix="(123)"
                              inputRowSuffixStyle={styles.inputRowSuffixStyle}
                          />
                  </View>

                  <View style={styles.rowItem}>    
                            <InputRow 
                                inputRowViewStyle={{width:"30%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.construction}  
                                inputLabel="Construction"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <ChoicesCheckBox
                                choicesLabel={"Are there railings provided"}
                                choicesLabelFirst={true}
                                checkBoxLabelFirst={false}
                                choicesViewStyle={{display:"flex",flexDirection:"row"}}
                                choicesCheckBoxStyle={{ marginHorizontal:"3px"}}
                                checkBoxLabelStyle={{ marginHorizontal:"3px"}}
                                choices={[
                                    {   
                                        label:"Yes",
                                        checked:verticalExits && verticalExits.secondStairAndFireEscape.areThereRailingsProvided.yes
                                    },
                                    {
                                        label:"No",
                                        checked:verticalExits && verticalExits.secondStairAndFireEscape.areThereRailingsProvided.no
                                    },
                                ]}
                              />
                              <InputRow 
                                inputRowViewStyle={{width:"30%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.madeOf}  
                                inputLabel="Made of"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                  </View>

                  <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Location:"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Interior",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.location.interior
                                  },
                                  {
                                      label:"Exterior",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.location.exterior
                                  },
                              ]}
                            />
                           <ChoicesCheckBox
                              choicesLabel={"Exits accessible"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.exitsAccessible.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.exitsAccessible.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Any obstruction"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.anyObstruction.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.anyObstruction.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"90%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.terminationAndDischargeOfExits}  
                                inputLabel="Termination/Discharge of Exits"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View> 

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Any enclosure provided"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.anyEnclosureProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.anyEnclosureProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"90%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.enclosureConstruction}  
                                inputLabel="Enclosure construction"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View> 

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Any opening"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.anyOpening.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.anyOpening.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Opening protected"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.openingProtected.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.openingProtected.no
                                  },
                              ]}
                            />
                    </View>   
                  
                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Are fire door provided"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.areFireDoorProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.areFireDoorProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.width2}  
                                inputLabel="Width"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.fireDoorConstruction}  
                                inputLabel="Fire door construction"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View> 

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door provided with vision panel "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorProvidedWithVisionPanel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorProvidedWithVisionPanel.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.ifYesMadeOf}  
                                inputLabel="If Yes. made of"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View> 

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door equipped w/ Self-closing device "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorEquippedWithSelfClosingDevice.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorEquippedWithSelfClosingDevice.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Doors & enclosure proper rating "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorsAndEnclosureProperRating.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorsAndEnclosureProperRating.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Doors open easily"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorsOpenEasily.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorsOpenEasily.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Self-closing device operable"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.selfClosingDeviceOperable.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.selfClosingDeviceOperable.no
                                  },
                              ]}
                            />
                    </View> 

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door equipped w/ panic hardware"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorEquippedWithPanicHardware.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorEquippedWithPanicHardware.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Operable"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.operable.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.operable.no
                                  },
                              ]}
                            />
                    </View> 

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door swing in the direction of exit travel "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorSwingInTheDirectionOfExitTravel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.doorSwingInTheDirectionOfExitTravel.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Enclosure properly protected"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.enclosureProperlyProtected.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.enclosureProperlyProtected.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Fire escape pressurized "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.fireEscapePressurized.yes
                                  },
                                  {
                                      label:"No",
                                      checked:verticalExits && verticalExits.secondStairAndFireEscape.fireEscapePressurized.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.ifPressurizedWhatTypeOrMethod}  
                                inputLabel="If pressurized what type or method"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            
                            <InputRow 
                                inputRowViewStyle={{width:"100%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={verticalExits && verticalExits.secondStairAndFireEscape.dateLastTested}  
                                inputLabel="Date Last Tested"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View>

                    {/* B. HORIZONTAL EXITS */}

                    <Text style={styles.textHeading}>B. HORIZONTAL EXITS</Text>

                    <View style={styles.rowItem}>
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={horizontalExits && horizontalExits.widthOfDoors}  
                                inputLabel="Width of door/s "
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={horizontalExits && horizontalExits.construction}  
                                inputLabel="Construction"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"With vision panel "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.withVisionPanel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.withVisionPanel.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door swing in the direction of egress travel  "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.doorSwingInTheDirectionOfEgressTravel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.doorSwingInTheDirectionOfEgressTravel.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"With Self-closing device "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.withSelfClosingDevice.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.withSelfClosingDevice.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            
                            <InputRow 
                                inputRowViewStyle={{width:"48%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={horizontalExits && horizontalExits.widthOfCorridorsOrHallWays}  
                                inputLabel="Width of corridors or hall ways"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                             <InputRow 
                                inputRowViewStyle={{width:"48%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={horizontalExits && horizontalExits.construction2}  
                                inputLabel="Construction"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Corridor walls extended from slab to slab "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.corridorWallsExtendedFromSlabToSlab.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.corridorWallsExtendedFromSlabToSlab.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={" Properly illuminated "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.properlyIlluminated.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.properlyIlluminated.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Exit readily visible "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.exitReadilyVisible.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.exitReadilyVisible.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Clear and unobstructed "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.clearAndUnobstructed.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.clearAndUnobstructed.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Properly marked w/ illuminated exit sign"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.properlyMarkedWithIlluminatedExitSign.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.properlyMarkedWithIlluminatedExitSign.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"With illuminated directional sign"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.withIlluminatedDirectionalSign.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.withIlluminatedDirectionalSign.no
                                  },
                              ]}
                            />
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Properly located "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:horizontalExits && horizontalExits.properlyLocated.yes
                                  },
                                  {
                                      label:"No",
                                      checked:horizontalExits && horizontalExits.properlyLocated.no
                                  },
                              ]}
                            />
                            
                    </View>
                    
                    {/* C. RAMPS */}
                    <Text style={styles.textHeading}>C. RAMPS</Text>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Provided"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"23%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.provided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.provided.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Type:"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"25%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Interior",
                                      checked:ramps && ramps.type.interior
                                  },
                                  {
                                      label:"Exterior",
                                      checked:ramps && ramps.type.exterior
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"20%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.width}  
                                inputLabel="Width"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"20%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.class}  
                                inputLabel="Class"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Railings provided "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.railingsProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.railingsProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"70%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.heightFromTheFloor}  
                                inputLabel="Height from the floor "
                                inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Any enclosure provided"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.anyEnclosureProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.anyEnclosureProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"70%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.construction }  
                                inputLabel="Construction"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Are fire doors provided "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.areFireDoorsProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.areFireDoorsProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.width2 }  
                                inputLabel="Width"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.fireDoorConstruction }  
                                inputLabel="Fire door construction"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door equipped w/ Self-closing device"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.doorEquippedWithSelfClosingDevice.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.doorEquippedWithSelfClosingDevice.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Door with proper rating"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.doorWithProperRating.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.doorWithProperRating.no
                                  },
                              ]}
                            />
                            
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door provided w/ vision panel "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.doorProvidedWithVisionPanel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.doorProvidedWithVisionPanel.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.ifYesMadeOf }  
                                inputLabel="If Yes, made of"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door swing in the direction of exit travel (when required) "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.doorSwingInTheDirectionOfExitTravel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.doorSwingInTheDirectionOfExitTravel.no
                                  },
                              ]}
                            />    
                    </View>

                    <View style={styles.rowItem}>
                          <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.anyObstruction }  
                                inputLabel="Any obstruction "
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={ramps && ramps.terminationAndDischargeOfExit }  
                                inputLabel="Termination/Discharge of exit"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                            
                    </View>

                    {/*  D. AREA OF SAFE REFUGE */}
                    <Text style={styles.textHeading}>D. AREA OF SAFE REFUGE</Text>
                 
                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Provided"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"23%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.provided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.provided.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Type:"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"25%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Interior",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.type.interior
                                  },
                                  {
                                      label:"Exterior",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.type.exterior
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={areaOfSafeRefuge && areaOfSafeRefuge.location}  
                                inputLabel="Location"
                                // inputSuffix="(123)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                           
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Any enclosure provided"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.anyEnclosureProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.anyEnclosureProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"70%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={areaOfSafeRefuge && areaOfSafeRefuge.construction }  
                                inputLabel="Construction"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Are fire doors provided "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.areFireDoorProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.areFireDoorProvided.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={areaOfSafeRefuge && areaOfSafeRefuge.width }  
                                inputLabel="Width"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={areaOfSafeRefuge && areaOfSafeRefuge.fireDoorConstruction }  
                                inputLabel="Fire door construction"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door equipped w/ Self-closing device"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.doorEquippedWithSelfClosingDevice.yes
                                  },
                                  {
                                      label:"No",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.doorEquippedWithSelfClosingDevice.no
                                  },
                              ]}
                            />
                            <ChoicesCheckBox
                              choicesLabel={"Door with proper rating"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.doorWithProperRating.yes
                                  },
                                  {
                                      label:"No",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.doorWithProperRating.no
                                  },
                              ]}
                            />
                            
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door provided w/ vision panel "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.doorProvidedWithVisionPanel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:areaOfSafeRefuge && areaOfSafeRefuge.doorProvidedWithVisionPanel.no
                                  },
                              ]}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={areaOfSafeRefuge && areaOfSafeRefuge.ifYesMadeOf }  
                                inputLabel="If Yes, made of"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            
                            
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                              choicesLabel={"Door swing in the direction of exit travel "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"80%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:ramps && ramps.doorSwingInTheDirectionOfExitTravel.yes
                                  },
                                  {
                                      label:"No",
                                      checked:ramps && ramps.doorSwingInTheDirectionOfExitTravel.no
                                  },
                              ]}
                            />    
                    </View>

                    {/* VI. LIGHTINGS & SIGNS */}
                    {/* A. EMERGENCY LIGHTS */}
                    <Text style={styles.numberedHeading}>VI. LIGHTINGS & SIGNS</Text>
                    <Text style={styles.textHeading}>A. EMERGENCY LIGHTS</Text>

                    <View style={styles.rowItem}>
                           <ChoicesCheckBox
                              choicesLabel={"Automatic Emergency Lights Provided "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:emergencyLights && emergencyLights.automaticEmergencyLightsProvided.yes
                                  },
                                  {
                                      label:"No",
                                      checked:emergencyLights && emergencyLights.automaticEmergencyLightsProvided.no
                                  },
                              ]}
                            /> 
                            <ChoicesCheckBox
                              choicesLabel={"Source of Power "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"AC/DC",
                                      checked:emergencyLights && emergencyLights.sourceOfPower.acAndDc
                                  },
                                  {
                                      label:"Others",
                                      checked:emergencyLights && emergencyLights.sourceOfPower.others.checked
                                  },
                              ]}
                            /> 
                            <NoLabelInput 
                                inputStyle={{
                                width:"20%",
                                height:"12px"
                                }}
                                inputContent={emergencyLights && emergencyLights.sourceOfPower.others.content}
                                inputContentStyle={{fontSize:"8px"}}
                            /> 
                    </View>

                    <View style={styles.rowItem}>
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={emergencyLights && emergencyLights.noOfUnitsPerFloor }  
                                inputLabel="No. of Units per Floor"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={emergencyLights && emergencyLights.locatedAtHallways }  
                                inputLabel="Located at: Hallways "
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.stairwayLandings}
                            />
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={emergencyLights && emergencyLights.stairwayLandings }  
                                inputLabel="Stairway Landings "
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                    </View>
                    
                    <View style={styles.rowItem}>
                           <ChoicesCheckBox
                              choicesLabel={"Operational:"}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:emergencyLights && emergencyLights.operational.yes
                                  },
                                  {
                                      label:"No",
                                      checked:emergencyLights && emergencyLights.operational.no
                                  },
                              ]}
                            /> 
                            <ChoicesCheckBox
                              choicesLabel={"Exit path properly illuminated "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"40%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:emergencyLights && !emergencyLights.exitPathProperlyIlluminated.yes
                                  },
                                  {
                                      label:"No",
                                      checked:emergencyLights && emergencyLights.exitPathProperlyIlluminated.no
                                  },
                              ]}
                            /> 
                          
                    </View>

                    <View style={styles.rowItem}>
                           <ChoicesCheckBox
                              choicesLabel={"Tested Monthly: "}
                              choicesLabelFirst={true}
                              checkBoxLabelFirst={false}
                              choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                              choicesCheckBoxStyle={styles.choicesStyle}
                              checkBoxLabelStyle={styles.choicesStyle}
                              choices={[
                                  {   
                                      label:"Yes",
                                      checked:emergencyLights && emergencyLights.testedMonthly.yes
                                  },
                                  {
                                      label:"No",
                                      checked:emergencyLights && emergencyLights.testedMonthly.no
                                  },
                              ]}
                            /> 
                           <Text style={{fontStyle:'italic', width:"80%"}}>
                             Minimum AEL Power Duration: at least one (1) hour
                           </Text>
                    </View>

                  {/* B. EXIT SIGNS */}
                    <Text style={styles.textHeading}>B. EXIT SIGNS</Text>

                    <View style={styles.rowItem}>
                        <ChoicesCheckBox
                            choicesLabel={"Exit Signs Illuminated "}
                            choicesLabelFirst={true}
                            checkBoxLabelFirst={false}
                            choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                            choicesCheckBoxStyle={styles.choicesStyle}
                            checkBoxLabelStyle={styles.choicesStyle}
                            choices={[
                                {   
                                    label:"Yes",
                                    checked:exitsSigns && exitsSigns.exitSignsIlluminated.yes
                                },
                                {
                                    label:"No",
                                    checked:exitsSigns && exitsSigns.exitSignsIlluminated.no
                                },
                            ]}
                            /> 
                            <InputRow 
                                inputRowViewStyle={{width:"50%"}}
                                // inputRowLabelStyle={{fontSize:"11px"}}
                                inputRowStyle={styles.inputRowStyle} 
                                inputRowContentStyle={styles.inputRowContentStyle}
                                inputContent={exitsSigns && exitsSigns.location }  
                                inputLabel="Location"
                                // inputSuffix="(Requirement: 91 cm)"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                           
                    </View>

                    <View style={styles.rowItem}>
                            <ChoicesCheckBox
                                    choicesLabel={"Source of Power "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:exitsSigns && exitsSigns.sourceOfPower.yes
                                        },
                                        {
                                            label:"No",
                                            checked:exitsSigns && exitsSigns.sourceOfPower.no
                                        },
                                    ]}
                                    /> 
                            <ChoicesCheckBox
                                    choicesLabel={"Readily visible "}
                                    choicesLabelFirst={true}
                                    checkBoxLabelFirst={false}
                                    choicesViewStyle={{display:"flex",flexDirection:"row",width:"50%"}}
                                    choicesCheckBoxStyle={styles.choicesStyle}
                                    checkBoxLabelStyle={styles.choicesStyle}
                                    choices={[
                                        {   
                                            label:"Yes",
                                            checked:exitsSigns && exitsSigns.readilyVisible.yes
                                        },
                                        {
                                            label:"No",
                                            checked:exitsSigns && exitsSigns.readilyVisible.no
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
                                inputContent={exitsSigns && exitsSigns.minimumLetterSize }  
                                inputLabel="Minimum Letter Size "
                                inputSuffix="Min. Requirement: Height of 11.5 cm & width of 19.0 mm"
                                inputRowSuffixStyle={styles.inputRowSuffixStyle}
                            />
                      
                        
                    </View>

                    <View style={styles.rowItem}>
                        <ChoicesCheckBox
                            choicesLabel={"Exit Route Plan posted on: Lobby/Hallways "}
                            choicesLabelFirst={true}
                            checkBoxLabelFirst={false}
                            choicesViewStyle={{display:"flex",flexDirection:"row",width:"70%"}}
                            choicesCheckBoxStyle={styles.choicesStyle}
                            checkBoxLabelStyle={styles.choicesStyle}
                            choices={[
                                {   
                                    label:"Yes",
                                    checked:exitsSigns && exitsSigns.exitRoutePlanPostedOnLobbyAndHallways.yes
                                },
                                {
                                    label:"No",
                                    checked:exitsSigns && exitsSigns.exitRoutePlanPostedOnLobbyAndHallways.no
                                },
                            ]}
                            /> 
                        <ChoicesCheckBox
                            choicesLabel={"Rooms"}
                            choicesLabelFirst={true}
                            checkBoxLabelFirst={false}
                            choicesViewStyle={{display:"flex",flexDirection:"row",width:"30%"}}
                            choicesCheckBoxStyle={styles.choicesStyle}
                            checkBoxLabelStyle={styles.choicesStyle}
                            choices={[
                                {   
                                    label:"Yes",
                                    checked:exitsSigns && exitsSigns.rooms.yes
                                },
                                {
                                    label:"No",
                                    checked:exitsSigns && exitsSigns.rooms.no
                                },
                            ]}
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
            >BFP-QSF-FSED-027 Rev. 01 (07.05.19) Page 2 of 4</Text>
    </PageWrapper>
  )
}

export default FsedTwoOfFour