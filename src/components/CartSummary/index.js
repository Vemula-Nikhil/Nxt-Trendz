import Popup from 'reactjs-popup'

import {IoClose, IoCashOutline} from 'react-icons/io5'
import {FaIdCard} from 'react-icons/fa'
import {AiFillBank, AiOutlineWallet} from 'react-icons/ai'
import {RiAmazonLine} from 'react-icons/ri'

import {useState} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const [cardPayment, setCardPayment] = useState(false)
  const [netBanking, setNetBanking] = useState(false)
  const [upi, setUpiPayment] = useState(false)
  const [wallet, setWalletPayment] = useState(false)
  const [confirmOrder, setConfirmOrder] = useState(false)

  const onClickCardButton = () => {
    setCardPayment(!cardPayment)
    setNetBanking(false)
    setUpiPayment(false)
    setWalletPayment(false)
  }
  const onClickNetBankingButton = () => {
    setNetBanking(!netBanking)
    setCardPayment(false)
    setUpiPayment(false)
    setWalletPayment(false)
  }
  const onClickUpiButton = () => {
    setUpiPayment(!upi)
    setCardPayment(false)
    setNetBanking(false)
    setWalletPayment(false)
  }
  const onClickWalletButton = () => {
    setWalletPayment(!wallet)
    setCardPayment(false)
    setNetBanking(false)
    setUpiPayment(false)
  }

  const onClickCODButton = () => {
    setWalletPayment(false)
    setCardPayment(false)
    setNetBanking(false)
    setUpiPayment(false)
  }

  const isPaymentSelected = cardPayment || netBanking || upi || wallet
  const confirmOrderClassName = isPaymentSelected ? 'confirm-order' : ''
  const cardPaymentClassName = cardPayment ? 'confirm-order' : ''
  const netBankingClassName = netBanking ? 'confirm-order' : ''
  const upiClassName = upi ? 'confirm-order' : ''
  const walletClassName = wallet ? 'confirm-order' : ''

  const onClickConfirmOrder = () => {
    if (isPaymentSelected) {
      setConfirmOrder(true)
    }
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const getTotalAmount = () => {
          const totalAmountList = cartList.map(
            each => each.quantity * each.price,
          )
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
            <div className="popup-card">
              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <>
                    <div className="popup-container">
                      <div className="payments-details">
                        <div className="payments-container">
                          <h1 className="payments-heading">Payments</h1>
                          <button
                            type="button"
                            className={`payment-button ${cardPaymentClassName}`}
                            onClick={onClickCardButton}
                          >
                            <FaIdCard className="payment-icon" />
                            <p className="payment-type">
                              Credit / Dedit / ATM Card
                            </p>
                          </button>
                          <button
                            type="button"
                            className={`payment-button ${netBankingClassName}`}
                            onClick={onClickNetBankingButton}
                          >
                            <AiFillBank className="payment-icon" />
                            <p className="payment-type">Net Banking</p>
                          </button>
                          <button
                            type="button"
                            className={`payment-button ${upiClassName}`}
                            onClick={onClickUpiButton}
                          >
                            <RiAmazonLine className="payment-icon" />
                            <p className="payment-type">UPI</p>
                          </button>
                          <button
                            type="button"
                            className={`payment-button ${walletClassName}`}
                            onClick={onClickWalletButton}
                          >
                            <AiOutlineWallet className="payment-icon" />
                            <p className="payment-type">Wallet</p>
                          </button>
                          <button
                            type="button"
                            className="payment-button cod"
                            onClick={onClickCODButton}
                          >
                            <IoCashOutline className="payment-icon" />
                            <p className="payment-type">
                              Cash on Delivery{' '}
                              <span className="unavailable">Unavailable</span>
                            </p>
                          </button>
                        </div>
                        <div className="summary-container">
                          <h1 className="payments-heading">Summary</h1>
                          <div className="price-details-container">
                            <p className="total-items">
                              Total Price ({cartList.length})
                            </p>
                            <p className="price">₹{getTotalAmount()}</p>
                          </div>
                          <button
                            type="button"
                            className={`confirm-btn ${confirmOrderClassName}`}
                            onClick={onClickConfirmOrder}
                          >
                            Confirm Order
                          </button>
                          {confirmOrder && (
                            <p className="confirm-order-text">
                              Your order has been placed successfully
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        <IoClose className="close-icon" />
                      </button>
                    </div>
                  </>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
