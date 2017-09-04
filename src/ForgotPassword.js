/**
 * @module src/ForgotPassword
 *
 * Component that display ForgotPassword  with validation of each field 
 * Accepts the following properties:
 *  - password: enter the same password which you have enter at the time of signup
 *  - passwordConfirm: enter the same password for confirmpassword
 *
 */
 
import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import { Link } from 'react-router';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import GlobalURL from './GlobalURL';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect fixedTop >
        <Navbar.Header><Navbar.Brand>
            <a href="/homepage">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;AutographaMT: Machine Translation Engine</a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="customHeader">
            <NavItem eventKey={1} ><Link to={'/signup'}>Sign up</Link></NavItem>
            <NavItem eventKey={1} ><Link to={'/homepage'}>Sign in</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

class ForgotPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        temppassword: '',
        password: '',
        passwordConfirm: '',
        uploaded:'uploadingStatus'
    }
      // Signup form form specific callback handlers
      this.onChange = this.onChange.bind(this);
      this.onForgotPassword = this.onForgotPassword.bind(this);
   }

  onChange(e) {
    e.target.classList.add('active');

    this.setState({
      [e.target.name]: e.target.value });

    this.showInputError(e.target.name);

  }

// Checking signup form error

  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    
    inputs.forEach(input => {
      input.classList.add('active');
      
      const isInputValid = this.showInputError(input.name);
      
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    
    return isFormValid;
  }

//Showing input error for each field 
  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';
      
      if (isPasswordConfirm) {
        if (this.refs.password.value !== this.refs.passwordConfirm.value) {
          this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
        } else {
          this.refs.passwordConfirm.setCustomValidity('');
        }
      }
          
      if (!validity.valid) {
        if (isPassword && validity.patternMismatch) {
          error.textContent = `${label} should be longer than 4 chars`; 
        } else if (isPasswordConfirm && validity.customError) {
          error.textContent = 'Passwords do not match';
        }
        return false;
      }
      
      error.textContent = '';
      return true;
  }

  onForgotPassword(e) {
    e.preventDefault();
    var _this = this;
    //Performing a POST request for registrations using AJAX call
    $.ajax({
       url: GlobalURL["hostURL"]+"/v1/forgotpassword",
       data: {
          password : this.state.password,
          temp_password : this.state.temppassword,
          },
           method : "POST",
         success: function(result) {
          result = JSON.parse(result)
          if (result.success !== false) {
          _this.setState({message: result.message, uploaded: 'success'})
          window.location.href = "./homepage";
          } else {
            _this.setState({message: result.message, uploaded: 'failure'})
            setTimeout(function(){
              _this.setState({uploaded: 'fail'})
            },5000);
          }
        },
        error: function (error) {
         _this.setState({message: error.message, uploaded: 'failure'})
          setTimeout(function(){
            _this.setState({uploaded: 'fail'})
          },5000);
        }
     });
  }

  render() {
      return (
        <div className="container">
        <Header />
        <div className="col-xs-12 col-md-6 col-md-offset-3">
        <form onSubmit={this.onForgotPassword} className="col-md-8 signupCustom">
          <h1 className="reset-header">Enter Password</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success': 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
              <div className="form-group">
                <lable className="control-label" id="temppasswordLabel"> <strong>Temporary Password </strong> </lable>
                <input className="form-control" value={this.state.temppassword} onChange={this.onChange} type="password" name="temppassword" placeholder="Temporary Password" ref="temppassword" pattern=".{1,}" required />
                <div className="error" id="temppasswordError" />
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-label" id="passwordLabel"> <strong>New Password </strong> </lable>
                <input className="form-control" value={this.state.password} onChange={this.onChange} type="password" name="password" placeholder="New Password" ref="password" pattern=".{5,}" required />
                <div className="error" id="passwordError" />
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-label" id="passwordConfirmLabel"> <strong> Confirm New Password </strong> </lable>
                <input className="form-control" value={this.state.passwordConfirm} onChange={this.onChange} type="password" name="passwordConfirm" placeholder="Confirm New Password" ref="passwordConfirm" required />
                <div className="error" id="passwordConfirmError" />
              </div>&nbsp;
          <div className="form-group">
            <button className="btn btn-success" >Update Password</button>
          </div>
        </form>
          </div>
         <Footer />
        </div>
      );
    }
 }
export default ForgotPassword;
