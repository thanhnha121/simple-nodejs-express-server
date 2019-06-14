var UserModel = require('../model/user');

class UserCtr {

    constructor() {
    }

    test(req, res) {
        UserModel.find({}, (err, docs) => {
            if (err) res.json({ status: 0, message: err.message }); 
            else res.json({ status: 1, message: 'success', data: docs });
        });
    }
}

module.exports = UserCtr;
