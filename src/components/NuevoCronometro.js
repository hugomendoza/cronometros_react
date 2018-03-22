import React, { Component } from 'react';
import EditarCronometro from './EditarCronometro'
import store from '../store';
import { Grid, Button } from 'semantic-ui-react';

class NuevoCronometro extends Component {
  constructor () {
    super();
    this.formCronometer = this.formCronometer.bind(this);

    this.state = {
      newForm: false
    }

    store.subscribe(() => {
      this.setState({
        newForm: store.getState().nuevoCronometro
      });
    });
  }

  render() {
    let newButton = <Grid centered columns={2}><Button basic circular icon='plus' onClick={this.formCronometer} /></Grid>
    return (
      <Grid centered columns={12}>
        {this.state.newForm ? <EditarCronometro edit={false} titulo={""} descripcion={""}/> : newButton}
      </Grid>
    )
  }

  formCronometer() {
    store.dispatch({
      type: "FORMULARIO_NUEVO_CRONOMETRO"
    })
  }
}

export default NuevoCronometro;
