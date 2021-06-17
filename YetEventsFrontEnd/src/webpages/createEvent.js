import React, {Component, useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/create.css'

const CreateEvent = () => {
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
            tags: [1, 5, 6]
        }

        axios.defaults.baseURL = "http://localhost:5000/YetEvents/api";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post(`/users/${sessionStorage.getItem("userId")}/events`, data).then(response => {
            if (response.data) {
                history.push('/manageEvent');
            } 
        });
        
      }
      
        return(
<div className="container">
  <h1 style={{textAlign: 'center'}}>Create Event</h1>
  <div className="row create-form" style={{justifyContent: 'center'}}>
    <div className="col-md-4">
      <form method="post" onSubmit={handleSubmit}>
        <div asp-validation-summary="ModelOnly" className="text-danger" />
        <div className="form-group">
        <label className="control-label">Title</label>
          <input className="form-control" onChange={e => setTitle(e.target.value) }/>
          <span className="text-danger" />
        </div>
        <div className="form-group">
        <label className="control-label">Date</label>
          <input type="datetime-local" className="form-control" onChange={e => setDate(e.target.value) }/>
          <span className="text-danger" />
        </div>
        <div className="form-group">
        <label className="control-label">Location</label>
          <input className="form-control" onChange={e => setLocation(e.target.value) }/>
          <span className="text-danger" />
        </div>
        <div className="form-group">
        <label className="control-label">Description</label>
          <input className="form-control" onChange={e => setDescription(e.target.value) }/>
          <span className="text-danger" />
        </div>
        <div className="form-group">
          <label className="control-label">Image Link</label>
          <input className="form-control" onChange={e => setImageLInk(e.target.value) }/>
          <span className="text-danger" />
        </div>
        <div className="form-group">
          <input type="submit" value="Create" className="btn btn-primary" style={{background: '#d1410c', border: 'none'}} />
        </div>
      </form>
    </div>
  </div>
</div>

        )
    }


export default CreateEvent;