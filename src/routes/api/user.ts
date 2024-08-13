import { Router } from "express";
import userController from "../../controller/user.controller";
import auth from "../../middleware/auth"

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/userInfo', auth,  userController.userInfo);

export default router;