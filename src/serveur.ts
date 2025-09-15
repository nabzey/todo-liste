import dotenv from 'dotenv';
import app from './index.js'

dotenv.config();

const port = Number (process.env.port) || 5000

app.listen(port,()=>{
    console.log(`serveur http://localhost:${port}`)
})

