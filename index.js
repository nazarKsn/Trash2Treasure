var express = require('express');
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jd_project:jd_project@one.048bqrc.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  

//Landing page
app.get('/', function(req, res) {
    res.render('public/landing_page.html');
});

//Homepage
app.get('/index.html', function(req, res) {
    res.render('public/index.html');
});

//dashboard
app.get('/userDashboard.html', function(req, res){
    res.render('public/userDashboard.html')
})
//service
app.get('/service.html', function(req, res) {
    res.render('public/service.html');
});

//contactus
app.get('/contact.html', function(req, res) {
    res.render('public/contact.html');
});


//about
app.get('/about.html', function(req, res) {
    res.render('public/about.html');
});

//login
app.get('/login.html', function(req, res) {
    res.render('public/login.html');
});

//img
app.get('/about-img.png', function(req, res) {
    res.render('public/images/about-img.png');
});

app.get('/cash.png', function(req, res) {
    res.render('public/images/cash.png');
});

app.get('/client-1.png', function(req, res) {
    res.render('public/images/client-1.png');
});

app.get('/client-2.png', function(req, res) {
    res.render('public/images/client-2.png');
});

app.get('/drop.png', function(req, res) {
    res.render('public/images/drop');
});

app.get('/next.png', function(req, res) {
    res.render('public/images/next.png');
});

app.get('/pick.png', function(req, res) {
    res.render('public/images/pick.png');
});

app.get('/points.png', function(req, res) {
    res.render('public/images/points.png');
});

app.get('/prev.png', function(req, res) {
    res.render('public/images/prev.png');
});

app.get('/s1.png', function(req, res) {
    res.render('public/images/s1.png');
});


app.get('/s2.png', function(req, res) {
    res.render('public/images/s2.png');
});

app.get('/s3.png', function(req, res) {
    res.render('public/images/s3.png');
});

app.get('/s4.png', function(req, res) {
    res.render('public/images/s4.png');
});

app.get('/slider-bg.webp', function(req, res) {
    res.render('public/images/slider-bg.wedp');
});

app.get('/worker.jpeg', function(req, res) {
    res.render('public/images/worker.jpeg');
});

//font
app.get('/fontawesome-webfont.ttf', function(req, res) {
    res.render('public/fonts/fontawesome-webfont.ttf');
});

app.get('/fontawesome-webfont.woff', function(req, res) {
    res.render('public/fonts/fontawesome-webfont.woff');
});

app.get('/fontawesome-webfont.woff2', function(req, res) {
    res.render('public/fonts/fontawesome-webfont.woff2');
});

//css
app.get('/bootstrap.css', function(req, res) {
    res.render('public/css/bootstrap.css');
});

app.get('/font-awesome.min.css', function(req, res) {
    res.render('public/css/font-awesome.min.css');
});

app.get('/login_style.css', function(req, res) {
    res.render('public/css/login_style.css');
});

app.get('/responsive.css', function(req, res) {
    res.render('public/css/responsive.css');
});

app.get('/style.css', function(req, res) {
    res.render('public/css/style.css');
});

app.get('/style.css.map', function(req, res) {
    res.render('public/css/style.css.map');
});

app.get('/style.scss', function(req, res) {
    res.render('public/css/style.scss');
});

//js
app.get('/bootstrap.js', function(req, res) {
    res.render('public/js/bootstrap.js');
});

app.get('/custom.js', function(req, res) {
    res.render('public/js/custom.js');
});

app.get('/jquery-3.4.1.min.js', function(req, res) {
    res.render('public/js/jquery-3.4.1.min.js');
});


//Login
app.post('/auth', async function(req, res) {
    email = req.body.email
    passwd = req.body.passwd
    data = { 'email': email, 'passwd': passwd }
    try {
        await client.connect();
        const database = client.db("Jd_project");
        const db = database.collection("Jd_project");
        try{
            doc = await db.findOne(data)
            if(doc == null){
                
                res.send({'status': 'invalid username or password.'})
            } else{
                res.send({'status': '102'})
                
            }
        }catch(e){console.log(e)}
      } catch(e){console.log(e)}

});

//register
app.post('/auth_new', async function(req, res) {
    email = req.body.email
    passwd = req.body.passwd
    data = { 'email': email, 'passwd': passwd }

    try {
        await client.connect();
        const database = client.db("Jd_project");
        const db = database.collection("Jd_project");
        try{
            doc = await db.findOne(data)
            if(doc == null){
                await db.insertOne(data)
                res.send({'status': 'new user registered sucessfully.'})
            } else{
                res.send({'status': 'user exist'})
            }
        }
        catch(e){console.log(e)}
      } catch(e){
        console.log('2'+ e)
      }


});

app.listen(8080, '127.0.0.1')