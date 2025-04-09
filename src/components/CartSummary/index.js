// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const getTotalAmount = () => {
        const totalAmountList = cartList.map(each => each.quantity * each.price)
        console.log(totalAmountList)
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue

        return totalAmountList.reduce(reducer)
      }

      getTotalAmount()

      return (
        <div className="order-summary-container">
          <h1 className="order-total">
            Order Total:{' '}
            <span className="order-total-price">Rs {getTotalAmount()}</span>
          </h1>
          <p className="order-summary-quantity">
            {cartList.length} Items in cart
          </p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
