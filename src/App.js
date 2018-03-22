import React, { Component } from 'react';
import './App.css';
import NuevoCronometro from './components/NuevoCronometro';
import Cronometros from './components/Cronometros';
import { Grid, Divider } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid centered columns={2}>
          <Grid.Column>
            <h1>Cronometros</h1>
            <Divider />
            <Cronometros />
            <NuevoCronometro />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
