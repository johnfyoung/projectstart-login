import express from 'express';
const router = new express.Router();
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

import validateInstallInput from '../../validation/install';

import User from '../../models/User';
import Setting from '../../models/Setting';
import { permissions, roles } from '../../config/permissions';

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
    const {
        errors,
        isValid
    } = validateInstallInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

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
            const appNameSetting = new Setting({
                name: "appName",
                value: req.body.appName
            });
            appNameSetting.save()
                .catch(err => console.log(err));

            const registrationSetting = new Setting({
                name: "publicRegistration",
                value: true
            });
            registrationSetting.save()
                .catch(err => console.log(err));

            // create roles setting
            const rolesSetting = new Setting({
                name: "roles",
                value: {
                    superadmin: {
                        can: [
                            permissions.site.all,
                            permissions.users.all
                        ],
                        inherits: [
                            roles.privileged
                        ]
                    },
                    privileged: {
                        can: [
                            permissions.content.all
                        ],
                        inherits: [
                            roles.guest
                        ]
                    },
                    guest: {
                        can: [
                            permissions.content.public
                        ]
                    }
                }
            });

            rolesSetting.save()
                .catch(err => {
                    console.log("Error saving roles: ", err);
                });

            // create default user
            const avatar = gravatar.url(req.body.email, {
                s: '200', // size
                r: 'pg', // rating
                d: 'mm' // default
            });
            const newUser = new User({
                name: req.body.userFullName,
                email: req.body.userEmail,
                roles: [roles.superadmin],
                avatar,
                password: req.body.userPassword
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (crypterr, hash) => {
                    if (crypterr) throw crypterr;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {
                            const appIsInstalledSetting = new Setting({
                                name: "isInstalled",
                                value: true
                            });
                            appIsInstalledSetting.save()
                                .then(() => {
                                    res.json({
                                        isInstalled: true,
                                        user
                                    })
                                })
                                .catch(err => console.log(err))

                        })
                        .catch((err) => console.error(err));
                });
            });
        }
    });
});

export default router;