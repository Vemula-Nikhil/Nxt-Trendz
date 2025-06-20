import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  decrementCartItemQuantity = product => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        if (eachProduct.id === product.id) {
          if (eachProduct.quantity > 1) {
            return {...eachProduct, quantity: eachProduct.quantity - 1}
          }
          return this.removeCartItem(product.id)
        }
        return eachProduct
      }),
    }))
  }

  incrementCartItemQuantity = product => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        if (eachProduct.id === product.id) {
          return {...eachProduct, quantity: eachProduct.quantity + 1}
        }
        return eachProduct
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCart = cartList.filter(eachProduct => eachProduct.id !== id)
    this.setState({
      cartList: filterCart,
    })
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isItemFound = cartList.find(
      eachProduct => product.id === eachProduct.id,
    )
    if (isItemFound === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    } else {
      this.incrementCartItemQuantity(isItemFound)
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
