const bcrypt = require('bcryptjs');

class User {
    constructor(id, username, password, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static verifyPassword(storedPassword, password) {
        return bcrypt.compareSync(password, storedPassword);
    }
}

module.exports = User;
