import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';


const styles = {
  addDialog: {
	marginRight: 20,
	position: 'fixed',
	bottom: 30,
	right: 10
  },
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

/**
 * Channels
 */
class Channels extends Component {

	constructor(props, context) {
		super(props, context)

		this.state = {
			addDialogOpen: false,
			addDialogIsEncrypted: false,
			addDialogName: '',
			addDialogPassword: ''
		}
	}

	handleAddDialogSubmit = () => {

		console.log(this.state);

	};

	handleAddDialogOpen = () => this.setState({ addDialogOpen: true });

	handleAddDialogClose = () => this.setState({ addDialogOpen: false });

	handleAddDialogName = (event) => this.setState({ addDialogName: event.target.value });

	handleAddDialogIsEncrypted = () => this.setState({ addDialogIsEncrypted: !this.state.addDialogIsEncrypted });

	handleAddDialogPassword = (event) => this.setState({ addDialogPassword: event.target.value });

	_renderAddDialogPasswordInput() {

		if (!this.state.addDialogIsEncrypted) {
			
			return <div />
		}

		return (
			<TextField hintText="Channel password" errorText="This field is required." onChange={ this.handleAddDialogPassword } />
		)
	}

	render() {
		
		return (
			<div className="page" id="channels-page">
				
				<List>
				  <ListItem primaryText="ExampleC" secondaryText="Jan 9, 2014" />
				  <ListItem primaryText="A23" secondaryText="Jan 3, 2014" />
				  <ListItem primaryText="Private" secondaryText="Jan 1, 2014" />
				</List>

			    <Dialog
			      title="Add channel"
			      actions={[
						<FlatButton
							label="Cancel"
							primary={ true }
							onTouchTap={ this.handleAddDialogClose }
						/>,
						<FlatButton
							label="Add"
							primary={ true }
							keyboardFocused={ true }
							onTouchTap={ this.handleAddDialogSubmit }
						/>,
					]}
			      modal={ false }
			      open={ this.state.addDialogOpen }
			      onRequestClose={ this.handleAddDialogClose }>
					<TextField hintText="Channel name" onChange={ this.handleAddDialogName } />
					<br />
					<br />
					<Checkbox
				      label="Encrypted channel"
				      style={ styles.checkbox }
				      checked={ this.state.addDialogIsEncrypted }
				      onCheck={ this.handleAddDialogIsEncrypted }
				    />
					{ this._renderAddDialogPasswordInput() }
			    </Dialog>
			    <FloatingActionButton style={ styles.addDialog } onTouchTap={ this.handleAddDialogOpen }>
			      <ContentAdd />
			    </FloatingActionButton>
			</div>
		)
	}
}

export default Channels;