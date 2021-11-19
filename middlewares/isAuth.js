const jwt = require("jsonwebtoken");

//===================using headers======================
// module.exports = (req, res, next) => {
//   //get Authorization section from the header
//   const authInfo = req.get("Authorization");
//   //chech if there is authorizatin section
//   if (!authInfo || authInfo === "") {
//     //add isAuth to request to identify authentication later
//     req.isAuth = false;
//     return next();
//   }
//   //split autherization cuz autherization => Bearer token.. => split(' ')[1]
//   const token = authInfo.split(" ")[1];
//   //check if token is here
//   if (!token || token === "") {
//     req.isAuth = false;
//     return next();
//   }
//   //if here try to verify with jwt using sectret ket
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
//   } catch (error) {
//     req.isAuth = false;
//     return next();
//   }

//   if (!decodedToken || decodedToken === "") {
//     req.isAuth = false;
//     return next();
//   }
//   //useng that decoded token which have info like userId =>put them into request to use them later
//   req.isAuth = true;
//   req.userId = decodedToken.userId;
//   return next();
// };

//==================using httpOnly Cookie=================
module.exports = (req, res, next) => {
  //get token from cookie
  const bearerToken = req.cookies.token;
  //chech if there is there a token in cookie
  if (!bearerToken || bearerToken === "") {
    //add isAuth to request to identify authentication later

    req.isAuth = false;
    return next();
  }

  //split autherization cuz autherization => Bearer token.. => split(' ')[1]
  const token = bearerToken.split(" ")[1];
  //check if token is here
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  //if here try to verify with jwt using sectret ket
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "tolanSecretKey");
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken || decodedToken === "") {
    req.isAuth = false;
    return next();
  }
  //using that decoded token which have info like userId =>put them into request to use them later
  req.isAuth = true;
  req.userId = decodedToken.userId;

  return next();
};
