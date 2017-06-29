import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NotFoundRoute, browserHistory, NavLink } from 'react-router-dom';
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
import Divider from 'material-ui/Divider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { Helmet } from "react-helmet";
import axios from 'axios';

// Pages
import Page from './Page';
import Profile from './Profile';
import Settings from './Settings';
import Channels from './Channels';
import Home from './Home';
import NotFound from './NotFound';

// Styles
import Styles from './app-styles';

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
			isLogging: false,
			iconMenuOpen: false
		}
	}

	handleDrawerToggle = () => {

		this.setState({ 
			iconMenuOpen: false, 
			drawerOpen: !this.state.drawerOpen 
		})
	}

	handleDrawerOpen = (callback) => {

		this.setState({ 
			iconMenuOpen: false, 
			drawerOpen: true 
		})

		if (callback) callback();

	}

	handleDrawerClose = () => {

		this.setState({ 
			iconMenuOpen: false, 
			drawerOpen: false 
		})
	}

	handleTestLogin = () => {

		this.setState({ isLogging: true })

		// Debug
		setTimeout(() => {

			this.setState({ logged: !this.state.logged, isLogging: false }); 

			this.handleDrawerClose();

		}, 2000)
	}

	handleAppBarLogout = () => {

		this.handleDrawerOpen(() => {

			this.handleTestLogin();

		});
	}

	toggleIconMenu = () => {

		this.setState({
			iconMenuOpen: !this.state.iconMenuOpen
		})
	}

	_renderLoginLink(link) {

		if (this.state.isLogging) {
			return (
				<div style={{ marginTop: 20, textAlign: 'center' }}>
					<Subheader>{ this.state.logged ? 'Logging out...' : 'Logging in...' }</Subheader>
					<CircularProgress style={{ marginTop: 20 }} />
				</div>
			)
		}

		if (link == 'Logout') {
			return (
				<div style={{ marginTop: 20, textAlign: 'center' }}>
					<RaisedButton style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} label={ link } primary={ true } onTouchTap={ this.handleTestLogin } />
				</div>
			)
		}

		return (
			<div style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
				<TextField hintText="Username" fullWidth={ true } />
				<TextField hintText="Password" fullWidth={ true } />
				<RaisedButton style={{ marginTop: 10 }} label={ link } primary={ true } fullWidth={ true } onTouchTap={ this.handleTestLogin } />
			</div>
		)
	}

	_renderDrawerMenuLoggedLinks() {

		if (this.state.isLogging) { 

			return false;
		}

		return (
			<div>
				<Avatar
					icon={ <FontIcon className="muidocs-icon-communication-voicemail" /> }
					color={ blue300 }
					backgroundColor={ blue300 }
					size={ 215 }
					style={{ margin: 20 }}
				/>
				<NavLink onTouchTap={ this.handleDrawerClose } to="/">
					<MenuItem>Dashboard</MenuItem>
				</NavLink>
				<NavLink onTouchTap={ this.handleDrawerClose } to="/channels">
					<MenuItem>Channels</MenuItem>
				</NavLink>
				<NavLink onTouchTap={ this.handleDrawerClose } to="/how-to-use">
					<MenuItem>How to use</MenuItem>
				</NavLink>
				<NavLink onTouchTap={ this.handleDrawerClose } to="/help">
					<MenuItem>Help</MenuItem>
				</NavLink>
			</div>
		)
	}

	_renderDrawerMenu() {

		if (this.state.logged) {
			
			return (  
				<div className="drawerContent">
					<AppBar title="Menu" showMenuIconButton={ false } titleStyle={{ textAlign: 'center' }} />
					{ this._renderDrawerMenuLoggedLinks() }
					
					{ this._renderLoginLink('Logout') }
				</div>
			)
		}

		return (
			<div className="drawerContent">
				<AppBar title="Menu" showMenuIconButton={ false } titleStyle={{ textAlign: 'center' }} />
				
				{ this._renderLoginLink('Login') }
			</div>
		)
	}

	_renderAppBarMenu() {

		if (this.state.logged) {
			
			return (
				<IconMenu open={ this.state.iconMenuOpen } onTouchTap={ this.toggleIconMenu } iconButtonElement={ <IconButton iconClassName="material-icons">account_circle</IconButton> }>
					<NavLink onTouchTap={ this.handleDrawerClose } to="/profile">
						<MenuItem primaryText="Profile" />
					</NavLink>
					<NavLink onTouchTap={ this.handleDrawerClose } to="/settings">
						<MenuItem primaryText="Settings" />
					</NavLink>
					<Divider />
					<NavLink onTouchTap={ this.handleAppBarLogout } to="/">
						<MenuItem primaryText="Logout" />
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
						<Helmet>
								<meta charSet="utf-8" />
								<title>Webpack, React.js & Material UI demo</title>
						</Helmet>
						<AppBar
							title="Demo"
							onLeftIconButtonTouchTap={ this.handleDrawerToggle }
							iconElementRight={ this._renderAppBarMenu() }
						/>
						<Drawer 
							docked={false} 
							open={ this.state.drawerOpen } 
							onRequestChange={ (drawerOpen) => this.setState({ drawerOpen }) }>
								{ this._renderDrawerMenu() }
						</Drawer>
						<div style={ Styles.container }>
							<Switch>
								<Route exact path="/" component={ Home } />
								<Route exact path="/channels" component={ Channels } />
								<Route exact path="/profile" component={ Profile } />
								<Route exact path="/settings" component={ Settings } />
								<Route exact path="/*" component={ NotFound } />
							</Switch>
						</div>
					</div>
				</Router>
			</MuiThemeProvider>
		)
	}
}

export default Main;
