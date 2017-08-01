import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

class HeaderforAdmin extends Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header><Navbar.Brand>
            <a href="/homepage">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;AutographaMT</a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} ><Link to={'/admin'}>Upload Source</Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/getlanguages'}>Available Texts</Link></NavItem>
            <NavItem eventKey={3} ><Link to={'/downloadtokens'}>Download Tokens</Link> </NavItem>
            <NavItem eventKey={4} ><Link to={'/uploadtokens'}>Upload Tokens</Link> </NavItem>
            <NavItem eventKey={5} ><Link to={'/gettranslationdraft'}>Download Draft</Link> </NavItem>
            <NavItem eventKey={6} ><Link to={'/homepage'}>Log out</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default HeaderforAdmin;