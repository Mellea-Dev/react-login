
// import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Container, Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';



//get users form local storage
const getUsersLS= ()=>{
    const userData = localStorage.getItem('Users');
    if (userData){
        return JSON.parse(userData)
    }
    else{
       return [];
    }
}


function Crud(){

 //validation state
 const [validated, setValidated] = useState(false);
 //users-data array
 const [users, setUsers]=useState(getUsersLS());

 //user-data states
 const [id, setId] = useState('')
 const [firstname, setFirstName] = useState('');
 const [lastname, setLastName] = useState('');
 const [middleinitial, setMiddleInitial] = useState('');
 const [username, setUserName] = useState('');
 const [email, setEmail] = useState('');
 const [contact, setContact] = useState('');
 const [password, setPassword] = useState('');

 
//Event
 const handleUserSubmit = (e) => {
   
   const form = e.currentTarget;
   if (form.checkValidity() === false) {
     e.preventDefault();
     e.stopPropagation();
   }


   else if(form.checkValidity() === true){
        
        //Create user
        let user = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            username: username,
            middleinitial: middleinitial,
            email:email,
            contact:contact,
            password: password
            
        }
        
        //Updating user 
        setUsers([...users, user])
        alert('User Added Successfully')
 
   }
   
   
   setValidated(true);
   
   
 };
 

 //saving users to local storage
 useEffect(()=>{
   localStorage.setItem('Users', JSON.stringify(users))
 }, [users]
 )

 //user delete in local storage
 const userDelete = (id)=>{
    alert('Are you sure you want to delete?')
   const del = users.filter((user)=>{
    return user.id !== id;
   })
   setUsers(del);
 }

  //form state
  const [form,setForm] = useState(false);

  //user update in local storage
  const userUpdate = (user, index)=>{
     setForm(true)
     setId(index);
     setFirstName(user.firstname);
     setMiddleInitial(user.middleinitial)
     setLastName(user.lastname);
     setUserName(user.username);
     setEmail(user.email);
     setContact(user.contact);
     setPassword(user.password);
  }

  const handleUserUpdate=(e)=>{
    const form2 = e.currentTarget;
   if (form2.checkValidity() === false) {
     e.preventDefault();
     e.stopPropagation();

   }

   else if(form2.checkValidity() === true){
    e.preventDefault();
    let items = [...users];
    let item = items[id];
    item.firstname = firstname;
    item.lastname = lastname;
    item.middleinitial = middleinitial;
    item.username = username;
    item.email = email;
    item.contact = contact;
    item.password = password;
     setId('');
     setFirstName('');
     setMiddleInitial('');
     setLastName('');
     setUserName('');
     setEmail('');
     setContact('');
     setPassword('');
    setForm(false)
    alert('User Updated Successfully')
   }

   setValidated(true)
    
  }

    return(
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
                                               {users.length>0&&(
                                                <>
                                                {users.map((user,index)=>(
                                                    <tr key={user.id}>
                                                     <td className="text-start">{user.id}</td>
                                                     <td className="text-start">{user.firstname}</td>
                                                     <td className="text-start">{user.middleinitial}</td>
                                                     <td className="text-start">{user.lastname}</td>
                                                     <td className="text-start">{user.username}</td>
                                                     <td className="text-start">{user.email}</td>
                                                     <td className="text-start">{user.contact}</td>
                                                     {form===false&&(
                                                        <>
                                                            <td><Button variant="outline-primary" onClick={()=>userUpdate(user,index)}>Edit</Button>{' '}</td>
                                                            <td><Button variant="outline-danger" onClick={()=>userDelete(user.id)}>Delete</Button>{' '}</td>
                                                        </>
                                                     )}
                                                     {form===true&&(
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
                                {form===false&&(
                                   <Col xl={4}>
                                        <Card className="card-round">
                                            <Card.Body>
                                                <h3><FontAwesomeIcon icon={faUser} className="me-2"/> Add Users</h3>
                                                <Form noValidate validated={validated} onSubmit={handleUserSubmit} className="userform">
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                            <Form.Label className="float-start mb-0">First name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="First name"
                                                                onChange={(e)=>setFirstName(e.target.value)} value={firstname}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                            <Form.Label className="float-start mb-0">Middle Initial</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Middle Initial"
                                                                onChange={(e)=>setMiddleInitial(e.target.value)} value={middleinitial}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                            <Form.Label className="float-start mb-0">Last name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Last name"
                                                                onChange={(e)=>setLastName(e.target.value)} value={lastname}
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
                                                                onChange={(e)=>setUserName(e.target.value)} value={username}
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
                                                                onChange={(e)=>setEmail(e.target.value)} value={email}
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
                                                                onChange={(e)=>setPassword(e.target.value)} value={password}
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
                                                                onChange={(e)=>setId(e.target.value)} value={id}
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
                                                                onChange={(e)=>setContact(e.target.value)} value={contact}
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
                               {form===true&&(
                                   <Col xl={4}>
                                        <Card className="card-round">
                                            <Card.Body>
                                                <h3><FontAwesomeIcon icon={faUser} className="me-2"/> Update Users</h3>
                                                <Form noValidate validated={validated} onSubmit={handleUserUpdate} className="userform">
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                        <Form.Label className="float-start mb-0">First name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="First name"
                                                            onChange={(e)=>setFirstName(e.target.value)} value={firstname}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                        <Form.Label className="float-start mb-0">Middle Initial</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Middle Initial"
                                                            onChange={(e)=>setMiddleInitial(e.target.value)} value={middleinitial}
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                        <Form.Label className="float-start mb-0">Last name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Last name"
                                                            onChange={(e)=>setLastName(e.target.value)} value={lastname}
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
                                                            onChange={(e)=>setUserName(e.target.value)} value={username}
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
                                                            onChange={(e)=>setEmail(e.target.value)} value={email}
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
                                                            onChange={(e)=>setPassword(e.target.value)} value={password}
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
                                                            onChange={(e)=>setId(e.target.value)} value={id}
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
                                                            onChange={(e)=>setContact(e.target.value)} value={contact}
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
    )
}






export default Crud;