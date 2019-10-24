const Sellers = require('../../models/seller.model');

const Query = {
    getSellers = () => Sellers.find()
}

module.exports = Query;