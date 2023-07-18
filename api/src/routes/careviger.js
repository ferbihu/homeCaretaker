//va la llamada al controller con el path de esa llamada, ejemplo /new-user , newUser
const Router = require('express');
const {postCaravigerProfile, getCareviger, deleteCareviger, updateCareviger} = require('../controller/createCareviger');


const router = Router();

router.post('/create_profile', postCaravigerProfile);
router.get('/:email', getCareviger);
router.put('/profile_change/:email', updateCareviger);
router.delete('/profile_careviger/:email', deleteCareviger);

module.exports = router;