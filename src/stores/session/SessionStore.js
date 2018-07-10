import { observable, action, toJS, computed } from 'mobx';
import warning from 'warning';

import User from './User';
import { sessionVerify } from './gql';


export default class SessionStore {
  @observable user;

  constructor(client) {
    this.client = client;
    warning(this.client != null, 'API client is not set');
  }

  async initialize() {
    // on client get session data from window
    // on server call the API and then save data to window
    if (process.env.IS_BROWSER && window.SESSION_STORE) {
      this.hydrate(window.SESSION_STORE);
    } else {
      await this.sessionVerify();
    }
  }

  @computed
  get isAuthenticated() {
    return (this.user && this.user.token != null) || false;
  }

  @action
  async sessionVerify() {
    const { data: { sessionVerify: { user, validationErrors } } } = await this.client.mutate({
      mutation: sessionVerify,
    });
    if (validationErrors) {
      // do nothing for now
    } else {
      this.user = new User(user);
    }
  }

  toJs() {
    return {
      user: toJS(this.user),
    };
  }

  hydrate(data) {
    if (data.user) {
      this.user = data.user;
    }
  }
}
