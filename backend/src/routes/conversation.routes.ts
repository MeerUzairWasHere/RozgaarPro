import { Router } from "express";
import { Role } from "@prisma/client";
import { authGuard, rolesGuard } from "../guards";
import { conversationController } from "../container";
import { validate } from "../decorators";
import {
  conversationIdParamSchema,
  freelancerIdParamSchema,
  validateGetMessagesQuery,
  validateListConversationsInput,
  validateSendMessageInput,
  validateStartConversationInput,
} from "../validators/conversation.validator";

const router = Router();

const userOrFreelancer = rolesGuard(Role.USER, Role.FREELANCER);
const userOnly = rolesGuard(Role.USER);

router
  .route("/")
  .post(
    authGuard,
    userOrFreelancer,
    validate({ body: validateListConversationsInput }),
    conversationController.listMyConversations,
  );

router
  .route("/start")
  .post(
    authGuard,
    userOnly,
    validate({ body: validateStartConversationInput }),
    conversationController.startConversation,
  );

router
  .route("/by-freelancer/:freelancerId")
  .get(
    authGuard,
    userOnly,
    validate({ params: freelancerIdParamSchema }),
    conversationController.getByFreelancer,
  );

router
  .route("/:conversationId/messages")
  .get(
    authGuard,
    userOrFreelancer,
    validate({ params: conversationIdParamSchema, query: validateGetMessagesQuery }),
    conversationController.getMessages,
  )
  .post(
    authGuard,
    userOrFreelancer,
    validate({ params: conversationIdParamSchema, body: validateSendMessageInput }),
    conversationController.sendMessage,
  );

export default router;
