const parseCookies = (req, res, next) => {
  let cookies = req.headers.cookie || '';
  if (cookies === '') {
    req.cookies = {};
  } else {
    let cookieObj = {};
    let cookiesArr = cookies.split('; ');
    for (cookie of cookiesArr) {
      var cookieArr = cookie.split('=');
      var key = cookieArr[0];
      cookieObj[key] = cookieArr[1];
    }
    req.cookies = cookieObj;
  }
  next();
};

module.exports = parseCookies;