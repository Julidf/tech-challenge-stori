import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;