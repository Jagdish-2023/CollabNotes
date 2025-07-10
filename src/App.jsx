import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./pages/Dashboard";
import NoteEditor from "./pages/NoteEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/note/:noteId" element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
