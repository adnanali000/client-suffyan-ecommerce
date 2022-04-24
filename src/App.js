import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart,Checkout,Footer,Contactus,Aboutus } from './components'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {fireDb,storage} from './firebase';
import {collection,addDoc,doc} from 'firebase/firestore'

const App = () => {

  //for all product
  // const [products, setProducts] = useState([]);

  const [categories,setCategories] = useState([]);
  
  
  const [cart, setCart] = useState({});
  const [order,setOrder] = useState('')
  const [errorMessage,setErrorMessage] = useState('');

  //list of all products
  // const fetchProducts = async () => {
  //   const { data } = await commerce.products.list();
  //   setProducts(data);
  // }

  //categories data
  const fetchProducts = async () => {
    const {data:products} = await commerce.products.list({limit:200});
    const {data: categoriesData} = await commerce.categories.list();

    const productsPerCategory = categoriesData.reduce((acc,category)=>{
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter((product)=>
            product.categories.find((cat)=>cat.id===category.id)
          )
        }
      ]
    },[])
    // console.log({productsPerCategory})
    setCategories(productsPerCategory);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const {cart} = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQty = async(productId,quantity)=>{
    const {cart} = await commerce.cart.update(productId,{quantity});
    setCart(cart);
  }

  const handleRemoveFromCart = async(productId)=>{
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async()=>{
    const {cart} = await commerce.cart.empty();
    setCart(cart);
  }

  const refreshCart = async()=>{
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const ordersCollectionRef = collection(fireDb, "Orders");
  const handleCaptureCheckout = async(newOrder)=>{
    try {
      // const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
      await addDoc(ordersCollectionRef, newOrder);
      setOrder(newOrder)
      refreshCart();
    } catch (error) {
      setErrorMessage(error)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])




  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path='/' element={<Products categories={categories} onAddToCart={handleAddToCart} />} />
          <Route path='/checkout' element={<Checkout cart={cart}  order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />} />
          <Route path='/contact' element={<Contactus />} />
          <Route path='/about' element={<Aboutus />} />

  
          <Route 
          path='/cart' 
          element={
          <Cart 
            cart={cart} 
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          />
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App