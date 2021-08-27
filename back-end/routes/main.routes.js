const router = require('express').Router()

router.get('', (req,res)=>{
    res.send('Welcome to Our ELearning App')
});

 module.exports = router;