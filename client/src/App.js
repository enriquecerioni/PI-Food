import './App.css';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <h1 class="title">Henry Food</h1>
        </Link>       
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/create_recipe" element={<CreateRecipe/>}/>
          <Route path="/home/:id" element={<Detail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
