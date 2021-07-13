import React, { Component } from 'react'
import { connect } from 'react-redux'

class SecondDataInfo extends Component {
  render() {
    const {secondRequest} = this.props;
    return (
      <div>
        <h1>{secondRequest.code}</h1>
        <h3>Cidade: {secondRequest.city} - {secondRequest.state}</h3>
        <h3>Bairro: {secondRequest.district}</h3>
        <h3>Lagradouro: {secondRequest.address}</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  secondRequest: state.mainReducer.secondRequest,
})

export default connect(mapStateToProps)(SecondDataInfo)
