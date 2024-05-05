import mongoose from 'mongoose';

const blackListedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '15d'
    }
});

const BlackListedToken = mongoose.model('BlackListedToken', blackListedTokenSchema);

export default BlackListedToken;
