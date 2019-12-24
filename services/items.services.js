const url = require('../config');
const http = require('axios');

const url_query = `${url.config.api_url}/sites/MLA/search`;
const url_id = `${url.config.api_url}/items`;

class ItemsServices {
  async getProducts({ query }) {
    const products = await http.get(`${url_query}?q=:${query}&limit=4`);
    return products || [];
  }

  async getProduct({ id }) {
    const product = http.get(`${url_id}/${id}`);
    const product_details = http.get(`${url_id}/${id}/description`);
    return Promise.all([product, product_details]).then(details => {
      return details;
    });
    // return {
    //   product: product,
    //   product_details: product_details
    // };
  }
}

module.exports = new ItemsServices();
