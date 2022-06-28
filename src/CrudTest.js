import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare, faCheck} from '@fortawesome/free-solid-svg-icons'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Modal, Alert, ModalTitle } from 'react-bootstrap';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from "./api/API";
import _ from 'lodash';
import warningimg from "./Warning.gif";
import empty from "./Empty.gif";

export class CrudTest extends React.Component {
 
 //Updating user
//  setUsers([...users, user]); oo
    constructor() {
      super();
      this.state = {
        isShowModal   : false,
        isShowModal2  : false,
        isShowLogout  : false,
        isUpdate      : false,
        alertPhone    : false,
        alertId       : false,
        alertEmail    : false,
        validated     : false,
        alertCreate   : false,
        alertUpdate   : false,
        alertDelete   : false,
        users         : [],
        id            : '',
        emp_id        : '',
        name          : '',
        phone         : '',
        email         : '',
        location      : '',
        company       : '',
      };
      this.token=localStorage.getItem('token')
     
    }

   
   //validateSubmitForm
   validateForm = (e) =>{
    const form = e.currentTarget; 
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
 
 
    else if(form.checkValidity() === true){
      //Create user
      
     this.setState({
        isShowModal : true
     })
     
    }
    this.setState({validated: true})
   }
   //validateUpdateForm
   validateForm2 = (e) =>{
    const form = e.currentTarget; 
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
 
 
    else if(form.checkValidity() === true){
      //Create user
      
     this.setState({
        isShowModal2 : true
     })
     
    }
    this.setState({validated: true})
   }

