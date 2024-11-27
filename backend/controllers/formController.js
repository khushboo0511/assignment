const pool = require('../db');

// Save Form Data
exports.submitForm = async (req, res) => {
    const { userId, country, state, city, temperature, month } = req.body;

    try {
        await pool.query(
            'INSERT INTO form_data (user_id, country, state, city, temperature, month) VALUES ($1, $2, $3, $4, $5, $6)',
            [userId, country, state, city, temperature, month]
        );
        res.status(201).json({ message: 'Form data saved successfully' });
        console.log(res, 'res')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve Form Data
exports.getFormData = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM form_data');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCountries = async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT country FROM form_data');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStates = async (req, res) => {
    const { country } = req.query;

    try {
        const result = await pool.query(
            'SELECT DISTINCT state FROM form_data WHERE country = $1',
            [country]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCities = async (req, res) => {
    const { state } = req.query;

    try {
        const result = await pool.query(
            'SELECT DISTINCT city FROM form_data WHERE state = $1',
            [state]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTemperature = async (req, res) => {
    const { city } = req.query; 

    if (!city) {
        return res.status(400).json({ error: 'City is required' }); 
    }

    try {
        const result = await pool.query(
            'SELECT temperature FROM form_data WHERE city = $1 LIMIT 1',
            [city]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'City not found' }); 
        }

        res.status(200).json({ temperature: result.rows[0].temperature });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

exports.getAllTemperatures = async (req, res) => {
    try {
      const result = await pool.query('SELECT city, temperature FROM form_data');
      res.status(200).json(result.rows);  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  