import { UserModel } from "../models/user.model";
import * as bcrypt from 'bcrypt';

export class UserService {

    private repository = UserModel;
    saltRounds = 10;

    constructor() {}

    async getUsers() {
        try {
            return this.repository.find({ active: true });
        } catch (error) {
            throw error;
        }
    }

    async userCreated(user) {
        try {
            const findUser = await this.repository.findOne({ email: user.email });
            if (findUser) {
                throw {status: 409, message: 'user exist'};
            }
            const salt = bcrypt.genSaltSync(this.saltRounds);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash; 
            const newUser = new this.repository(user); 
            const userSave = await newUser.save(user);
            return userSave;    
        } catch (error) {
            throw error;
        }
    }

}