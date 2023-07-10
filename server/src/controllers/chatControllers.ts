import { Request, Response } from "express";
import { createAChatHelper, sendAMessageHelper } from "../helpers/chatHelpers";

export const createAChat = async (req: Request, res: Response) => {
  try {
    const response = await createAChatHelper(
      req.body.memberOne,
      req.body.memberTwo
    );
    res.status(201).json({ created: true, response });
  } catch (error: any) {
    res.status(404).json({ created: false });
  }
};

export const sendAMessage = async (req: Request, res: Response) => {
  try {
    const response = await sendAMessageHelper(req.body)
    res.status(200).json({send:true,message:response})
  } catch (error: any) {
    console.log(error);
    
    res.status(404).json({ send: false });
  }
};
