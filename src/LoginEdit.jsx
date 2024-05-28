import './App.css'
import React, {useState} from 'react'
import LoginService from './services/User'

const LoginEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaLogin}) => {

// Component state definition
const [newLoginid, setNewLoginid] = useState(muokattavaLogin.loginId)
const [newFirstname, setNewFirstname] = useState(muokattavaLogin.firstName)
const [newLastname, setNewLastname] = useState(muokattavaLogin.lastName)
const [newEmail, setNewEmail] = useState(muokattavaLogin.email)
const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaLogin.accesLevelId)
const [newUsername, setNewUsername] = useState(muokattavaLogin.userName)
const [newPassword, setNewPassword] = useState(muokattavaLogin.passWord)
    


// onSubmit eventhandel function
const handleSubmit = (event) => {
      event.preventDefault()
      var newLogin = {
        loginId: newLoginid,
        firstName: newFirstname,
        lastName: newLastname,
        email: newEmail,
        accesLevelId: parseInt(newAccesslevelId),
        userName: newUsername,
        passWord: newPassword
        
    }
    
    LoginService.update(newLogin)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited Login Credentials: " + newLogin.userName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }


  return (
    <div id="edit">
       <h2>Edit Login Credentials</h2>

       <form onSubmit={handleSubmit}>
       <div>
       <label>LoginID</label>
                <input type="text" value={newLoginid} disabled />
            </div>
            <div>
                <label>FirstName </label>
                <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
            <label>LastName </label>
                <input type="text" value={newLastname} placeholder="Contact name"
                    onChange={({ target }) => setNewLastname(target.value)} />
            </div>
            <div>
            <label>Email </label>
                <input type="text" value={newEmail} placeholder="Contact title"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
            <label>AccessLevelId </label>
                <input type="number" step="1" value={newAccesslevelId} placeholder="AccesLevel"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
            <label>UserName </label>
                <input type="text" value={newUsername} placeholder="Address"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
            <label>PassWord </label>
                <input type="text" value={newPassword} placeholder="City"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default LoginEdit