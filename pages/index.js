import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Alert,
  Button,
  Linking,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Grid from '../components/Grid';
import { isSolvable, isComplete } from '../utils/sudoku';
import { solve, clear, undo } from '../actions/grid';

const App = props => {
  const { grid, status } = props;
  const { isSolved, isEdited } = status;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.container}>
            <Button
              className="undo"
              disabled={window.gridHistory && !window.gridHistory.length}
              onPress={() => props.dispatch(undo())}
              style={styles.btn}
              title="undo">
              <Text>⤺ Undo</Text>
            </Button>
            <Button
              className="clear"
              disabled={!isEdited}
              onPress={() => props.dispatch(clear())}
              style={styles.btn}
              title="clear">
              <Text>⟲ Clear</Text>
            </Button>

            <Grid grid={grid} status={status} {...props} />

            <Button
              className="check"
              disabled={isSolved}
              onPress={() => {
                if (isSolvable(grid)) {
                  if (isComplete(grid)) {
                    return Alert.alert('Congratulations, you solved it!!');
                  }
                  Alert.alert('This Sudoku is solvable, keep going !!');
                } else {
                  Alert.alert('This Sudoku is NOT solvable');
                }
              }}
              style={styles.btn}
              title="check">
              <Text>Check</Text>
            </Button>
            <Button
              className="solve"
              onPress={() => props.dispatch(solve())}
              style={styles.btn}
              title="solve">
              <Text>Solve</Text>
            </Button>
            <View className="footnote">
              <View>
                <Text>Adapted from </Text>
                <Text
                  style={styles.blueTxt}
                  onPress={() => Linking.openURL('http://danialk.github.io/')}>
                  Danial Khosravi
                </Text>
              </View>
              <View>
                <Text
                  style={styles.blueTxt}
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
  container: {
    marginTop: '10%',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  btn: {
    fontSize: 30,
  },
  blueTxt: {
    color: 'blue',
  },
});

const mapStateToProps = state => {
  const {grid, status} = state;
  return {grid, status};
};

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({undo, clear, solve}, dispatch);
  return {...actions, dispatch};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
