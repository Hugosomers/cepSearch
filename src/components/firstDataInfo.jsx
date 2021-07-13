import React, { Component } from 'react'
import { connect } from 'react-redux'

class FirstDataInfo extends Component {
  render() {
    const {data} = this.props;
    return (
      <div>
        <h1>{data.cep}</h1>
        <h3>Cidade: {data.localidade} - {data.uf}</h3>
        <h3>Bairro: {data.bairro}</h3>
        <h3>Lagradouro: {data.logradouro}</h3>
        <h3>DDD: {data.ddd}</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.mainReducer.data,
});

export default connect(mapStateToProps)(FirstDataInfo)
