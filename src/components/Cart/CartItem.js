// import { useContext } from "react";

import { currencyFormatter } from "../../util/formatter";
import classes from "./CartItem.module.css";
// import CartContext from "../../store/CartContext";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const CartItem = ({ item }) => {
  // const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(cartActions.addItem(item));
  };

  const handleDecrease = () => {
    dispatch(cartActions.removeItem(item.id));
  };

  return (
    <li className={classes["cart-item"]}>
      <p>
        {item.name} ⨉ {currencyFormatter.format(item.price)}
      </p>
      <p className={classes["cart-item-actions"]}>
        <button onClick={handleDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
