import Button from 'react-bootstrap/Button';
import classes from './GameMode.module.css';

const GameModes = (props) => {
    return (
        <div>
            <Button size="lg" className={classes.btn} value="normal" onClick={props.changeMode}>Normal</Button>
            <Button size="lg" className={classes.btn} value="hard" onClick={props.changeMode}>Hard</Button>
        </div>
    )
}

export default GameModes;