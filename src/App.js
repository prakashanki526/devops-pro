import Home from "./components/Home/Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = { <Home /> }></Route>
        <Route path="/:folderName" element = { <Home /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
