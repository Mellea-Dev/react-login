// import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Container, Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export class CrudTest extends React.Component {
 
 //Updating user
//  setUsers([...users, user]); oo
    constructor() {
      super();
      this.state = {
        isUpdate      : false,
        validated     : false,
        users         : [],
        id            : '',
        firstname     : '',
        lastname      : '',
        middleinitial : '',
        username      : '',
        email         : '',
        contact       : '',
        password      : '',
      };

    }

    //user update in local storage
    userUpdate(user, index){
      // setForm(true)
      // setId(index);
      // setFirstName(user.firstname);
      // setMiddleInitial(user.middleinitial)
      // setLastName(user.lastname);
      // setUserName(user.username);
      // setEmail(user.email);
      // setContact(user.contact);
      // setPassword(user.password);
      this.setState({
        isUpdate      : false,
        id            : index,
        firstname     : user.firstname,
        lastname      : user.lastname,
        middleinitial : user.middlename,
        username      : user.username,
        email         : user.email,
        contact       : user.contact,
        password      : user.password
      })
    }
    // delete
    userDelete(id){
      alert('Are you sure you want to delete?')
     const del = this.state.users.filter((user)=>{
      return user.id !== id;
     })
     this.setState({
       users: del
     })
     
   }

   //User Submit Create
   handleUserSubmit = (e) =>{
    let token = localStorage.getItem('token') 
    const form = e.currentTarget; 
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
 
 
    else if(form.checkValidity() === true){
      //Create user
      let user = {
         id         : this.state.id,
         fname      : this.state.firstname,
         lname      : this.state.lastname,
         username   : this.state.username,
         mname      : this.state.middleinitial,
         email      : this.state.email,
         contact    : this.state.contact,
         password   : this.state.password    
     }
     
    //  //Updating user 
    //  setUsers([...users, user])
     
     axios({
         method: 'POST',
         url:'https://marketplace2.unified.ph/admin-register',
         data: user,
         headers: {
             "Content-Type": "application/json",
             "Authorization": 'Bearer ' + token,
     
         }
     })
     .then(res => {
         let response = res.data 
         console.log(JSON.stringify(response))
         if(response.status){
            
             
         }
         else{
             //Validation
             
             
         }
     })
         
        
       
  
    }
    
    
    this.setState({validated: true})
  
    
  };

  handleChange(key,value){
    let data = {}
    data[key] = value;
    this.setState(data);
  }
  
    componentDidMount() {
    }
  
    componentWillUnmount() {
    }
  
    render() {
      return (
        <div className='data-app'>
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
                <Container className='main-con'>
                    <Row className="d-flex justify-content-center">
                        <Col xxl={12} >
                            <Row>
                                {/* TABLE */}
                                <Col xl={8}>
                                    <Card className="card-round">
                                    <Card.Body>
                                    <Table responsive className='table-borderless'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th className='text-start'>First Name</th>
                                                    <th className='text-start'>Middle Initial</th>
                                                    <th className='text-start'>Last Name</th>
                                                    <th className='text-start'>Username</th>
                                                    <th className='text-start'>Email</th>
                                                    <th className='text-start'>Contact #</th>
                                                    <th className='text-start' colSpan={2}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {this.state.users.length>0&&(
                                                <>
                                                {this.state.users.map((user,index)=>(
                                                    <tr key={user.id}>
                                                     <td className="text-start">{user.id}</td>
                                                     <td className="text-start">{user.firstname}</td>
                                                     <td className="text-start">{user.middleinitial}</td>
                                                     <td className="text-start">{user.lastname}</td>
                                                     <td className="text-start">{user.username}</td>
                                                     <td className="text-start">{user.email}</td>
                                                     <td className="text-start">{user.contact}</td>
                                                     {this.state.isUpdate===false&&(
                                                        <>
                                                            <td><Button variant="outline-primary" onClick={()=>this.userUpdate(user,index)}>Edit</Button>{' '}</td>
                                                            <td><Button variant="outline-danger" onClick={()=>this.userDelete(user.id)}>Delete</Button>{' '}</td>
                                                        </>
                                                     )}
                                                     {this.state.isUpdate===true&&(
                                                        <>
                                                            <td><Button variant="primary" disabled>Edit</Button>{' '}</td>
                                                            <td><Button variant="danger" disabled>Delete</Button>{' '}</td>
                                                        </>
                                                     )}
                                                    </tr>
                                                ))}
                                                </>
                                               )}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    </Card>
                                </Col>
                                {/* CREATE FORM */}
                                {this.state.isUpdate===false&&(
                                   <Col xl={4}>
                                        <Card className="card-round">
                                            <Card.Body>
                                                <h3><FontAwesomeIcon icon={faUser} className="me-2"/> Add Users</h3>
                                                <Form noValidate validated={this.state.validated} onSubmit={this.handleUserSubmit} className="userform">
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                            <Form.Label className="float-start mb-0">First name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="First name"
                                                                onChange={(e)=>this.handleChange('firstname',e.target.value)} value={this.state.firstname}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                            <Form.Label className="float-start mb-0">Middle Initial</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Middle Initial"
                                                                onChange={(e)=>this.handleChange('middleinitial',e.target.value)} value={this.state.middleinitial}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                            <Form.Label className="float-start mb-0">Last name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Last name"
                                                                onChange={(e)=>this.handleChange('lastname',e.target.value)} value={this.state.lastname}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                                                            <Form.Label className="float-start mb-0">Username</Form.Label>
                                                            <InputGroup hasValidation>
                                                                <Form.Control
                                                                type="text"
                                                                placeholder="Username"
                                                                aria-describedby="inputGroupPrepend"
                                                                required
                                                                onChange={(e)=>this.handleChange('username',e.target.value)} value={this.state.username}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                Please choose a username.
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationEmail">
                                                            <Form.Label className="float-start mb-0">Email</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="email"
                                                                placeholder="Email"
                                                                onChange={(e)=>this.handleChange('email',e.target.value)} value={this.state.email}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">
                                                                Use Email
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="12" controlId="validationEmail">
                                                            <Form.Label className="float-start mb-0">Password</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="password"
                                                                placeholder="Input Password"
                                                                onChange={(e)=>this.handleChange('password',e.target.value)} value={this.state.password}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">
                                                                Input Password!!!
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationEmail">
                                                            <Form.Label className="float-start mb-0 mt-1">ID</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Create Your ID"
                                                                onChange={(e)=>this.handleChange('id',e.target.value)} value={this.state.id}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">
                                                                Input ID
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationEmail">
                                                            <Form.Label className="float-start mb-0 mt-1">Contact #</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="number"
                                                                placeholder="contact"
                                                                onChange={(e)=>this.handleChange('contact',e.target.value)} value={this.state.contact}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">
                                                                Must Input Numbers.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <div className="d-grid gap-2">
                                                        <Button type="submit"><FontAwesomeIcon icon={faPenToSquare} className="me-2"/>Submit form</Button>
                                                    </div>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                   </Col>
                                )}
                               {/* UPDATE FORM */}
                               {this.state.isUpdate===true&&(
                                   <Col xl={4}>
                                        <Card className="card-round">
                                            <Card.Body>
                                                <h3><FontAwesomeIcon icon={faUser} className="me-2"/> Update Users</h3>
                                                <Form noValidate validated={this.state.validated} onSubmit={this.handleUserUpdate} className="userform">
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                        <Form.Label className="float-start mb-0">First name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="First name"
                                                            onChange={(e)=>this.handleChange('firstname',e.target.value)} value={this.state.firstname}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                        <Form.Label className="float-start mb-0">Middle Initial</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Middle Initial"
                                                            onChange={(e)=>this.handleChange('middleinitial',e.target.value)} value={this.state.middleinitial}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                        <Form.Label className="float-start mb-0">Last name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Last name"
                                                            onChange={(e)=>this.handleChange('lastname',e.target.value)} value={this.state.lastname}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                                                        <Form.Label className="float-start mb-0">Username</Form.Label>
                                                        <InputGroup hasValidation>
                                                            <Form.Control
                                                            type="text"
                                                            placeholder="Username"
                                                            aria-describedby="inputGroupPrepend"
                                                            required
                                                            onChange={(e)=>this.handleChange('username',e.target.value)} value={this.state.username}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                            Please choose a username.
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationEmail">
                                                        <Form.Label className="float-start mb-0">Email</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="email"
                                                            placeholder="Email"
                                                            onChange={(e)=>this.handleChange('email',e.target.value)} value={this.state.email}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Use Email
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="12" controlId="validationEmail">
                                                        <Form.Label className="float-start mb-0">Password</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            placeholder="Input Password"
                                                            onChange={(e)=>this.handleChange('password',e.target.value)} value={this.state.password}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Input Password!!!
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationEmail">
                                                        <Form.Label className="float-start mb-0 mt-1">ID</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Create Your ID"
                                                            onChange={(e)=>this.handleChange('id',e.target.value)} value={this.state.id}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Input ID
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationEmail">
                                                        <Form.Label className="float-start mb-0 mt-1">Contact #</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            placeholder="contact"
                                                            onChange={(e)=>this.handleChange('contact',e.target.value)} value={this.state.contact}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Must Input Numbers.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <div className="d-grid gap-2">
                                                    <Button type="submit"><FontAwesomeIcon icon={faPenToSquare} className="me-2"/>Submit form</Button>
                                                </div>
                                            </Form>
                                            </Card.Body>
                                        </Card>
                                   </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </ThemeProvider>
        </div>
      );
  }
}

