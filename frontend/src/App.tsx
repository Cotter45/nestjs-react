import { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { csrfFetch } from './util/csrf';
import NavBar from './features/navbar/Navbar';

function App() {

  useEffect(() => {
    (async () => {
      const response = await csrfFetch('/api/users/1');
      const body = await response.json();
      console.log(body);
    })();
    (async () => {
      const response = await csrfFetch('/api/users/1', {
        method: 'PATCH',
        body: JSON.stringify({
          name: 'Sean Cotter'
        })
      });
      const body = await response.json();
      console.log(body);
    })();
    (async () => {
      const response = await csrfFetch('/api/users/1');
      const body = await response.json();
      console.log(body);
    })();
    // (async () => {
    //   const response = await csrfFetch('/api/articles');
    //   const body = await response.json();
    //   console.log(body);
    // })();
    // (async () => {
    //   const response = await csrfFetch('/api/articles');
    //   const body = await response.json();
    //   console.log(body);
    // })();
    (async () => {
      const response = await csrfFetch('/api/articles');
      const body = await response.json();
      console.log(body);
    })();
  })
  return (
    <main className="App">
      <NavBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </main>
  );
}

export default App;
