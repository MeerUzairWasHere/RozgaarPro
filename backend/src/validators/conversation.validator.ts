import { z } from "zod";

const messageBodySchema = z
  .string()
  .min(1, { message: "Message body must be at least 1 character" })
  .max(2000, { message: "Message body must be at most 2000 characters" });

export const validateStartConversationInput = z.object({
  freelancerId: z.string().uuid({ message: "Invalid freelancerId" }),
  text: messageBodySchema,
});

export const validateSendMessageInput = z.object({
  text: messageBodySchema,
});

export const conversationIdParamSchema = z.object({
  conversationId: z.string().uuid("conversationId is required and must be a valid UUID"),
});

export const freelancerIdParamSchema = z.object({
  freelancerId: z.string().uuid("freelancerId is required and must be a valid UUID"),
});

export const validateGetMessagesQuery = z.object({
  since: z.string().optional(),
  limit: z
    .optional(z.string())
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().int().min(1).max(100).optional()),
});
