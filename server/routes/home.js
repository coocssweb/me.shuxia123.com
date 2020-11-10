import Router from "koa-router";
import controllers from "../controllers";

let router = new Router({
  prefix: "",
});

router.get("/", controllers.home);
router.get("/ideas", controllers.ideas);
router.get("/ideas/:classify", controllers.ideas);
router.get("/projects", controllers.projects);
router.get("/demos", controllers.demos);
router.get("/detail/:id", controllers.detail);

export default router;
