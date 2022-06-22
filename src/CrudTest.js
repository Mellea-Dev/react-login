// import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Container, Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API from "./api/API";

export class CrudTest extends React.Component {
 
 //Updating user
//  setUsers([...users, user]); oo
    constructor() {
      super();
      this.state = {
        isUpdate      : false,
        validated     : false,
        users         : [],
        emp_id        : '',
        name          : '',
        phone         : '',
        email         : '',
        location      : '',
        company       : '',
      };
      this.token=localStorage.getItem('token')
    }

    //user update in local storage
    userUpdate(user, emp_id){
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
        emp_id        : user.emp_id,
        name          : user.name,
        phone         : user.phone,
        email         : user.email,
        location      : user.location,
        company       : user.cmpany
      })
    }
    // delete
    userDelete(id){
      alert('Are you sure you want to delete?')
     const del = this.state.users.filter((user)=>{
      return user.emp_id !== id;
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
      let postData = {
        emp_id        : this.state.emp_id,
        name          : this.state.name,
        phone         : this.state.phone,
        email         : this.state.email,
        location      : this.state.location,
        company       : this.state.company,
        token         : this.token
     }
     
    //  //Updating user 
    //  setUsers([...users, user])
     
    //  axios({
    //      method: 'POST',
    //      url:process.env.BASE_URL + '/admin-register',
    //      data: user,
    //      headers: {
    //          "Content-Type": "application/json",
    //          "Authorization": 'Bearer ' + token,
     
    //      }
    //  })
    //  .then(res => {
    //      let response = res.data 
    //      console.log(JSON.stringify(response))
    //      if(response.status){
            
             
    //      }
    //      else{
    //          //Validation
             
             
    //      }
    //  })
        API.User.create(postData,token) 
        .then(res => {
            let response = res.data
            console.log(JSON.stringify(response))
            if (response.status) {


            } else {
                //Validation


            }
        });
  
    }
    
    
    this.setState({validated: true})
  
    
  };

    handleChange(key,value){
        let data = {}
        data[key] = value;
        this.setState(data);
    } 
  

    componentDidMount() {
        console.log('mounted')
        API.User.getAll(this.token)
        .then(res => {
        this.setState({
            users: res?.data
        })
        
        console.log("data",res?.data)
        console.log("users state", this.state.users)
        })
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
                                                    <th className='text-start'>Name</th>
                                                    <th className='text-start'>Phone</th>
                                                    <th className='text-start'>Email</th>
                                                    <th className='text-start'>Location</th>
                                                    <th className='text-start'>Company</th>
                                                    <th className='text-start' colSpan={2}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {this.state.users.length>0&&(
                                                <>
                                                {this.state.users.map((user,index)=>(
                                                    <tr key={user.emp_id}>
                                                     <td className="text-start">{user.emp_id}</td>
                                                     <td className="text-start">{user.name}</td>
                                                     <td className="text-start">{user.phone}</td>
                                                     <td className="text-start">{user.email}</td>
                                                     <td className="text-start">{user.location}</td>
                                                     <td className="text-start">{user.company}</td>
                                                     {this.state.isUpdate===false&&(
                                                        <>
                                                            <td><Button variant="outline-primary" onClick={()=>this.userUpdate(user,index)}>Edit</Button>{' '}</td>
                                                            <td><Button variant="outline-danger" onClick={()=>this.userDelete(user.emp_id)}>Delete</Button>{' '}</td>
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
                                                            <Form.Label className="float-start mb-0">Name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Fullname"
                                                                onChange={(e)=>this.handleChange('name',e.target.value)} value={this.state.name}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>


                                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                            <Form.Label className="float-start mb-0">Email</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Email"
                                                                onChange={(e)=>this.handleChange('email',e.target.value)} value={this.state.email}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationPhone">
                                                            <Form.Label className="float-start mb-0">Phone</Form.Label>
                                                            <InputGroup hasValidation>
                                                                <Form.Control
                                                                type="text"
                                                                placeholder="Phone"
                                                                aria-describedby="inputGroupPrepend"
                                                                required
                                                                onChange={(e)=>this.handleChange('phone',e.target.value)} value={this.state.phone}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                Please choose a username.
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationEmail5">
                                                            <Form.Label className="float-start mb-0">Location</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Location"
                                                                onChange={(e)=>this.handleChange('location',e.target.value)} value={this.state.location}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">
                                                                Input Location
                                                            </Form.Control.Feedback>
                                                        </Form.Group>


                                                        <Form.Group as={Col} md="6" controlId="validationEmail7">
                                                            <Form.Label className="float-start mb-0 mt-1">Company</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Company"
                                                                onChange={(e)=>this.handleChange('company',e.target.value)} value={this.state.company}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">
                                                                Input Company
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                          
                                                        <Form.Group as={Col} md="6" controlId="validationEmail7">
                                                            <Form.Label className="float-start mb-0 mt-1">ID</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="ID"
                                                                onChange={(e)=>this.handleChange('emp_id',e.target.value)} value={this.state.emp_id}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">
                                                                Input ID
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
                                                        <Form.Label className="float-start mb-0">Name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Name"
                                                            onChange={(e)=>this.handleChange('name',e.target.value)} value={this.state.name}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                        <Form.Label className="float-start mb-0">Email</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Email"
                                                            onChange={(e)=>this.handleChange('email',e.target.value)} value={this.state.email}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationPhone">
                                                        <Form.Label className="float-start mb-0">Phone</Form.Label>
                                                        <InputGroup hasValidation>
                                                            <Form.Control
                                                            type="text"
                                                            placeholder="Phone"
                                                            aria-describedby="inputGroupPrepend"
                                                            required
                                                            onChange={(e)=>this.handleChange('phone',e.target.value)} value={this.state.phone}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                            Please choose a username.
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationEmail5">
                                                        <Form.Label className="float-start mb-0">Location</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Location"
                                                            onChange={(e)=>this.handleChange('location',e.target.value)} value={this.state.location}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Input Location
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationEmail7">
                                                        <Form.Label className="float-start mb-0 mt-1">Company</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Company"
                                                            onChange={(e)=>this.handleChange('company',e.target.value)} value={this.state.company}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Input Company
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

