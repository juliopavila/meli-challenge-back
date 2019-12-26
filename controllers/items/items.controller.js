const itemsServices = require('../../services/items.services');

class ItemsController {
  /**
   * Metodo para filtar arreglo por categoria
   * @param {*} filter
   */
  filterByCategory(filter) {
    const category = filter.available_filters.find(cat => cat.id == 'category');
    if (category == undefined) {
      const cat_filter = filter.filters.find(cat => cat.id == 'category');
      return cat_filter.values.map(val => {
        return val.name;
      });
    } else {
      return category.values.map(val => {
        return val.name;
      });
    }
  }

  /**
   * Metodo para filtrar los items
   * @param {*} items
   */
  filterItems(items) {
    return items.map(i => {
      const item_list = {
        id: i.id,
        title: i.title,
        price: {
          currency: i.currency_id,
          amount: parseInt(i.price),
          decimals: this.getdecimals(i.price)
        },
        picture: i.thumbnail,
        condition: i.condition,
        address: i.address.state_name,
        free_shipping: i.shipping.free_shipping
      };
      return item_list;
    });
  }

  /**
   * Metodo para obtener los numbero decimales
   * de un string.
   * @param {*} number
   */
  getdecimals(number) {
    const decimal = parseInt((number + '').split('.')[1]);
    if (isNaN(decimal)) {
      return 0;
    } else {
      return decimal;
    }
  }

  /**
   * Metodo para hacer la llamada al servicio de los productos
   * y manejar los datos que seran retornados al cli
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async getProductsController(req, res, next) {
    try {
      const products = await itemsServices.getProducts(req);
      res.status(200).json({
        author: {
          name: 'Julio',
          lastname: 'Avila'
        },
        categories: [this.filterByCategory(products.data)],
        items: this.filterItems(products.data.results)
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Metodo para hacer la llamada al servicio de un producto
   * y manejar los datos que seran retornados al cli
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async getProductByIdController(req, res, next) {
    try {
      const prod = await itemsServices.getProduct(req);
      const product = prod[0];
      const details = prod[1];
      res.status(200).json({
        author: {
          name: 'Julio',
          lastname: 'Avila'
        },
        item: {
          id: product.data.id,
          title: product.data.title,
          price: {
            currency: product.data.currency_id,
            amount: parseInt(product.data.price),
            decimals: this.getdecimals(product.data.price)
          },
          picture: product.data.thumbnail,
          condition: product.data.condition,
          free_shipping: product.data.shipping.free_shipping,
          sold_quantity: product.data.sold_quantity,
          description: details.data.plain_text
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemsController();
