import './App.css'
import React, {useState} from 'react'
import LoginService from './services/User'
import LoginEdit from './LoginEdit'

const User = ({user, editLogins, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// component state definition
const [showDetails, setShowDetails] = useState(false)

const deleteUser = (user) => {
    let vastaus = window.confirm(`Remove Login ${user.userName}`)

    if (vastaus === true) {
    LoginService.remove(user.loginId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed login ${user.userName}`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
        reloadNow(!reload)
        }
        
            }
        )
        .catch(error => {
            if(error.code == 'ERR_BAD_RESPONSE'){
                setMessage("Käyttäjän poisto ei onnistunut")
            }
            else{
            setMessage(error.message)
            }
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // siirtyy ylös
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })

    } // peruutus
    else {
    setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // siirtyy ylös

        // piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

  return (
    <div className='userDiv'>
        
        <h4 onClick={() => setShowDetails(!showDetails)}>
           {user.userName}
        </h4>

       {showDetails && <div className="userDetails">
                
                <button className="nappi"onClick={() => deleteUser(user)}>Delete</button>
                <button className="nappi"onClick={() => editLogins(user)}>Edit</button>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UserName</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>AccesLevelId</th>
                            {/* <th>pword</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.loginId}</td>
                            <td>{user.userName}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.accesLevelId}</td>
                            {/* <td>{user.passWord}</td> */}
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default User