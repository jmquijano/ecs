import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink,BlobProvider,Font,Image } from '@react-pdf/renderer';


Font.register({
  family: 'Open Sans',
  fonts: [
  { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
  { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle:"italic" }
  ]
  });

const FormHeader = () => {
  return (
    <View
    style={{
        display:"flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        fontSize:"12px"
    }}
    >
        <Image
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwzfqKrifKq6tGo02GF6S-MDtb7OBZqkRlg&usqp=CAU"}
            style={{
            width:"65px"
            }}
        />
        <View
            style={{
            width:"300px",
            textAlign:"center"
            }}
        >
                <Text
                style={{
                    color:"gray"
                }}
                >
                    Republic of the Philippines
                </Text>
                <Text
                    style={{
                    color:"gray",
                    fontFamily:"Open Sans",
                    fontWeight:"bold"
                    }}
                >
                    Department of the Interior and Local Government 
                </Text>
                <Text
                style={{
                    color:"gray",
                    fontFamily:"Open Sans",
                    fontWeight:"bold"
                }}
                >
                    Bureau of Fire Protection 
                </Text>
        </View>
        <Image
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwzfqKrifKq6tGo02GF6S-MDtb7OBZqkRlg&usqp=CAU"}
            style={{
            width:"65px"
            }}
        />
    </View>
  )
}

export default FormHeader