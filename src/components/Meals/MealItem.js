// import { useContext } from "react";
import { currencyFormatter } from "../../util/formatter";
import Button from "../UI/Button";
import classes from "./MealItem.module.css";
// import CartContext from "../../store/CartContext";
import { cartActions } from "../../store/cart";
import { useDispatch } from "react-redux";

const MealItem = ({ meal }) => {
  // const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();

  const handleAddMealToCart = () => {
    dispatch(cartActions.addItem(meal));
  };
  return (
    <li className={classes["meal-item"]}>
      <article>
        <img src={`http://localhost:8080/${meal.image}`} alt={meal.name} />
        <div>
          <h3 className={classes.title}>{meal.name}</h3>
          <p className={classes.price}>
            {currencyFormatter.format(meal.price)}
          </p>
          <p className={classes.description}>{meal.description}</p>
        </div>
        <p className={classes.actions}>
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
