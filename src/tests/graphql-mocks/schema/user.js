export const typeDefs = `
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    isStaff: Boolean!
    token: String
  }

  type SessionVerify {
    token: String
    user: User
    validationErrors: [String]!
  }
`;

export const users = {
  user: [{
    id: 1,
    username: 'jack',
    firstName: 'Jack',
    lastName: 'Sparrow',
    email: 'jack.sparrow@example.com',
    isStaff: false,
    token: 'authtoken',
  }],
};
