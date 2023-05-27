import { IUserSwagger, IUserSwaggerCreated } from "./modules/users/models/interfaces/user.interface";

export const specsOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "S4 Learning API",
        version: "1.0.0",
        description: "A simple express library API",
      },
      servers: [
        {
          url: "http://localhost:3004",
        },
      ],
      components: {
        securitySchemes: {
          basicAuth: {
            type: "http",
            scheme: "basic",
            withCredentials: false
          },
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            withCredentials: false
          }
        },
        security: [
          {
            basicAuth: []
          },
          {
            bearerAuth: []
          }
        ],
        schemas: {
          user: IUserSwagger,
          userCreate: IUserSwaggerCreated,
        }
      },
      security: [
        {},
        {
          bearerAuth: []
        }
      ]
    },
    apis: ["./src/modules/*/controllers/*.ts"],
  };