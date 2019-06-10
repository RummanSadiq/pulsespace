import React, { Component } from 'react';
import {Row, Col, Card, Icon, Avatar,Badge } from 'antd';
class Footer extends Component {
    state = {  }
    render() { 
        const d={
            background: '#154360', 
            padding: '30px'
            
        }
        const c={
            width: 300,
            background: '#154360',
            color: '#FDFEFE',
            margin:'0',    
        }

        
        return ( 
            <div>
                <div style={d}>
                <Row type="flex" justify="center">
                    <Col xs={{ span: 20, }} sm={{ span: 16,  }} md={{span :6}} lg={{span:6}} xl={{span :6}}   >
                    <Card  bordered={false} style={c}>
                    <h2 style={{color: '#FDFEFE'}}>Shopx</h2>
                    <a href='#' style={{color:'#FDFEFE'}}>About Us</a><br></br>
                    <a href='#' style={{color:'#FDFEFE'}}>Contact Us</a><br></br>
                    <a href='#' style={{color:'#FDFEFE'}}>Help</a><br></br>
                    <a href='#' style={{color:'#FDFEFE'}}>Terms and Conditions </a><br></br>
                    </Card>
                    </Col>

                    <Col xs={{ span: 20, }} sm={{ span: 16,  }} md={{span : 6}} lg={{span:6}} xl={{span :6}} >
                    <Card bordered={false} style={c}>
                    <h2 style={{color: '#FDFEFE'}}>Join Us</h2>
                    <a href='#' style={{color:'#FDFEFE'}}>Become a Shop owner</a><br></br>
                    <a href='#' style={{color:'#FDFEFE'}}>Become a Customer</a><br></br>
                    <a href='#' style={{color:'#FDFEFE'}}>Help</a><br></br>
                    <a href='#' style={{color:'#FDFEFE'}}>Terms and Conditions </a><br></br>
                    </Card>
                    </Col>
                    
                    <Col xs={{ span: 20, }} sm={{ span: 16,  }} md={{span :6}} lg={{span:6}} xl={{span :6}}  >
                    <Card  bordered={false} style={c}>
                    <h2 style={{color: '#FDFEFE'}}>Follow Us</h2>
                    <a href='https://web.facebook.com/'><img alt="facebook" src="http://dublinnorthdriving.com/wp-content/uploads/2016/10/fb_icon.png" style={{width:50,height:50}}></img> </a> 
                    <a href='https://www.instagram.com/' ><img border="0" alt='instagram' src="http://www.isiccard.ie/wp-content/uploads/2018/02/instagram.jpg" style={{width:40,height:40 , borderRadius:7}}></img></a>
                    <a href='https://twitter.com/'><img alt="twitter" src="https://seeklogo.com/images/T/twitter-2012-negative-logo-5C6C1F1521-seeklogo.com.png" style={{width:40,height:40 , borderRadius:5, paddingLeft:5,}}></img> </a>
                    </Card>
                    </Col>
                </Row>
                </div>
            </div>



         );
    }
}
 
export default Footer;