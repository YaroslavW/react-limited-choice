import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// the Array.from({ length: 49 }, () => false)
// is just initalizing an array with 49 entries set to false
// this will be used as our checked state for each individual cell

class App extends React.Component {
  state = { cells: Array.from({ length: 49 }, () => false) };
  // for the handleCellClick, we need to know the index of the cell that is clicked
  // so we're composing an eventHandler which takes the index of the cell
  // within the render method you can see how this is called
  handleCellClick = selectedIndex => event => {
    this.setState(prevState => {
      // we create an array of all the selectedIndexes to know how many, and which ones are selected
      // this data looks something like this
      // [0, 5, 9, 10]
      // 0,5,9,10 being the indexes of the selected cells

      const selectedCellIndexes = prevState.cells.reduce(
        (indexes, cell, index) =>
          cell === true ? [...indexes, index] : indexes,
        []
      );
      // if selectedIndex is not in the selectedCellIndexes array
      // and the selectedCellIndexes is greater than or equal to 6
      // do not allow an addition to the cells array state
      // returning null in setState signals to react that
      // a state change is not required
      return !selectedCellIndexes.includes(selectedIndex) &&
        selectedCellIndexes.length >= 6
        ? null
        : {
            cells: prevState.cells.map((cell, index) =>
              index === selectedIndex ? !cell : cell
            )
          };
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.cells.map((cell, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              display: "inline-block",
              width: `${(1 / 7) * 100}%`
            }}
            onClick={this.handleCellClick(index)}
          >
            {/* this `cell === true` could be simplified to just `cell` however,
            I like to be explicit */}
            {cell === true ? "x" : index + 1}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
