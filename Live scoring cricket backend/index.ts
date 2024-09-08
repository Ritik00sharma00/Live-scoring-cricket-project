import express from 'express'
import { Request,Response } from 'express';
import router from './Backend/Routes/Routes';  // Ensure the path is correct
import dbconnect from './Backend/Config/dbconnect';

const app = express();
const port = 5000;

dbconnect();

// app.use(cors()); 
app.use(express.json()); 


app.use('/api/v1/', router); 

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
function cors(): any {
  throw new Error('Function not implemented.');
}

