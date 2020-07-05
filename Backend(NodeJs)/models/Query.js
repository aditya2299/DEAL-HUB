var uuid = require('uuid-random');

class Query {
    constructor(title) {
        this.id = uuid();
        this.title = title;
        this.description = "";
    }

}

module.exports = Query;