import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onTyping, onSubmitSearch } from "../redux/actions/navbar";
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props){
        super(props);
        this._handleSubmitSearch = this._handleSubmitSearch.bind(this);
    }

    _handleTyping = (e) => {
        this.props.onTyping({name: e.target.name, value: e.target.value})
    }

    _handleSubmitSearch = (e) => {
        e.preventDefault();
        if(this.props.navbar.searchInput !== ''){
             this.props.onSubmitSearch(this.props.navbar.searchInput);
             this.props.navigateTo(`/search/str/${this.props.navbar.searchInput}`)
        }       
    }

    render(){
        const userLinks = (<ul className="nav navbar-nav pull-right">
                            <li><Link to={"/"}>Home</Link></li>
                            <li><a href="#">Notifications</a></li>
                            <li><Link to={`/profile/${this.props.auth.user.data.username}`}>Profile</Link></li>
                            <li><a href="#">Logout</a></li>
                            </ul>);

        const guestLinks = (<ul className="nav navbar-nav pull-right">
                            <li><a href="#">Login</a></li>
                            <li><a href="#">Signup</a></li>
                            </ul>);

        const { navbar } = this.props;
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}>Twaddler</Link>
                    </div>
                    {this.props.auth.user.token ? userLinks : guestLinks}
                    <form className="navbar-form navbar-left" onSubmit={this._handleSubmitSearch}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={navbar.searchInput} placeholder="Search" onChange={this._handleTyping}/>
                    </div>
                    <button className="btn btn-default" type="submit">
                        <i className="glyphicon glyphicon-search"></i>
                    </button>
                    </form>
                </div>
            </nav>
        )
    }
    
}

function mapStateToProps(state){
    return{
        auth: state.auth,
        navbar: state.navbar
    }
}

function mapDispatchToProps(dispatch){
    return {
        onTyping: (data) => dispatch(onTyping(data)),
        onSubmitSearch: (data) => dispatch(onSubmitSearch(data)),
        navigateTo: (data) => dispatch(push(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);