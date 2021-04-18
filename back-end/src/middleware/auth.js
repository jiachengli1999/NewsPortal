const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
   try {
      const token = req.cookies.Authorization.replace('Bearer ', '');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user with correct ID who has proper authentication token
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

      // user not found
      if (!user) {
         throw new Error();
      }

      // set fields on req object to keep track of which user / token is loggedin
      req.token = token;
      req.user = user;
      
      next();
   } catch (err) {
      res.status(401).send({ error: 'Please authenticate.' });
   }
}

module.exports = auth