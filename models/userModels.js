const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    date: {type: Date, default: Date.now}
}, {
    versionKey: false
});

UserSchema.pre('save', async function () {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    } catch (err) {
        console.error(err);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        console.error(err);
    }
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;