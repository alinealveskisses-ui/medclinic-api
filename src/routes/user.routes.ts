import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/rbacMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/me", ensureAuthenticated, userController.getProfile);
userRoutes.get(
  "/admin/ping",
  ensureAuthenticated,
  authorizeRole(["ADMIN"]),
  userController.adminPing
);

export { userRoutes };