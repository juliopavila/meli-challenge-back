const itemsServices = require('../../services/items.services');

class ItemsController {
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
        free_shipping: i.shipping.free_shipping
      };
      return item_list;
    });
  }

  getdecimals(number) {
    const decimal = parseInt((number + '').split('.')[1]);
    if (isNaN(decimal)) {
      return 0;
    } else {
      return decimal;
    }
  }

  async getProductsController(req, res, next) {
    try {
      const products = await itemsServices.getProducts(req);
      res.status(200).json({
        author: {
          name: 'Julio',
          lastname: 'Avila'
        },
        categories: [this.filterByCategory(products.data)],
        items: [this.filterItems(products.data.results)]
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new ItemsController();
