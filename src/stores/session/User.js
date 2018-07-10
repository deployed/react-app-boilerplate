export default class User {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isActive = user.isActive;
    this.isStaff = user.isStaff;
    this.token = user.token;
  }
}
