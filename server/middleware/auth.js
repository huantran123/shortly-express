const models = require('../models');
const Promise = require('bluebird');
const utils = require('../lib/hashUtils');
const cookieParser = require('./cookieParser');
const db = require('../db');

var sessionHelper = (req, res, next) => {
  return models.Sessions.create()
    .then(result => {
      return models.Sessions.get({'id': result.insertId});
    })
    .then(result => {
      req.session = result;
      res.cookie('shortlyid', {value: result.hash});
      next();
    })
    .catch(err => {
      throw err;
    });
};


module.exports.createSession = (req, res, next) => {
  let reqCookies = req.cookies;
  if (JSON.stringify(reqCookies) === '{}') {
    sessionHelper(req, res, next);
  } else {
    let oldHash = reqCookies.shortlyid.value || reqCookies.shortlyid;
    models.Sessions.get({'hash': oldHash})
      .then((result) => {
        if (!result) {
          return sessionHelper(req, res, next);
        } else {
          req.session = result;
          res.cookie('shortlyid', {value: result.hash});
          next();
        }
      });
  }
};



/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

