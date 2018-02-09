import React, { Component } from 'react'
import { connect } from 'react-redux';
import { onTyping, onLoginPressed } from '../../redux/actions/PageActions/loginPage';
import PropTypes from 'prop-types';

class LoginForm extends Component {
    constructor(props){
        super(props);
    }

    static displayName = 'LoginForm';

    static propTypes = {
        loginPage: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        onTyping: PropTypes.func.isRequired,
    }

    shouldComponentUpdate(nextProps, nextState){
        return (
            nextProps.loginPage !== this.props.loginPage
        )
    }

    _handleTyping = (e) => {
        this.props.onTyping({name: e.target.name, value: e.target.value});
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { inputText } = this.props.loginPage;
        this.props.onLoginPressed({identifier: inputText.identifier, password: inputText.password});
    }

    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <form onSubmit={this._handleSubmit}>
                    <h1>Login</h1>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="identifier"
                            placeholder="username or email"
                            onChange={this._handleTyping}
                            value={this.props.loginPage.inputText.identifier}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this._handleTyping}
                            value={this.props.loginPage.inputText.password}
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
        loginPage: state.loginPage,
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch){
    return{
        onTyping: (payload) => dispatch(onTyping(payload)),
        onLoginPressed: (payload) => dispatch(onLoginPressed(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);