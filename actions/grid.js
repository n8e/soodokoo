/* Action Creators */

export const inputValue = (row, col, val) => {
  return {
    type: 'INPUT_VALUE',
    row,
    col,
    val,
  };
};

export const solve = () => {
  return {
    type: 'SOLVE',
  };
};

export const clear = () => {
  return {
    type: 'CLEAR',
  };
};

export const undo = () => {
  return {
    type: 'UNDO',
  };
};
