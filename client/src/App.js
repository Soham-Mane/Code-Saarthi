import './App.css';
import MonacoEditor from './components/MonacoEditor';
import {Provider} from 'react-redux';
import { store } from './store';
function App() {
  return (
    <Provider store={store}>
          <div className="App">
      <p>Soham Mane</p>
      <MonacoEditor/>
      </div>
      </Provider>

  );
}

export default App;
