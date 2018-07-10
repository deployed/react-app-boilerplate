/* eslint-disable import/no-named-default */
import { RouterStore } from 'mobx-react-router';

import { COOKIES_POLICY_COOKIE_NAME } from 'settings';

import SessionStore from './session/SessionStore';
import CookiesPolicyStore from './CookiesPolicyStore';


export default class AppStore {
  constructor({ api, cookie }) {
    this.routingStore = new RouterStore();
    this.sessionStore = new SessionStore(api);
    this.cookiesPolicyStore = new CookiesPolicyStore(cookie, COOKIES_POLICY_COOKIE_NAME);
  }

  // any stores that need initialization outside of their constructor should be initialized here
  async initialize() {
    // await this.sessionStore.initialize();
  }

  getAllStores() {
    return {
      routing: this.routingStore,
      cookiesPolicy: this.cookiesPolicyStore,
      session: this.sessionStore,
    };
  }
}
