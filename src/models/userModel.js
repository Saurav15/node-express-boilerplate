import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        min: [3, 'Fullname must be greater then 3 characters.'],
        max: [30 , 'Fullname must be less then 30 characters.']
    },  
    email: {
        type: String,
        required: [true, 'Is required'],
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Invalid email.',
        },
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model('User', userSchema);
