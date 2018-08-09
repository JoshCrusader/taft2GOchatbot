const express = require('express');

const router = express.Router();

router.get('/', (req,res,next) => {
    console.log("sex");
    res.status(200).json({
        message: 'XD NO U '
    });
});

router.post('/', (req,res,next) => {
    
});

module.exports = router;