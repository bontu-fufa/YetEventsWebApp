import React, {Component, useEffect, useState} from 'react';
import dateFormat from 'dateformat'
const Ticket = () => {
    const [events, setEvents] = useState([{}]);
    useEffect(() =>  {
      fetch(`/users/${sessionStorage.getItem("userId")}/tickets`).then(response =>
          response.json().then (data => {
            setEvents(data);
          })
        );
    }, []);
    let result;
    if (events.length == 0) {
        result = <div class="search-results text-center">
        <h4 class="title mt-5">No Ticket. <a href='/#events'>Register</a> for an event.</h4>
    </div>
    } else {
        result = events.map((event) => (
            <a href={"/events/" + event.id}>
                <div className="result">
                    <div className="result-desc col-8">
                        <h2 className="title">{event.title}</h2>
                        <p className="time">{dateFormat(Date.parse(event.date), "ddd, dd mmmm yyyy")}</p>
                        <p className="location">{event.location}</p>
                    </div>
                    <div className="result-img col-4 mt-1">
                        <img className="img-fluid" src={event.image_url} alt />
                    </div>
                </div>
            </a>
        ));
    }
      
        return(
            <div className="search-results">
                {result}
            </div>

        )
    }
export default Ticket;
