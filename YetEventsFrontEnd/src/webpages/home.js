import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import dateFormat from 'dateformat';
import '../css/bootstrap.min.css';
import '../css/site.css';
import '../css/index.css';


const Home = () => {
    const [events, setEvents] = useState([{}]);
    useEffect(() =>  {
      fetch("/events").then(response =>
          response.json().then (data => {
            setEvents(data);
            console.log(data[0]);
          })
        );
    }, []);
    let result;

    if (sessionStorage.getItem("userId")){
      result = <div className="">
      <main role="main" className="">
      <div className="col-xxl-8">
        <div className="row flex-lg-row-reverse align-items-center">
          <div className="col-lg-6">
            <img src="https://images.unsplash.com/photo-1566954979172-eaba308acdf0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZXhoaWJpdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="d-block mx-lg-auto img-fluid hero-img" alt />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Events for when you're free</h1>
            <p className="lead">Make plans.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
              <a href="#events"><button type="button" className="btn btn-outline-red btn-lg px-4" style={{backgroundColor: 'rgb(34, 29, 29)', color: 'white'}}>Browse events</button></a>
            </div>
          </div>
        </div>
      </div>
      <div className="album py-5">
        <div className="container" id="events">
          <h3 className="mb-5">Online Events</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {events.map((event) => (
                <div className="col-4 mb-5 col-lg-3">
                  <div className="card card-shadow" style={{height: '100%'}}>
                    <a href={"/events/" + event.id} style={{height: '50%'}}>
                      <img src={event.image_url} className="card-img" style={{height: '100%', objectFit: 'cover'}} />
                    </a>
                    <div className="card-body" style={{height: '50%'}}>
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text text-orange">
                      {dateFormat(Date.parse(event.date), "ddd, dd mmmm yyyy")}
                      </p>
                    </div>
                  </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </main>
</div>

    } else {
      result = <div className="">
      <main role="main" className="">
      <div className="col-xxl-8">
        <div className="row flex-lg-row-reverse align-items-center">
          <div className="col-lg-6">
            <img src="https://images.unsplash.com/photo-1566954979172-eaba308acdf0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZXhoaWJpdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="d-block mx-lg-auto img-fluid hero-img" alt />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Events for when you're free</h1>
            <p className="lead">Make plans.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">              <a href="/register"><button type="button" className="btn btn-red btn-lg px-4 mr-2" style={{backgroundColor: 'rgb(34, 29, 29)', color: 'white'}}>Sign-up</button></a>
              <a href="#events"><button type="button" className="btn btn-outline-red btn-lg px-4" style={{backgroundColor: 'rgb(34, 29, 29)', color: 'white'}}>Browse events</button></a>
            </div>
          </div>
        </div>
      </div>
      <div className="album py-5">
        <div className="container" id="events">
          <h3 className="mb-5">Online Events</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {events.map((event) => (
                <div className="col-4 mb-5 col-lg-3">
                  <div className="card card-shadow" style={{height: '100%'}}>
                    <a href={"/events/" + event.id} style={{height: '50%'}}>
                      <img src={event.image_url} className="card-img" style={{height: '100%', objectFit: 'cover'}} />
                    </a>
                    <div className="card-body" style={{height: '50%'}}>
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text text-orange">
                      {dateFormat(Date.parse(event.date), "ddd, dd mmmm yyyy")}
                      </p>
                    </div>
                  </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </main>
</div>

    }

    return (
      
       <div>
         {result}
       </div>
    );
};
export default Home;
