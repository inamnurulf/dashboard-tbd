import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../services/db.ts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void>{
    const { method } = req;
  
    switch (method) {
      case 'GET':
        try {
        const query = 'SELECT * FROM public."BOOK" ORDER BY "Book Number" ASC;';
          const result = await pool.query(query);
          res.status(200).json(result.rows);
        } catch (error) {
          console.error('Error fetching book:', error);
          res.status(500).json({ error : 'Internal server error' });
        }
        break;
  
      case 'POST':
        const bookNumber =parseInt(req.body["Book Number"]);
        const bookName =req.body["Book Name"];
        const publicationYear =parseInt(req.body["Publication Year"]);
        const pages =parseInt(req.body["Pages"]);
        const publisherName =req.body["Publisher Name"];
        try {
          const query = `INSERT INTO public."BOOK" ("Book Number", "Book Name", "Publication Year", "Pages", "Publisher Name") VALUES(${bookNumber},'${bookName}',${publicationYear},${pages},'${publisherName}');`;
          const cleanedquery =query.replace(/\\/g, '').replace("\n","")
            const result = await pool.query(query.replace(/\\/g, '').replace("\n",""));
            res.status(200).json(result);
          } catch (error) {
            console.error('Error posting book:', error);
            res.status(500).json({ error : 'Internal server error' });
          }
          break;
  
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
