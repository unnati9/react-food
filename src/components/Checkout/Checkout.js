// import { useContext } from "react";

import classes from "./Checkout.module.css";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
// import CartContext from "../../store/CartContext";
// import UserProgressContext from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatter";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../../store/user-progress";
import { cartActions } from "../../store/cart";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

const Checkout = () => {
  // const cartCtx = useContext(CartContext);
  // const userProgressCtx = useContext(UserProgressContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items)
  const userProgress = useSelector(state => state.userProgress.progress)

  const { data, error, isLoading, sendRequest, clearData } = useHttp(
    "http://localhost:8080/orders",
    requestConfig
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    dispatch(userProgressActions.hideCheckout());
  };

  const handleFinish = () => {
    dispatch(userProgressActions.hideCheckout());
    dispatch(cartActions.clearCart());
    clearData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());
    // console.log(customerData);
    sendRequest(
      JSON.stringify({
        order: {
          items: cartItems,
          customer: customerData,
        },
      })
    );

    // fetch("http://localhost:8080/orders", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData
    //     }
    //   })
    // });
  };

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully!</p>
        <p>We will get back you in some time through email</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className={classes["control-row"]}>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
