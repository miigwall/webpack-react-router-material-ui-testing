import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';

/**
 * Channels
 */
class NotFound extends Component {

	render() {
		return (
			<div className="page" id="notfound-page">
				<Subheader>Error 404</Subheader>
				<p>The page you are looking for, was not found :(</p>
			</div>
		)
	}
}

export default NotFound;