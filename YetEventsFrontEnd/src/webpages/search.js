import React, {Component, useEffect, useState} from 'react';
import { Search } from 'semantic-ui-react';
import dateFormat from 'dateformat';
import '../css/search.css'
const SearchEvent = (props) => {
    const query = new URLSearchParams(props.location.search);
    const q = query.get('q')

    const [events, setEvents] = useState([{}]);
    useEffect(() =>  {
      fetch(`/events/${q}`).then(response =>
          response.json().then (data => {
            setEvents(data);
          })
        );
    }, []);

    let eves;
    if (events.length == 0){
        eves = <div className="search-results">
                    <div className="my-5">
                        <h3 className="title pt-5" style={{height: '35vh'}}>No result. Try searching again with another keyword.</h3>
                    </div>
                </div>
    } else {
        eves = events.map((event) => (
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
        ))
    }
        
        return(
            <div className="container">
                <div className="search-results">
                    {eves}
                </div>
            </div>

        )
    }
export default SearchEvent;