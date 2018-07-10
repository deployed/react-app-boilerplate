import gql from 'graphql-tag';


export const redirectUrlQuery = gql`
  query RedirectUrl($url: String){
    redirectUrl(url: $url){
      url
    }
  }
`;
