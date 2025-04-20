import { Provider } from 'react-redux';
import { store } from './store';
import { TodoManager } from './pages';

export const ReduxExample = () => {
  return (
    <Provider store={store}>
      <TodoManager />
    </Provider>
  );
};
