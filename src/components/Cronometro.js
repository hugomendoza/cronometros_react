import React, { Component } from 'react';
import { Grid, Button, Card } from 'semantic-ui-react';
import store from '../store';

const styles = {
  button:{
    border: 'none',
  }
}


class Cronometro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editarCronometro: this.props.editarCronometro,
      titulo: this.props.titulo,
      descripcion: this.props.descripcion,
      id: this.props.id,
      running: this.props.running,
      minutos: this.props.minutos,
      horas: this.props.horas,
      segundos: this.props.segundos,
      ms: this.props.ms,
    }

    this.toggleChronometer = this.toggleChronometer.bind(this);
    this.zeroPad = this.zeroPad.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.update = this.update.bind(this);
    this.editChronometer = this.editChronometer.bind(this);
    this.deleteChronometer = this.deleteChronometer.bind(this);
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column>
          <Card.Group centered>
            <Card>
              <Card.Content>
                <Card.Header>
                  {this.state.titulo}
                </Card.Header>
                <Card.Meta>
                  {this.state.descripcion}
                </Card.Meta>
                <Card.Description>
                  <h1>{ this.zeroPad(this.state.horas) + ":" + this.zeroPad(this.state.minutos) + ":" + this.zeroPad(this.state.segundos)}</h1>
                  <Button.Group style={styles.button} floated='right' basic size='small'>
                    <Button className="btn-icon" icon='trash' size='large' onClick={ ()=>this.deleteChronometer(this.state.id) }/>
                    <Button style={styles.button} className="btn-icon" icon='edit' size='large' onClick={ ()=>this.editChronometer(this.state.id) }/>
                  </Button.Group>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Button basic color={ this.state.running === true ? "red" : "green" } onClick={ this.toggleChronometer } fluid> { this.state.running === true ? "Stop" : "Start" }</Button>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </Grid>
    );
  }

  editChronometer(id) {
    this.setState({editarCronometro: true});
    store.dispatch({
      type: "FORMULARIO_EDITAR_CRONOMETRO",
      ms: this.state.ms,
      segundos: this.state.segundos,
      minutos: this.state.minutos,
      horas: this.state.horas,
      id
    })
  }

  deleteChronometer(id) {
    store.dispatch({
      type: "ELIMINAR_CRONOMETRO",
      id
    })
  }

  toggleChronometer(){
    this.setState({ running: !this.state.running});
    if(this.state.running === false)
      this.handleStart();
    else {
      this.handleStop();
    }
  }

  handleStart(){
    this.interval = setInterval(() => {
      this.tick();
    },100 )
  }

  handleStop() {
    clearInterval(this.interval);
  }

  tick(){
    let ms = this.state.ms + 1;
    let segundos = this.state.segundos;
    let minutos = this.state.minutos;
    let horas = this.state.horas;

    if (ms === 10){
      ms = 0;
      segundos = segundos + 1;
    }

    if (segundos === 60){
      segundos = 0;
      minutos = minutos + 1;
    }

    if (minutos === 60){
      minutos = 0;
      horas = horas + 1;
    }

    if (horas > 99) {
      horas = 0;
    }

    this.update(ms, segundos, minutos, horas);
  }

  update(ms, segundos, minutos, horas) {
    this.setState({
      ms: ms,
      segundos: segundos,
      minutos: minutos,
      horas: horas
    });
  }

  zeroPad(value) {
    return value < 10 ? `0${value}` : value;
  }
}

export default Cronometro;
