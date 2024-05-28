import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

// Component state definition
const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
const [newProductname, setNewProductname] = useState(muokattavaProduct.productName)
const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
const [newQuantityperunit, setNewQuantityperunit] = useState(muokattavaProduct.quantityPerUnit)
const [newUnitprice, setNewUnitprice] = useState(muokattavaProduct.unitPrice)
const [newUnitsinstock, setNewUnitsinstock] = useState(muokattavaProduct.unitsInStock)
const [newUnitsonorder, setNewUnitsonorder] = useState(muokattavaProduct.unitsOnOrder)
const [newReorderlevel, setNewReorderlevel] = useState(muokattavaProduct.reorderLevel)
const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued || false);
const [newImagelink, setNewImagelink] = useState(muokattavaProduct.imageLink)

// onSubmit eventhandel function
const handleSubmit = (event) => {
      event.preventDefault()
      var newProduct = {
        productId: newProductId,
        productName: newProductname,
        supplierId: parseInt(newSupplierId),
        categoryId: parseInt(newCategoryId),
        quantityPerUnit: newQuantityperunit,
        unitPrice: parseFloat(newUnitprice),
        unitsInStock: parseInt(newUnitsinstock),
        unitsOnOrder: parseInt(newUnitsonorder),
        reorderLevel: parseInt(newReorderlevel),
        discontinued: newDiscontinued,
        imageLink: newImagelink
        
    }
    // newProduct.discontinued = Boolean(newDiscontinued);
    console.log(newProduct)
    ProductService.update(newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited product: " + newProduct.productName)
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
       <h2>Edit Product Id {newProductId}</h2>

       <form className="edit-form" onSubmit={handleSubmit}>
       <div className='hide-div'>
       <label>ProductID</label>
                <input type="text" value={newProductId} disabled />

            </div>
            <div>
                <label>ProductName </label>
                <input type="text" value={newProductname} placeholder="Product name"
                    onChange={({ target }) => setNewProductname(target.value)} required />
            </div>
            <div>
            <label>SupplierID </label>
                <input type="number" value={newSupplierId} placeholder="SupplierID"
                    onChange={({ target }) => setNewSupplierId(target.value)} />
            </div>
            <div>
            <label>CategoryID </label>
                <input type="number" value={newCategoryId} placeholder="CategoryID"
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
            <label>UnitPrice </label>
                <input type="number" step={0.1} value={newUnitprice} placeholder="Unitprice"
                    onChange={({ target }) => setNewUnitprice(target.value)} />
            </div>
            <div>
            <label>QuantityPerUnit </label>
                <input type="text" value={newQuantityperunit} placeholder="QuantityPerUnit"
                    onChange={({ target }) => setNewQuantityperunit(target.value)} />
            </div>
            <div>
            <label>UnitsInStock </label>
                <input type="number"  value={newUnitsinstock} placeholder="UnitsInStock"
                    onChange={({ target }) => setNewUnitsinstock(target.value)} />
            </div>
            <div>
            <label>UnitsOnOrder </label>
                <input type="number"  value={newUnitsonorder} placeholder="UnitsOnOrder"
                    onChange={({ target }) => setNewUnitsonorder(target.value)} />
            </div>
            <div>
            <label>ReOrderLevel </label>
                <input type="number"  value={newReorderlevel} placeholder="Reorderlevel"
                    onChange={({ target }) => setNewReorderlevel(target.value)} />
            </div>
            <div>
                <label>Discontinued {String(newDiscontinued)}</label>
                <input type="checkbox" value={newDiscontinued.checked} 
                    onChange={({ target }) => setNewDiscontinued(target.checked)} />
            </div>
            <div>
            <label>Imagelink </label>
                <input type="text" value={newImagelink} placeholder="ImageLink"
                    onChange={({ target }) => setNewImagelink(target.value)} />
            </div>
            
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default ProductEdit