import Router from "koa-router";
import apiControl from "../../controllers/api/media";
import passport from "passport";
import "../../utils/passport";

let router = new Router({
  prefix: "/api",
});

router.get("/media/:id", apiControl.fetchOne);

router.get("/media", apiControl.fetch);

router.post(
  "/media",
  passport.authenticate("administrator", { session: false }),
  apiControl.create
);

router.put(
  "/media/:id",
  passport.authenticate("administrator", { session: false }),
  apiControl.edit
);

router.delete(
  "/media/:id",
  passport.authenticate("administrator", { session: false }),
  apiControl.remove
);

export default router;
