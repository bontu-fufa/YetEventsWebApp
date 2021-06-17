import React, {Component, useState, useEffect} from 'react';

const ManageEvent = () => {
  const [events, setEvents] = useState([{}]);
  useEffect(() =>  {
    fetch(`/users/${sessionStorage.getItem("userId")}/events`).then(response =>
        response.json().then (data => {
          setEvents(data);
        })
      );
  }, []);

return(
<div>
  <h2 style={{fontWeight: 400}}>Manage your created events</h2>
  <table className="table">
    <thead>
      <tr>
        <th>
          Title
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
    {events.map((event) => (
      <tr>
        <td>
          {event.title}
        </td>
        <td>
          <a href={"/editEvent/" + event.id}>Edit</a> |
          <a href={"/events/" + event.id}>Details</a> |
          <a href={"/deleteEvent/" + event.id}>Delete</a>
        </td>
      </tr>
      ))}
      </tbody>
  </table>
</div>

        )
    }
export default ManageEvent;