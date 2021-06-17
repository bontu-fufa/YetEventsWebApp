//file: src/webpages/index.js
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import Ticket from './ticket';
import Login from './login';
import Register from './registercomponent';
import SearchEvent from './search';
import CreateEvent from './createEvent';
import ManageEvent from './manageEvent';
import DeleteEvent from './deleteEvent';
import DetailEvent from './detailEvent';
// import Home from './home';
const Webpages = (p) => {
    return(
        
        // <DetailEvent title={props.title}/>
        <Router>
            <Switch>
                <Route exact path="/" render={(props) => <Home />}/>
                <Route exact path="/login" component= {Login} />
                <Route exact path="/register" component= {Register} />
                <Route exact path="/search" component= {SearchEvent} />
                <Route exact path="/createEvent" component= {CreateEvent} />
                <Route exact path="/manageEvent" component= {ManageEvent} />
                <Route exact path="/ticket" component= {Ticket} />
                <Route exact path="/deleteEvent" component={DeleteEvent} />
                <Route exact path="/events/:eventId" component={DetailEvent} />

                {/* <Route exact path="/logout" component= {Logout} /> */}
            </Switch>
        </Router>
    );
};
export default Webpages;

