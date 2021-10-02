import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import StudentPage from './pages/StudentPage';
import StudentsPage from './pages/StudentsPage';
import AddPlacementPage from './pages/AddPlacementPage';

function App() {
  return (
    <Switch>
      <Route exact path='/' render={(props) => <Home {...props} />} />
      <Route exact path='/students' render={(props) => <StudentsPage {...props} />} />
      <Route path='/students/:studentId' render={(props) => <StudentPage {...props} />} />
      <Route path='/placements/:studentId/new' render={(props) => <AddPlacementPage {...props} />} />
    </Switch>
  );
}

export default App;