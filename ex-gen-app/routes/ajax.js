const express = require("express");
const router = express.Router();

const data = [
    {name: "Taro", age:35, mail: "taro@yamada"},
    {name: "Hanako", age:35, mail: "hanako@sakamoto"},
    {name: "HIge", age:35, mail: "hige@keisuke"},
];

router.get("/", (req,res,next) =>{
    const n = req.query.id;
    res.json(data[n]);
});

module.exports = router;