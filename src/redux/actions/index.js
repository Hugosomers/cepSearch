export const requestingApi = () => ({
  type: 'REQUESTING_API',
});

export const requestSuccess = (payload) => ({
  type: 'REQUEST_SUCCESS',
  payload,
});

export const requestFailed = (payload) => ({
  type: 'REQUEST_FAILED',
  payload,
})

export const fetchCepApi = (cep) => {
   return(dispatch) => {
     dispatch(requestingApi());
     return fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => dispatch(requestSuccess(data)))
      .catch((error) => {
        console.log(error.message);
        return fetch(`https://ws.apicep.com/busca-cep/api/cep/${cep}.json`)
          .then((r) => r.json())
          .then((data) => dispatch(requestFailed(data)))
      })
   }
};
