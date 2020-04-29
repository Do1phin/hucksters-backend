import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user_id: {
        type: Number,
        default: null
    },
    album_id: {
        type: Number,
        required: 'Album id is required true',
        default: null,
        unique: true
    },
    thumb_id: {
        type: Number,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    size: {
        type: Number,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    created: {
        type: Number,
        default: null
    },
    updated: {
        type: Number,
        default: null
    },
    _updated: {
        type: Date,
        default: Date.now()
    },
    owner: {type: mongoose.Schema.ObjectId, ref: 'Seller'}
});

export default mongoose.model('Album', schema);
