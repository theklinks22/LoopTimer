import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tempTime: '00:00:00',
      setTime: 0,
      currTime: 0,
      hour: '00',
      min: '00',
      sec: '00',
      timerActive: false,
    }
  }

  _formatText() {
    let timer = ''
    timer = this.state.hour + ':' + this.state.min + ':' + this.state.sec
    console.log(timer)
    return timer
  }

  setText() {
    this.setState({
      tempTime: this._formatText(),
    })
  }

  _startTimer() {
    let t = this._getTotalTime()
    let { timerActive,setTime } = this.state
    if (!timerActive) {
      this.setState(
        {
          setTime: t,
          currTime: t,
          timerActive: true,
        },
        () => {
          this.timerCall = setInterval(() => {
            this._decrementTimer()
          }, 1000)
        }
      )
    } else {
      clearInterval(this.timerCall)
      this.setState({
        timerActive: false,
        currTime: setTime,
        tempTime: this._secondsToHms(setTime)
      })
    }
  }

  _decrementTimer() {
    let { setTime, currTime } = this.state
    console.log('Time: ' + currTime)
    if (currTime > 0) {
      let ct = currTime - 1
      const newTime = this._secondsToHms(ct)
      this.setState(
        {
          currTime: ct,
          tempTime: newTime,
        }
      )
    } else {
      this.setState({
        currTime: setTime,
        tempTime: this._secondsToHms(setTime)
      })
    }
  }

  _secondsToHms(d) {
    d = Number(d)
    let h = Math.floor(d / 3600)
    let m = Math.floor((d % 3600) / 60)
    let s = Math.floor((d % 3600) % 60)

    return (
      ('0' + h).slice(-2) +
      ':' +
      ('0' + m).slice(-2) +
      ':' +
      ('0' + s).slice(-2)
    )
  }

  _getTotalTime() {
    let { hour, min, sec } = this.state
    return Number(hour) * 3600 + Number(min) * 60 + Number(sec)
  }

  _hourInc() {
    let h = Number(this.state.hour)
    console.log(h)
    h++
    let s = ('0' + h).slice(-2)
    console.log('Formatted: ' + s)
    this.setState(
      {
        hour: s,
      },
      () => this.setText()
    )
  }

  _hourDec() {
    let h = Number(this.state.hour)
    console.log(h)
    if (h != 0) {
      h--
    }
    let s = ('0' + h).slice(-2)
    console.log('Formatted: ' + s)
    this.setState(
      {
        hour: s,
      },
      () => this.setText()
    )
  }

  _minInc() {
    let h = Number(this.state.min)
    console.log(h)
    if (h == 59) {
      h = 0
    } else {
      h++
    }

    let s = ('0' + h).slice(-2)
    console.log('Formatted: ' + s)
    this.setState(
      {
        min: s,
      },
      () => this.setText()
    )
  }

  _minDec() {
    let h = Number(this.state.min)
    console.log(h)
    if (h != 0) {
      h--
    } else {
      h = 59
    }
    let s = ('0' + h).slice(-2)
    console.log('Formatted: ' + s)
    this.setState(
      {
        min: s,
      },
      () => this.setText()
    )
  }

  _secInc() {
    let h = Number(this.state.sec)
    console.log(h)
    if (h == 59) {
      h = 0
    } else {
      h++
    }

    let s = ('0' + h).slice(-2)
    console.log('Formatted: ' + s)
    this.setState(
      {
        sec: s,
      },
      () => this.setText()
    )
  }

  _secDec() {
    let h = Number(this.state.sec)
    console.log(h)
    if (h != 0) {
      h--
    } else {
      h = 59
    }
    let s = ('0' + h).slice(-2)
    console.log('Formatted: ' + s)
    this.setState(
      {
        sec: s,
      },
      () => this.setText()
    )
  }

  render() {
    const { tempTime } = this.state
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.headerText}>Loop Timer</Text>

          {/* Handles Hours */}
          <View style={styles.incrementContainer}>
            <TouchableOpacity
              style={styles.buttonDec}
              onPress={() => this._hourDec()}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>Hour</Text>
            <TouchableOpacity
              style={styles.buttonInc}
              onPress={() => this._hourInc()}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Handles Minutes */}
          <View style={styles.incrementContainer}>
            <TouchableOpacity
              style={styles.buttonDec}
              onPress={() => {
                this._minDec()
              }}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>Min</Text>
            <TouchableOpacity
              style={styles.buttonInc}
              onPress={() => {
                this._minInc()
              }}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Handles Seconds */}
          <View style={styles.incrementContainer}>
            <TouchableOpacity
              style={styles.buttonDec}
              onPress={() => {
                this._secDec()
              }}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>Sec</Text>
            <TouchableOpacity
              style={styles.buttonInc}
              onPress={() => {
                this._secInc()
              }}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            nativeID='Test'
            style={{ fontSize: 30 }}
            placeholder='0'
            onChangeText={(text) => this.setText(text)}
          ></TextInput>

          <Text style={styles.timerText}>{tempTime}</Text>

          <TouchableOpacity
            onPress={() => this._startTimer()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Timer</Text>
          </TouchableOpacity>
          <StatusBar style='auto' />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incrementContainer: {
    flex: 1,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginTop: 18,
  },
  buttonInc: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  buttonDec: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  counterText: {
    fontSize: 30,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 15,
  },
  timerText: {
    fontSize: 50,
    color: 'dimgrey',
  },
})
