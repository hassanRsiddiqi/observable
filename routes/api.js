import { Router } from "express";
import user from "../controllers/observableController";

const router = Router();

router.get("/reduce", user.reduceData);
router.get("/filter", user.filterData);

export default router;
