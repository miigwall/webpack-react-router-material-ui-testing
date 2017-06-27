/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, browserHistory, NavLink } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { 
  blue300,
  indigo900,
  orange200,
  deepOrange500,
  pink400,
  purple500 
} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

// Pages
import Page from './Page';
import Profile from './Profile';
import Settings from './Settings';
import Channels from './Channels';
import Home from './Home';

const styles = {
  container: {
    paddingTop: 10,
    paddingLeft: 20
  },
};

const menuIconStyle = {
  marginRight: 24,
  fontSize: 40
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

/**
 * Ḿain
 */
class Main extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      drawerOpen: false,
      logged: false,
      isLogging: false
    }
  }

  handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  handleDrawerClose = () => this.setState({ drawerOpen: false });

  handleTestLogin = () => {

    this.setState({ isLogging: true })

    // Debug
    setTimeout(() => { 

      this.setState({ logged: !this.state.logged, isLogging: false }); 

    }, 2000)

  };

  _renderLoginLink(link) {

    if (this.state.isLogging) {

      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress style={{ marginTop: 20 }} />
        </div>
      )
    }

    return (
      <MenuItem>{ link }</MenuItem>
    )
  }

  _renderDrawerMenu() {

    if (this.state.logged) {
      
      return (  
        <div className="drawerContent">
          <Avatar
            icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
            color={ blue300 }
            backgroundColor={ blue300 }
            size={215}
            style={{ margin: 20 }}
          />
          <NavLink onTouchTap={ this.handleDrawerClose } to="/">
            <MenuItem>Dashboard</MenuItem>
          </NavLink>
          <NavLink onTouchTap={ this.handleDrawerClose } to="/channels">
            <MenuItem>Channels</MenuItem>
          </NavLink>
          <NavLink onTouchTap={ this.handleTestLogin } to="/">
            { this._renderLoginLink('Logout') }
          </NavLink>
        </div>
      )
    }

    return (
      <div className="drawerContent">
        <NavLink onTouchTap={ this.handleTestLogin } to="/">
          { this._renderLoginLink('Ĺogin') }
        </NavLink>
      </div>
    )
  }

  _renderAppBarMenu() {

    if (this.state.logged) {
      
      return (
        <IconMenu iconButtonElement={ <IconButton iconClassName="material-icons">account_circle</IconButton> }>
          <NavLink onTouchTap={ this.handleDrawerClose } to="/profile">
            <MenuItem primaryText="Profile" />
          </NavLink>
          <NavLink onTouchTap={ this.handleDrawerClose } to="/settings">
            <MenuItem primaryText="Settings" />
          </NavLink>
        </IconMenu>
      )
    }

    return <div />;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Router>
          <div id="main">
            <AppBar
              title="This is a TestApp"
              onLeftIconButtonTouchTap={ this.handleDrawerToggle }
              iconElementRight={ this._renderAppBarMenu() }
            />
            <Drawer 
              docked={false} 
              open={ this.state.drawerOpen } 
              onRequestChange={ (drawerOpen) => this.setState({ drawerOpen }) }>
                { this._renderDrawerMenu() }
            </Drawer>
            <div style={ styles.container }>
              <Route exact path="/" component={ Home } />
              <Route exact path="/channels" component={ Channels } />
              <Route exact path="/profile" component={ Profile } />
              <Route exact path="/settings" component={ Settings } />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default Main;
