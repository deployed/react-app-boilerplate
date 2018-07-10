import gql from 'graphql-tag';


const UserType = {
  fragments: {
    fields: gql`
      fragment UserFields on UserType {
        id
        username
        firstName
        lastName
        email
        isStaff
        token
      }
    `,
  },
};

export const sessionVerify = gql`
  mutation sessionVerify{
    sessionVerify {
      user {
        ...UserFields
      }
      validationErrors
    }
  }
  ${UserType.fragments.fields}
`;
