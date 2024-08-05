import useHttp from "../../hooks/useHttp";
import MealItem from "./MealItem";
import classes from "./Meals.module.css";
// import { useEffect, useState } from 'react';

const requestConfig = {};

const Meals = () => {
  // const [meals, setMeals] = useState([]);
  // const [loading, setLoading] = useState([]);
  const {
    data: meals,
    error,
    isLoading,
  } = useHttp("http://localhost:8080/meals", requestConfig, []);

  // useEffect(() => {
  //     async function fetchMeals() {
  //         const response = await fetch('http://localhost:8080/meals');

  //         if (!response.ok) {

  //         }

  //         const meals = await response.json();
  //         setMeals(meals);
  //     }
  //     fetchMeals();
  // }, []);
  if (isLoading) {
    return <p className={classes.center}>Fetching Meals...</p>;
  }

  if (error) {
    console.log(error);
    return (
      <div className="error">
        <h2>Meals not found</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul className={classes.meals}>
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
};

export default Meals;
