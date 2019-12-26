const url = require('../config');
const http = require('axios');

const url_query = `${url.config.api_url}/sites/MLA/search`;
const url_id = `${url.config.api_url}/items`;

class ItemsServices {
  /**
   * Metodo para hacer la llamada a la Api
   * de MELI para retornar lista de productos
   * @param {query} String
   */
  async getProducts({ query }) {
    const products = await http.get(`${url_query}?q=:${query}&limit=4`);
    return products || [];
  }

  /**
   * Metodo para hacer 2 peticiones simultaneas
   * a la API de MELI para retornar el detalle y
   * descripcion del producto
   * @param {id} String
   */
  async getProduct({ id }) {
    const product = http.get(`${url_id}/${id}`);
    const product_details = http.get(`${url_id}/${id}/description`);
    return Promise.all([product, product_details]).then(details => {
      return details;
    });
  }
}

module.exports = new ItemsServices();
