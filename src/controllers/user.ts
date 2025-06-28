import { Request, Response } from 'express';

export const getUsers = (_req: Request, res: Response): void => {
    res.json([{ id: 1, name: 'Alice' }]);
};

export const createUser = (req: Request, res: Response): void => {
    const { name } = req.body as { name: string };
    res.status(201).json({ id: 2, name });
};
