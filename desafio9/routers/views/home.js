import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
      try {
            res.render("home");
      } catch (error) {
            next(error);
      }
});

export default router;
