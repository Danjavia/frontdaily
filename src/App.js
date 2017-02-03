import React, { Component } from 'react';
import Webcam from 'react-webcam';
import logo from '../public/frontdaily2.png';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      screenshot: null,
      lat: null,
      lng: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });

    navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        devices.forEach(function(device) {
          console.log(device.kind + ": " + device.label +
            " id = " + device.deviceId);
        });
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
  }

  screenshot = () => {
    let screenshot = this.refs.webcam.getScreenshot();
    this.setState({screenshot: screenshot});
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Frontend Daily</h2>
        </div>
        { this.state.screenshot ? <img src={this.state.screenshot} role="presentation" /> : null }
        {!this.state.screenshot ? <Webcam audio={false} width="320" height="300" ref="webcam" role="presentation" />: null}
        {this.state.lat ? <div className="geo">
          <strong>latitude</strong>: {this.state.lat} -
          <strong>longitude:</strong> {this.state.lng}
        </div> : null }
        <button className="button" onClick={this.screenshot}>Take photo</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
