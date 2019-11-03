const express = require('express');

app = express();
nodeMailer = require('nodemailer');
bodyParser = require('body-parser');
port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server is listening on PORT: ' + port);
});

// Call route for home page
app.get('/', (req,res) => {
    res.render('index');
});

// Call route for email
app.post('/send-email', (req,res) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '', //Email
            pass: '' //Password of mail
        }
    });


let mailOptions = {
    from: 'loukilihalim.lh@gmail.com',
    to: req.body.to, //Receiver Email
    subject: req.body.subject, //Subject Line
    body: req.body.body, //Plain text body
    html: req.body.body
};

transporter.sendMail(mailOptions, (error,info)=> {
    if (error) {
        return console.log(error);
    }
    console.log("Message send Successfully");
    res.render('index');
});
});