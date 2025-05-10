import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js'
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const action = animations[i];
      setTimeout(() => {
        if (action.type == 'compare') {
          const [barOneIdx, barTwoIdx] = action.bars;
          arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
        } else if (action.type == 'revert') {
          const [barOneIdx, barTwoIdx] = action.bars;
          arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        } else if (action.type == 'overwrite') {
          const {index, newHeight} = action;
          arrayBars[index].style.height = `${newHeight}px`;
        }
      }, i * ANIMATION_SPEED_MS);
    }
  }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomIntFromInterval(1, 1000);
          for (let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          const mergeSortedArray = getMergeSortAnimations(array.slice());
          console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;
    
        return (
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}></div>
            ))}
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button onClick={() => this.testSortingAlgorithms()}>
              Test Sorting Algorithms (BROKEN)
            </button>
          </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
}
