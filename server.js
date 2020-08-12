const express = require('express');


const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express();


server.use(logger())
server.use("/users", userRouter)
server.use("/posts", postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   return (req, res, next) => {
// 		const time = new Date().toISOString()
// 		console.log(`${time} ${req.method} ${req.url}`)

// 		// log everything and then go to the next router(?)
// 		next()
// 	}
// }

module.exports = server;
