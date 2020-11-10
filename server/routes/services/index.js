import Router from "koa-router";
import controllers from "../../controllers/services";

let router = new Router({
  prefix: "/services",
});

router.get("/recommend/ideas", controllers.fetchRecommendIdeas);
router.get("/recommend/projects", controllers.fetchRecommendProjects);
router.get("/recommend/demos", controllers.fetchRecommendDemos);
router.get("/classifies", controllers.fetchClassifies);
router.get("/ideas", controllers.fetchIdeas);
router.get("/ideas/:classify", controllers.fetchIdeas);
router.get("/projects", controllers.fetchProjects);
router.get("/demos", controllers.fetchDemos);
router.get("/detail/:id", controllers.fetchOne);
router.get("/bestwish/one/:code", controllers.fetchOneBestwish);
router.get("/bestwish/cnzz/:code", controllers.cnzzBestwish);

export default router;
