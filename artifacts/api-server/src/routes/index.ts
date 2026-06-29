import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import projectsRouter from "./projects";
import feedbackRouter from "./feedback";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(projectsRouter);
router.use(feedbackRouter);
router.use(adminRouter);

export default router;
