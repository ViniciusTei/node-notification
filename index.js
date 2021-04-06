const express = require('express');
const webpush = require('web-push');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//Indentify who is sending the notification
const vapidKey = {
    subject: "mailto: <viniteixeirapa@gmail.com>",
    publicKey: "BFUBZGQrk_hUUPhteP_R3XT42pZ4mIFoFuJTDLghuspGkqy5lU-5S2PbUACMPqBdiCO2auNGYHEOK0Ihiw89bOc",
    privateKey: "30-d25b7uKuvhGYZdz58JwAl1ExEeGzwCvupR32kwhk"
}


webpush.setVapidDetails(vapidKey.subject, vapidKey.publicKey, vapidKey.privateKey);

// Subscribe route
// respponsible to send the notification to the web
app.post('/notification', (req, res) => {
    const subscription = req.body;

    //send 201 - resource create
    res.status(201).json({});

    webpush.generateRequestDetails


    // create a payload
    const notification = {
        title: 'iPetis brasil',
        body: "Notified by iPetis Brasil!",
        icon: "./maskable_icon.png",
        actions: [
            {action:"like", title: "Like"},
            {action:"reply", title: "⤻ Reply"}
        ]
  
    }
    const payload = JSON.stringify(notification);

    // pass object into sendNotification
    webpush.sendNotification(subscription, payload)
        .catch(err => console.log(err));

})

const port = 5000;

app.listen(port, () => console.log(`Server started at port: ${port}`))