import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'

// props is named customer
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// component state definition
const [showDetails, setShowDetails] = useState(false)

const deleteCustomer = (customer) => {
    let vastaus = window.confirm(`Remove Customer ${customer.companyName}`)

    if (vastaus === true) {
    CustomerService.remove(customer.customerId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed customer ${customer.companyName}`)
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
                setMessage("Asiakkaalla on tilauksia")
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
    <div className='customerDiv'>
        
        <h4 onClick={() => setShowDetails(!showDetails)}>
           {customer.companyName}
        </h4>

       {showDetails && <div className="customerDetails">
                <h3>{customer.companyName}</h3>
                <button className="nappi"onClick={() => deleteCustomer(customer)}>Delete</button>
                <button className="nappi"onClick={() => editCustomer(customer)}>Edit</button>
                <table>
                    <thead>
                        <tr>
                            <th>Contact person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Customer