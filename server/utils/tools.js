const encryptConfig = require('../config/config.encrypt');

// Libraries
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Mongoose
const mongoose = require('mongoose');

const Users = mongoose.model('Users');

const tools = {
  decryptApiKey: async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      if (!authorization || authorization === 'null') {
        req.currentUser = null;
        return next();
      }

      const decodedKey = await jwt.verify(authorization, encryptConfig.secret);
      if (typeof decodedKey === 'undefined' || typeof decodedKey.userId === 'undefined') {
        req.currentUser = null;
        return next();
      }

      const { userId } = decodedKey; // changing userId to _id
      const user = await Users.findOne({
        _id:userId // changing userId to _id
      });

      if (!user || !user._id ) {
        req.currentUser = null;
        return next();
      }

      // if (user.users.type === UserType.admin) {
      //   user.admin = true;
      // }

      req.currentUser = user;

      return next();
    } catch (e) {
      console.error('decrypt API e:', e);
      req.currentUser = null;
      return next();
    }
  },

  makeSalt: function makeSalt() {
    return Math.round((new Date().valueOf() * Math.random())) + ''; // eslint-disable-line
  },

  saltPassword: (password) => {
    if (!password) {
      return {
        encrypt: '',
        salt: '',
      };
    }

    const salt = tools.makeSalt();

    const encrypted = crypto
      .createHmac('sha1', salt)
      .update(password)
      .digest('hex');

    return { encrypted, salt };
  },

  decryptPassword: (password, salt) => {
    if (!password || !salt) {
      return false;
    }

    const decrypted = crypto
      .createHmac('sha1', salt)
      .update(password)
      .digest('hex');

    return decrypted;
  },

  StringValidation:(string) => {
    var letters = /^[0-9a-zA-Z]+$/;
    var valid = string.match(letters);
    return valid;
  },

  NumberValidation: (Number) =>{
    var validNumber = !isNaN(Number);
    return validNumber;
  }
};

module.exports = tools;
