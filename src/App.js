
import './App.css';
import ButtonAppBar from './components/AppBar';
import Application from './components/Application';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonAppBar>Hillo</ButtonAppBar>
        <Application className = "App-adder">Com</Application>
      </header>
    </div>
  );
}

export default App;
