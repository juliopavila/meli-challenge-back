const url = require('../config');
const http = require('axios');

const url_query = `${url.config.api_url}/sites/MLA/search`;
const url_id = `${url.config.api_url}/items/`;

class ItemsServices {
  async getProducts({ query }) {
    const products = await http.get(`${url_query}?q=:${query}&limit=4`);
    return products || [];
  }

  async getProduct({ id }) {
    const product = await http.get(`${url_id}/${id}`);
    return product || {};
  }
}

module.exports = new ItemsServices();
