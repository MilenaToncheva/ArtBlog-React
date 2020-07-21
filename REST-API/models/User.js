const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;
const bcrypt = require('bcrypt');
const saltRound = 13;


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Username is required!'],
        unique: [true ,'Username already exists in DB!'],
        minlength:[3,'Username should be at least 3 symbols!'],
        match:[/^[a-zA-Z0-9]+$/,'Username should contain only english letters and digits!']
    },
    password: {
        type: String,
        required:[ true,'Password is required'],
        minlength:[3,'Username should be at least 3 symbols!'],
        match:[/^[a-zA-Z0-9]+$/,'Password should contain only english letters and digits!']
    },
    Posts: [{
        type: ObjectId,
        ref: 'Post'
    }]
})
UserSchema.methods = {
    passwordsMatch(password) {
        return bcrypt.compare(password, this.password); //this, in the current context, is the user
    }
}
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRound, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(this.password, salt, (err, hashedPassword) => {
                if (err) {
                    return next(err);
                }
                this.password = hashedPassword;
                next();
            });
        });
        return;
    }
})

module.exports = new Model('User', UserSchema);
