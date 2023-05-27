import { ContactModel } from "../models/contect.model";
import { IContact } from "../models/interfaces/contact.interface";

export class ContactService {

    private repository = ContactModel;

    constructor() {}

    async getContacts(queries) {
        try {
            const excludePath = ['_id', '__v', 'active'];
            const {
                page, perPage, search
            } = queries;
            const docInxInitial = (Number(page) - 1) * Number(perPage) || 0;
            const limit = Number(perPage) || 5;
            const filterMain = [{ active: true }];
            const filterWhere = [];
            this.repository.schema.eachPath((path) => {
                if (!excludePath.includes(path)) {
                    const filterSearch = { [path]: { $regex: new RegExp(search, 'i') } };
                    filterWhere.push(filterSearch);
                }
            })
            const filterOr = filterWhere.length > 0 ? { $or: filterWhere } : {};
            const filter = [ ...filterMain, filterOr ];
            const [ findUsers, count ]: any = await Promise.all([
                this.repository.find({ $and: filter }).limit(limit).skip(docInxInitial),
                this.repository.find({ $and: filter }).countDocuments()
            ]);
            return {
                data: findUsers,
                count
            };
        } catch (error) {
            throw error;
        }
    }

    async contactCreated(contact) {
        try {
            // const findContact = await this.repository.findOne({ name: contact.name });
            // if (findContact) {
            //     throw {status: 409, message: 'contact exist'};
            // }
            const newContact = new this.repository(contact); 
            const contactSave = await newContact.save(contact);
            return contactSave;    
        } catch (error) {
            throw error;
        }
    }

    async contactUpdated(contact) {
        try {
            const contactDisabled = this.repository.findOneAndUpdate({_id: contact.id}, contact, {new: true}); 
            return contactDisabled;    
        } catch (error) {
            throw error;
        }
    }

    async contactDisabled(contact) {
        try {
            const contactDisabled = this.repository.findOneAndUpdate({_id: contact.id}, contact, {new: true}); 
            return contactDisabled;    
        } catch (error) {
            throw error;
        }
    }

}