import { Router } from 'express';
import jwt from 'jsonwebtoken';

import usersModel from '../../models/users.model.js';
import { createHash, validatePassword } from '../../utils.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await usersModel.find();
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: 'Unable to get users' });
  }
})

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const userExists = await usersModel.findOne({ email });

  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    await usersModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password)
    });
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    res.status(400).json({ message: `Unable to create user: ${error}` });
  }
})

router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  const userExists = await usersModel.findOne({ _id: id });

  if (!userExists) {
    return res.status(400).json({ message: 'User does not exists' });
  }

  try {
    await usersModel.findByIdAndUpdate(id, { ...body, password: body.password ? createHash(body.password) : userExists.password });
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: `Unable to update user: ${error}` });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userExists = await usersModel.findOne({ _id: id });

  if (!userExists) {
    return res.status(400).json({ message: 'User does not exists' });
  }

  try {
    await usersModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: `Unable to delete user: ${error}` });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userExists = await usersModel.findOne({ email });

  if (!userExists || !validatePassword(userExists, password)) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (validatePassword(userExists, password)) {
    let token = jwt.sign({ email, password, role: 'user' }, 'coderSecret', { expiresIn: '24h' });
    res.cookie('session', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.status(200).json({
      message: 'Successfull login', user: {
        first_name: userExists.first_name,
        last_name: userExists.last_name,
        email: userExists.email,
        age: userExists.age,
        id: userExists._id
      }
    });
  }
})



export default router;