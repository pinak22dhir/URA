import { doctorList } from "../contollers/doctorController.js";
import express from "express";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);

export default doctorRouter;
