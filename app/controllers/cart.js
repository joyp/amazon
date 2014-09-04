'use strict';

var Product = require('../models/product');

exports.add = function(req, res){
  Product.findById(req.body.productId, function(err, product){
    req.session.cart = req.session.cart || [];
    req.session.cart.push(product);
    req.session.save();
    res.redirect('/cart');
  });
};

exports.index = function(req, res){
  var products = {},
      subtotal = 0,
      tax = 0,
      total = 0;

  (req.session.cart || []).forEach(function(p){
    subtotal += p.price;
    var id = p._id.toString();
    products[id] = products[id] || {p:p, c:0};
    products[id].c++;
  });

  tax = subtotal * 0.075;
  total = subtotal + tax;

  res.render('cart/index', {ids:Object.keys(products), products:products, subtotal:subtotal, tax:tax, total:total});
};

