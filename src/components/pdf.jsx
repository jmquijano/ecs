import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink,BlobProvider,Font,Image } from '@react-pdf/renderer';



 const styles = StyleSheet.create({
  choicesStyle:{
      marginHorizontal:"5px"
  },
  spacedChoices:{
   display:"flex",
   flexDirection:"row",
   justifyContent:"space-between",
   width:"48%"
  },
  rowItem:{
     display:"flex",
     flexDirection:"row",
     width:"100%",
     marginTop:0.5,
     justifyContent:"space-between"
  },
  italicText:{
      fontFamily:"Open Sans",
      fontStyle:"italic"
  },
  noMarginTextHeading:{
    fontFamily:"Open Sans",
    fontSize:"10px",
    fontWeight:"bold",
  },
  textHeading:{
      fontFamily:"Open Sans",
      fontSize:"10px",
      fontWeight:"bold",
      marginLeft:"20px"
  },
  numberedHeading:{
    fontFamily:"Open Sans",
    fontSize:"11px",
    fontWeight:"bold"
  },
  inputRowStyle:{
     height:"12px"
  },
  inputRowContentStyle:{
     fontSize:"9px",
     fontStyle:"italic"
  },
  inputRowSuffixStyle:{
     fontSize:"7px",
     fontStyle:"italic"
 },
 inputColumnLabelStyle:{
  fontSize:"9px",
  marginHorizontal:"auto",
  fontFamily:"Open Sans",
 },
 inputColumnContentStyle:{
   fontSize:"10px",
   fontFamily:"Open Sans",
   
 }
  
})

