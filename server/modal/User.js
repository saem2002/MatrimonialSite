import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({

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
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    religion: {
        type: String,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
    },
    token: {
        type: String,
    }



}, { timestamps: true })

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }

}
userSchema.methods.commitchanges = async function (age, religion, gender, image,phone) {
    try {

        this.age = age;
        this.religion = religion;
        this.gender = gender;
        this.image = image;
        this.phone = phone
        await this.save();
        return this.age;

    } catch (error) {
        console.log(error);
    }

}
const user = mongoose.model('user', userSchema);



export default user;