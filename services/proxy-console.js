var methods = [
  'debug', 'clear', 'error', 'info', 'log', 'warn', 'dir', 'props', '_raw',
  'group', 'groupEnd', 'dirxml', 'table', 'trace', 'assert', 'count',
  'markTimeline', 'profile', 'profileEnd', 'time', 'timeEnd', 'timeStamp',
  'groupCollapsed'
];

/**
 * Stringify all of the console objects from an array for proxying
 */

function stringifyArgs(args) {
  var newArgs = [];
  // TODO this was forEach but when the array is [undefined] it wouldn't
  // iterate over them
  var i = 0, length = args.length, arg;
  for(; i < length; i++) {
    arg = args[i];
    if (typeof arg === 'undefined') {
      newArgs.push('undefined');
    } else {
      newArgs.push(JSON.stringify(arg));
    }
  }
  return newArgs;
};


function hook(method, cb) {
    
    return function() {

      // Replace args that can't be sent through postMessage.

      var originalArgs = [].slice.call(arguments),
          args = stringifyArgs(originalArgs);

      cb({ method, args });

      if (!window.console) {
        return;
      }

      if(method === 'clear') {
        console.clear();
      }
      
      if (!console[method]) {
        method = 'log';
      }

      console[method].apply(console, originalArgs);
  }
};


export default class ProxyConsole {

  callbacks = [];
  logs = [];
  key = 0;
  constructor() {

    this.callback = this.callback.bind(this);

    methods.forEach((method) =>  {
      this[method] = hook(method, this.callback)
    });

  }

  callback(log) {

    if(log.method === 'clear') {
        this.logs = [];
    }else {
       log.key = this.key++;
       this.logs.push(log);
    }

    this.callbacks.forEach((cb) => cb(this.logs, log));
  }

  on(cb) {
    this.callbacks.push(cb);
  }

}

const instance = new ProxyConsole();
export default instance;
window.proxyConsole = instance;
