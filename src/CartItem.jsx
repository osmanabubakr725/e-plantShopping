import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  console.log('CartItem render, quantity =', cart[0]?.quantity);
  console.log('cart now:', cart);
  const dispatch = useDispatch();

  // 1) حساب المجموع الكلي لكل العناصر في السلة
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1)); // "$15" -> 15
      total += cost * quantity;
    });
    return total;
  };

  // 2) متابعة التسوق
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // 3) الدفع (Checkout)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 4) زيادة الكمية
  const handleIncrement = (item) => {
  const action = updateQuantity({ name: item.name, quantity: item.quantity + 1 });
  console.log('action:', action);
  dispatch(action);
};

  // 4) إنقاص الكمية
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // الكمية ستصبح 0 -> احذف العنصر
    }
  };

  // 5) حذف النبات من السلة
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 6) المجموع الفرعي لكل عنصر (الكمية × السعر)
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Subtotal: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;