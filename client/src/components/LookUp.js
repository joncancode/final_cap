import React from 'react';

export default class LookUp extends React.Component {
    constructor() {
        super();
        this.state = { items: [] };
    }

    componentDidMount() {
        let query = 099923418528;
        
        fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc={query}}`)

        .then(result=>result.json())
        .then(items=>this.setState({items}))
    }

    render() {        
        return(
            <ul>
                {this.state.items.map(item=><li key={item.id}>{item.body}</li>)}
            </ul>
        );
    }
}

/*

// http://www.upcitemdb.com/api/explorer#!/lookup/get_trial_lookup

const https = require('https')
var opts = {
  hostname: 'api.upcitemdb.com',
  path: '/prod/v1/lookup',
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "user_key": "only_for_dev_or_pro",
    "key_type": "3scale"
  }
}
var req = https.request(opts, function(res) {
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);
  res.on('data', function(d) {
    console.log('BODY: ' + d);
  })
})
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
})
req.write('{ "upc": "4002293401102" }')
// other requests
req.end()

*/