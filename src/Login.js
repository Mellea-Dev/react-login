
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import gifBg from './login-bg.gif';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Login(){
   

    let navigate = useNavigate();
    
    useEffect(() =>{
        if(!(localStorage.getItem('token')==="null" || localStorage.getItem('token')==="" || localStorage.getItem('token')===null)){
         navigate('/dashboard')
        }
        
    }, [])
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    
    
    const hundleLogin = (e) =>{
       e.preventDefault();
       console.log(username,password);
        axios({
            method: 'POST',
            url:'https://marketplace2.unified.ph/Login',
            data: {
                username: username,
                password: password
            },
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            let response = res.data 
            console.log(JSON.stringify(response))
            if(response.status){
                localStorage.setItem('token', response.token)
                localStorage.setItem('username',username)
            
                navigate('/dashboard')
            }
            else{
                //Validation
                setShow(true);
                
            }
        })
    }
   

    return(
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
            <Container className='main-con'>
                <Row className='d-flex justify-content-center'>
                    <Col xxl={10}>
                    <Card className="card-round mt-5">
                            <Card.Body>
                                <Form noValidate  className="userform" onSubmit={hundleLogin}>
                                   <Row className='d-flex justify-content-center'>
                                     <Col xxl={7}>
                                     <Row className="mb-3 ms-2">
                                        <Col>
                                        <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>
                                                In Valid User Credentials!!
                                            </p>
                                        </Alert>
                                        <Card.Title className='mt-5 mb-5'> <h3>User Login</h3> </Card.Title>
                                        </Col>
                                        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                            {/* <Form.Label className="float-start mb-0">Username</Form.Label> */}
                                            <InputGroup hasValidation >
                                                <Form.Control
                                                className='input-round mb-3'
                                                size='lg'
                                                type="text"
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                onChange={(e)=>setUsername(e.target.value)} value={username} 
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
    
                                    
                                        <Form.Group as={Col} md="12" controlId="validationEmail">
                                            {/* <Form.Label className="float-start mb-0">Password</Form.Label> */}
                                            <Form.Control
                                                className='input-round'
                                                size='lg'
                                                required
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e)=>setPassword(e.target.value)} value={password} 
                                                />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                Input Password!!!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className="d-grid gap-2 mt-4">
                                          <Button type="submit" className='btn-lg'>Login</Button>
                                        </div> 
                                    </Row>
                                    
                                     </Col>
                                     <Col xxl={5} >
                                        <img src={gifBg} alt="" className='img-fluid'/>
                                     </Col>
                                   </Row>
                                    
                                    
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
        )
    
}



export default Login;