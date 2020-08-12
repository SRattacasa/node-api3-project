const express = require('express');
// Not sure if I should import this  
const users = require("./userDb")
const posts = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
  .then((user) => { 
    res.status(201).json(user)
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  users.get()
  .then(users => { 
    res.status(200).json(users)
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
});

router.delete('/:id',  validateUserId(), (req, res) => {
  users.remove(req.params.id)
  .then(user => {
    res.status(201).json("User deleted")
  })
});

router.put('/:id',  validateUserId(), (req, res) => {
  users.update(req.params.id, req.body)
  .then(user => { 
    res.status(201).json(req.body)
  })
 .catch(error => { 
   console.log(error)
   res.status(500).json("Something is broken on our end")
 })
});

//custom middleware 

function validateUserId() {
  return (req, res, next) => { 
    users.getById(req.params.id)
    .then(user => { 
      if (user) 
      {
        req.user = user
        next()
      } else { 
        res.status(400).json({ message: "invalid user id" })
      }
    })
    .catch(err => { 
      res.status(500).json({
        message: "There was an error because we are learning how to write APIs"
      })
    })
  }
}

function validateUser() {
  return (req, res, next) => {
   if (!req.body.name) {
    res.status(400).json({message: "You suck"})
   }
   next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => { 
    if (!req.body.text) { 
      res.status(400).json({message: "missing required text field"})
    }
  }
}

module.exports = router;
