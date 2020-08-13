// code away!
const express = require("express")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")



const server = express()
const port = 5001



server.use(express.json())
server.use(logger())
server.use("/users", userRouter)
server.use("/posts", postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.listen(port, () => { 
    console.log("Server is running, port 5001")
})