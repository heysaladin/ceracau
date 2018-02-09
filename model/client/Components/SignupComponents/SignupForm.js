import React, { Component } from 'react'
import { connect } from 'react-redux';
import { onTyping, onSignupPressed } from '../../redux/actions/PageActions/signupPage';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

class SignupForm extends Component {
    constructor(props){
        super(props);
    }

    static displayName = 'SignupForm';

    static propTypes = {
        signupPage: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        onTyping: PropTypes.func.isRequired,
    }

    shouldComponentUpdate(nextProps, nextState){
        return (
            nextProps.signupPage !== this.props.signupPage
        )
    }

    _handleTyping = (e) => {
        this.props.onTyping({name: e.target.name, value: e.target.value});
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { inputText } = this.props.signupPage;
        this.props.onSignupPressed({fullName: inputText.fullName, username: inputText.username, email: inputText.email, password: inputText.password, passwordConfirmation: inputText.passwordConfirmation});
    }

    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <form onSubmit={this._handleSubmit}>
                    <h1>Register</h1>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="fullName"
                            placeholder="full name"
                            onChange={this._handleTyping}
                            value={this.props.signupPage.inputText.fullName}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={this._handleTyping}
                            value={this.props.signupPage.inputText.username}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            placeholder="email"
                            onChange={this._handleTyping}
                            value={this.props.signupPage.inputText.email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this._handleTyping}
                            value={this.props.signupPage.inputText.password}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            name="passwordConfirmation"
                            placeholder="password confirmation"
                            onChange={this._handleTyping}
                            value={this.props.signupPage.inputText.passwordConfirmation}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        signupPage: state.signupPage,
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch){
    return{
        onTyping: (payload) => dispatch(onTyping(payload)),
        onSignupPressed: (payload) => dispatch(onSignupPressed(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);