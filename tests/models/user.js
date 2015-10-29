/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

function User() {
    const UserSchema = new Schema({
        username: String,
        'first-name': String,
        'last-name': String,
        'created-on': Date
    });

    // prior to save do this
    UserSchema.pre('save', function(next) {
        if (!_.isDate(this['created-on'])) {
            this['created-on'] = moment();
        }
        next();
    });

    UserSchema.methods.getFullName = function() {
        return this['first-name'] + ' ' + this['last-name'];
    };

    return mongoose.model('User', UserSchema);
}

module.exports = new User();
