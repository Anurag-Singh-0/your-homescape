/* This is a wrap function that handle the error this function return a function with 3 parameter and inside the return function we execute the fn parameter with 3 parameter and catches the error*/
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
