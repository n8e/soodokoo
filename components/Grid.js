import React from 'react';
import {StyleSheet, View} from 'react-native';
import Box from './Box';

/* Grid Component */
const Grid = props => {
  const {grid, status} = props;
  const {isSolved} = status;
  const styles = StyleSheet.create({
    tbl: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tblRow: {
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
  });
  const renderBox = (row, val, col) => {
    return (
      <Box
        key={col}
        row={row}
        col={col}
        val={val}
        isSolved={isSolved}
        {...props}
      />
    );
  };
  const renderRow = (vals, row) => {
    return (
      <View style={styles.tblRow} key={row}>
        {vals.map(renderBox.bind(this, row))}
      </View>
    );
  };

  return <View style={styles.tbl}>{grid.map(renderRow)}</View>;
};

export default Grid;
