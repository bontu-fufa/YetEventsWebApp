import React, {Component, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/create.css';

const EditEvent = (props) => {
    let eventId = props.match.params.eventId;
    const [event, setEvent] = useState([]);
    useEffect(() =>  {
      fetch(`/events/${eventId}`).then(response =>
          response.json().then (data => {
            setEvent(data);
          })
        );
    }, []);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageLInk] = useState("");

    let history = useHistory();
    let handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            title: title,
            date: date,
            description: description,
            image_url: imageUrl,
            location: location,
            organizer_id: sessionStorage.getItem("userId"),
            tags: [12, 5, 6]
        }

        axios.defaults.baseURL = "http://localhost:5000/YetEvents/api";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.put(`/users/${sessionStorage.getItem("userId")}/events`, data).then(response => {
            if (response.data) {
                history.push('/manageEvent');
            } 
        });
        
    }

    return (
        <div>
        <h1 style={{textAlign: 'center'}}>Edit</h1>
        <div className="row create-form" style={{justifyContent: 'center'}}>
            <div className="col-md-4">
            <form onSubmit={handleSubmit} method="post">
                <div className="form-group mb-4">
                <label className="control-label">Title</label>
                <input value={event.title} className="form-control" onChange={e => setTitle(e.target.value) }/>
                <span asp-validation-for="Title" className="text-danger" />
                </div>
                <div className="form-group mb-4">
                <label className="control-label">Date</label>
                <input value={event.date} type="datetime-local" className="form-control" onChange={e => setDate(e.target.value) }/>
                <span asp-validation-for="Date" className="text-danger" />
                </div>
                <div className="form-group mb-4">
                <label className="control-label">Location</label>
                <input value={event.location} className="form-control" onChange={e => setLocation(e.target.value) }/>
                <span asp-validation-for="Location" className="text-danger" />
                </div>
                <div className="form-group mb-4">
                <label className="control-label">Description</label>
                <input value={event.description} className="form-control" onChange={e => setDescription(e.target.value) }/>
                <span asp-validation-for="Description" className="text-danger" />
                </div>
                <div className="form-group">
                <label className="control-label">Image Url</label>
                <input value={event.image_url} className="form-control" onChange={e => setImageLInk(e.target.value) }/>
                <span asp-validation-for="ImageUrl" className="text-danger" />
                </div>
                <div className="form-group mt-4 text-center">
                <input type="submit" value="Save" className="btn btn-primary mr-3" style={{background: '#d1410c', border: 'none'}} />
            </div>
            </form>
            </div>
        </div>
        </div>

    )
}

export default EditEvent;