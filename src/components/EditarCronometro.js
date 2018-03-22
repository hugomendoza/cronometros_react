import React, { Component } from 'react';
import { Form, Button, Card } from 'semantic-ui-react';
import store from '../store';

class EditarCronometro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: this.props.edit,
      titulo: this.props.titulo,
      descripcion: this.props.descripcion
    }

    this.createChronometer = this.createChronometer.bind(this);
    this.editChronometer = this.editChronometer.bind(this);
    this.cancelChronometer = this.cancelChronometer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  render() {
    return (
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header>
                <Form onSubmit={this.state.editar ? this.editChronometer : this.createChronometer}>
                  <Form.Group widths='equal'>
                    <Form.Input
                      label='Titulo'
                      value={this.state.titulo}
                      name='titulo'
                      onChange={this.handleInputChange}
                      required />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                      label = 'Descripción'
                      value={this.state.descripcion}
                      name='descripcion'
                      onChange={this.handleInputChange}
                      required />
                  </Form.Group>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='teal' type='submit'>{ this.state.editar ? 'Editar' : 'Crear' }</Button>
                      <Button basic color='orange' onClick={ this.cancelChronometer }>Cancelar</Button>
                    </div>
                  </Card.Content>
                </Form>
            </Card.Header>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }

  handleInputChange = (event, { value, name }) => this.setState({ [name]: value })

  createChronometer(event) {
    event.preventDefault();
    store.dispatch({
      type: "CREAR_CRONOMETRO",
      titulo: this.state.titulo,
      descripcion: this.state.descripcion,
    })
  }

  editChronometer(event) {
    event.preventDefault();
    store.dispatch({
      type: "EDITAR_CRONOMETRO",
      titulo: this.state.titulo,
      descripcion:this.state.descripcion,
    })
  }

  cancelChronometer(id) {
    if(this.state.editar)
      store.dispatch({type: "CANCELAR_EDICION_CRONOMETRO"});
    else
      store.dispatch({type: "CANCELAR_NUEVO_CRONOMETRO"});
  }
}

export default EditarCronometro;
