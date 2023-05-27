import { Schema, model } from "mongoose";
import { IUser } from "./interfaces/user.interface";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true }
});

userSchema.methods.toJSON = function () {
    const { __v, _id, ...obj } = this.toObject();
    obj.id = _id;
    delete obj.password;
    return obj;
}

const UserModel = model<IUser>('User', userSchema);

export {
    userSchema,
    UserModel
}

