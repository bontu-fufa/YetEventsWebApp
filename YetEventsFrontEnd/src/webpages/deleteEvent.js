import React, {Component, useState, useEffect} from 'react';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const DeleteEvent = (props) => {
  let eventId = props.match.params.eventId;
  const [event, setEvent] = useState([]);
  useEffect(() =>  {
    fetch(`/events/${eventId}`).then(response =>
        response.json().then (data => {
          setEvent(data);
          console.log(data);
        })
      );
  }, []);

    let history = useHistory();
    let handleClick = (e) => {
        e.preventDefault();

        axios.defaults.baseURL = "http://localhost:5000/YetEvents/api";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.delete(`/users/${sessionStorage.getItem("userId")}/events/${event.id}`).then(response => {
            if (response.data) {
                history.push('/manageEvent');
            } 
        });
        
      }

        return(
        <div>
          <h3 className="mb-5">Are you sure you want to delete this?</h3>
          <div>
            <dl className="row">
              <dt className="col-sm-2">
                Title
              </dt>
              <dd className="col-sm-10">
                  {event.title}
              </dd>
              <dt className="col-sm-2">
                Date
              </dt>
              <dd className="col-sm-10">
              {dateFormat(Date.parse(event.date), "ddd, dd mmmm yyyy")}
              </dd>
              <dt className="col-sm-2">
                Location
              </dt>
              <dd className="col-sm-10">
                {event.location}
              </dd>
              <dt className="col-sm-2">
                Description
              </dt>
              <dd className="col-sm-10">
                {event.description}
              </dd>
              <dt className="col-sm-2">
                Image Url
              </dt>
              <dd className="col-sm-10">
                {event.image_url}
              </dd>
            </dl>
              <button onClick={handleClick} value="Delete" className="btn btn-danger mr-2" style={{background: '#d1410c', border: 'none'}} >Delete</button> 
          </div>
        </div>

        )
    }
export default DeleteEvent;