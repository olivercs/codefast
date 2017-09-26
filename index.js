import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import 'global.css!';
import Project from './services/project.js';


Project.init()
	.then(() => {

		ReactDOM.render(
		    <App />,
		    document.querySelector('#root')
		);

	});




// jspm bundle index.js index.min.js --skip-source-maps --minify
// jspm bundle-sfx index.js index.min.sfx.js --skip-source-maps --minify