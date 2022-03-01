const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
})
const User = mongoose.model('User', userSchema);

module.exports = User;