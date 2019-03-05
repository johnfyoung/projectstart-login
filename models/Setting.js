import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const settingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: {},
        required: true
    }
});

const Setting = mongoose.model('settings', settingSchema);
export default Setting;