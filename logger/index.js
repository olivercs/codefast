import React, {Component} from 'react';
import ProxyConsole from '../services/proxy-console.js';
import './style.css!';

export default class Logger extends Component {

    state = {
    	logs: []
    };
    
    componentDidMount() {
        ProxyConsole.on((logs) => this.setState({ logs }));
    }

    renderLog(log) {
        const {key, method, args} = log;
        const message = args.join(',');
        return <div key={key} className={`message method-${method}`}>{message}</div>
    }


    render() {
        return (
            <div className='logger'>
                { this.state.logs.map(this.renderLog) }
            </div>
        	);
    }
}

