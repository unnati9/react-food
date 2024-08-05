import classes from "./Input.module.css";

const Input = ({ label, id, type, ...props }) => {
  return (
    <p className={classes.control}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
};

export default Input;
