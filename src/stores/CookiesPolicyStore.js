import Cookies from 'universal-cookie';
import { observable, action } from 'mobx';


const COOKIE_EXPIRE_DATE = new Date(new Date().setFullYear(new Date().getFullYear() + 10));


export default class CookiesPolicyStore {
  cookieName;
  cookies;
  @observable cookieChecked;

  constructor(cookie, cookieName) {
    this.cookies = new Cookies(cookie);
    this.cookieName = cookieName;
    this.cookieChecked = this.cookies.get(this.cookieName) && this.cookies.get(this.cookieName) !== '0';
  }

  @action
  setCookieChecked() {
    this.cookies.set(this.cookieName, 1, { path: '/', expires: COOKIE_EXPIRE_DATE });
    this.cookieChecked = true;
  }
}
