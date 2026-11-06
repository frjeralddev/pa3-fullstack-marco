import { Request, Response } from 'express'; 
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find({ usuario: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: tasks });
    } catch (error: unknown) {
        res.status(500).json({ success: false, error: 'Error al obtener las tareas' });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { titulo, descripcion } = req.body;

        const newTask = new Task({
            titulo,
            descripcion,
            usuario: req.userId
        });

        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error: unknown) {
        res.status(500).json({ success: false, error: 'Error al crear la tarea' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({ 
            _id: id, 
            usuario: req.userId 
        });

        if (!deletedTask) {
            res.status(404).json({ success: false, error: 'Tarea no encontrada o no autorizada' });
            return;
        }

        res.status(200).json({ success: true, message: 'Tarea eliminada correctamente' });
    } catch (error: unknown) {
        res.status(500).json({ success: false, error: 'Error al eliminar la tarea' });
    }
};
