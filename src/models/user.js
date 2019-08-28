import mongoose from "mongoose";

import validator from "validator";

import bcrypt from "bcryptjs";

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({error: 'Correo inválido'})
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

// Search for a user by email and password.
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username} );
  if (!user) {
    throw new Error({ error: 'Credenciales inválidas' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Credenciales inválidas' });
  }
  return user
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
