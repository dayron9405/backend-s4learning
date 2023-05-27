import { Schema, model } from "mongoose";
import { IContact } from "./interfaces/contact.interface";

const contactSchema = new Schema<IContact>({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    active: { type: Boolean, default: true }
});

contactSchema.methods.toJSON = function () {
    const { __v, _id, ...obj } = this.toObject();
    obj.id = _id;
    return obj;
}

const ContactModel = model<IContact>('Contact', contactSchema);

export {
    contactSchema,
    ContactModel
}

