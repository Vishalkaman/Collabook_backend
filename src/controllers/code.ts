import { Request, Response } from 'express';

export const runCode = (req: Request, res: Response): void => {
    const { code } = req.body as { code: string };

    try {
        // ⚠️ Use `eval` cautiously. It's unsafe for untrusted code.
        const output = eval(code);
        res.json({ output });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