Font.register({
  family: 'Open Sans',
  fonts: [
  { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
  { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle:"italic" }
  ]
  });


 

// Reuseable Components
const Previewer = (props) => (
  <div style={{ flexGrow: 1,width:"900px", height:"900px" }}>
      <PDFViewer
        showToolbar={false}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </PDFViewer>
      <PDFDownloadLink
        document={props.children}
        fileName={props.pdfTitle || "Some PDF"}
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
    </div>
)

const NoLabelInput=(props)=>(
<View 
  style={{
    display:"flex",
    flexDirection:"row",
    ...props.noLabelInputStyle
  }}
>
  
  
  {/* Input */}
  <View  
     style={{
        display:"flex",
        flexDirection:"column",
        flexGrow:8,
        borderBottom:"1px solid black",
        position:"relative",
        overflow:"hidden",
        ...props.inputStyle
    }}>
        <Text 
           style={{
              overflow:"hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              marginHorizontal:"5px",
              fontFamily:"Open Sans",
              fontStyle:"italic",
              position:"absolute",
              ...props.inputContentStyle
          }}>
          {props.inputContent}
        </Text> 
  </View>

 
  
</View>
)

const TextAreaPdf=(props)=>(
  <View 
    style={{
      display:"flex",
      flexDirection:"row",
      paddingHorizontal:"5px",
      width:"100%",
      ...props.textAreaPdfStyle
    }}
  >
    
    
    {/* Input */}
   
          <Text 
             style={{
                // overflow:"hidden",
                // whiteSpace: "nowrap",
                // textOverflow: "ellipsis",
                textDecoration:"underline",
                width:"100%",
                ...props.inputContentStyle
            }}>
            {props.inputContent.substring(0, props.characterLimit || 250)}
          </Text> 
   
  
   
    
  </View>
  )

const InputRow = (props) => (

  <View 
      style={{
        display:"flex",
        flexDirection:"row",
        ...props.inputRowViewStyle
      }}
  >
    {/* Label */}
      <Text
          style={{
             ...props.inputRowLabelStyle
          }}
      >
        {props.inputLabel}
      </Text>
      
      {/* Input */}
      <View  
         style={{
            display:"flex",
            flexDirection:"column",
            flexGrow:8,
            borderBottom:"1px solid black",
            position:"relative",
            overflow:"hidden",
            ...props.inputRowStyle
        }}>
            <Text 
               style={{
                  overflow:"hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  marginHorizontal:"5px",
                  position:"absolute",
                  ...props.inputRowContentStyle
              }}>
              {props.inputContent}
            </Text> 
      </View>

      {/* Suffix */}
      <Text
          style={{
             ...props.inputRowSuffixStyle,
             
          }}
      >
        {props.inputSuffix}
      </Text>
      
  </View>
)

const DoubleInputRow = (props) => (

  <View 
      style={{
        display:"flex",
        flexDirection:"row",
        ...props.inputRowViewStyle
      }}
  >
    {/* Label 1 */}
      <Text
          style={{
             ...props.inputRowLabelOneStyle
          }}
      >
        {props.inputOneLabel}
      </Text>
      
      {/* Input 1 */}
      <View  
         style={{
            display:"flex",
            flexDirection:"column",
            flexGrow:8,
            borderBottom:"1px solid black",
            position:"relative",
            overflow:"hidden",
            ...props.inputRowOneStyle
        }}>
            <Text 
               style={{
                  overflow:"hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  marginHorizontal:"5px",
                  position:"absolute",
                  ...props.inputRowOneContentStyle
              }}>
              {props.inputOneContent}
            </Text> 
      </View>

      {/* Label 2 */}
      <Text
          style={{
             ...props.inputRowLabelTwoStyle
          }}
      >
        {props.inputTwoLabel}
      </Text>

      {/* Input 2 */}
      <View  
         style={{
            display:"flex",
            flexDirection:"column",
            flexGrow:8,
            borderBottom:"1px solid black",
            position:"relative",
            overflow:"hidden",
            ...props.inputRowTwoStyle
        }}>
            <Text 
               style={{
                  overflow:"hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  marginHorizontal:"5px",
                  position:"absolute",
                  ...props.inputRowTwoContentStyle
              }}>
              {props.inputTwoContent}
            </Text> 
      </View>

      {/* Label 3 */}
      <Text
          style={{
             ...props.inputRowLabelThreeStyle
          }}
      >
        {props.inputThreeLabel}
      </Text>
      
  </View>
)


const InputColumn = (props) => (

  <View 
      style={{
        display:"flex",
        flexDirection:"column",
        ...props.inputColumnViewStyle
        
      }}
  >
      {/* Input */}
      <View  
         style={{
            display:"flex",
            flexDirection:"column",
            flexGrow:8,
            borderBottom:"1px solid black",
            position:"relative",
            overflow:"hidden",
            ...props.inputColumnStyle
        }}>
            <Text 
               style={{
                  overflow:"hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  alignSelf:"center",
                  position:"absolute",
                  ...props.inputColumnContentStyle
              }}>
              {props.inputContent}
            </Text> 
      </View>

      {/* Label */}
      <Text
          style={{
             ...props.inputColumnLabelStyle
          }}
      >
        {props.inputLabel}
      </Text>
  </View>
)

const RegularCheckBox = (props) => (

  <View 
    style={{
      display:"flex",
      flexDirection: "row",
      justifyContent:"flex-start",
      ...props.regularCheckBoxStyle
    }}
  >
    {/* Checkbox for first order */}

     {
        props.checkBoxFirst && <Image 
          src={props.checked ? "https://i.ibb.co/ssYc0hJ/Checked-Checkbox.png" : "https://i.ibb.co/sHJvRRp/un-Checked-Checkbox.png"}
          style={{
            width:"12px",
            ...props.checkBoxStyle
          }}
          />
     }

     {/* Checkbox for first order */}

     {/* Checkbox label */}

      <Text
        style={{
          ...props.checkBoxLabelStyle
        }}
      >
        {props.regularCheckBoxLabel}
      </Text>

      {/* Checkbox label */}  


     {/* Checkbox for second order */}

     {
        props.checkBoxFirst === false && <Image 
          src={props.checked ? "https://i.ibb.co/ssYc0hJ/Checked-Checkbox.png" : "https://i.ibb.co/sHJvRRp/un-Checked-Checkbox.png"}
          style={{
            width:"12px",
            ...props.checkBoxStyle
          }}
          />
     }

      {/* Checkbox for second order */}

  </View>
)

const ChoicesCheckBox = (props) => (

  <View 
    style={{
      display:"flex",
      flexDirection: "row",
      ...props.choicesViewStyle
    }}
  >
    {/* Choices Label first order */}

    { 
        props.choicesLabelFirst &&
        <Text
        style={{
          ...props.choicesLabelStyle
        }}
        >
          {props.choicesLabel}
        </Text>
    }


    {/* Choices Label first order */}

    {/* Choices */}

    <View
       style={{
        display:"flex",
        flexDirection: "row",
      }}
    >
      {
            props.choices?.map(i=>(
              <View
                key={i.label}
                style={{
                  display:"flex",
                  flexDirection: "row",
                  ...props.choicesCheckBoxStyle
                }}
              >
                 {props.checkBoxLabelFirst &&
                      <Text
                      style={{
                        ...props.checkBoxLabelStyle
                      }}
                    >{i.label}</Text> 
                 }
                  
                  <Image 
                    src={i.checked ? "https://i.ibb.co/ssYc0hJ/Checked-Checkbox.png" : "https://i.ibb.co/sHJvRRp/un-Checked-Checkbox.png"}
                    style={{
                      width:"12px",
                      ...props.checkBoxStyle
                    }}
                    />

                 {props.checkBoxLabelFirst === false &&
                      <Text
                      style={{
                        ...props.checkBoxLabelStyle
                      }}
                    >{i.label}</Text> 
                 }  
              </View>
            ))
      }  
        
    </View>

    {/* Choices */}

    {/* Choices Label second order */}

    { 
        props.choicesLabelFirst === false &&
        <Text
          style={{
            ...props.choicesLabelStyle
          }}
        >
          {props.choicesLabel}
        </Text>
    }

    {/* Choices Label second order */}
  </View>

)
// Reuseable Components










export {NoLabelInput,InputRow,InputColumn,RegularCheckBox,ChoicesCheckBox,TextAreaPdf,Previewer,DoubleInputRow,styles} 