import './App.css'
import React, {useState, useEffect} from 'react'
import LoginService from './services/User'
import User from './User'
import LoginAdd from './LoginAdd'
import LoginEdit from './LoginEdit'

const LoginList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [logins, setLogins] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaLogin, setMuokattavaLogin] = useState(false)
const [search, setSearch] = useState("")
const [showLogins, setShowLogins] = useState(false)
// UseEffect ajetaan aina alussa kerran
useEffect(() => {

    const token = localStorage.getItem('token')
        LoginService
            .setToken(token)


  LoginService.getAll()
  .then(data => {
    setLogins(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editLogins = (login) => {
  setMuokattavaLogin(login)
  setMuokkaustila(true)
}

  return (
    <>
    <h1><nobr style={{ cursor: 'pointer' }}
            onClick={() => setShowLogins(!showLogins)}>Users</nobr>

            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by UserName" value={search} onChange={handleSearchInputChange} />
            }

            {lisäystila && <LoginAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            />}

            {muokkaustila && <LoginEdit setMuokkaustila={setMuokkaustila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            muokattavaLogin={muokattavaLogin}
            />}

    
    
{
        !lisäystila && !muokkaustila && showLogins && logins && logins.map(c =>
          {
            
            const lowerCaseName = c.userName.toLowerCase()
            if (lowerCaseName.indexOf(search) > -1) {
                return(
            <User key={c.loginId} user={c} reloadNow={reloadNow} reload={reload}
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            editLogins={editLogins}
            />
          )
                }
              }
        )
    }

</>
        )
    }

export default LoginList