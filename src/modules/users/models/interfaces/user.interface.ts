export interface IUser {
  name: string;
  email: string;
  password: string;
  active: boolean;
}

export const IUserSwagger = {
  type: "object",
  title: "User",
  properties: {
    id: {
      type: "integer",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
  },
  required: ["name", "email"],
};

export const IUserSwaggerCreated = {
  type: "object",
  properties: {
    message: {
      type: "string",
    },
    user: IUserSwagger,
  },
};
