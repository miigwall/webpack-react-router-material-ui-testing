import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * Channels
 */
class Profile extends Component {

	constructor(props, context) {
		super(props, context)

		this.state = {
			exampleData: [],
			selectedRows: []
		}

		this._onRowSelection = this._onRowSelection.bind(this);
	}

	componentDidMount() {

		this.setState({
			exampleData: this.getExampleTableData()
		})
	}

	handleProfileTableSubmit = () => {

		console.log( this.state );
	}

	getExampleTableData() {

		return [{
			id: 1,
			name: 'John Smith',
			status: 'Online'
		},
		{
			id: 2,
			name: 'John Cain',
			status: 'Offline'
		},
		{
			id: 3,
			name: 'John Tusk',
			status: 'Online'
		}]
	}

	render() {
		return (
			<div className="page" id="profile-page">
				<Table multiSelectable={ true } onRowSelection={ this._onRowSelection }>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Status</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody ref={ (tableBody) => { this.tableBody = tableBody; } }>
					{
						this.state.exampleData.map((item) => {

							return (
								<TableRow key={ item.id }>
									<TableRowColumn>{ item.id }</TableRowColumn>
									<TableRowColumn>{ item.name }</TableRowColumn>
									<TableRowColumn>{ item.status }</TableRowColumn>
								</TableRow>
							)
						})
					}
					</TableBody>
				</Table>
				<Divider style={{ marginTop: 20 }} />
				<RaisedButton 
					label="Choose" 
					fullWidth={ true } 
					primary={ true } 
					onTouchTap={ this.handleProfileTableSubmit } 
				/>
			</div>
		)
	}

	// @see: https://github.com/callemall/material-ui/issues/2747
    _onRowSelection(rows: Array<number>) {
        this.setState({ selectedRows: rows }, () => this.tableBody.setState({ selectedRows: rows }));
    }
}

export default Profile;