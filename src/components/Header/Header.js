import classes from "./Header.module.css";
import logo from "../../assets/logo.jpg";
import Button from "../UI/Button";
// import { useContext } from "react";
// import CartContext from "../../store/CartContext";
// import UserProgressContext from "../../store/UserProgressContext";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../../store/user-progress";

const Header = () => {
  // const cartCtx = useContext(CartContext);
  // const userProgressCtx = useContext(UserProgressContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const handleShowCart = () => {
    dispatch(userProgressActions.showCart());
  };

  return (
    <header className={classes.header}>
      <div className={classes.icon}>
        <img src={logo} alt="FOOD" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
