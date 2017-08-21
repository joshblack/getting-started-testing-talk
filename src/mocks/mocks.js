const makeRequest = options =>
  fetch('some-url', options)
    .then(response => {
      if (!response.ok) {
        const error = new Error('Request failed');
        error.response = response;
        throw error;
      }

      return response.json();
    })
    .catch(error => ({
      error,
      type: 'error',
    }));

export default makeRequest;
