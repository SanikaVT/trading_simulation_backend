/**
 * Author: Udit Gandhi
 */
import { Router } from "express";

export default interface Controller {
  path: string;
  router: Router;
}
