var express = require("express");
var router = express.Router();
var mysql = require("mysql");

// MySQLの設定情報
var mysql_setting = {
    host: "localhost",
    user: "root",
    password: "",
    database: "my-nodeapp-db"
};

// GETアクセスの処理
router.get("/",((req,res,next) => {

    // コネクションの用意
    var connection = mysql.createConnection(mysql_setting);

    // データベースにアクセス
    connection.connect();

    // データを取り出す
    connection.query("SELECT * from mydata",(error, results, fields)=>{
        // データベースアクセス完了時の処理
        if(error === null){
            // var data = {
            //     title: "mysql",
            //     content: results
            // };
            var data = {
                title: "mysql",
                content: [
                    {name: "hoge", mail: "hosa"},
                ]
            };
            res.render("hello/index", data);
        };
    });

    // 接続を解除
    connection.end();
}));

//新規作成ページへのアクセス
router.get("/add",(req,res,next)=>{
    let data = {
        title:"Hello/Add",
        content:"新しいレコードを入力"
    };

    res.render("hello/add", data);
});

//新規作成フォーム送信処理の結果
router.post("/add",(req,res,next)=>{
    const name = req.body.name;
    const mail = req.body.mail;
    const age = req.body.age;
    const data = {
        "name": name,
        "mail": mail,
        "age": age
    };

    // データベースの設定情報を渡す
    const connection = mysql.createConnection(mysql_setting);

    // データベースに接続
    connection.connect();

    // データを取り出す
    connection.query("insert into mydata set ?", data,(error,results,fields)=>{
        res.redirect("/hello");

    // データベースの接続を解除
    connection.end();
    })
});

module.exports = router;

