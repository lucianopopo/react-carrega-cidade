import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class Home extends Component {
  // inicia o state vazio
  state = {
    id: '',
    nome: '',
    errors: {}
  };

  // função onSubmit que é chamada ao enviar o formulário
  /*onSubmit = async e => {
    e.preventDefault();
    const { id } = this.state;

    // checa por campo vazio
    if (id === '') {
      this.setState({
        errors: { id: 'O campo "Código da Cidade" é obrigatório.' }
      });
      return;
    }

    // chama a API passando id da cidade para o método GET
    const res = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${id}`
    );

    if (res.data.nome !== undefined) {
      this.setState({ nome: res.data.nome, errors: {} });
    } else {
      // se não encontrar a cidade, seta amensagem de erro
      this.setState({
        id: '',
        nome: '',
        errors: { nome: 'Cidade não encontrada.' }
      });
    }
  };
  
  // função que atualiza o campo ao digitar
  onChange = e => this.setState({ [e.target.name]: e.target.value });*/

  onChange = async e => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    const { id } = this.state;

    // checa por campo vazio
    if (id.length === 0) {
      this.setState({
        errors: { id: 'O campo "Código da Cidade" é obrigatório.' }
      });
      return;
    } else if (id.length === 7) {
      // chama a API passando id da cidade para o método GET
      const res = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${id}`
      );

      if (res.data.nome !== undefined) {
        this.setState({ nome: res.data.nome, errors: {} });
      } else {
        // se não encontrar a cidade, seta amensagem de erro
        this.setState({
          nome: '',
          errors: { nome: 'Cidade não encontrada.' }
        });
      }
    }
  };

  noChange = e => ({});

  render() {
    const { id, nome, errors } = this.state;

    return (
      <Consumer>
        {value => {
          return (
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <h2>Carrega Cidade</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <TextInputGroup
                    label="Código da Cidade"
                    name="id"
                    maxlength="7"
                    value={id}
                    onChange={this.onChange.bind(this)}
                    error={errors.id}
                  />
                </div>
                <div className="col-sm">
                  <TextInputGroup
                    label="Município"
                    name="nome"
                    value={nome}
                    onChange={this.noChange}
                    error={errors.nome}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Home;
