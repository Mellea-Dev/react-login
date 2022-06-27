
import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Crudwithprops } from './CrudTest';
import React from 'react';



export class App extends React.Component{
  render(){
    return (
      <div className="App">
        <Router>
          <Routes>
           <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/crudtest' element={<Crudwithprops />}  />
          </Routes>
        </Router>
      </div>
    );
  }
}

// export default App;
