import { createStore } from 'redux';

function obtainId(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    if(arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
}

const reducer = (state, action) => {
  if (action.type === "CREAR_CRONOMETRO"){
    return {
      ...state,
      cronometros: state.cronometros.concat({id: state.cronometros.length,
      titulo: action.titulo,
      descripcion: action.descripcion,
      running: false,
      ms: 0,
      minutos: 0,
      segundos: 0,
      horas: 0,
      editarCronometro: false}),
      nuevoCronometro: false
    }
  }
  else if (action.type === "EDITAR_CRONOMETRO") {
    let cronometros = state.cronometros
    let index = obtainId(true, cronometros, 'editarCronometro')
    cronometros[index]['titulo'] = action.titulo
    cronometros[index]['descripcion'] = action.descripcion
    cronometros[index]['editarCronometro'] = false
    return {
      ...state,
      cronometros: cronometros
    }
  }
  else if (action.type === "FORMULARIO_NUEVO_CRONOMETRO") {
    return {
      ...state,
      nuevoCronometro: true
    }
  }
  else if (action.type === "CANCELAR_NUEVO_CRONOMETRO") {
    return {
      ...state,
      nuevoCronometro: false
    }
  }
  else if (action.type === "FORMULARIO_EDITAR_CRONOMETRO") {
    let cronometros = state.cronometros
    let index = obtainId(action.id, cronometros, 'id')
    cronometros[index]['editarCronometro'] = true
    cronometros[index]['ms'] = action.ms
    cronometros[index]['segundos'] = action.segundos
    cronometros[index]['minutos'] = action.minutos
    cronometros[index]['horas'] = action.horas
    return {
      ...state,
      cronometros: cronometros
    }
  }
  else if(action.type === "ELIMINAR_CRONOMETRO") {
    let cronometros = state.cronometros
    let index = obtainId(action.id, cronometros, 'id')
    cronometros.splice(index, 1)
    return {
      ...state,
      cronometros: cronometros
    }
  }
  else if(action.type === "CANCELAR_EDICION_CRONOMETRO") {
    let cronometros = state.cronometros
    let index = obtainId(true, cronometros, 'editarCronometro')
    cronometros[index]['editarCronometro'] = false
    return {
      ...state,
      cronometros:cronometros
    }
  }
  return state;
};

export default createStore(reducer, { cronometros: [], nuevoCronometro: false});
