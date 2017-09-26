import Storage from './storage.js';
import {omit} from 'lodash';

class FileSystem {
	
	getFileContent(filename = 'index.js') {
		return Storage.get()
       		.then(doc => doc[filename]);
	}
	
	createFile(filename, content = '') {
	  	return Storage.get()
	        .then(doc => {
	            doc[filename] = content;
	            return Storage.put(doc);
	        })
	        .then(res => Storage.get());
	}

	saveFile(filename, content = '') {
		return Storage.get()
	        .then(doc => {
	            doc[filename] = content;
	            return Storage.put(doc);
	        })
	        .then(res => Storage.get());
	}

	renameFile(oldFilename, newFilename) {
		return Storage.get()
	        .then(doc => {
	            const content = doc[oldFilename];
	            doc[newFilename] = content;
	            delete doc[oldFilename];
	            return Storage.put(doc);
	        })
	        .then(res => Storage.get());
	}

	deleteFile(filename) {
      return Storage.get()
        .then(doc => {
            delete doc[filename];
            return Storage.put(doc);
        })
        .then(res => Storage.get());
	}

	getFilesFromDoc(doc) {
		return Object.keys(omit(doc, ['name','_id', '_rev']));
	}

	getFiles() {
		return Storage.get()
		    .then(doc => getFilesFromDoc(doc));
	}
}

const fileSystem = new FileSystem();
export default fileSystem;