import React, {Component} from 'react';
import {clone} from 'lodash';
import Project from '../services/project.js';
import Storage from '../services/storage.js';

import './style.css!';

export default class Topbar extends Component {

	state = {
		name: ''
	}
	
	constructor() { 
		super();
		this.updateName = this.updateName.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
    Storage.get()
       	.then(doc => this.setState({ name: doc.name }));
  }

  onChange(event) {
    this.setState({ name: event.target.value });
  }

  updateName(event) {
    Project.updateName(this.state.name);
  }

  render() {
        return (<div className='topbar'>
        	<input
        		type='text'
        		className='input-name'
        		value={this.state.name}
        		onChange={this.onChange}
        		onBlur={this.updateName}
        	/>
        </div>);
  }
}

