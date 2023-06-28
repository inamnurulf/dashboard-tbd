import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../services/db.ts';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { method } = req;

    switch (method) {
        case 'POST':
        console.log(req.body)
        const reqquery = req.body
            try {
                const query = reqquery;
                console.log(req.body)
                const cleanedquery = query.replace(/\\/g, '').replace("\n", "")
                const result = await pool.query(query.replace(/\\/g, '').replace("\n", ""));
                res.status(200).json(result);
            } catch (error) {
                console.error('Error posting book:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;


        default:
            res.setHeader('Allow', ['GET','POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
