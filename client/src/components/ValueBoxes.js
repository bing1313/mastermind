import classes from "./ValueBoxes.module.css";

const ValueBoxes = (props) => {
  var isMutable = props.readOnly;
  
  //var values = props.values ? props.values : Array(props.level).fill("");
  var values = props.values;
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
