import express from "express";
import authService from "../services/authService";

const router = express.Router();

router.post("/login",validation(loginDto), async (req, res, next) => {
    try {
        await authService.login(req.body);
        res.status(StatusCodes.LOGIN_FAILURE).send);
    } catch (error) {
        next(error);
    }
});

router.post("/logout",validation(loginDto), async (req, res, next) => {
    try {
        await authService.logout(req.body);
        res.status(StatusCodes.LOGOUT_FAILURE).send);
    } catch (error) {
        next(error);
    })
});

router.post("/refresh",validation(loginDto), async (req, res, next) => {
    try {
        await authService.refresh(req.body);
        res.status(StatusCodes.REFRESH_FAILURE).send);
    } catch (error) {
        next(error);
    }
});

export default router;


