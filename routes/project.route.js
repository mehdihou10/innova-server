const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project.controller');

router.get("/",projectController.getAllProjects);
router.get("/page/:page",projectController.getProjects);
router.post("/add",projectController.addProject);

router.get("/stats",projectController.getStats);

router.route("/:projectId")
.delete(projectController.deleteProject)
.patch(projectController.updateViews);



module.exports = router;