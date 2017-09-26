import Storage from './storage.js';

class Project {

	init() {

		if(document.location.hash) {
			Storage.init(this.getId());
			return Promise.resolve();
		}
		
		return Storage.instance.post({
				'index.js': '',
				'name': 'Untitled Project'
			})
			.then(doc => {
				document.location.hash = doc.id;
				Storage.init(doc.id);
				return Promise.resolve();
			});
	}

	updateName(name) {

		Storage.get()
	       	.then(doc => {
	          	doc.name = name;
	       		return Storage.put(doc);
	       	});

	}

	getId() {
		return document.location.hash.substr(1);
	}

}

let project = new Project();
export default project;