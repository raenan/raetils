import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoogieService {
  //this handles the data storage via cookies
    //and yes, i know it's 'cookies' and not 'coogies', but I know what i said
  //this is not best-practice cookie storage, as i'm just storing the json
    //rather than using parsing-tomfoolery
      //https://blog.revathskumar.com/2014/07/why-you-should-not-store-json-in-cookie.html
      //https://www.w3schools.com/js/js_cookies.asp
  constructor() { }

  saveCookie(data){
    data = JSON.stringify(data);
    var d = new Date();
    d.setFullYear(3100);
    var expires = "expires="+ d.toUTCString();
    document.cookie = "cards="+data + ";" + expires + "SameSite=None; Secure"+";path=/"; 
    console.log(document.cookie.toString());
  }
  getCookie(){
    var name = "cards=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log(c.substring(name.length, c.length));
        return JSON.parse(c.substring(name.length, c.length));
        // return c.substring(name.length, c.length);
      }
    }
    return "";
  }


}
