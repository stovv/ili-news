import cookie from 'js-cookie';

export function setCookie(key, value){
   if (process.browser) {
       cookie.set(key, value, {
           expires: 1,
           path: '/'
       });
   }
};


export function removeCookie(key){
   if (process.browser) {
       cookie.remove(key, {
           expires: 1
       });
   }
};


export function getCookie(key, req){
   return process.browser
       ? getCookieFromBrowser(key)
       : getCookieFromServer(key, req);
};


const getCookieFromBrowser = key => {
   return cookie.get(key);
};


function getCookieFromServer(key, req){
   if (!req.headers.cookie) {
       return undefined;
   }
   const rawCookie = req.headers.cookie
       .split(';')
       .find(c => c.trim().startsWith(`${key}=`));
   if (!rawCookie) {
       return undefined;
   }
   return rawCookie.split('=')[1];
};