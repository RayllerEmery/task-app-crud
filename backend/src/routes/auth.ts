import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const router = Router();
const SALT_ROUNDS = 12;

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  return secret;
}

// POST /register
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body as {
    username?: string;
    email?: string;
    password?: string;
  };

  if (!username || !email || !password) {
    res.status(400).json({ error: 'username, email e password são obrigatórios' });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query<{ id: number; username: string; email: string }>(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username.trim(), email.trim().toLowerCase(), passwordHash]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err: unknown) {
    const pgError = err as { code?: string };
    if (pgError.code === '23505') {
      res.status(409).json({ error: 'Username ou e-mail já cadastrado' });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: 'email e password são obrigatórios' });
    return;
  }

  try {
    const result = await pool.query<{
      id: number;
      username: string;
      email: string;
      password_hash: string;
    }>(
      `SELECT id, username, email, password_hash
       FROM users WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
