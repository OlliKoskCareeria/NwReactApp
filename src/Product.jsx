import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

import ProductEdit from './ProductEdit'
// props is named customer
const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// component state definition
const [showDetails, setShowDetails] = useState(false)
const [showCategories, setShowCategories] = useState(false)
const deleteProduct = (product) => {
    let vastaus = window.confirm(`Remove Product ${product.productName}`)

    if (vastaus === true) {
    ProductService.remove(product.productId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed product ${product.productName}`)
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
                setMessage("Tuotetta on tilattu")
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
    <div  className='productDiv'>

        <h4 onClick={() => setShowDetails(!showDetails)}>
           {product.productName}
           
        </h4>
        
       {showDetails && <div className="productDetails">
       
<button className="nappi" onClick={() => deleteProduct(product)}>Delete</button>
<img src={product.imageLink} className='productImage'/>
<button className="nappi" onClick={() => editProduct(product)}>Edit</button>
<table>
    <tbody>
        <tr>
            <th>productId</th>
            <td>{product.productId}</td>
        </tr>
        <tr>
            <th>productName</th>
            <td>{product.productName}</td>
        </tr>
        <tr>
            <th>supplierId</th>
            <td>{product.supplierId}</td>
        </tr>
        <tr>
            <th>categoryId</th>
            <td>{product.categoryId}</td>
        </tr>
        <tr>
            <th>quantityPerUnit</th>
            <td>{product.quantityPerUnit}</td>
        </tr>
        <tr>
            <th>unitPrice</th>
            <td>{product.unitPrice}</td>
        </tr>
        <tr>
            <th>unitsInStock</th>
            <td>{product.unitsInStock}</td>
        </tr>
        <tr>
            <th>unitsOnOrder</th>
            <td>{product.unitsOnOrder}</td>
        </tr>
        <tr>
            <th>reorderLevel</th>
            <td>{product.reorderLevel}</td>
        </tr>
        <tr>
            <th>discontinued</th>
            <td>{product.discontinued.toString()}</td>
        </tr>
        <tr>
            <th>imageLink</th>
            {/* <img src={product.imageLink} className='productImage'/> */}
            <td>{product.imageLink}</td>
        </tr>
    </tbody>
</table>
</div>}
    </div>
  )
}

export default Product