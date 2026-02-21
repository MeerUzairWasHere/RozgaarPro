import { z } from "zod";
import {
  filterableFields,
  searchSchema,
  sortableFields,
  validatePaginationInput,
} from "./zod.schema";

const messageBodySchema = z
  .string()
  .min(1, { message: "Message body must be at least 1 character" })
  .max(2000, { message: "Message body must be at most 2000 characters" });

export const validateListConversationsInput = z.object({
  pagination: validatePaginationInput.optional(),
  filters: z
    .array(filterableFields(["updatedAt"]))
    .optional(),
  sort: z
    .array(sortableFields(["updatedAt"]))
    .optional(),
  search: searchSchema.optional(),
});

export const validateStartConversationInput = z.object({
  freelancerId: z.uuid({ message: "Invalid freelancerId" }),
  text: messageBodySchema,
});

export const validateSendMessageInput = z.object({
  text: messageBodySchema,
});

export const conversationIdParamSchema = z.object({
  conversationId: z.uuid("conversationId is required and must be a valid UUID"),
});

export const freelancerIdParamSchema = z.object({
  freelancerId: z.uuid("freelancerId is required and must be a valid UUID"),
});

export const validateGetMessagesQuery = z.object({
  since: z.string().optional(),
  limit: z
    .optional(z.string())
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().int().min(1).max(100).optional()),
});
