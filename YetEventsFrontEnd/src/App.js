import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Webpages from './webpages';
import Nav from './webpages/navcomponent';
import NavNotLogged from './webpages/navcomponentNotLogged'
import Footer from './webpages/footercomponent';
import './css/site.css'
// import DetailEvent from '../src/webpages/detailEvent';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './webpages/home';
import Ticket from './webpages/ticket';
import Login from './webpages/login';
import Register from './webpages/registercomponent';
import SearchEvent from './webpages/search';
import CreateEvent from './webpages/createEvent';
import ManageEvent from './webpages/manageEvent';
import DeleteEvent from './webpages/deleteEvent';
import DetailEvent from './webpages/detailEvent';
import EditEvent from './webpages/editEvent';
import NotFoundPage from './webpages/notfoundpage';
function App() {
  let nav;
  if (sessionStorage.getItem('userId')) {
    nav = <Nav />
  } else {
    nav = <NavNotLogged />
  }
  return (
    <div>
      {nav}
      {/* <DetailEvent title={events} /> */}
      {/* <Webpages /> */}
      <Router>
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route exact path={"/login"} component= {Login} />
                <Route exact path={"/register"} component= {Register} />
                <Route exact path={"/search"} component= {SearchEvent} />
                <Route exact path={"/createEvent"} component= {CreateEvent} />
                <Route exact path={"/manageEvent"} component= {ManageEvent} />
                <Route exact path={"/ticket"} component= {Ticket} />
                <Route exact path={"/deleteEvent/:eventId"} component={DeleteEvent} />
                <Route exact path={"/events/:eventId"} component={DetailEvent} />
                <Route exact path={"/editEvent/:eventId"} component={EditEvent} />
                <Route path={'*'} component={NotFoundPage} />
                <Route exact path="/logout"  />
            </Switch>
        </Router>
      <Footer />
    </div>
  );
}
export default App;

