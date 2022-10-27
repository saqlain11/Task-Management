import "App.css";
import React from "react";
import { TaskTable } from "components";
import { Provider, useSelector } from "react-redux";
import store from "redux/store";


const App: React.FC = () => {
  const global=useSelector(state=>state)
  console.log("global",global);
  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <TaskTable></TaskTable>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </Provider>
  );
};

export default App;
