//va la llamada al controller con el path de esa llamada, ejemplo /new-user , newUser
const Router = require('express');
const {postCaravigerProfile, getCareviger, deleteCareviger} = require('../controller/createCareviger');


const router = Router();

router.get('/get-careviger/:email', getCareviger);
router.delete('/delete-profile-careviger/:email', deleteCareviger);
router.post('/create-profile', postCaravigerProfile);

module.exports = router;