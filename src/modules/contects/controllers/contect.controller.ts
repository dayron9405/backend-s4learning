import { NextFunction, Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import * as _ from 'underscore';

export class ContactController {

    private courseService: ContactService;

    constructor() {
        this.courseService = new ContactService();
    }

    async getContacts(req: Request, res: Response, next: NextFunction) {
        try {
            const listContacts = await this.courseService.getContacts(req.query);
            return res.status(200).json({ message: 'Request successfully', ...listContacts })
        } catch (error) {
            const err = new Error(error);
            return res.status(500).json({ message: 'Server Error', error: err });
        }
    }

    async createContact(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = _.pick(req.body, ['name', 'phone', 'address']);
            const contactCreated = await this.courseService.contactCreated(contact);
            return res.status(201).json({ message: 'Contact created successfully', data: contactCreated })
        } catch (error) {
            const err = new Error(error);
            return res.status(500).json({ message: 'Server Error', error: err });
        }
    }

    async updatedContact(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = _.pick(req.body, ['id' ,'name', 'phone', 'address']);
            const contactUpdated = await this.courseService.contactUpdated(contact);
            return res.status(201).json({ message: 'Contact updated successfully', data: contactUpdated })
        } catch (error) {
            const err = new Error(error);
            return res.status(500).json({ message: 'Server Error', error: err });
        }
    }

    async disabledContact(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = _.pick(req.body, ['id', 'active']);
            const contactDisabled = await this.courseService.contactDisabled(contact);
            return res.status(201).json({ message: 'Contact delete successfully', data: contactDisabled })
        } catch (error) {
            const err = new Error(error);
            return res.status(500).json({ message: 'Server Error', error: err });
        }
    }

}