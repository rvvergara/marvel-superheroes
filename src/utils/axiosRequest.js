const axios = require('axios');

const fetchData = async (url) => {
  const response = await axios.get(url);

  return response.data;
};

module.exports = { fetchData };
