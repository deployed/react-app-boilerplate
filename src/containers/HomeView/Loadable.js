/**
 * Asynchronously loads the component for HomeView
 */
import Loadable from 'react-loadable';


export default Loadable({
  // we have to provide full path here. It's chunk ID for react loadable
  loader: () => import('containers/HomeView'/* webpackChunkName: "HomeView" */),
  loading: () => null,
});
