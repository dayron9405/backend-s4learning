import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import * as _ from 'underscore';

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    /**
     * @openapi
     * /users:
     *   get:
     *     tags: [Users]
     *     summary: Get users list
     *     description: This api service return the list users
     *     parameters:
     *       - in: query
     *         name: page
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: The current page
     *       - in: query
     *         name: perPage
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: The limit page
     *     responses:
     *       200:
     *         description: Returns a mysterious string.
     */
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const listUsers = await this.userService.getUsers();
            return await res.status(200).json({ message: 'Request successfully', data: listUsers })
        } catch (error) {
            const err = new Error(error);
            throw res.status(500).json({ message: 'Server Error', error: err });
        }
    }

    /**
     * @openapi
     * /users/{id}:
     *   get:
     *     tags: [Users]
     *     summary: Get user by ID
     *     description: This api service return one user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: The user ID
     *     responses:
     *       200:
     *         description: Returns a mysterious string.
     */
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const listUsers = await this.userService.getUsers();
            return await res.status(200).json({ message: 'Request successfully', data: listUsers })
        } catch (error) {
            const err = new Error(error);
            throw res.status(500).json({ message: 'Server Error', error: err });
        }
    }

    /**
     * @openapi
     * /users:
     *  post:
     *    tags: [Users]
     *    summary: Created a resource with user
     *    security: []  
     *    requestBody:
     *      description: requets for created a user
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/user'
     *    responses:
     *      200:
     *        description: the total number of tasks
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/userCreate'
     */
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = _.pick(req.body, ['name', 'email', 'password']);
            const userCreated = await this.userService.userCreated(user);
            return await res.status(201).json({ message: 'User created successfully', data: userCreated })
        } catch (error) {
            const err = new Error(error);
            if (!error.status) {   
                throw res.status(500).json({ message: 'Server Error', error: err });
            }
            throw res.status(error.status).json({ message: error.message });
        }
    }

}