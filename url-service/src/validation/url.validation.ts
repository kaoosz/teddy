import { z } from "zod";
import {requiredMessage,invalidTypeMessage} from "./validation.functions";

export const urlSchema = z.object({
    url: z.string({
        required_error: requiredMessage('url'),
        invalid_type_error: invalidTypeMessage('url', 'string'),
    })
});