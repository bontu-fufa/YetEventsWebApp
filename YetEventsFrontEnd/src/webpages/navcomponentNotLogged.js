import React, {Component} from 'react';
export default class NavNotLogged extends Component{
    render() {
        return(
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 px-5 nav-header">
        <a href="/" style={{flex: 1, marginRight: '5%'}}><h1 className="text-orange">YetEvents</h1></a>
        <div className="d-flex align-items-center" style={{flex: 2}}>
            <form action="/search" className="w-100 me-3" method="get">
                <input type="search" name="q" className="form-control search-input" placeholder="Search events" />
            </form>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" style={{flex: 1}}>
            <li className="nav-link px-2 link-dark mr-2"><a href="/login" className="text-black ">Sign In</a></li>
            <li className="nav-link px-2 link-dark  sign-up"><a href="/register" className="text-black">Sign Up</a></li>
        </ul>
        </header>
        )
    }

}