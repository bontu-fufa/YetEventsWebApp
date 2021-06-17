import React, {Component, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import dateFormat from 'dateformat';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/bootstrap.min.css';
import '../css/site.css';

const DetailEvent = (props) => {
  let eventId = props.match.params.eventId;
  const [event, setEvent] = useState([]);
  useEffect(() =>  {
    fetch(`/events/${eventId}`).then(response =>
        response.json().then (data => {
          setEvent(data);
        })
      );
  }, []);

  let history = useHistory();
    let handleClick = (e) => {
        e.preventDefault();

        axios.defaults.baseURL = "http://localhost:5000/YetEvents/api";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post(`/users/${sessionStorage.getItem("userId")}/tickets/${event.id}`).then(response => {
            if (response.data) {
                history.push('/ticket');
            } 
        });
        
      }

  let result;
  if (sessionStorage.getItem("userId")){
    result = <div className="container">
    <div className="row">
      <div className="col-8 e-img">
        <img className="img-fluid w-100" src={event.image_url} alt="img" />
      </div>
      <div className="col-4 e-summary">
        {/* <h3 className="text-darkgrey mb-4">@Html.ValueFor(model =&gt; model.Date, "{'{'}0:MMM{'}'}")<br />@Html.ValueFor(model =&gt; model.Date, "{'{'}0:dd{'}'}")</h3> */}
        <h3 className="text-darkgrey mb-4">{dateFormat(Date.parse(event.date), "mmm")}<br />{dateFormat(Date.parse(event.date), "dd")}</h3>
        <h3 className="e-title">{event.title}</h3>
        <p className="text-grey">by {event.organizer_name}</p>
      </div>
    </div>  
    <div className="row mt-3">
      <div className="col-8" />
      <div className="col-4">
        <button onClick={handleClick} className="btn e-btn w-100 register-btn">Register</button>
        <form className="register-event-form" method="post">
          <input type="hidden" name="eventId" defaultValue="@Html.DisplayFor(model => model.Id)" />
        </form>
      </div>
    </div>
    <hr className="w-100 mb-5" />
    <div className="container row mb-5 px-8">
      <div className="col-8">
        <h4 className="mb-4">About this event</h4>
        <p className="text-grey">
          {event.description}
        </p>
      </div>
      <div className="col-4 px-5">
        <div>
          <h6 className="mb-2">Date and time</h6>
  {/* new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today) */}
          <p style={{marginBottom: '0.2em'}}>{dateFormat(Date.parse(event.date), "ddd, dd mmmm yyyy")}</p>
          <p>{dateFormat(Date.parse(event.date), "hh:mm")}</p>
        </div>
        <div className="mt-5">
          <h6>Location</h6>
          <p>{event.location}</p>
        </div>
      </div>
    </div>
    <div className="container mb-5 px-8">
      <h6 className="mb-4">Tags</h6>
      <div>
          {/* if ({event.tags != undefined}) {
             <div>No Tags </div>
          } else {
            <span className="e-tag mr-1">{event.tags}</span>
          } */}
        {/* { event.tags.map(element => (<span className="e-tag mr-1">{element}</span>)) } */}
        <span className="e-tag mr-1">Free</span>
        <span className="e-tag">Online</span>
      </div>
    </div>
    <div className="container px-8">
      <h6 className="mb-3">Share with friends</h6>
      <div className="row px-4">
        <div className="col-1">
          <i className="share-icon fab fa-facebook-f" />
        </div>
        <div className="col-1">
          <i className="share-icon fab fa-linkedin-in" />
        </div>
        <div className="col-1">
          <i className="share-icon fab fa-twitter" />
        </div>
        <div className="col-1">
          <i className="share-icon fas fa-envelope" />
        </div>
      </div>
    </div>
  </div>
  
  } else {
    result = <div className="container">
    <div className="row">
      <div className="col-8 e-img">
        <img className="img-fluid w-100" src={event.image_url} alt="img" />
      </div>
      <div className="col-4 e-summary">
      <h3 className="text-darkgrey mb-4">{dateFormat(Date.parse(event.date), "mmm")}<br />{dateFormat(Date.parse(event.date), "dd")}</h3>
        <h3 className="e-title">{event.title}</h3>
        <p className="text-grey">by {event.organizer_name}</p>
      </div>
    </div>  
    <div className="row mt-3">
      <div className="col-8" />
      <div className="col-4">
        <form className="register-event-form" method="post">
          <input type="hidden" name="eventId" defaultValue="@Html.DisplayFor(model => model.Id)" />
        </form>
      </div>
    </div>
    <hr className="w-100 mb-5" />
    <div className="container row mb-5 px-8">
      <div className="col-8">
        <h4 className="mb-4">About this event</h4>
        <p className="text-grey">
          {event.description}
        </p>
      </div>
      <div className="col-4 px-5">
        <div>
          <h6 className="mb-2">Date and time</h6>
  {/* new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today) */}
          <p style={{marginBottom: '0.2em'}}>{dateFormat(Date.parse(event.date), "ddd, dd mmmm yyyy")}</p>
          <p>{dateFormat(Date.parse(event.date), "hh:mm")}</p>
        </div>
        <div className="mt-5">
          <h6>Location</h6>
          <p>{event.location}</p>
        </div>
      </div>
    </div>
    <div className="container mb-5 px-8">
      <h6 className="mb-4">Tags</h6>
      <div>
          {/* if ({event.tags != undefined}) {
             <div>No Tags </div>
          } else {
            <span className="e-tag mr-1">{event.tags}</span>
          } */}
        {/* { event.tags.map(element => (<span className="e-tag mr-1">{element}</span>)) } */}
        <span className="e-tag mr-1">Free</span>
        <span className="e-tag">Online</span>
      </div>
    </div>
    <div className="container px-8 mb-5">
      <h6 className="mb-3">Share with friends</h6>
      <div className="row px-4">
        <div className="col-1">
          <i className="share-icon fab fa-facebook-f" />
        </div>
        <div className="col-1">
          <i className="share-icon fab fa-linkedin-in" />
        </div>
        <div className="col-1">
          <i className="share-icon fab fa-twitter" />
        </div>
        <div className="col-1">
          <i className="share-icon fas fa-envelope" />
        </div>
      </div>
    </div>
  </div>
  
  }
      
        return(
            <div>
              {result}
            </div>
        )
    }
export default DetailEvent;