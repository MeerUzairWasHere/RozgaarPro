import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Role } from "@prisma/client";
import { ListQueryDto } from "../dto";
import { IConversationService } from "../interfaces/conversation.interface";
import { currentUser, getBody } from "../decorators";

export class ConversationController {
  constructor(private conversationService: IConversationService) {}

  public listMyConversations = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const user = currentUser(req);
    const query = (getBody(req) ?? {}) as ListQueryDto;
    const result = await this.conversationService.listMyConversations(
      user.id,
      user.freelancerId ?? null,
      user.role as Role,
      query,
    );
    res.status(StatusCodes.OK).json(result);
  };

  public getByFreelancer = async (
    req: Request<{ freelancerId: string }>,
    res: Response,
  ): Promise<void> => {
    const user = currentUser(req);
    const result = await this.conversationService.getByFreelancer(
      user.id,
      req.params.freelancerId,
    );
    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Conversation not found" });
      return;
    }
    res.status(StatusCodes.OK).json(result);
  };

  public startConversation = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const user = currentUser(req);
    const body = getBody(req) as { freelancerId: string; text: string };
    const result = await this.conversationService.startConversation(
      user.id,
      body.freelancerId,
      body.text,
    );
    res.status(StatusCodes.CREATED).json(result);
  };

  public getMessages = async (
    req: Request<{ conversationId: string }>,
    res: Response,
  ): Promise<void> => {
    const user = currentUser(req);
    const { conversationId } = req.params;
    const since = req.query.since as string | undefined;
    const limit = (req.query.limit as number | undefined) ?? 20;
    const result = await this.conversationService.getMessages(
      conversationId,
      user.id,
      user.freelancerId ?? null,
      user.role as Role,
      since,
      limit,
    );
    res.status(StatusCodes.OK).json(result);
  };

  public sendMessage = async (
    req: Request<{ conversationId: string }>,
    res: Response,
  ): Promise<void> => {
    const user = currentUser(req);
    const body = getBody(req) as { text: string };
    const result = await this.conversationService.sendMessage(
      req.params.conversationId,
      user.id,
      user.role as Role,
      body.text,
    );
    res.status(StatusCodes.CREATED).json(result);
  };
}
