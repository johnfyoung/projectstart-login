import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a natural buford');
});

export default router;
