import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import ActivityCreate from './components/ActivityCreate'
import Detail from './components/Detail';
import Error from './components/Error404';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path='/countries/:id' component={Detail}/>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/activity' component={ActivityCreate}/>
        <Route path='*' component={Error}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
