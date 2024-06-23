const isLogin = async (req, res, next) => {
  try {
    if (req.session.username) {
    } else {
    }
  } catch (error) {
    console.log(error.message);
  }
  next();
};

const isLogOut = async (req, res, next) => {
  try {
    if (req.session.username) {
    }
  } catch (error) {
    console.log(error.message);
  }
  next();
};

module.exports = { isLogin, isLogOut };
