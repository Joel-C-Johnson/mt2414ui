/**
 * @module src/SupperAdmin
 *
 * Component that display List of registered e-mails
 * Accepts the following properties:
 * - Email : registered e-mails 
 * - admin : boolean value if True then admin, if False then Member 
 * Also in Header accepts authenticaton token 
*/

import React, { Component } from 'react';
import './App.css';
import Footer from './Footer';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import Header from './Header';

class SuperAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      getAllEmails: '',
      message: '',
      uploaded:'',
      getAllRoles: '',
      tableRows: [],
      currentRoles: {}
    }

    this.approveAdmin = this.approveAdmin.bind(this);
    this.setMember = this.setMember.bind(this);

  }
  
  componentWillMount(){
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
      $.ajax({
        url: GlobalURL["hostURL"]+"/v1/emailslist",
        method : "GET",
        headers: {
          "Authorization": "bearer " + accessToken
        },
        success: function (result) {
          var getEmail = JSON.parse(result);
          Object.keys(getEmail).map(function(key, value){
            return _this.state.currentRoles[key] = getEmail[key];
          })
          _this.setState({currentRoles: _this.state.currentRoles})
        },
        error: function (error) {
        }
      });
  }
  
  //for Approve as Admin
  approveAdmin(obj){
    var _this = this;
    _this.state.tableRows = [];
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/superadminapproval",
      data : JSON.stringify(obj),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
    success: function (result) {
        result = JSON.parse(result)
        if (result.success !== false){
          _this.setState({message: result.message, uploaded: 'success'})
          setTimeout(function(){
            location.reload();
          }, 2000);

        }
        else {
          _this.setState({message: result.message, uploaded: 'failure'})
        }
    },
    error: function (error) {
      _this.setState({message: error.message, uploaded: 'failure'})
    }
    });  

  }

  //for set Member
  setMember(obj){
    var _this = this;
    _this.state.tableRows = [];
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/superadminapproval",
      data : JSON.stringify(obj),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
    },
    success: function (result) {
      result = JSON.parse(result)
      if (result.success !== false){
        _this.setState({message: result.message, uploaded: 'success'})
        setTimeout(function(){
          location.reload();
        }, 2000);
      }
      else {
        _this.setState({message: result.message, uploaded: 'failure'})
      }
    },
    error: function (error) {
      _this.setState({message: error.message, uploaded: 'failure'})
    }
    });  

  }

  render() {
    var _this = this;
    var currentRoles = this.state.currentRoles;
    Object.keys(currentRoles).map(function(data, index){
     return _this.state.tableRows.push(
        <tr>
          <td>{data}</td>
          <td>
            <p>{(currentRoles[data] === 'member')?("Member"):("Administrator")}</p>
          </td>
          <td>
          {
            (currentRoles[data] === 'admin')?(
            // eslint-disable-next-line
            <a href="javascript:void(0);" data-email={data} onClick={_this.setMember.bind(this,{"email": data, "admin": "False"})} className="customLink">Set as Member</a>
            ):(
            // eslint-disable-next-line
            <a href="javascript:void(0);" data-email={data} onClick={_this.approveAdmin.bind(this,{"email": data, "admin": "True"})} className="customLink">Approve as Admin</a>
            )
          } 
          </td>
        </tr>
      )
    })
    return(
      <div className="container">
        <Header/ >
          <h1 className="source-headerCon">List of AutographaMT users</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg2' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg2': 'invisible') }>
              <strong>{this.state.message}</strong>
            </div>
          <form className="col-md-8 uploader getEmailCustom" encType="multipart/form-data">
            <div className="container">
              <table className="table emailTable">
                <thead>
                  <tr>
                    <th>Users</th>
                    <th>User Role</th>
                    <th>Assign Role</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableRows}
                </tbody>
              </table>
            </div>
          </form>
        <Footer/>
      </div>
      );
    }
}

export default SuperAdmin;
