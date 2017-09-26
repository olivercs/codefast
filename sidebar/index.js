import React, {Component} from 'react';
import {omit} from 'lodash';
import Storage from '../services/storage.js';
import FileSystem from '../services/fs.js';

import './style.css!';

export default class Sidebar extends Component {

    constructor() { 
        super();
        this.createFile = this.createFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    state = {
        doc: {},
    }

    componentDidMount() {
       Storage.get()
        .then(doc => this.setState({ doc }));
    }

    createFile() {

       const filename = window.prompt('Filename:');

       if(!filename) {
        return;
       }

       FileSystem.createFile(filename)
            .then(doc => this.setState({ doc }));

    }

    deleteFile(filename) {

       const confirmDelete = window.confirm('Do you want to remove this file ?');

       if(!confirmDelete) {
        return;
       }

       FileSystem.deleteFile(filename)
            .then(doc => this.setState({ doc }));

    }

    renameFile(oldFilename) {

        if(oldFilename === 'index.js'){
            return;
        }

        const newFilename = window.prompt('New filename:');
        if(!newFilename) {
            return;
        }

        FileSystem.renameFile(oldFilename, newFilename)
            .then(doc => this.setState({ doc }));

    }

    renderFile(file) {
        return (<div onDoubleClick={() => this.renameFile(file)} className='filename-container' key={file}>
                <div className='filename'>{file}</div>
                { file !== 'index.js' && <div className='btn-remove' onClick={() => this.deleteFile(file)}>X</div> }
            </div>);
    }

    render() {

        const files = FileSystem.getFilesFromDoc(this.state.doc);

        return (<div className='sidebar'>
                
                {
                    files.map((file) => this.renderFile(file))
                }
           
                <div className='add-file-contanier'>
                    <button type="button" onClick={this.createFile} className='add-file'>Add File</button>
                </div>
            </div>);
    }
}

