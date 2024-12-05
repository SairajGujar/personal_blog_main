import express from "express"
import cors from "cors"
import router from './router.js'
import auth from './auth.js'
const app = express()

const port = 4000
app.use(cors())
app.use(express.json())
app.use(['/edit/:id', '/create', '/delete'], auth);
app.use("/", router)

app.listen(port, ()=>{
    console.log(`app listening on ${port}`)
})


