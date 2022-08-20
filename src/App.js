import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
function App() {

  return (
    <Router basename="/notes">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element = {<Home />}/>
        </Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </ Router>
  );
}

export default App;
