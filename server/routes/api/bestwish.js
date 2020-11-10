import Router from "koa-router";
import apiControl from "../../controllers/api/bestwish";
import passport from "passport";

let router = new Router({
  prefix: "/api",
});

router.get("/bestwish/one", apiControl.fetchOne);

router.get("/bestwish", apiControl.fetch);

router.post(
  "/bestwish",
  passport.authenticate("administrator", { session: false }),
  apiControl.create
);

router.put(
  "/bestwish/:id",
  passport.authenticate("administrator", { session: false }),
  apiControl.edit
);

router.delete(
  "/bestwish/:id",
  passport.authenticate("administrator", { session: false }),
  apiControl.remove
);

export default router;
