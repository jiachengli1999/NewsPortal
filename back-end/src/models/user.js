const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
         }
      }
   },
   password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
         if (value.length < 7) {
            throw new Error('Password must be at least 7 characters')
         }
      }
   },
   tokens: [{
      token: {
         type: String,
         required: true
      }
   }]
}, {
   timestamps: true
})

/* Hash the plain text password before saving */
userSchema.pre('save', async function (next) {
   const user = this;

   if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
   }

   next();
})

/* Create token and save to user tokens array */
userSchema.methods.generateAuthToken = async function () {
   const user = this;
   const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

   user.tokens = user.tokens.concat({ token });
   await user.save()

   return token
}

/* Find user info by login credentials -- this is for logging in */
userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email });

   // email not found
   if (!user) {
      throw new Error('Unable to login');
   }

   const isMatch = await bcrypt.compare(password, user.password);

   //password did not match
   if (!isMatch) {
      throw new Error('Unable to login');
   }

   return user
}

const User = mongoose.model('Users', userSchema);

module.exports = User