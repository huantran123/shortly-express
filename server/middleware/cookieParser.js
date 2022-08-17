const parseCookies = (req, res, next) => {
  let cookies = req.headers;
  if (JSON.stringify(cookies) === '{}') {
    req.cookies = {};
    return;
  }
  var cookiesString = cookies.cookie;
  let cookiesArr = cookiesString.split('; ');
  var cookiesObj = {};
  for (cookie of cookiesArr) {
    var cookieArr = cookie.split('=');
    var key = cookieArr[0];
    cookiesObj[key] = cookieArr[1];
  }
  req.cookies = cookiesObj;
  next();
};

module.exports = parseCookies;