import React, {Component} from 'react';
import {debounce, clone} from 'lodash';
import { transform } from 'babel';
import * as babel from 'babel';
import FileSystem from '../services/fs.js';

import './style.css!';

export default class Editor extends Component {

    state = {
    	settings: {
			value: '',
			language: "javascript",
			lineNumbers: true,
			roundedSelection: false,
			scrollBeyondLastLine: false,
			readOnly: false,
			theme: "vs-dark",
			folding: true,
			automaticLayout: true,
      autoSize: true,
		  }
    };
    
    constructor(props) {
        super(props);
        this.evalCode = this.evalCode.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
       
       this.editor = monaco.editor.create(this.DOMEditor, this.state.settings);
       
       const evalCode = debounce(this.evalCode, 500);
       this.editor.onKeyUp(evalCode);  
    
       const autoSaveDebounce = debounce(this.save, 1500);
 	     this.editor.onKeyUp(autoSaveDebounce);  

 	   // Load the lastest code into the editor.

       FileSystem.getFileContent()
       	.then((code) => {

       		const settings = clone(this.state.settings);

       		// Keep state up to the latest code.

       		settings.value = code;
       		this.setState({settings});
       		this.editor.setValue(code);

       		// RUN!
       		evalCode();
       	});

       setInterval(this.save, 15000);
       

    }

    save() {
       FileSystem.saveFile('index.js', this.state.settings.value);
    }

    transformCode(code) {

    	const babelOptions =  {
    		ast: false,
    		"stage": 1,
    	};

    	const reConsole = /(^.|\b)console\.(\S+)/g;

    	let transformedCode = code.replace(reConsole, (all, str, arg) => 
           `window.proxyConsole.${arg}`); 

		transformedCode = babel.transform(transformedCode, babelOptions);

		return transformedCode.code;

    }

    evalCode() {

    	// Keep state up to the latest code.

    	const settings = clone(this.state.settings);
    	settings.value = this.editor.getValue();

    	this.setState({settings});

    	// Babel Transform and replace console.log w/ proxyConsole.log.
    	const code = this.transformCode(settings.value);

    	// RUN!
        eval(code);
    }

    render() {
        return (<div 
        	className='editor' 
        	ref={(dom) => { this.DOMEditor = dom; }}></div>);
    }
}

