//va la llamada al controller con el path de esa llamada, ejemplo /new-user , newUser
const Router = require('express');
const {postCaravigerProfile} = require('../controller/createCareviger');


const router = Router();

router.post('/create-profile', postCaravigerProfile);

module.exports = router;