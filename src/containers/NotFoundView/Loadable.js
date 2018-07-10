/**
 * Asynchronously loads the component for NotFoundView
 */
import Loadable from 'react-loadable';


export default Loadable({
  loader: () => import('containers/NotFoundView'/* webpackChunkName: "NotFoundView" */),
  loading: () => null,
});
