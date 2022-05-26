import classes from "./ValueBoxes.module.css";

const ValueBoxes = (props) => {
  var isMutable = props.readOnly;
  let arrNum = props.level
  var values = props.values ? props.values : Array(4).fill("");
  return (
    <div className={classes.box}>
        {values.map((val) => {
            return (
            <input type="text" key={Math.random()} readOnly={isMutable} defaultValue={val} className={classes.input}/>
            )
        })}
    </div>
  );
};

export default ValueBoxes;
