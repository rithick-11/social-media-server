import express from "express";
import { Server } from "socket.io";
import http from 'http'


import dotevn from 'dotenv'
import cors from "cors"


dotevn.config()


const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json())

export { app, server, io };
