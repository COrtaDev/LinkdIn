const express = require('express');
const { check, validationResult } = require('express-validator')
const { Avatar, Profile, Sequelize } = require('../db/models');
const { csrfProtection, asyncHandler } = require('../utils');
const { requireAuth } = require('../auth');
const router = express.Router();
const fetch = require('node-fetch');
const op = Sequelize.Op;



//Who's Watching???
router.get('/profiles/select-profile', requireAuth, asyncHandler(async (req, res) => {
  let id = req.session.auth.accountId
  const profiles = await Profile.findAll({
    where: { accountId: id },
    include: [{
      model: Avatar,
    }],
    limit: 7
  })
  res.render('profiles-select-profile', { profiles, Avatar })
}))

router.get('/profiles/select-avatar', requireAuth, asyncHandler(async (req, res) => {
  let id = req.session.auth.accountId
  const avatars = await Avatar.findAll({})

  res.render('profiles-select-avatar', { avatars, Profile })
}))

router.get('/profiles/add', requireAuth, asyncHandler(async (req, res) => {
  res.render('profiles-add-profile', { Avatar, Profile })
}))

router.post('/profiles/add/:id', requireAuth,
  asyncHandler(async (req, res) => {
    const {
      name,
      isKid,
      avatarId
    } = req.body;

    await Profile.create({
      name: name,
      isKid: isKid,
      avatarId: avatarId
    });
    // let errors = [];
    // const validatorErrors = validationResult(req);

    // if (validatorErrors.isEmpty()) {

    //   if (name !== null) {

    //   } else {
    //     errors = validatorErrors.array().map((error) => error.msg);
    //   }
    res.redirect('select-profile')
  }))



//Edit profiles: Select a profile to edit
//Will display all available profiles associated to your account
router.get('/profiles/edit-profile', requireAuth, asyncHandler(async (req, res) => {
  let id = req.session.auth.accountId
  const profiles = await Profile.findAll({
    where: { accountId: id },
    include: [{
      model: Avatar,
    }],
    limit: 7
  })
  res.render('profiles-edit', { profiles, Avatar })
}))

//This is the page where you change the name of the profile and set it to kids mode if you want
router.get('/profiles/edit/:id', requireAuth, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const profile = await Profile.findByPk(id, { include: Avatar });
  res.render('profile-edit-profile', { profile, Avatar })
}))


//this updates a selected profile on the current account
router.put('/profiles/edit/:id', requireAuth, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  let profile = await Profile.findByPk(id);
  console.log(req.body)
  console.log(profile)
  let {
    name,
    isKid,
  } = req.body;
  let avatarId = parseInt(req.body.avatarId, 10);
  console.log(name)
  console.log(isKid)
  console.log(typeof avatarId)
  if (!isKid) profile.isKid = false;
  if (isKid = 'on') profile.isKid = true;
  profile.name = name;
  profile.isKid = isKid;
  profile.avatarId = avatarId;
  console.log(profile.avatarId)
  // profile.avatarId = parseInt(avatarId);
  // console.log(profile.avatarId);
  await profile.save();
  res.status(204).end();
  //  res.redirect('/profiles/edit-profile');
}))

router.delete('/profiles/delete', requireAuth, asyncHandler(async (req, res) => {
  const id = req.session.auth.accountId
  const profile = await Profile.findByPk(id)
  await profile.destroy();
  res.status(204).end();
  res.render('profile-edit-profile', { profiles, Avatar });
}))



module.exports = router;
