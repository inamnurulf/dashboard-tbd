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
        const query = 'SELECT * FROM public."BOOK";';
          const result = await pool.query(query);
          res.status(200).json(result.rows);
        } catch (error) {
          console.error('Error fetching book:', error);
          res.status(500).json({ error : 'Internal server error' });
        }
        break;
  
      case 'POST':
        // Handle the POST request logic here
        break;
  
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
