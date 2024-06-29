const Project = require('../models/projects.model');
const httpStatus = require('../utils/http.status');
const asyncWrapper = require('../middlewares/async.wrapper');
const createError = require('../utils/create.error');


const getAllProjects = asyncWrapper(async(req,res,next)=>{

    const projects = await Project.find();

    res.json({status: httpStatus.SUCCESS,projects});

})

const getProjects = asyncWrapper( async(req,res,next)=>{

    const {page} = req.params;

    const limit = 6;
    const skip = 6 * (page  - 1);


    const projects = await Project.find().limit(limit).skip(skip);

    res.json({status: httpStatus.SUCCESS,projects})

})

const addProject = asyncWrapper( async(req,res,next)=>{

    const {image,created_at} = req.body;

    const project = new Project({

        image,
        created_at,
        views: 0

    })

    await project.save();

    res.json({status: httpStatus.SUCCESS});
})

const deleteProject = asyncWrapper( async(req,res,next)=>{

    const {projectId} = req.params;

    const projectsCount = await Project.countDocuments();

    if(projectsCount === 4){

        const error = createError(httpStatus.FAIL,401,"You Must Have At Least 4 Projects");
        return next(error);
    }

    await Project.findByIdAndDelete(projectId);

    res.json({status: httpStatus.SUCCESS});
})

const updateViews = asyncWrapper( async(req,res,next)=>{

    const {projectId} = req.params;

    await Project.findByIdAndUpdate(
        projectId,
        { $inc: { views: 1 } },
        { new: true }
    );

    res.json({status: httpStatus.SUCCESS})
})

const getStats = asyncWrapper( async(req,res,next)=>{

    const views = await Project.aggregate([
        {
            $group: {
                _id: null,
                totalViews: { $sum: "$views" }
            }
        }
    ]);

    const projects = await Project.countDocuments();

    res.json({
        status: httpStatus.SUCCESS,
        stats: {
            views: views[0].totalViews,
            projects
        }
    });
})

module.exports = {
    getProjects,
    getAllProjects,
    addProject,
    deleteProject,
    updateViews,
    getStats
}