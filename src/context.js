import React, { Component } from 'react';

// cria o Context para gerenciar os dados
const Context = React.createContext();

// reducer com as ações definidas para carregar a cidade
const reducer = (state, action) => {
  switch (action.type) {
    // ação para carregar a cidade
    case 'CARREGA_CIDADE':
      return {
        ...state,
        nome: [action.payload, ...state.nome]
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  // inicia o state com o array de cidade vazio
  state = {
    nome: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
