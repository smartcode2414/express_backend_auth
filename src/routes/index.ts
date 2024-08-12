import { Router } from "express";
import userRouter from './api/user'


const router = Router();

router.use('/user', userRouter);

export default router;