import React, {useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import LoginList from './LoginList'
import Message from './Message'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

  
const App = () => {
// App.use(cors());
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(true)
const [showMessage, setShowMessage] = useState('')
const [showLaskuri, setShowLaskuri] = useState(false)
const [showPosts, setPosts] = useState(false)
const [loggedInUser, setLoggedInUser] = useState('')
const [loginLevel, setLoginLevel] = useState('')
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}
// App komponentin tila
useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])

// useEffect(() => {
//   let accesslevel = localStorage.getItem("accesslevelId")
//   let admin = "admin"
//   let basic = "basic"
//   let readonly = "readonly"
//   if (accesslevel == 3) {
//     setLoginLevel(admin)
//     (accesslevel == 2)
//     setLoginLevel(basic)
//     (accesslevel == 1)
//     setLoginLevel(readonly)
//   }
// },[])
  
  return (
    <div className="App">
      
     {/* <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} /> */}
{!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser}/> }
{ loggedInUser && 
     <Router>
      
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
            <Nav.Link href='/customers'>Customers</Nav.Link>
            <Nav.Link href='/posts'>Some highlights</Nav.Link>
            <Nav.Link href='/logins'>Users</Nav.Link>
            <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
            <button onClick={() => logout()}>Logout</button>
        </Nav>
      </Navbar>
                    
    <h1>Northwind Corporation</h1>

    {showMessage && <Message message={message} isPositive={isPositive} />}

    <Routes>
      <Route path="/customers"
      element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
      setShowMessage={setShowMessage} />}>
      </Route>

      <Route path="/logins"
      element={<LoginList setMessage={setMessage} setIsPositive={setIsPositive} 
      setShowMessage={setShowMessage} />}>
      </Route>
      
      <Route path="/posts"
      element={<Posts />}>
      </Route> 
      


      <Route path="/laskuri" 
      element={<Laskuri />}>
    </Route>
    
    </Routes>
  </Router>
}
    </div>
  )
}

export default App
