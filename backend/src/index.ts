import app from './app.js'
import { connectToDatabase } from './db/connection.js';
const PORT=process.env.PORT||3000;
//connection
connectToDatabase();
app.listen(PORT,()=>{
  console.log(`Server is started at ${PORT}`);
})