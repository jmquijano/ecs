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

const PageWrapper = (props) => {
  return (
    
    <Page 
      size='LEGAL'
      style={{
          display: 'flex',
          flexDirection: 'row',
          fontSize:"9px",
          fontFamily:"Open Sans",
      }}
    >
        <View
          style={{
              margin:25,
              width: '100%',
              display:"flex",
              flexDirection: "column", 
              fontFamily:"Open Sans",
          }}
        >
    
        {props.children}
        </View>

    </Page>

  )
}

export default PageWrapper