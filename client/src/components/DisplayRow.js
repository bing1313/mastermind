import classes from "./DisplayRow.module.css";
import ValueBoxes from "./ValueBoxes";

const DisplayRow = (props) => {
  var colors = props.feedback.map((num) => {
    switch (num) {
      case 0:
        return "";
      case 1:
        return "grey";
      case 2:
        return "red";
      default:
        return "";
    }
  });

  console.log("colors" + colors);
  return (
    <div className={classes.block}>
      <div className={classes.displayRow}>
        <ValueBoxes readOnly={true} values={props.values} />
      </div>
      {props.feedback.map((str, index) => {
          return <span key={Math.random} className={`${classes.dots} ${classes[colors[index]]}`}></span>
      })}

     

    </div>
  );
};

export default DisplayRow;
