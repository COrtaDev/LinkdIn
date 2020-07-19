const express = require('express');
const { asyncHandler } = require('../utils');
const { requireAuth } = require('../auth');
const { Profile, Avatar, Video } = require('../db/models');

const router = express.Router();

router.get(
  '/video/:title',
  requireAuth,
  asyncHandler(async (req, res) => {

    const profile1 = await Profile.findOne({
      where: {
        id: req.session.auth.whosWatching
      },
      include: Avatar
    });

    const profiles = await Profile.findAll({
      where: {
        accountId: req.session.auth.accountId
      },
      include: Avatar
    });

    const videoTitle = req.params.title;
    const video = await Video.findOne({ where: { title: videoTitle } });
    res.render('video-detail', { video, profiles, profile1 });
  })
);

router.get(
  '/video/:title/player',
  requireAuth,
  asyncHandler(async (req, res) => {

    const profile1 = await Profile.findOne({
      where: {
        id: req.session.auth.whosWatching
      },
      include: Avatar
    });

    const profiles = await Profile.findAll({
      where: {
        accountId: req.session.auth.accountId
      },
      include: Avatar
    });

    const videoTitle = req.params.title;
    const video = await Video.findOne({ where: { title: videoTitle } });
    res.render('video-player', { video, profiles, profile1 });
  })
);

module.exports = router;
