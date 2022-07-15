/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import { Router } from "express";

export default interface Controller {
  path: string;
  router: Router;
}
