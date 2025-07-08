import { Request, Response } from 'express';
import Project from '../models/Project';
import { Op } from 'sequelize';

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data project', error: err });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const project = await Project.create({ name });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat project', error: err });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const project = await Project.findByPk(Number(id));
    if (!project) {
      res.status(404).json({ message: 'Project tidak ditemukan' });
      return;
    }

    project.name = name;
    await project.save();
    res.json({ message: 'Project berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update project', error: err });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await Project.destroy({ where: { id: Number(id) } });
    if (!deleted) {
      res.status(404).json({ message: 'Project tidak ditemukan' });
      return;
    }
    res.json({ message: 'Project berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus project', error: err });
  }
};

export const searchProjects = async (req: Request, res: Response): Promise<void> => {
  const search = req.query.search as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await Project.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${search || ''}%`
        }
      },
      limit,
      offset
    });

    res.json({
      data: rows,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get project', error: err });
  }
};

