const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET

module.exports = {
    sign: (payload) => {
     var signOptions = {
         expiresIn:  "24h"   
     };
     return jwt.sign(payload, jwtSecret, signOptions);
   },
   verify: (token) => {
     var verifyOptions = {
         expiresIn:  "24h"
     };
      try{
        return jwt.verify(token, jwtSecret, verifyOptions);
      }catch (err){
        return false;
      }
   },
    decode: (token) => {
       return jwt.decode(token, {complete: true});
    }
}