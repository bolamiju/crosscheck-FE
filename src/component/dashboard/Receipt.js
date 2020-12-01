import React from 'react';
import Logo from "../../asset/CrossCheckLogo.png";
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

const Receipt = () => {

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          width:"100%",
          orientation: "portrait",
        }, 
        image: {
            width: '150px',
            height:"30px",
            // marginLeft: "1.5rem",
            backgroundColor: 'red',
          },
      });
    return (
        <div>
            <Document>
                <Page object-fit="fill" size="A4" style={styles.page}>
                    <View style={{ width: '100%', height: '100%', paddingLeft: '1.5rem', display: "flex", justifyContent: "space-between"}}>
                        <Image
                            src={Logo} 
                            object-fit="fill"  
                            style={styles.image}
                        />
                        <Text style={{fontSize: "2rem",  paddingRight: '3rem',}}>Receipt</Text>
                    </View>
                    <View style={{ width: '100%', height: '100%', paddingLeft: '1.5rem', display: 'block'}}>
                        <Text style={{fontWeight: "bold"}}>CrossCheck Limited </Text>
                        <Text style={{fontSize: "0.85rem"}}><br/>Company No. 05689362 <br/>Vat ID 8172893638 <br/> 10 Ikeja <br/> Lagos Nigeria <br/> Nigeria</Text>
                    </View>
                    <View style={{ width: '100%', height: '100%', paddingLeft: '1.5rem', display: 'flex', alignItems: 'center', marginTop: '1.5rem'}}>
                        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '0.95rem'}}>
                            <Text style={{paddingBottom: '0.4rem'}}>Customer</Text>
                            <Text style={{paddingBottom: '0.4rem'}}>Trapezoid Limited</Text>
                            <Text style={{paddingBottom: '0.4rem'}}>Nigeria</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '34rem', fontSize: '0.95rem'}}>
                            <Text style={{marginLeft: '0.5rem'}}>Invoice  Date</Text>
                            <Text style={{marginLeft: '1.9rem'}}>Invoice  #</Text>
                            <Text style={{marginLeft: '1.6rem'}}>Receipt id</Text>
                            <Text>Transaction id</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column' , marginLeft: '2.8rem', fontSize: '0.95rem'}}>
                            <Text style={{marginLeft: '0.5rem'}}>18 jul 2018</Text>
                            <Text style={{marginLeft: '2.6rem'}}>86354</Text>
                            <Text style={{marginLeft: '2.6rem'}}>84986</Text>
                            <Text>0976384986</Text>
                        </View>
                    </View>
                    <View style={{textDecoration: "none", float: "right", backgroundColor: "red", color: "white", padding: "0.6rem", marginTop: "1rem", marginRight: "2rem"}}>
                        <a style={{ textDecoration: "none", color: "white", }} href="blob:https://crosschek.netlify.app/receipts" target="_blank" download="document.pdf" class="css-1gjdw1v"><span>Download</span><span class="icon-download  css-17nfp2s" role="button" tabindex="0"></span></a>
                    </View>
                </Page>
            </Document>
        </div>
    )
};




export default Receipt
