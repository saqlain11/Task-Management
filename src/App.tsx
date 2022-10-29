import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "pages/NotFound";
import { TaskTable } from "components";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<TaskTable />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
