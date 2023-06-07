import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../services/db.ts';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { method } = req;
    const {id}= req.query
    
    switch (method) {
        case 'PUT':
            const bookName = req.body["Book Name"];
            const publicationYear = parseInt(req.body["Publication Year"]);
            const pages = parseInt(req.body["Pages"]);
            const publisherName = req.body["Publisher Name"];
            try {
                const query = `UPDATE public."BOOK" SET "Book Name" = '${bookName}', "Publication Year" = ${publicationYear}, "Pages" = ${pages}, "Publisher Name" = '${publisherName}' WHERE "Book Number" = ${id};`;
                const result = await pool.query(query.replace(/\\/g, '').replace("\n", ""));
                res.status(200).json(result);
            } catch (error) {
                console.error('Error update book:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;

        case 'DELETE':
            try {
                const query = `DELETE FROM public."BOOK" WHERE "Book Number" = ${id};`;
                const result = await pool.query(query.replace(/\\/g, '').replace("\n", ""));
                res.status(200).json(result);
            } catch (error) {
                console.error('Error delete book:', error);
                res.status(500).json({ error: 'Internal server error' });
            }            break;

        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
