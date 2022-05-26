import { useState, useEffect } from "react";
import classes from "./MastermindGame.module.css";
import InputRow from "./InputRow";
import DisplayRow from "./DisplayRow";

const MasterMindGame = () => {
  const [randomNums, setRandomNums] = useState([2, 3, 1, 4]);
  const [rows, setRows] = useState([]);
  const [rowsNum, setRowsNum] = useState(0);
  const [didWin, setDidWin] = useState(false);
  const [turnsLeft, setTurnsLeft] = useState(10);
  const [difficulty, setDiff] = useState(4);

  useEffect(() => {
    // //1. retrieve random numbers from api
    console.log("use effect");
    
    fetch(
      "https://www.random.org/integers/?num="+ difficulty +"4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
    )
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);
        var array = data.split("\n");
        array.pop();
        array = array.map((num) => {
          return parseInt(num);
        });
        setRandomNums(array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [difficulty]);

  const isValidInput = (inputs) => {
    console.log("inputs" + inputs);
    for (let i = 0; i < inputs.length; i++) {
      var currInput = inputs[i].value;
      console.log("inputVal" + currInput);
      if (isNaN(currInput) || isNaN(Number(currInput))) {
        console.log("isnan or not a num");
        return false;
      }
      let num = parseInt(currInput);
      if (num < 0 || num > 7) {
        return false;
      }
    }
    return true;
  };

  const checkRow = (event) => {
    if (turnsLeft < 1) {
      alert("Game Over. Better Luck next time");
    } else {
      event.preventDefault();
      //check all inputs are valid
      if (!isValidInput(event.target)) {
        return;
      }

      setTurnsLeft(turnsLeft - 1);
      var rowArray = [];

      for (let i = 0; i < event.target.length; i++) {
        rowArray.push(parseInt(event.target[i].value));
      }

      rowArray.pop();
      var inputArr = rowArray.map((str) => {
        return parseInt(str);
      });
      var randomArr = [...randomNums];

      var feedback = [];

      const deleteNumFromSets = (num) => {
        let a = randomArr.indexOf(num);
        let b = inputArr.indexOf(num);
        randomArr.splice(a, 1);
        inputArr.splice(b, 1);
      };

      //1. check if numbers are correct and aligned
      for (let i = 0; i < randomNums.length; i++) {
        if (rowArray[i] == randomNums[i]) {
          feedback.push(2);
          deleteNumFromSets(rowArray[i]);
        }
      }

      for (let i = 0; i < randomArr.length; i++) {
        console.log(typeof randomArr[i]);
      }
      //2. check if any remaining inputs nums are in the random set
      inputArr.forEach((num) => {
        if (randomArr.indexOf(num) != -1) {
          feedback.push(1);
          randomArr.splice(randomArr.indexOf(num), 1);
        }
      });

      console.log("feedback after 2: " + feedback);
      for (let i = feedback.length; i < 4; i++) {
        feedback.push(0);
      }
      //check if input is correct
      if (
        feedback.every((num) => {
          return num == 2;
        })
      ) {
        setDidWin(true);
        if (alert("You Won!")) {
        } else window.location.reload();
        setDidWin(false);
        return;
      }
      //increment row number
      setRowsNum((prevCount) => {
        return prevCount + 1;
      });

      //2. Update the grid
      setRows([
        ...rows,
        { row: rowsNum, nums: rowArray, check: feedback.sort().reverse() },
      ]);
    }
  };

  return (
    <section>
      <h2>MasterMind Game</h2>
      <div className={classes.game}>
        {<p>{turnsLeft} turns remaining</p>}
        <div className={classes.guessGrid}>
          {rows.map((row) => {
            return (
              <DisplayRow
                key={row.row}
                values={row.nums}
                feedback={row.check}
                numInputs={randomNums.count}
              />
            );
          })}
        </div>
        <InputRow rowId="1" checkRow={checkRow} level={difficulty} />
      </div>
    </section>
  );
};

export default MasterMindGame;
