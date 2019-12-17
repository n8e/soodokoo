/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Grid from './components/Grid';
import {isSolvable, isComplete} from './utils/sudoku';
import {solve, clear, undo} from './actions/grid';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

const store = finalCreateStore(rootReducer);

const App: () => React$Node = props => {
  const {grid, status} = store.getState();
  const {isSolved, isEdited} = status;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{marginTop: '10%'}}>
            <Button
              className="undo"
              disabled={window.gridHistory && !window.gridHistory.length}
              onClick={() => store.dispatch(undo())}
              style={{fontSize: '2.8em'}}
              title="undo">
              <Text>⤺ Undo</Text>
            </Button>
            <Button
              className="clear"
              disabled={!isEdited}
              onClick={() => store.dispatch(clear())}
              style={{fontSize: '2.8em'}}
              title="clear">
              <Text>⟲ Clear</Text>
            </Button>

            <Grid grid={grid} status={status} {...props} />

            <Button
              className="check"
              disabled={isSolved}
              onClick={() => {
                if (isSolvable(grid)) {
                  if (isComplete(grid)) {
                    return alert('Congratulations, you solved it!!');
                  }
                  alert('This Sudoku is solvable, keep going !!');
                } else {
                  alert('This Sudoku is NOT solvable');
                }
              }}
              style={{fontSize: '2.8em'}}
              title="check">
              <Text>Check</Text>
            </Button>
            <Button
              className="solve"
              onClick={() => store.dispatch(solve())}
              style={{fontSize: '2.8em'}}
              title="solve">
              <Text>Solve</Text>
            </Button>
            <View className="footnote">
              <View>
                <Text>Adapted from </Text>
                <Text
                  style={{color: 'blue'}}
                  onPress={() => Linking.openURL('http://danialk.github.io/')}>
                  Danial Khosravi
                </Text>
              </View>
              <View>
                <Text
                  style={{color: 'blue'}}
                  onPress={() => Linking.openURL('http://github.com/n8e')}>
                  Nate Martin
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
