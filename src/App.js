import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowList from "./components/ShowList";
import CreatePage from "./components/CreatePage";
import UpdatePage from "./components/UpdatePage";
import DetailPage from "./components/DetailPage";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowList />} />
        <Route path='/list' element={<ShowList />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}