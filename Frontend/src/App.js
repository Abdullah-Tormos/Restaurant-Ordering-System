// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext'
import Home from "./pages/Home.js";
import Menu from "./pages/Menu.js";
import Cart from "./pages/Cart.js";
import './App.css'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Checkout from './pages/Checkout.js';
import Confirm from './pages/Confirm.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar/>
          <main className="main-content"> 
            <Routes>
              <Route path='/' Component={Home}/>
              <Route path='/menu' Component={Menu}/>
              <Route path='/cart' Component={Cart}/>
              <Route path='/checkout' Component={Checkout}/>
              <Route path='/confirmation' Component={Confirm}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App;
