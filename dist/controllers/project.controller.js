"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.searchProjects = exports.deleteProject = exports.updateProject = exports.createProject = exports.getAllProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const sequelize_1 = require("sequelize");
const getAllProjects = async (_req, res) => {
    try {
        const projects = await Project_1.default.findAll();
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data project', error: err });
    }
};
exports.getAllProjects = getAllProjects;
const createProject = async (req, res) => {
    try {
        const { name } = req.body;
        const project = await Project_1.default.create({ name });
        res.status(201).json(project);
    }
    catch (err) {
        res.status(500).json({ message: 'Gagal membuat project', error: err });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const project = await Project_1.default.findByPk(Number(id));
        if (!project) {
            res.status(404).json({ message: 'Project tidak ditemukan' });
            return;
        }
        project.name = name;
        await project.save();
        res.json({ message: 'Project berhasil diupdate' });
    }
    catch (err) {
        res.status(500).json({ message: 'Gagal update project', error: err });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Project_1.default.destroy({ where: { id: Number(id) } });
        if (!deleted) {
            res.status(404).json({ message: 'Project tidak ditemukan' });
            return;
        }
        res.json({ message: 'Project berhasil dihapus' });
    }
    catch (err) {
        res.status(500).json({ message: 'Gagal hapus project', error: err });
    }
};
exports.deleteProject = deleteProject;
const searchProjects = async (req, res) => {
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const { rows, count } = await Project_1.default.findAndCountAll({
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${search || ''}%`
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
    }
    catch (err) {
        res.status(500).json({ message: 'Search failed', error: err });
    }
};
exports.searchProjects = searchProjects;
const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project_1.default.findByPk(id);
        if (!project)
            return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get project', error: err });
    }
};
exports.getProjectById = getProjectById;
