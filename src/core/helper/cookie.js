import jwt_decode from 'jwt-decode';

export function setCookie(name, value, days = 30) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function getCookie(name) {
  if (typeof window !== 'undefined') {    
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)===' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
}

export function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
}

export function userLoginChk() {
  const token = getCookie("userToken");
  const decodedToken = token ? jwt_decode(token, { header: true }) : {};

  if (decodedToken.typ === 'JWT') { 
    return true;
  }
  else {
    return false;
  }
}