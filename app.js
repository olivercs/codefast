import React, {Component} from 'react';
import Editor from './editor/index.js';
import Logger from './logger/index.js';
import Sidebar from './sidebar/index.js';
import Topbar from './topbar/index.js';

export default class App extends Component {

    render() {
        return( 
        <div className='app'>
            <Topbar />
            <Sidebar />
            <Editor />
            <Logger />
        </div>);
    }
}