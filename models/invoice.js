'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Invoice Schema
 */
var InvoiceSchema = new Schema({
  name: {
    type: String,
    default: 'GUEST',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  province: {
    type: String,
    default: '',
    trim: true
  },
  phone: [{
    type: String,
    default: '',
    trim: true
  }],
  postal: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  // items is to hold a list of inventories in this invoice
  items: [
    {
      inventory: { 
        type: Schema.ObjectId, 
        ref: 'Inventory'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  // others is to hold extra cost related entries
  others: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
      }
    }
  ],
  // misc is to hold a user defined key-value pairs
  misc:[
    {
      key: {
        type: String
      },
      value: {
        type: String
      }
    }
  ],

  status:{
    type: String,
    enum: ["OPEN", "DELIVERED", "CLOSED", "CANCELLED", "PAID"]
  }
});

var Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;