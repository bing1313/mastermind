import { useState, useEffect } from "react";
import classes from "./MastermindGame.module.css";
import InputRow from "./InputRow";
import DisplayRow from "./DisplayRow";
import GameModes from "./GameModes";

const MasterMindGame = () => {
  const [randomNums, setRandomNums] = useState([2, 3, 1, 4]);
  const [rows, setRows] = useState([]);
  const [rowsNum, setRowsNum] = useState(0);
  const [didWin, setDidWin] = useState(false);
  const [turnsLeft, setTurnsLeft] = useState(10);
  const [difficulty, setDiff] = useState(4);
  const [didGameStart, setDidGameStart] = useState(false);

  useEffect(() => {
    // //1. retrieve random numbers from api
    fetch(
      "https://www.random.org/integers/?num=" +
        difficulty +
        "&min=0&max=7&col=1&base=10&format=plain&rnd=new"
    )
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        var array = data.split("\n");
        array.pop();
        array = array.map((num) => {
          return parseInt(num);
        });
        setRandomNums(array);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [difficulty]);

  const isValid = (arr) => {
    for (let i = 0; i < arr.length; i++) {
       
        var currInput = arr[i];
        
        if (isNaN(Number(currInput))) {
          return false;
        }

        if (currInput.length == 0) {
            return false;
        }
        let num = parseInt(currInput);
        if (num < 0 || num > 7) {
          return false;
        }
      }
      return true;
  }

  const checkRow = (event) => {
    if (turnsLeft < 1) {
      alert("Game Over. Better Luck next time");
    } else {
      event.preventDefault();
      //update did game start
      if (!didGameStart) {
          setDidGameStart(true);
      }

      //check all inputs are valid
      var arr = [];
      for (var i = 0; i < event.target.length - 1; i++ ) {
          arr.push(event.target[i].value)
      }
 
    if (!isValid(arr)) {
        return false;
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

      //2. check if any remaining inputs nums are in the random set
      inputArr.forEach((num) => {
        if (randomArr.indexOf(num) != -1) {
          feedback.push(1);
          randomArr.splice(randomArr.indexOf(num), 1);
        }
      });

      //3. check for any remaining numbers
      for (let i = feedback.length; i < difficulty; i++) {
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

  const changeMode = (e) => {
      if (!didGameStart) {
        switch (e.target.value) {
            case "hard":
              setDiff(6);
              break;
            default:
              setDiff(4);
          }
      }
  };

  return (
    <section>
      <h2>MasterMind Game</h2>
      <div className={classes.box}>
      <div className={classes.game}>
        {<p>{turnsLeft} turns remaining</p>}
        <div className={classes.guessGrid}>
          {rows.map((row) => {
            return (
              <DisplayRow
                key={row.row}
                values={row.nums}
                feedback={row.check}
                numInputs={difficulty}
              />
            );
          })}
        </div>
        
        {!didGameStart && <GameModes changeMode={changeMode} />}

        <InputRow rowId="1" checkRow={checkRow} level={difficulty} />
        <p>Inputs should be only numbers from 0-7</p>
      </div>
      </div>
      
    </section>
  );
};

export default MasterMindGame;
