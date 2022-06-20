import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
function Dashboard(){
    // let navigate = useNavigate();
    const username = useState(localStorage.getItem('username'))
    const logout = ()=>{
        window.localStorage.setItem('token', null);
        window.localStorage.setItem('username', null);
        window.location.replace('/login')
    } 

    if(window.localStorage.getItem('token')==='null'|| window.localStorage.getItem('token')==='' || window.localStorage.getItem('token')===null){
        window.location.replace('/login')
    }

    else{
        return (
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
                <Container className='main-con'>
                    <Row className='d-flex justify-content-center'>
                    <Col xxl={3}>
                        <Card className="card-round">
                            <Card.Title className='mt-4'> <h3>User Login </h3> </Card.Title>
                            <Card.Body>
                                <h1>Hello {username}</h1>
                                <Button onClick={logout}>
                                    Logout
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </ThemeProvider>
        )
    }
}

export default Dashboard;