import { Router, Request, Response } from 'express';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// POST /tasks — cria uma nova task para o usuário autenticado
router.post('/tasks', requireAuth, async (req: Request, res: Response) => {
    const { task } = req.body as { task?: string };

    if (!task || !task.trim()) {
        res.status(400).json({ error: 'O campo task é obrigatório' });
        return;
    }

    try {
        const result = await pool.query<{
            id: number;
            task: string;
            completed: boolean;
            created_at: string;
        }>(
            `INSERT INTO tasks (user_id, task)
             VALUES ($1, $2)
             RETURNING id, task, completed, created_at`,
            [req.user!.id, task.trim()]
        );

        res.status(201).json({ task: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// GET /tasks — lista todas as tasks do usuário autenticado
router.get('/tasks', requireAuth, async (req: Request, res: Response) => {
    try {
        const result = await pool.query<{
            id: number;
            task: string;
            completed: boolean;
            created_at: string;
        }>(
            `SELECT id, task, completed, created_at
             FROM tasks
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [req.user!.id]
        );

        res.json({ tasks: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// PUT /tasks/:id/complete — marca uma task do usuário autenticado como concluída
router.put('/tasks/:id/complete', requireAuth, async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    try {
        const result = await pool.query<{
            id: number;
            task: string;
            completed: boolean;
            created_at: string;
        }>(
            `UPDATE tasks
             SET completed = true
             WHERE id = $1 AND user_id = $2
             RETURNING id, task, completed, created_at`,
            [id, req.user!.id]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Task não encontrada' });
            return;
        }

        res.json({ task: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// DELETE /tasks/:id — remove uma task do usuário autenticado
router.delete('/tasks/:id', requireAuth, async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    try {
        const result = await pool.query(
            `DELETE FROM tasks
             WHERE id = $1 AND user_id = $2
             RETURNING id`,
            [id, req.user!.id]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Task não encontrada' });
            return;
        }

        res.json({ message: 'Task removida com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
