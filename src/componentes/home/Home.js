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

  // função que atualiza o campo ao digitar
  validaNumero = e => {
    const regex = /^[0-9\b]+$/;
    const valor = e.target.value;
    if (valor === '' || regex.test(valor)) {
      this.setState({ [e.target.name]: valor });
    }
  };

  // função chamada ao digitar o campo código do município
  onKeyUp = async e => {
    e.preventDefault();
    const { id } = this.state;

    if (id.length === 7) {
      // chama a API passando id da cidade para o método GET
      const res = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${id}`
      );

      if (res.data.nome !== undefined) {
        this.setState({ nome: res.data.nome.toUpperCase(), errors: {} });
      } else {
        // se não encontrar a cidade, seta amensagem de erro
        this.setState({
          nome: '',
          errors: { nome: 'Cidade não encontrada.' }
        });
      }
    } else if (id.length < 7) {
      // limpa o state do campo nome
      this.setState({
        nome: '',
        errors: ''
      });
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
                    maxLength="7"
                    value={id}
                    pattern="[0-9]*"
                    onChange={this.validaNumero}
                    onKeyUp={this.onKeyUp.bind(this)}
                    error={errors.id}
                  />
                </div>
                <div className="col-sm">
                  <TextInputGroup
                    label="Município"
                    name="nome"
                    maxLength="60"
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
