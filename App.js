import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "Hello World",
      hour: "00",
      min: "00",
      sec: "00",
    };
  }

  _formatText() {
    let timer = "";
    timer = this.state.hour + ":" + this.state.min + ":" + this.state.sec;
    return timer;
  }

  setText(val) {
    this.setState({
      test: val,
    });
  }

  render() {
    const { test } = this.state;
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.headerText}>Loop Timer</Text>

          {/* Handles Hours */}
          <View style={styles.incrementContainer}>
            <TouchableOpacity style={styles.buttonDec}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>Hour</Text>
            <TouchableOpacity style={styles.buttonInc}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          {/* Handles Minutes */}
          <View style={styles.incrementContainer}>
            <TouchableOpacity style={styles.buttonDec}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>Min</Text>
            <TouchableOpacity style={styles.buttonInc}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Handles Seconds */}
          <View style={styles.incrementContainer}>
            <TouchableOpacity style={styles.buttonDec}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>Sec</Text>
            <TouchableOpacity style={styles.buttonInc}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            nativeID="Test"
            style={{ fontSize: 30 }}
            placeholder="00:00:00"
            onChangeText={(text) => this.setText(text)}
          ></TextInput>
          <TouchableOpacity
            onPress={() => this.setText("World Hello")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Timer</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  incrementContainer: {
    flex: 1,
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 40,
    marginTop:10,
    marginBottom:10
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    marginTop: 18,
  },
  buttonInc: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
  },
  buttonDec: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  counterText: {
    fontSize: 30,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 15,
  },
});
