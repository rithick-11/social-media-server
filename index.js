import { app, server } from "./lib/server.js";
import connectDb from "./lib/db.js";
import { authRouter } from "./routers/index.js";


const port = process.env.PORT || 3057


app.use("/api/auth", authRouter)


server.listen(port, async () => {
    await connectDb()
    console.log(`server is running at http://localhost:${port}`);   
})

