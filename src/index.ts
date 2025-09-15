 import express from 'express';
import userroute from './routes/UserRoute'
 import tacheroute from './routes/Tacherouter'
 import authenticate from './middlewares/Authmiddleware';
 
 const app = express();


 app.use(express.json());

 app.use('/users',userroute)
 app.use('/taches',authenticate,tacheroute)
 export default app;