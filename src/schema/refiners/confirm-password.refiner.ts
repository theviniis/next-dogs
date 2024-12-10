import { Password } from "../common.schema";

const handler = (data: { password: Password; confirmPassword: Password }) => {
  return data.password === data.confirmPassword;
};

const message = {
  path: ["confirmPassword"],
  message: "Passwords do not match",
};

export default {
  handler,
  message,
} as const;
