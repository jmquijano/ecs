import React, { useState } from 'react'

const Sampleform = ({setPdfValue}) => {
    const [formValue,setFormValue]= useState({
        sectionOne:{
            nameOfOwner:"",
            nameOfEstablishment:"",
            address:"",
            date:"",
            inspectionOrderNo:"",
            dateIssued:"",
            dateOfInspection:"",
        },
       sectionTwo:{
        buildingUnderConstruction:false,
        periodicInspectionOfOccupancy:false,
        applicationForOccupancyPermit:false,
        verificationinspectionOfcomplianceToNTCV:false,
        applicationForBusinessPermit:false,
        verificationinspectionOfComplaintReceived:false,
        others:false,
        specify:""
       },
       sectionThree:{
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
       sectionFour:{
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
       sectionFive:{
        sectionalOccupancy:"" 
       },
       sectionSix:{
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
       sectionSeven:{
        capacityOfHorizontalExit:"",
        capacityOfExitStair:"",
        noOfExits:"",
        remote:{
          yes:false,
          no:false
        },
        locationOfExit:""
       }

     
    })

    const onSubmit = (e)=>{
      e.preventDefault()
      console.log(formValue)
      setPdfValue(formValue)
    }
  return (
    <form
     onSubmit={onSubmit}
     style={{
         display:"flex",
         flexDirection:"column",
         height:"100%"
     }}
    >
      <p>Section 1</p>
        <label>(Name of Owner)</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionOne:{...formValue.sectionOne,nameOfOwner:e.target.value}})}/>
        <label>(Name of Establishment)</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionOne:{...formValue.sectionOne,nameOfEstablishment:e.target.value}})}/>
        <label>(Address)</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionOne:{...formValue.sectionOne,address:e.target.value}})}/>
        <label>DATE</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionOne:{...formValue.sectionOne,date:e.target.value}})}/>
        <label>INSPECTION ORDER NO.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionOne:{...formValue.sectionOne,inspectionOrderNo:e.target.value}})}/>
        <label>DATE ISSUED</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionOne:{...formValue.sectionOne,dateIssued:e.target.value}})}/>
        <label>DATE OF INSPECTION</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionOne:{...formValue.sectionOne,dateOfInspection:e.target.value}})}/>

        <p>Section 2</p>
        <h2>[]Check Appropriate Box</h2>

        <label>Building Under Construction</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,buildingUnderConstruction:!formValue.sectionTwo.buildingUnderConstruction}})}/>
        <label>Periodic Inspection of Occupancy</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,periodicInspectionOfOccupancy:!formValue.sectionTwo.periodicInspectionOfOccupancy}})}/>
        <label>Application for Occupancy Permit</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,applicationForOccupancyPermit:!formValue.sectionTwo.applicationForOccupancyPermit}})}/>
        <label>Verification Inspection of Compliance to NTCV</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,verificationinspectionOfcomplianceToNTCV:!formValue.sectionTwo.verificationinspectionOfcomplianceToNTCV}})}/>
        <label>Application for Business Permit</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,applicationForBusinessPermit:!formValue.sectionTwo.applicationForBusinessPermit}})}/>
        <label>Verification Inspection of Complaint Received</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,verificationinspectionOfComplaintReceived:!formValue.sectionTwo.verificationinspectionOfComplaintReceived}})}/>
        <label>Others </label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,others:!formValue.sectionTwo.others}})}/>
        <label>(Specify)</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionTwo:{...formValue.sectionTwo,specify:e.target.value}})}/>

        <p>section 3</p>
        <label>Name of Building</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,nameOfBuilding:e.target.value}})}/>
        <label>Business Name</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,businessName:e.target.value}})}/>
        <label>Address</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,address:e.target.value}})}/>
        <label>Nature of Business</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,natureOfBusiness:e.target.value}})}/>

        <label>Name of Owner/Occupant</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,nameOfOwnerOrOccupant:e.target.value}})}/>
        <label>Contact No.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,contactNo:e.target.value}})}/>

        <label>Name of Representative</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,nameOfRepresentative:e.target.value}})}/>
        <label>Contact No.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,contactNo2:e.target.value}})}/>

        <label>No. of Storey</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,noOfStorey:e.target.value}})}/>
        <label>Height of B1dg.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,heightOfBldg:e.target.value}})}/>
        <label>Portion Occupied</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,portionOccupied:e.target.value}})}/>

        <label>Area per flr</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,areaPerFlr:e.target.value}})}/>
        <label>Total Flr. Area </label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,totalFlrArea:e.target.value}})}/>

        <label>Building Permit No </label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,buildingPermitNo:e.target.value}})}/>
        <label>Date Issue</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssue:e.target.value}})}/>
        <label>Occupancy Permit No.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,occupancyPermitNo:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued:e.target.value}})}/>

        <label>Latest FSIC Issued Control No.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,latestFSICIssuedControlNo:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued2:e.target.value}})}/>
        <label>FC Fee</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,fCFee:e.target.value}})}/>
        

        <label>Certificate of Fire Drill</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,certificateOfFireDrill:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued3:e.target.value}})}/>
        <label>FC Fee</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,fCFee2:e.target.value}})}/>

        <label>Latest Notice to Correct Violations Control No.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,latestNoticeToCorrectViolationsControlNo:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued4:e.target.value}})}/>

        <label>Name of Fire Insurance Co/Co-Insurer</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,nameOfFireInsuranceCoOrCoInsurer:e.target.value}})}/>
        <label>Policy No</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,policyNo:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued5:e.target.value}})}/>

        <label>Latest Mayor's/Bus. Permit </label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,latestMayorsOrBusPermit:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued6:e.target.value}})}/>
        <label>Municipal License No.</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,municipalLicenseNo:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued7:e.target.value}})}/>

        <label>Latest Certificate of Electrical Inspection No. </label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,LatestCertificateofElectricalInspectionNo:e.target.value}})}/>
        <label>Date Issued</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,dateIssued8:e.target.value}})}/>

        <label>Other Information</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionThree:{...formValue.sectionThree,otherInformation:e.target.value}})}/>

        <p>section 4</p>

        <label>Beams </label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,beams:e.target.value}})}/>
        <label>Columns</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,columns:e.target.value}})}/>
        <label>Flooring</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,flooring:e.target.value}})}/>

        <label>Exterior Walls</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,exteriorWalls:e.target.value}})}/>
        <label>Corridor Walls</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,corridorWalls:e.target.value}})}/>
        <label>Room Partitions</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,roomPartitions:e.target.value}})}/>

        <label>Main Stair</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,mainStair:e.target.value}})}/>
        <label>Windows</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,windows:e.target.value}})}/>
        <label>Ceiling</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,ceiling:e.target.value}})}/>

        <label>Main Door</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,mainDoor:e.target.value}})}/>
        <label>Trusses</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,trusses:e.target.value}})}/>
        <label>Roof</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFour:{...formValue.sectionFour,roof:e.target.value}})}/>

        <p>section 5</p>
        <label>Indicate specific usage of each floor, section or rooms</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionFive:{...formValue.sectionFive,sectionalOccupancy:e.target.value}})}/>

        <p>section 6</p>
        <label>Occupant Load</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionSix:{...formValue.sectionSix,occupantLoad:e.target.value}})}/>
        <label>Egress capacity</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionSix:{...formValue.sectionSix,egresscapacity:e.target.value}})}/>

        <p>Any Renovations</p>
        <label>Yes</label>
        <input type={"checkbox"}  onChange={(e)=>setFormValue({...formValue,sectionSix:{...formValue.sectionSix,anyRenovations:{...formValue.sectionSix.anyRenovations,yes:!formValue.sectionSix.anyRenovations.yes}}})}/>
        <label>No</label>
        <input type={"checkbox"}  onChange={(e)=>setFormValue({...formValue,sectionSix:{...formValue.sectionSix,anyRenovations:{...formValue.sectionSix.anyRenovations,no:!formValue.sectionSix.anyRenovations.no}}})}/>
        
        <p>Windowless</p>
        <label>Yes</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionSix:{...formValue.sectionSix,windowless:{...formValue.sectionSix.windowless,yes:!formValue.sectionSix.windowless.yes}}})}/>
        <label>No</label>
        <input type={"checkbox"} onChange={(e)=>setFormValue({...formValue,sectionSix:{...formValue.sectionSix,windowless:{...formValue.sectionSix.windowless,no:!formValue.sectionSix.windowless.no}}})}/>


        <p>section 7</p>
        <label>Capacity of Horizontal Exit (Corridor Hallway)</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionSeven:{...formValue.sectionSeven,capacityOfHorizontalExit:e.target.value}})}/>

        <label>Capacity of Exit Stair: </label>
        <input onChange={(e)=>setFormValue({...formValue,sectionSeven:{...formValue.sectionSeven,capacityOfExitStair:e.target.value}})}/>

        <label>No. of Exits</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionSeven:{...formValue.sectionSeven,noOfExits:e.target.value}})}/>

        <p>Remote</p>
        <label>Yes</label>
        <input type={"checkbox"}  onChange={(e)=>setFormValue({...formValue,sectionSeven:{...formValue.sectionSeven,remote:{...formValue.sectionSeven.remote,yes:!formValue.sectionSeven.remote.yes}}})}/>
        <label>No</label>
        <input type={"checkbox"}  onChange={(e)=>setFormValue({...formValue,sectionSeven:{...formValue.sectionSeven,remote:{...formValue.sectionSeven.remote,no:!formValue.sectionSeven.remote.no}}})}/>
        
        <label>Location of Exit</label>
        <input onChange={(e)=>setFormValue({...formValue,sectionSeven:{...formValue.sectionSeven,locationOfExit:e.target.value}})}/>

        <button type="submit">Submit</button>
    </form>
  )
}

export default Sampleform