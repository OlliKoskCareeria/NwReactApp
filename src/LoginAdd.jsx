import './App.css'
import React, {useEffect, useState} from 'react'
import LoginService from './services/User'
import md5 from 'md5'

const LoginAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys
// Id arvo määritellään tietokannassa automaattisesti,
// emme anna sitä itse
const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [passwordMessage, setPasswordMessage] = useState('')
const [passwordMessageColor, setPasswordMessageColor] = useState('')
// tämä lauseke vertaa salasana kenttien arvoja ja asettaa viestin sen perusteella
useEffect(() =>{
  if(newPassword && confirmPassword){
    if(newPassword === confirmPassword){
      setPasswordMessage('Passwords match');
      setPasswordMessageColor('green');
    } else {
      setPasswordMessage('passwords no not match');
      setPasswordMessageColor('red')
    }
  }else {
    setPasswordMessage('');
    setPasswordMessageColor('');
  } 
},[newPassword, confirmPassword]);
// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newLogin = {
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        acceslevelId: parseInt(newAccesslevelId),
        username: newUsername,
        password: md5(newPassword) // Salataan md5 kirjaston metodilla
    }
    
    console.log(newLogin)

    LoginService.create(newLogin)
    .then(response => {
      if (response.status === 200) {
       setMessage(`Added new Login: ${newLogin.firstname} ${newLogin.lastname}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
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
    <div id="addNew">
       <h2>add new login</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccesslevelId} placeholder="Accesslevel"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            <div>
                <input type="password" value={confirmPassword} placeholder="Confirm Password"
                    onChange={({ target }) => setConfirmPassword(target.value)} />
            </div>
            {/* tämä label näyttää viestin sen perusteella ovatko salasanat yhteneväiset */}
            <div>
              <label style={{color: passwordMessageColor}}>{passwordMessage}</label>
            </div>
            
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default LoginAdd