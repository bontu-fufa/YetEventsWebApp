import React, {Component} from 'react';
export default class Nav extends Component{
  handleLogout = () => {
    sessionStorage.clear();

  }
    render() {
      
        return(
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 px-5 nav-header">
  <a href="/" style={{marginRight: '5%'}}><h1 className="text-orange">YetEvents</h1></a>
  <div className="d-flex align-items-center" style={{flex: 1}}>
    <form action="/search" className="w-100 me-3" method="get">
      <input type="search" name="q" className="form-control search-input" placeholder="Search events" />
    </form>
  </div>
  <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" style={{flex: 1}}>
    <li className="nav-link px-2 link-dark mr-3">
      <a href="/ticket" className="text-black " style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{textAlign: 'center'}}><i className="fas fa-ticket-alt" /></div>
        <div className="nav-link-text">Tickets</div>
      </a></li>
    <li className="nav-link px-2 link-dark mr-3">
      <a href="/createEvent" className="text-black " style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{textAlign: 'center'}}><i className="fas fa-plus" /></div>
        <div className="nav-link-text">Create Event</div>
      </a></li>
    <li className="nav-link px-2 link-dark mr-3">
      <a href="/manageEvent" className="text-black " style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{textAlign: 'center'}}><i className="fas fa-tasks" /></div>
        <div className="nav-link-text">Manage Events</div>
      </a></li>
    <li className="nav-link px-2 link-dark mr-3"><a href="/" onClick={this.handleLogout} className="text-black " style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{textAlign: 'center'}}><i className="fas fa-sign-out-alt" /></div>
        <div className="nav-link-text">Logout</div>    
      </a></li>
    <li className="nav-link px-2 link-dark mr-2 mr-3" style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{textAlign: 'center'}}><i className="far fa-user" /></div>
      <div className="nav-link-text">
        {/* User name goes here */}
        {sessionStorage.getItem("userName")}
      </div>
    </li>
  </ul>
</header>


        )
    }

}