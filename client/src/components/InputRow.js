import ValueBoxes from "./ValueBoxes";
import classes from "./InputRow.module.css";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const InputRow = (props) => {
    
    return (
        <div className={classes.row}>
            <form onSubmit={props.checkRow} id="form1"> 
                <ValueBoxes readOnly={false} numInputs={props.level} values={Array(props.level).fill("")}/>
            </form>
            <Button type="submit" variant="primary" size="lg" form="form1" className={classes.btn}>Submit</Button>
        </div>
    )
}

export default InputRow;