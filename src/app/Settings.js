import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';

// Styles
import Styles from './app-styles';

/**
 * Channels
 */
class Settings extends Component {

	render() {
		return (
			<div className="page" id="settings-page">
				<h1>Settings</h1>
				<Toggle label="Setting A" style={ Styles.toggle } />
				<Toggle label="Setting B" style={ Styles.toggle } />
				<Toggle label="Setting C" style={ Styles.toggle } />
				<Toggle label="Setting D" style={ Styles.toggle } />
			</div>
		)
	}
}

export default Settings;