    handleCreate = () =>{
        const { navigate } = this.props;
        let postData = {
            emp_id        : this.state.emp_id,
            name          : this.state.name,
            phone         : this.state.phone,
            email         : this.state.email,
            location      : this.state.location,
            company       : this.state.company,
            token         : this.token
        }
       API.User.create(postData,this.token) 
        .then(response => {
            let res = response.data
            console.log(JSON.stringify(res))
            console.log(response)
            if (res.status) {
                this.setState({
                    isShowModal   : false,
                    validated     : false,
                    emp_id        : '',
                    name          : '',
                    phone         : '',
                    email         : '',
                    location      : '',
                    company       : '',
                    token         : '',
                 })

                 // field Validation
                 if(res.status === "fail"){
                    console.log(res.message)
                    if(res.message[0] === "The phone must be a number." || res.message[1] === "The phone must be a number." || res.message[2] === "The phone must be a number."){
                        this.setState({
                            alertPhone : true
                        })
                    }
                    if(res.message[0] === "The emp id must be a number." || res.message[1] === "The emp id must be a number." || res.message[2] === "The emp id must be a number."){
                        this.setState({
                            alertId : true
                        })
                    }
                    if(res.message[0] === "The email has already been taken." || res.message[1] === "The email has already been taken." || res.message[2] === "The email has already been taken."){
                        this.setState({
                            alertEmail : true
                        })
                    }
                 }
                 else{
                    this.setState({
                        alertCreate   : true,
                    })
                 } 
                this.getUsers()
            }
            
            
            
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                window.localStorage.setItem('token', null);
                navigate('/login')
             }
        });

        
    }


    //user update user states
    userUpdate(user){
        this.setState({
          isUpdate      : true,
          id            : user.id,
          emp_id        : user.emp_id,
          name          : user.name,
          phone         : user.phone,
          email         : user.email,
          location      : user.location,
          company       : user.company
        })
    }

    handleUpdate = (e) =>{
        const { navigate } = this.props;
        e.preventDefault();
        let putData = {
            id            : this.state.id,
            emp_id        : this.state.emp_id,
            name          : this.state.name,
            phone         : this.state.phone,
            email         : this.state.email,
            location      : this.state.location,
            company       : this.state.company,
            token         : this.token
        }
        API.User.update(putData, this.state.id, this.token)
        .then(response => {
            let res = response.data;
            if(res.status){
                this.setState({
                    isShowModal2 : false,
                    validated    : false,
                    isUpdate     : false,
                    emp_id       : '',
                    name         : '',
                    phone        : '',
                    email        : '',
                    location     : '',
                    company      : ''
                })
                // field Validation
                if(res.status === "fail"){
                    console.log(res.message)
                    if(res.message[0] === "The phone must be a number." || res.message[1] === "The phone must be a number." || res.message[2] === "The phone must be a number."){
                        this.setState({
                            alertPhone : true
                        })
                    }
                    if(res.message[0] === "The emp id must be a number." || res.message[1] === "The emp id must be a number." || res.message[2] === "The emp id must be a number."){
                        this.setState({
                            alertId : true
                        })
                    }
                    if(res.message[0] === "The email has already been taken." || res.message[1] === "The email has already been taken." || res.message[2] === "The email has already been taken."){
                        this.setState({
                            alertEmail : true
                        })
                    }
                 }
                 else{
                    this.setState({
                        alertUpdate   : true,
                    })
                 } 
                this.getUsers() 
            }
          
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                window.localStorage.setItem('token', null);
                navigate('/login')
             }
        });
        
    }

    handleDelete = (id) =>{
        const { navigate } = this.props;
        API.User.delete(id, this.token)
        .then(response => {
            // console.log(response)
            let res = response.data;
            if(res.status){
                this.getUsers()
               alert('Data has been Deleted')
            }
            else{
                //validation
            }
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                window.localStorage.setItem('token', null);
                navigate('/login')
             }
        });
    }
   

    handleChange(key,value){
        let data = {}
        data[key] = value;
        this.setState(data);
    } 
    
    getUsers(){
        const { navigate } = this.props;
        API.User.getAll(this.token)
        .then(response => {
            const _ = require("lodash"); 
            let res = response.data
            let employeeList = res.data.employees
            let sort = _.orderBy(employeeList, ['created_at'], ['desc'])
            // console.log(sort)
            this.setState({
                users: sort,
            })
            console.log(response)
            
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                window.localStorage.setItem('token', null);
                navigate('/login')
             }
        });
    }

    handleLogout = () =>{
        const { navigate } = this.props;
        window.localStorage.setItem('token', null);
        navigate('/login')
    }

    componentDidMount() {
        // console.log('mounted')
        this.getUsers()
    }
  

    Logout = (e) => {
        e.preventDefault();
       this.setState({
        isShowLogout : true
       })
    }
    render() {
    
      return (
        <div className='data-app'>
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
                <Container className='main-con'>
                    <Row className="d-flex justify-content-center">
                        
                        <Col xxl={12} className="d-flex justify-content-start">
                            <Form onSubmit={this.Logout}>
                                <Button type="submit" className="btn-round btn-gradient-danger mb-2">
                                    Logout
                                </Button>
                            </Form>
                            
                        </Col>

                        <Col xxl={12} className="d-flex justify-content-start">
                            {/* Alert success */}
                            {/* Alert Create */}
                            <Alert show={this.state.alertCreate} className="alert-bg-gradient-primary" onClose={() => this.handleChange('alertCreate', false)} dismissible>
                                <Alert.Heading>Employee Successfully Added</Alert.Heading>
                            </Alert>
                            {/* Alert Update */}
                            <Alert show={this.state.alertUpdate} className="alert-bg-gradient-primary" onClose={() => this.handleChange('alertUpdate', false)} dismissible>
                                <Alert.Heading>Employee Successfully Updated</Alert.Heading>
                            </Alert>
                            {/* Alert Delete */}
                            <Alert show={this.state.alertDelete} className="alert-bg-gradient-danger" onClose={() => this.handleChange('alertDelete', false)} dismissible>
                                <Alert.Heading>Employee Data has been Deleted!</Alert.Heading>
                            </Alert>
                        </Col>
                                
                        <Col xxl={12} >
                            <Row>
                                {/* TABLE */}
                                <Col xl={8} className="mt-2">
                                    <Card className="card-round">
                                    <Card.Body>
                                    <Table responsive className='table align-middle mb-0 bg-white'>
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th className='text-start'>Name</th>
                                                    <th className='text-start'>Phone</th>
                                                    <th className='text-start'>Email</th>
                                                    <th className='text-start'>Location</th>
                                                    <th className='text-start'>Company</th>
                                                    <th className='text-start'>Created_At</th>
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
                                                     <td className="text-start">{user.created_at}</td>
                                                     {this.state.isUpdate===false&&(
                                                        <>
                                                            <td><Button variant="outline-primary" onClick={()=>this.userUpdate(user,index)}>Edit</Button>{' '}</td>
                                                            <td><Button variant="outline-danger" onClick={()=>this.handleDelete(user.id)}>Delete</Button>{' '}</td>
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
                                        {this.state.users.length<=0&&(
                                            <Container>
                                                <Row>
                                                    <Col xxl={12} className="d-flex justify-content-center">
                                                    <img src={empty} alt="" className=''/>
                                                    </Col>
                                                    <Col xxl={12} className="d-flex justify-content-center">
                                                    <h2 className="text-danger">Your List is Empty!!</h2>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        )}
                                    </Card.Body>
                                    </Card>
                                </Col>
                                {/* CREATE FORM */}
                                
                                {this.state.isUpdate===false&&(
                                   <Col xl={4} className="mt-2">
                                        {/* Error Alerts */}
                                        {/* Alert For Invalid Phone Number */}
                                        <Alert show={this.state.alertPhone} className="alert-bg-gradient-danger" onClose={() => this.handleChange('alertPhone', false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>
                                            Phone must be a number.
                                            </p>
                                        </Alert>
                                        {/* Alert For Invalid Emp ID */}
                                        <Alert show={this.state.alertId} className="alert-bg-gradient-danger" onClose={() => this.handleChange('alertId', false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>
                                            Employee ID must be a number.
                                            </p>
                                        </Alert>
                                        {/* Alert For Existing Email */}
                                        <Alert show={this.state.alertEmail} className="alert-bg-gradient-danger" onClose={() => this.handleChange('alertEmail', false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>
                                            Employee ID must be a number.
                                            </p>
                                        </Alert>
                                        <Card className="card-round">
                                            <Card.Body>
                                                <h3><FontAwesomeIcon icon={faUser} className="me-2"/> Add Users</h3>
                                                <Form noValidate validated={this.state.validated} onSubmit={this.validateForm} className="userform">
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                            <Form.Label className="float-start mb-0">Name</Form.Label>
                                                            <Form.Control
                                                                className="input-round"
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
                                                                className="input-round"
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
                                                                className="input-round"
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
                                                                className="input-round"
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
                                                                className="input-round"
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
                                                                className="input-round"
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
                                                        <Button type="submit" className="btn-round btn-gradient"><FontAwesomeIcon icon={faCheck} className="me-2"/>Submit form</Button>
                                                    </div>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                   </Col>
                                )}
                               {/* UPDATE FORM */}
                               {this.state.isUpdate===true&&(
                                   <Col xl={4}>
                                         {/* Error Alerts */}
                                        {/* Alert For Invalid Phone Number */}
                                        <Alert show={this.state.alertPhone} className="alert-bg-gradient-danger" onClose={() => this.handleChange('alertPhone', false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>
                                            Phone must be a number.
                                            </p>
                                        </Alert>
                                        {/* Alert For Invalid Emp ID */}
                                        <Alert show={this.state.alertId} className="alert-bg-gradient-danger" onClose={() => this.handleChange('alertId', false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>
                                            Employee ID must be a number.
                                            </p>
                                        </Alert>
                                        {/* Alert For Existing Email */}
                                        <Alert show={this.state.alertEmail} className="alert-bg-gradient-danger" onClose={() => this.handleChange('alertEmail', false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>
                                            Employee ID must be a number.
                                            </p>
                                        </Alert>
                                        <Card className="card-round">
                                            <Card.Body>
                                                <h3><FontAwesomeIcon icon={faUser} className="me-2"/> Update Users</h3>
                                                <Form noValidate validated={this.state.validated} onSubmit={this.validateForm2} className="userform">
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
                {/* MODALS */}
                <Modal show={this.state.isShowModal} onHide={() => this.handleChange('isShowModal', false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                           <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>ID:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.emp_id}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                 <p><strong>COMPANY:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.company}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>FULLNAME:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.name}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>EMAIL:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.email}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>PHONE:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.phone}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>LOCATION:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.location}</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleChange('isShowModal', false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleCreate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.isShowModal2} onHide={() => this.handleChange('isShowModal2', false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update This User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                           <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>ID:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.emp_id}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                 <p><strong>COMPANY:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.company}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>FULLNAME:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.name}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>EMAIL:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.email}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>PHONE:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.phone}</p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p><strong>LOCATION:</strong></p>
                            </Col>
                            <Col xxxl={6} xxl={6} xl={6}>
                                <p>{this.state.location}</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleChange('isShowModal2', false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleUpdate}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.isShowLogout} onHide={() => this.handleChange('isShowLogout', false)}>
                    <Modal.Body>
                        <img src={warningimg} alt="" className='img-fluid'/>  
                        <ModalTitle className="text-center text-danger">Are you sure you want to logout?</ModalTitle>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="btn-round btn-gradient-danger" onClick={() => this.handleChange('isShowLogout', false)}>
                        Close
                    </Button>
                    <Button className="btn-round btn-gradient-danger" onClick={()=>this.handleLogout()}>
                        Logout
                    </Button>
                    </Modal.Footer>
                </Modal>
                
            </ThemeProvider>
        </div>
      );
  }

  
 
}

export function Crudwithprops(props) {
    const navigate = useNavigate()
    return(<CrudTest {...props} navigate={navigate}></CrudTest>)
}

