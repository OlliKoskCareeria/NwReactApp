import './App.css'
import React, {useEffect, useState} from 'react'
import ProductService from './services/Product'
import md5 from 'md5'

const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys

const [newProductname, setNewProductname] = useState('')
const [newSupplierid, setNewSupplierid] = useState('')
const [newCategoryid, setNewCategoryid] = useState('')
const [newQuantityperunit, setNewQuantityperunit] = useState('')
const [newUnitprice, setNewUnitprice] = useState('')
const [newUnitsinstock, setNewUnitsinstock] = useState('')
const [newUnitsonorder, setNewUnitsonorder] = useState('')
const [newReorderlevel, setNewReorderlevel] = useState('')
const [newDiscontinued, setNewDiscontinued] = useState(false)
const [newImagelink, setNewImagelink] = useState('')
const[categories, setCategories] = useState([])
const[suppliers, setSuppliers] = useState([])

// const token = localStorage.getItem('token')

useEffect(() => {
  const loadCategories = async () => {
    try {
      const response = await ProductService.fetchCategories();
      setCategories(response.data)
      
    }catch(error) {
      console.error('fetching categories failed', error.message);
    }
  };
  loadCategories();
}, []);

useEffect(() => {
  const loadSuppliers = async () => {
    try {
      const response = await ProductService.fetchSuppliers();
      setSuppliers(response.data)
      
    }catch(error) {
      console.error('fetching suppliers failed', error.message);
    }
  };
  loadSuppliers();
}, []);
// onSubmit tapahtumankäsittelijä funktio jatka tästä
const handleSubmit = (event) => {
      event.preventDefault()
      var newProduct = {
        productname: newProductname,
        supplierId: parseInt(newSupplierid),
        categoryid: parseInt(newCategoryid),
        quantityperunit: (newQuantityperunit),
        unitprice: parseFloat(newUnitprice),
        unitsinstock: parseInt(newUnitsinstock),
        unitsonorder: parseInt(newUnitsonorder),
        reorderlevel: parseInt(newReorderlevel),
        discontinued: newDiscontinued,
        imagelink: newImagelink
         
    }
    
    console.log(newProduct)

    ProductService.create(newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage(`Added new Product: ${newProduct.productname}`)
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
       <h2>add new product</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newProductname} placeholder="Product name"
                    onChange={({ target }) => setNewProductname(target.value)} required />
            </div>
            
            <div>
              <select value={newSupplierid} onChange={({ target }) => setNewSupplierid(target.value)} className='supplierdropdownselect-width'>
                <option value="">Choose a Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.companyName} value={supplier.supplierId}>
                    {supplier.companyName}
                  </option>
                ))}
              </select> <label>ID {String(newSupplierid)}</label>
          </div>
            
            <div>
            
              <select value={newCategoryid} onChange={({ target }) => setNewCategoryid(target.value)}>
                <option value="">Choose a Category</option>
                {categories.map(category => (
                  <option key={category.categoryName} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select> <label>ID {String(newCategoryid)}</label>
            </div>
            <div>
                <input type="text" value={newQuantityperunit} placeholder="Quantity/Unit"
                    onChange={({ target }) => setNewQuantityperunit(target.value)} />
            </div>
            <div>
                <input type="number" step={0.1} value={newUnitprice} placeholder="Unitprice"
                    onChange={({ target }) => setNewUnitprice(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsinstock} placeholder="UnitsInStock"
                    onChange={({ target }) => setNewUnitsinstock(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsonorder} placeholder="UnitsOnOrder"
                    onChange={({ target }) => setNewUnitsonorder(target.value)} />
            </div>
            <div>
                <input type="number" value={newReorderlevel} placeholder="ReorderLevel"
                    onChange={({ target }) => setNewReorderlevel(target.value)} />
            </div>
            <div>
              <strong>Check if the product is Discontinued</strong>
            </div>
            <div>
                <input type="checkbox" value={newDiscontinued} placeholder="Discontinued"
                    onChange={({ target }) => setNewDiscontinued(true)} />
            </div>
            <div>
                <input type="text" value={newImagelink} placeholder="Imagelink"
                    onChange={({ target }) => setNewImagelink(target.value)} />
            </div>
            
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default ProductAdd