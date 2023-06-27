import { Request } from "express";

export interface MulterRequest extends Request {
  file: Express.Multer.File;
  cache: any;
  credentials: any;
  destination: any;
  integrity: any;
}
