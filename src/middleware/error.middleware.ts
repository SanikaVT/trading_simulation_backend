import { Request, Response } from "express";
import HttpException from "@/utils/exceptions/http.exception";

export default function ErrorMiddleware(
  error: HttpException,
  req: Request,
  res: Response
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  console.log(error.message);
  res.status(status).send({ status, message });
}
