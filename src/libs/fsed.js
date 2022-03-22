import React,{useState,useContext,createContext, useEffect} from 'react'


const fsedContext = createContext()

export function FsedProvider({children}) {
    const fsed = useProvideFsed()
    return <fsedContext.Provider value={fsed}>{children}</fsedContext.Provider>
}

export const useFsed = () => {
    return useContext(fsedContext)
}

const useProvideFsed = () =>{
   const [fsedValue,setFsedValue] = useState({
    
       prelude:{
          rowOne:{
            nameOfOwner:"",
            date:"",
            nameOfEstablishment:"",
            address:"",
          },
          rowTwo:{
            inspectionOrderNo:"",
            dateIssued:"",
            dateOfInspection:"",
          },
          rowThree:{
            buildingUnderConstruction:false,
            periodicInspectionOfOccupancy:false,
            applicationForOccupancyPermit:false,
            verificationinspectionOfcomplianceToNTCV:false,
            applicationForBusinessPermit:false,
            verificationinspectionOfComplaintReceived:false,
            others:false,
            specify:""
          }
       },
    //    1
       generalInformation:{
            nameOfBuilding:"",
            businessName:"",
            address:"",
            natureOfBusiness:"",
            nameOfOwnerOrOccupant:"",
            contactNo:"",
            nameOfRepresentative:"",
            contactNo2:"",
            noOfStorey:"",
            heightOfBldg:"",
            portionOccupied:"",
            areaPerFlr:"",
            totalFlrArea:"",
            buildingPermitNo:"",
            dateIssue:"",
            occupancyPermitNo:"",
            dateIssued:"",
            latestFSICIssuedControlNo:"",
            dateIssued2:"",
            fCFee:"",
            certificateOfFireDrill:"",
            dateIssued3:"",
            fCFee2:"",
            latestNoticeToCorrectViolationsControlNo:"",
            dateIssued4:"",
            nameOfFireInsuranceCoOrCoInsurer:"",
            policyNo:"",
            dateIssued5:"",
            latestMayorsOrBusPermit:"",
            dateIssued6:"",
            municipalLicenseNo:"",
            dateIssued7:"",
            LatestCertificateofElectricalInspectionNo:"",
            dateIssued8:"",
            otherInformation:""
       },
    //   2  
       buildingConstruction:{
            beams:"",
            columns:"",
            flooring:"",
            exteriorWalls:"",
            corridorWalls:"",
            roomPartitions:"",
            mainStair:"",
            windows:"",
            ceiling:"",
            mainDoor:"",
            trusses:"",
            roof:""
       },
    //    3
       sectionalOccupancy:{
            sectionalOccupancy:""
       },
    //    4
       classification:{
            occupantLoad:"",
            egresscapacity:"",
            anyRenovations:{
            yes:false,
            no:false
            },
            windowless:{
            yes:false,
            no:false
            }
       },
    //    5
       exitDetails:{
           rowOne:{
            capacityOfHorizontalExit:"",
            capacityOfExitStair:"",
            noOfExits:"",
            remote:{
              yes:false,
              no:false
            },
            locationOfExit:"",
            anyEnclosureProvided:{
                yes:false,
                no:false
            } 
           },
           meansOfEgress:{
            readilyAccessible:{
                yes:false,
                no:false
             }, 
             obstructed:{
                yes:false,
                no:false
             },
             travelDistanceWithinLimits :{
                yes:false,
                no:false
             },
             deadEndsWithInlimits:{
                yes:false,
                no:false
             },
             adequateIllumination:{
                yes:false,
                no:false
             },
             properRatingOfIllumination:{
                yes:false,
                no:false
             },
             panicHardwareOperational:{
                yes:false,
                no:false
             },
             doorSwingInTheDirectionOfExit:{
                yes:false,
                no:false
             },
             doorsOpenEasily:{
                yes:false,
                no:false
             },
             selfClosureOperational:{
                yes:false,
                no:false
             },
             bldgWithMezzanine:{
                yes:false,
                no:false
             },
             mezzanineWithProperExits:{
                yes:false,
                no:false
             }, 
             corridorsAndAislesOfSufficientSize:{
                yes:false,
                no:false
             },   
           },
           verticalExits:{
               mainStairway:{
                    width:"",
                    construction:"",
                    areThereRailingsProvided:{
                        yes:false,
                        no:false
                    },
                    madeOf:"",
                    anyEnclosureProvided:{
                        yes:false,
                        no:false
                    },
                    enclosureConstruction:"",
                    anyOpening:{
                        yes:false,
                        no:false
                    },
                    fireDoorConstruction:"",
                    doorEquippedWithSelfClosingDevice:{
                        yes:false,
                        no:false
                    },
                    doorProperRating:{
                        yes:false,
                        no:false
                    },
                    doorProvidedWithVisionPanel:{
                        yes:false,
                        no:false
                    },
                    ifYesMadeOF:"",
                    doorSwingInTheDirectionOfExitTravel:{
                        yes:false,
                        no:false
                    },
                    stairwaysPressurized:{
                        yes:false,
                        no:false,
                        notApplicable:false
                    },
                    ifPressurizedWhatTypeOrMethod:"",
                    dateLastTested:"" 
               },
               secondStairAndFireEscape:{
                    number:"",
                    width:"",
                    construction:"",
                    areThereRailingsProvided:{
                    yes:false,
                    no:false
                    },
                    madeOf:"",
                    location:{
                        interior:false,
                        exterior:false
                    },
                    exitsAccessible:{
                        yes:false,
                        no:false
                    },
                    anyObstruction:{
                        yes:false,
                        no:false
                    },
                    terminationAndDischargeOfExits:"",
                    anyEnclosureProvided:{
                        yes:false,
                        no:false
                    },
                    enclosureConstruction:"",
                    anyOpening:{
                        yes:false,
                        no:false
                    },
                    openingProtected:{
                        yes:false,
                        no:false
                    },
                    areFireDoorProvided:{
                        yes:false,
                        no:false
                    },
                    width2:"",
                    fireDoorConstruction:"",
                    doorProvidedWithVisionPanel :{
                    yes:false,
                    no:false
                    }, 
                    ifYesMadeOf:"",
                    doorEquippedWithSelfClosingDevice:{
                    yes:false,
                    no:false
                    },
                    doorsAndEnclosureProperRating:{
                    yes:false,
                    no:false
                    }, 
                    doorsOpenEasily:{
                        yes:false,
                        no:false
                    },
                    selfClosingDeviceOperable:{
                        yes:false,
                        no:false
                    },
                    doorEquippedWithPanicHardware:{
                    yes:false,
                    no:false
                    },
                    operable:{
                    yes:false,
                    no:false
                    },
                    doorSwingInTheDirectionOfExitTravel:{
                    yes:false,
                    no:false
                    },
                    enclosureProperlyProtected :{
                        yes:false,
                        no:false
                    },
                    fireEscapePressurized:{
                        yes:false,
                        no:false,
                        notApplicable:false
                    },
                    ifPressurizedWhatTypeOrMethod:"",
                    dateLastTested:"" 
               }
           },
           horizontalExits:{
                widthOfDoors:"",
                construction:"",
                withVisionPanel:{
                    yes:false,
                    no:false
                } ,
                doorSwingInTheDirectionOfEgressTravel:{
                    yes:false,
                    no:false
                },
                withSelfClosingDevice:{
                    yes:false,
                    no:false
                },
                widthOfCorridorsOrHallWays:"",
                construction2:"",
                corridorWallsExtendedFromSlabToSlab:{
                    yes:false,
                    no:false
                },
                properlyIlluminated:{
                    yes:false,
                    no:false
                },
                exitReadilyVisible:{
                yes:false,
                no:false
                },
                clearAndUnobstructed:{
                yes:false,
                no:false
                },
                properlyMarkedWithIlluminatedExitSign:{
                    yes:false,
                    no:false
                },
                withIlluminatedDirectionalSign:{
                    yes:false,
                    no:false
                },
                properlyLocated:{
                    yes:false,
                    no:false
                }           
           },
           ramps:{
                provided:{
                    yes:false,
                    no:false
                },
                type:{
                    interior:false,
                    exterior:false
                },
                width:"",
                class:"",
                railingsProvided:{
                    yes:false,
                    no:false
                },
                heightFromTheFloor:"",
                anyEnclosureProvided:{
                    yes:false,
                    no:false
                },
                construction:"",
                areFireDoorsProvided:{
                    yes:false,
                    no:false
                },
                width2:"",
                fireDoorConstruction:"",
                doorEquippedWithSelfClosingDevice:{
                    yes:false,
                    no:false
                },
                doorWithProperRating:{
                    yes:false,
                    no:false
                },
                doorProvidedWithVisionPanel:{
                    yes:false,
                    no:false
                },
                ifYesMadeOf:"",
                doorSwingInTheDirectionOfExitTravel:{
                    yes:false,
                    no:false
                },
                anyObstruction:"",
                terminationAndDischargeOfExit:"" 
           },
           areaOfSafeRefuge:{
                provided:{
                    yes:false,
                    no:false
                },
                type:{
                    interior:false,
                    exterior:false
                },
                location:"",
                anyEnclosureProvided:{
                    yes:false,
                    no:false
                },
                construction:"",
                areFireDoorProvided:{
                    yes:false,
                    no:false
                },
                width:"",
                fireDoorConstruction:"",
                doorEquippedWithSelfClosingDevice :{
                    yes:false,
                    no:false
                },
                doorWithProperRating :{
                    yes:false,
                    no:false
                },
                doorProvidedWithVisionPanel:{
                    yes:false,
                    no:false
                },
                ifYesMadeOf:"",
                doorSwingInTheDirectionOfExitTravel:{
                    yes:false,
                    no:false
                } 

           }
       },
    //    6
       lightingsAndSigns:{
           emergencyLights:{
                automaticEmergencyLightsProvided:{
                    yes:false,
                    no:false
                }, 
                sourceOfPower:{
                    acAndDc:false,
                    others:{
                        checked:false,
                        content:""
                    },
                },
                
                noOfUnitsPerFloor:"",
                locatedAtHallways:"",
                stairwayLandings:"",
                operational:{
                    yes:false,
                    no:false
                },
                exitPathProperlyIlluminated:{
                    yes:false,
                    no:false
                },
                testedMonthly:{
                    yes:false,
                    no:false
                }
           },
           exitsSigns:{
                exitSignsIlluminated:{
                    yes:false,
                    no:false,
                },
                location:"",
                sourceOfPower:{
                    acAndDc:false,
                    others:false
                },
                readilyVisible:{
                    yes:false,
                    no:false
                },
                minimumLetterSize:"",
                exitRoutePlanPostedOnLobbyAndHallways:{
                    yes:false,
                    no:false
                },
                rooms:{
                    yes:false,
                    no:false
                },
                directionalExitSigns:{
                    yes:false,
                    no:false
                },
                location2:""  
                
           },
           warningAndSafetySigns:{
             noSmoking:false,
             deadEnd:false,
             elavatorSign:false,
             keepDoorClosed:false, 
             otherSpecify:""
           }
    },
    //  7
       featuresOfFIreProtection:{
          protectionOfVerticalOpenings:{
                properlyProtected:{
                    yes:false,
                    no:false
                },
                atrium:{
                    yes:false,
                    no:false
                },
                fireDoorsGoodCondition:{
                    yes:false,
                    no:false
                },
                elevatorOpeningProtected:{
                    yes:false,
                    no:false
                },
                pipeChaseOpeningProtected:{
                    yes:false,
                    no:false
                },
                airconDuctsSystemWithDamper:{
                    yes:false,
                    no:false
                },
                dumbWaiterOpeningProtected:{
                    yes:false,
                    no:false
                },
                garbageChuteOpeningProtected:{
                    yes:false,
                    no:false
                },
                betweenFloorAndGlassCurtainOpeningProtected:{
                    yes:false,
                    no:false
                },
                dateLastTested:""     

          },
          alarmSystem:{
                fireAlarmProvided:{
                    yes:false,
                    no:false
                },
                type:{
                    manual:false,
                    automatic:false  
                },
                centralized:{
                     yes:false,
                     no:false
                },
                locationOfCentralControl:"",
                noOfBellsPerFloor:"",
                location:"",
                coverage:{
                    budding:false,
                    airHandlingUnit:false,
                    portion:false 
                },
                specify:"",
                monitored:{
                    yes:false,
                    no:false
                },
                typeOfInitiationDevice:{
                    smoke:false,
                    heat:false,
                    manual:false,
                    waterflow:false,
                    other:{
                        value:"",
                        checked:false
                    }
                },
                noOfPullStationsPerFloor:"",  
                smokeDetectors:{
                    yes:false,
                    no:false
                },
                noOfUnitsPerRoom:"",
                integrated:{
                    yes:false,
                    no:false
                },
                heatDetectors:{
                    yes:false,
                    no:false
                },
                noOfUnitsPerRoom2:"",
                integrated2:{
                    yes:false,
                    no:false
                },
                powerSourceOfDetectors:{
                    acAndDc:false,
                    other:{
                        value:"",
                        checked:false
                    }
                },
                totalDetectorsPerFloor:"",
                dateLastTested:""
          },
          standpipeSystem:{
                type:{
                    wet:false,
                    dry:false
                },
                tankCapacity:"",
                location:"",
                siameseIntakeProvided:{
                    yes:false,
                    no:false
                },
                location2:"",
                size:"",
                noOfUnits:"",
                accessible:{
                    yes:false,
                    no:false
                },
                fireHoseCabinetsProvided:{
                    yes:false,
                    no:false
                },
                withCompleteAccessories:{
                    yes:false,
                    no:false
                },
                location3:"",
                noOfUnitsPerFloor:"",
                sizeOfHose:"",
                lengthOfHose:"",
                typeOfNozzle:"",
                dateLastTested:"",
                fireLaneProvided:{
                    yes:false,
                    no:false
                },
                locationOfNearestFireHydrant:"",     
          },
          firstAidFireProtectionEquipment:{
                type:"",
                capacity:"",
                noOfUnits:"",
                withPSMark:{
                    yes:false,
                    no:false
                },
                withISOMark:{
                    yes:false,
                    no:false
                },
                properlyMaintained:{
                    yes:false,
                    no:false
                },
                conspicuouslyLocated:{
                    yes:false,
                    no:false
                },
                accessible:{
                    yes:false,
                    no:false
                },
                otherTypesProvidedIfAny:"" 
          },
          automaticFireSuppressionSystem:{
                    typeOfExtinguishingAgentUsed:"",
                    jockeyPumpCapacity:{
                        hp:"",
                        gpm:""
                    },
                    firePumpCapacity:{
                        hp:"",
                        gpm:""
                    },
                    tankCapacity:"",
                    maintainingLinePressure:"",
                    farthestSprinklerHeadPressure:"",
                    riserSize:"",
                    typeOfHeadsInstalled:"",
                    noOfHeadsPerFloor:"",
                    total:"" ,
                    spacingOfHeads:"",
                    locationOfFireDepartmentConnection:"",
                    dateLastTested:"",
                    conducted:"",
                    planSubmitted:"",
                    certificateOfInstallation:""   	
          },
          firewall:{
               buildingRequiredWithFirewalls:{
                   yes:false,
                   no:false
               },
               provided:{
                   yes:false,
                   no:false
               },
               anyOpening:{
                   yes:false,
                   no:false
               }  
          }
    },
    //  8
       buildingServiceEquipment:{
         boiler:{
                provided:{
                    yes:false,
                    no:false
                },
                noOfUnitsProvided:"",
                fuel:{
                    diesel:false,
                    kerosene:false,
                    coal:false,
                    bunker:false,
                    lpg:false
                },
                capacity:"",
                container:{
                    aboveGround:false,
                    underGround:false,    
                },
                location:"",
                lpgInstallationCoveredWithPermit:{
                    yes:false,
                    no:false
                },
                fuelWithStoragePermit:{
                    yes:false,
                    no:false
                }  
         },
         genetorSet:{
                provided:{
                    yes:false,
                    no:false
                },
                automatic:false,
                manual:false,
                fuel:{
                    diesel:false,
                    gasoline:false
                },
                capacity:"",
                location:"",
                dikesAndBundWallProvided:{
                    yes:false,
                    no:false
                },
                container:{
                    aboveGround:false,
                    underground:false 
                },
                dispensingSystem:{
                    byPump:false,
                    byGravity:false
                },
                outputCapacity:"",
                mechanicalPermit:"",
                dateIssued:"",
                fuelWithStoragePermit:{
                    yes:false,
                    no:false
                }, 
                others:"",
                automaticTransferSwitchProvided:{
                    yes:false,
                    no:false
                },
                timeInterval:""    
         },
         refuseGarbageHandlingFacilty:{
            provided:{
                yes:false,
                no:false
            },
            enclosureProvided:{
                yes:false,
                no:false
            },
            fireResistive:{
                yes:false,
                no:false
            },
            fireProtectionProvided:{
                yes:false,
                no:false
            },
            type:"",
            frequencyOfCollectionAndDisposal:"",
            howCollected:""

         },
         electricalSystem:{
            isThereAnyElectricalHazard:{
                yes:false,
                no:false
            }, 
            specifyLocation:""
         },
         mechanicalSystem:{
             isThereAnyMechanicalHazard:{
                 yes:false,
                 no:false
             },
             specifyLocation:"",
             noOfElevatorsProvided:"",
             firemansElevatorProvided:{
                 yes:false,
                 no:false
             },
             firemansKeyAndSwitchProvided:{
                 yes:false,
                 no:false
             } 
         },
         otherBuildingServiceSystems:{
            waterTreatmentFacility:false,
            wasteWaterAndSewageTreatmentFacility:false	
         }  
    },
    //  9
       hazardousArea:{
         kitchen:false,
         laundry:false,
         windowlessBasement:false,
         storageRoom:false,
         other:{
             checked:false,
             value:""
         },
         separationFireRated:{
             yes:false,
             no:false
         },
         typeOfFireProtectionProvided:"",
         noOfUnits:"",
         capacity:"",
         accessible:{
             yes:false,
             no:false
         },
         fuelUsed:"",
         whereStored:"",
         coveredByBFPPermit:"",
         chimneyMadeOf:"",
         sparkArrester:"",
         smokeHood:"",
         presenceOfHazardousMaterials:{
             yes:false,
             no:false
         },
         properlyStoredAndHandled:{
             yes:false,
             no:false
         },
         kinds:{
             one:"",
             two:"",
             three:""
         },
         container:{
            one:"",
            two:"",
            three:""
        },
        volume:{
            one:"",
            two:"",
            three:""
        },
        location:{
            one:"",
            two:"",
            three:""
        },
        storagePermitForFlammablesAndCombustiblesCoveredByBFPPermit:"",
        clearanceOfStocksFromCeiling:"" 
    },
    //  10
       operatingFeatures:{
            fireBrigadeOrganization:{
                yes:false,
                no:false
            },
            fireSafetySeminar:{
                yes:false,
                no:false
            },
            employeesTrainedInEmergencyProcedures:{
                yes:false,
                no:false
            },
            fireAndEvacuationDrill:{
                yes:false,
                no:false
            },
            first:"",
            second:""
    },
    //  11
       defectsAndDeficienciesNotedDuringInspection:{
          value:""
    },
    //  12
       recommendations:{
          value:""
    },

       postludes:{
        signatureOverPrintedNameOfOwnerOrRepresentative:"",
        fireSafetyInspectors:"",
        dateAndTime:"",
        teamLeader:"",
        chiefFireSafetyEnforcementSection:"",
        approvedOrDisapproved:"",
        cityMunicipalFireMarshal:""
    },

  })
  
    
    return {
        fsedValue,
        setFsedValue
    }
}