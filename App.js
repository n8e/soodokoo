import { Provider } from 'react-redux';

import AppPage from './pages';
import { store } from './store.js';

export default function App(props) {
  return (
    <Provider store={store}>
      <AppPage {...props} />
    </Provider>
  );
}
