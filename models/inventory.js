'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Inventory name',
    trim: true
  },
  model: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 1
  }
});

var Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;