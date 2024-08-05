// import { useContext } from "react";
import Modal from "../UI/Modal";
// import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatter";
import classes from "./Cart.module.css";
import Button from "../UI/Button";
// import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../../store/user-progress";

const Cart = () => {
  // const cartCtx = useContext(CartContext);
  // const userProgressCtx = useContext(UserProgressContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const userProgress = useSelector(state => state.userProgress.progress);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCloseCart = () => {
    dispatch(userProgressActions.hideCart());
    
  };

  const handleGoToCheckout = () => {
    dispatch(userProgressActions.showCheckout());
  };

  return (
    <Modal
      className={classes.cart}
      open={userProgress === "cart"}
      onClose={userProgress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className={classes["cart-total"]}>
        {currencyFormatter.format(totalPrice)}
      </p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {cartItems.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
