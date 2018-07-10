import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import MockedApolloClient from './MockedApolloClient';
import mountWith from './mountWith';


const ConditionalWrap = ({ condition, wrap, children }) => condition ? wrap(children) : children;
/**
 * Async function that let's you test your component with mocked GraphQL data. Additionally it provides
 * other wrappers that can be specified in options.
 * @param tree JSX
 * @param withIntl flag to indicate if IntlProvider should be included
 * @param withTheme flag to indicate if theme should be provided
 * @param withRouter flag to indicate if MemoryProvider should be included
 * @param stores object that contains {'store_name': store} to be passed as mocked MobX stores
 * @param customTheme a custom theme that can be passed to mockWith
 * @param mocks Array of objects: [{
 *  request: {
 *    query: gql`my-query`,
 *    variables: {var1: '1', var2: '2'}
 *  }, result: {
 *    data: <your data>
 *  }}]
 * @returns {Promise<*>}
 */
export default async function mountWithData(
  tree,
  { options: {
    withIntl = false,
    withTheme = false,
    withRouter = false,
    customTheme = null,
  }, mocks, stores = {} }
) {
  const renderedTree = mountWith(
    <ConditionalWrap
      condition={mocks != null}
      wrap={(children) => (
        <MockedProvider removeTypename addTypename={false} mocks={mocks}>
          {children}
        </MockedProvider>
      )}
    >
      <ConditionalWrap
        condition={mocks == null}
        wrap={(children) => (
          <ApolloProvider client={MockedApolloClient}>
            {children}
          </ApolloProvider>
        )}
      >
        {tree}
      </ConditionalWrap>
    </ConditionalWrap>,
    { withIntl, withTheme, withRouter, stores, customTheme }
  );
  // after render 'wait' a while for MockedProviders internal promises to resolve
  await new Promise((resolve) => setTimeout(resolve));
  // then update the enzyme wrapper
  renderedTree.update();
  return renderedTree;
}
