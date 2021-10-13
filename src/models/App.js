import logo from '../img/logo.svg';
import background from '../img/fon.png';
import '../css/App.css';
import Tabs from '../models/Tabs'


function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Тестовое задание. Чат для браузерной игры.
        </p>
      </header>
      <section className="game-window">
        <a className="App-link" href="https://docs.google.com/document/d/1OKCwg4G1cwsd41h2TH6Tw_OvXAiZ5sAcbWS4uJo1twA/edit#" target="_blank" rel="noopener noreferrer">
          ссылка на макет чата
        </a>
        <img src={background} className="App-fon" alt="fon" />
        <Tabs socket={props.socket}/>
      </section>
    </div>
  );
}

export default App;
