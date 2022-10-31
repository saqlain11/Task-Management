import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "templates/NotFound";
import AllTask from "templates/AllTask";
import CreateTask from "templates/CreateTask";
import { ROUTES } from "helpers/constants";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<AllTask />}></Route>
        <Route path={ROUTES.ADD_TASK} element={<CreateTask />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
