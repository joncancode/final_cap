const path = require('path');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');

mongoose.connect(keys.MONGO_URI);

const database = {
};

app.use(passport.initialize());
app.use(passport.session())

require("./Routes/authRoutes")(app);

//======================================================================//
// WE ONLY HAVE 100 QUERIES SO KEEP COMMENTED UNLESS NEEDED
//======================================================================//

// const https = require('https')
// var opts = {
//   hostname: 'api.upcitemdb.com',
//   path: '/prod/trial/search',
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "key_type": "3scale"
//   }
// }


// var req = https.request(opts, function(res) {
//   console.log('statusCode: ', res.statusCode);
//   console.log('headers: ', res.headers);
//   res.on('data', function(d) {
//   })
// })
// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// })


//  req.write('{ "s": "socks" }')
// // other requests
// req.end()

// let query;
// const upcURL = `http://www.upcitemdb.com/query?s=${query}&type=2`

// app.post('/api/search/', (req, res) => {
//     const query = req.body.query;
//     const apiURL = `http://www.upcitemdb.com/query?s=${query}&type=2`
//     return fetch(apiURL, {
//       'Content-Type': 'application/json'
//     })
//       .then(results => {
//         console.log('results', results.body);
//         return results.json();
//       })
//       .then(resJson => {
//         //console.log(resJson)

//         return res.status(200).send(resJson);
//       })
//       .catch(err => {
//         console.log({err});
//         res.status(500).json({ message: 'Internal error' });
//       });
//   });

// // let query;
// // const upcURL = `http://www.upcitemdb.com/query?s=${query}&type=2`

//  req.write('{ "s": "socks" }')
// // other requests
// req.end()



//======================================================================//

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        console.log('now running on port 3001')
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
