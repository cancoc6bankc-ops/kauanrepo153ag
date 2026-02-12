const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/:id', (req, res) => {
  const file = path.join(__dirname, '../../public/dumps', req.params.id + '.csv');
  if (!fs.existsSync(file)) return res.status(404).send('Dump não encontrado');
  res.download(file);
});
module.exports = router;
