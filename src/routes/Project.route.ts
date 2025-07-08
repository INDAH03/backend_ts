import express from 'express';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
} from '../controllers/project.controller';

const router = express.Router();

router.get('/projects', getAllProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.get('/projects/search', searchProjects);

export default router;
