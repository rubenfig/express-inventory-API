import auth from '../middleware/auth';
import {UserService} from "../services/user";

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // Create a new user
  try {
    res.status(201).send(UserService.createUser(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async(req, res) => {
  //Login a registered user
  try {
    res.send(await UserService.login(req.body))
  } catch (error) {
    if(error.code && error.error) {
      res.status(code).send(error.error)
    } else {
      res.status(400).send(error)
    }
  }

});

router.put('/:userId', auth, async (req, res) => {
  try {
    res.send(await UserService.updateUser(req.params.userId, req.body))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.delete('/:userId', auth, async (req, res) => {
  try {
    res.send( await UserService.deleteUser(req.params.userId));
  } catch (error) {
    res.status(500).send(error)
  }
});


router.get('/me', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user)
});

router.post('/me/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    await UserService.logoutCurrent(req.user);
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/me/logoutall', auth, async(req, res) => {
  // Log user out of all devices
  try {
    await UserService.logoutAll(req.user);
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
