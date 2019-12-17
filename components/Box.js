import React, {useState, useEffect, useRef} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {StyleSheet, TextInput, View} from 'react-native';
import {inputValue} from '../actions/grid';

const pallet = {
  '0': '#90CAF9', // Box 1
  '30': '#1DE9B6', // Box 2
  '60': '#FFAB91', // Box 3
  '3': '#D1C4E9', // Box 4
  '33': '#FFF59D', // Box 5
  '63': '#A5D6A7', // Box 6
  '6': '#80CBC4', // Box 7
  '36': '#F48FB1', // Box 8
  '66': '#81D4FA', // Box 9
};

const getBoxColor = (row, col) => {
  let rowGroup = row - (row % 3); // uppermost row index of the box
  let colGroup = (col - (col % 3)) * 10; // leftmost col index of the box * 10
  return pallet[rowGroup + colGroup];
};

/* Box Component */

const Box = ({val, row, col, isSolved, store}) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    setIsFixed(val ? true : false);
  }, [val]);

  const handleChange = e => {
    const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newVal = parseInt(e.target.value);
    const isDeleted = e.target.value === '';

    if (range.indexOf(newVal) > -1 || isDeleted) {
      store.dispatch(inputValue(row, col, isDeleted ? 0 : newVal));
    }
  };
  const styles = StyleSheet.create({
    tblDef: {
      flex: 1,
      alignSelf: 'stretch',
    },
    txtInput: {
      backgroundColor: getBoxColor(row, col),
      fontSize: 30,
      height: '100%',
      width: '100%',
    },
  });

  const inputRef = useRef(null);
  const input = (
    <TextInput
      ref={inputRef}
      style={styles.txtInput}
      className={isFixed ? 'fixed' : isSolved ? 'result' : ''}
      disabled={isFixed || isSolved}
      value={val ? val : ''}
      onChange={handleChange}
    />
  );

  return (
    <View style={styles.tblDef}>
      {isSolved ? (
        <ReactCSSTransitionGroup
          transitionName="solved"
          transitionAppear={true}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionAppearTimeout={200}>
          {input}
        </ReactCSSTransitionGroup>
      ) : (
        input
      )}
    </View>
  );
};

export default Box;
