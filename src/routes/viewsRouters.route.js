import { Router } from "express";
import usersModel from '../models/users.model.js';

const app = Router();

app.get('/', async (req, res) => {
  res.render('home')
})

app.get('/login', async (req, res) => {
  res.render('login')
})

app.get('/register', async (req, res) => {
  res.render('register')
})

app.get('/current/:id', async (req, res) => {
  const { id } = req.params
  await usersModel.findById(id).lean()
    .then((user) => {
      res.render('current', { user })
    })
})

export default app
