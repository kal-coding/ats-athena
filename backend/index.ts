import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {createClient} from '@supabase/supabase-js';
import { Database } from './data/database.types.js'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const supabaseUrl =  process.env.SUPABASE_URL || "undefined";
const supabaseKey = process.env.SUPABASE_API_KEY || "undefined";
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

console.log('alive')

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Working as spaghetti intended");
});

app.get('/organizations', async (req, res) => {
  const {data, error} = await supabase
      .from('Organizations')
      .select()
  res.send(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});