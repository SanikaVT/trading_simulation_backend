/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import { Request, Response } from "express";
import HttpException from "@/utils/exceptions/http.exception";

/**
 * Error middleware for handling failed requests
 * */
export default function ErrorMiddleware(
  error: HttpException,
  req: Request,
  res: Response
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  console.log(error.message);
  // res.sendStatus({ status, message });
}
