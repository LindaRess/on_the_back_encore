const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/user', async (req, res, next) => {
  try {
    const results = await prisma.user.findMany();
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.send(200).json(results);
  } catch (err) {
    next(err);
  }
});

router.post('/user', async (req, res, next) => {
  try {
    const results = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lasrtName,
        email: req.body.email,
        password: req.body.password,
        avatarUrl: req.body.avatarUrl,
      },
    });
    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

router.put('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, avatarUrl } = req.body;
    const results = await prisma.user.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        firstName,
        lastName,
        email,
        password,
        avatarUrl,
      },
    });
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

router.delete('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;