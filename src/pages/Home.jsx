import React, { Component } from 'react';
import { connect } from 'react-redux';
import LOGO from '../mapMarkerLogo.png';
import '../css/home.css';
import { fetchCepApi } from '../redux/actions';
import Modal from 'react-modal';
import FirstDataInfo from '../components/firstDataInfo';
import SecondDataInfo from '../components/secondDataInfo';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cepInput: '',
      modal: false,
    }
    
    this.inputHandle = this.inputHandle.bind(this);
    this.cepCorrection = this.cepCorrection.bind(this);
    this.searchButtonHandle = this.searchButtonHandle.bind(this);
  }

  inputHandle({target}) {
    const {value} = target;
    this.setState({
      cepInput: value,
    });
    this.cepCorrection(value);
  }

  cepCorrection(str) {
    const wordRegex = /[A-z]/g;
    const regex = /^(\d{2})(\d{3})(\d{3})$/;

    if(wordRegex.test(str)) {
      this.setState({
        cepInput: str.replace(wordRegex, ''),
      });
    } else if(regex.test(str)) {
      this.setState({
        cepInput: str.replace(regex, "$1.$2-$3"),
      });
    }
  }

  searchButtonHandle() {
    const { cepInput } = this.state;
    const {fetchAction, loading} = this.props;

    const returnRegex = /[.-]/g;
    if(returnRegex.test(cepInput)) {
      fetchAction(cepInput.replace(returnRegex,''));
    }
    if(!loading) {
      this.setState({
        modal: true,
      })
    }
  }

  render() {
    const { cepInput, modal } = this.state;
    const { loading, data } = this.props;
    return (
      <div className="homeContainer">
        <div className="homeMainContent">
          <img src={ LOGO } alt="logo" className="logoImg"/>
          <input 
            type="text"
            placeholder="Digite seu CEP"
            className="cepInput"
            maxLength="9" 
            onChange={ this.inputHandle }
            value={ cepInput }
          />
          <button 
            type="button" 
            className="searchBttn"
            onClick={ this.searchButtonHandle }
          >
            Pesquisar
          </button>
        </div>
        {loading ? 
          <h5>Loading...</h5> 
          : 
          <Modal
            isOpen={modal}
            ariaHideApp={false}
          >
            <button onClick={() => this.setState({modal: false})}>Fechar</button>
            {Object.keys(data).length > 0 ? <FirstDataInfo /> : <SecondDataInfo />}
          </Modal>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.mainReducer.isLoading,
  data: state.mainReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (cep) => dispatch(fetchCepApi(cep)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
