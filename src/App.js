import './App.css';
import Transit from './transit/Transit';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route 
            path="transit/:key" 
            element={<Transit />} 
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
