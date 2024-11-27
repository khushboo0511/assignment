const express = require('express');
const { submitForm, getFormData, getCountries, getCities, getTemperature, getStates, getAllTemperatures } = require('../controllers/formController');

const router = express.Router();

router.post('/submit', submitForm);
router.get('/data', getFormData);
router.get('/formData/countries', getCountries );
router.get('/formData/states', getStates);
router.get('/formData/cities', getCities);
router.get('/formData/temperature', getTemperature);
router.get('/formData/temperatures', getAllTemperatures);

module.exports = router;
