import PouchDB from 'pouchdb-browser';
import {omit} from 'lodash';

class PouchDBInstance {

	constructor() {
		this.instance = new PouchDB('projects', {adapter : 'websql'});
	}

	init(_id) {
		this._id = _id;
	}

	get() {
		return this.instance.get(this._id);
	}

	put(doc) {

		if(!doc._id) {
			doc._id =  this._id;
		}

		return this.instance.put(doc);
	}

	getInstance() {
		return this.instance;
	}

}

let pouchDBInstance = new PouchDBInstance();
export default pouchDBInstance;
