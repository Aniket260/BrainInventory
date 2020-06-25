const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// Password helper
const tools = require('../utils/tools');

// Require Model
const UserModel = mongoose.model('Users');

// Require Config
const encryptConfig = require('../config/config.encrypt');

const UserController = {
  signUp: async (req, res) => {
    try {
      let {
        email,
        name
      } = req.body;
      const {
          password
      } = req.body;
      console.log(req.body);

      // Check validations
      if (!email) {
          return res.status(404).json({
            success: false,
            message: 'Email is required'
          })
      }
        if (!password) {
          return res.status(404).json({
            success: false,
            message: 'password is required'
          })
      }
      if (!name) {
        return res.status(404).json({
          success: false,
          message: 'name is required'
        })
    }

      email = email.toLowerCase();
      name = toCamelCase(name.trim());

      function toCamelCase(str){
        const splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i += 1) {
          // You do not need to check if i is larger than splitStr length, as your for does that for you
          // Assign it back to the array
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
      }
      const emailRegex = new RegExp(`^${email.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i');
      const findUser = await UserModel.findOne({
          'email': emailRegex
      });

      if (findUser && findUser._id && findUser.email) {
          return res.status(400).json({
              success: false,
              message: 'Email is already registered.'
          });
      }

      // Convert pass to hash & salt
      const {
          encrypted,
          salt
      } = await tools.saltPassword(password);
      const emailHash = crypto.randomBytes(20).toString('hex');

      const usrObj = {
          email,
          password: encrypted,
          name,
          emailHash,
          salt
      };
      const newUser = new UserModel(usrObj);
      let saveUser = await newUser.save();
      console.log(saveUser)

      if (!saveUser || !saveUser.email || saveUser.email !== email) {
          return res.status(OK).json({
              success: false,
              message: 'Unable to register user.'
          });
      }

      if (saveUser) {
          const token = jwt.sign({
              userId: saveUser._id,
              username: saveUser.username
          },
          encryptConfig.secret, {
              expiresIn: "100d"
          });
          delete saveUser.password;
          delete saveUser.salt;
          delete saveUser.emailHash;
          delete saveUser.encrypted;
          delete saveUser._id;

          return res.status(201).json({
              success: true,
              token,
              user: saveUser,
              newUser: true
          });
      }
  } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
    });
    }
  },

  login: async (req, res) => {
      try {
          let {
              email,
              password
          } = req.body;

          if (!email) {
              return res.status(400).json({
                success: true,
                message: 'Email is mandatory!'
              })
          }
          if (!password) {
            return res.status(400).json({
              success: true,
              message: 'Password is mandatory!'
            })
          }

          email = email.toLowerCase();
          // Look in database for user
          const emailRegex = new RegExp(`^${email.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i');
          let retUser = await UserModel.findOne({
              'email': emailRegex
          });

          // Check if valid user returned, return error if needed
          if (!retUser) {
              return res.status(404).json({
                  success: false,
                  message: "Invalid email."
              });
          }

          // HASH and SALT password, compare to database password
          const decryptedPass = await tools.decryptPassword(password, retUser.salt);

          if (decryptedPass !== retUser.password) {
              return res.status(Bad_Request).json({
                  success: false,
                  message: 'Invalid password.'
              });
          }

          const token = jwt.sign({
                  userId: retUser._id,
                  email: retUser.email
              },
              encryptConfig.secret, {
                  expiresIn: "100d"
              }
          );

          delete retUser.password;
          delete retUser.salt;
          delete retUser.emailHash;
          delete retUser.encrypted;

          return res.status(200).json({
              success: true,
              token,
              user: retUser,
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              error: error.message
          });
      }
  }
}

module.exports = UserController;
