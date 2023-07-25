//va la llamada al controller con el path de esa llamada, ejemplo /new-user , newUser
const Router = require('express');
const {postCaravigerProfile, getCareviger, deleteCareviger, updateCareviger} = require('../controller/createCareviger');
const { carevigerSchema } = require('../schemas/careviger-schema');
const {validateBody} = require('../middlewares/validateSchema');


const router = Router();

router.post('/create_profile',validateBody(carevigerSchema), postCaravigerProfile);
router.get('/:email', getCareviger);
router.put('/profile_change/:email', updateCareviger);
router.delete('/profile_careviger/:email', deleteCareviger);

module.exports = router;