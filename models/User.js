import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: {
		type: Schema.Types.Mixed,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('users', userSchema);
export default User;