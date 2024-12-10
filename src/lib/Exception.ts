import { randomUUID } from "crypto";
import { ZodError } from "zod";

export type ErrorData = {
  id: string;
  message: string;
  path?: string;
};

export class Exception {
  public messages: ErrorData[];

  constructor(error: Error | ZodError) {
    const messages = new Set<ErrorData>([]);

    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        messages.add({
          id: randomUUID(),
          path: err.path.join("."),
          message: err.message,
        });
      });
    } else {
      messages.add({
        id: randomUUID(),
        message: error.message,
      });
    }

    this.messages = Array.from(messages);
  }
}
