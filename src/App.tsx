import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import { Layout, Spin } from "components";

const AllTask=React.lazy(()=>import("templates/AllTask"))
const CreateTask=React.lazy(()=>import("templates/CreateTask"))
const NotFound=React.lazy(()=>import("templates/NotFound"))
const UpdateTask=React.lazy(()=>import("templates/UpdateTask"))


const App: React.FC = () => {
 
  return (
    <Router>
       <Suspense fallback={<Layout style={{justifyContent:"center",alignSelf:"center",width:"100vw",height:"100vh"}}><Spin size="large" tip="Loading..."></Spin></Layout>}>
      <Routes>
        <Route index element={<AllTask />}></Route>
        <Route path={ROUTES.ADD_TASK} element={<CreateTask />}></Route>
        <Route path={ROUTES.UPDATE_TASK}>
        <Route path=":subTaskId" element={<UpdateTask />}/>
        <Route path="" element={<UpdateTask />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
