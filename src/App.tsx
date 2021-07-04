import Login from './components/Login'
import CallList from './components/CallList'
import CallDetail from './components/CallDetail'
import './App.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function App() {

  return (
    <div className="phappy-container container">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/calldetail">
            <CallDetail />
          </Route>
          <Route path="/calllist">
            <CallList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}