import express from 'express';
const router = new express.Router();

import Setting from '../../models/Setting';

router.get('/isinstalled', (req, res) => {
    Setting.findOne({
        name: 'isInstalled'
    }).then((setting) => {
        if (setting) {
            return res.json({ "isInstalled": true, "details": setting.value })
        } else {
            return res.status(404).json({
                isInstalled: false
            });
        }
    });
});

router.post('/install', (req, res) => {
    Setting.findOne({
        name: 'isInstalled',
        value: 'true'
    }).then((setting) => {
        if (setting) {
            return res.status(400).json({
                isinstalled: true,
                msg: 'Site already installed'
            });
        } else {
            // create roles setting

            // create default user
        }
    });
});

export default router;