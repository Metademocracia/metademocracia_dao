const limit = 5;
const query = `query author($limit: Int!) {
    author(limit: $limit) {
        id
        name
    }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { limit },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));


function getTransaction(hash, account_id) {
  const account = account_id ? account_id : getAccount().address;
  const json = {
    "jsonrpc": "2.0",
    "id": "dontcare",
    "method": "tx",
    "params": [hash, account]
  }

  return axios.post(_routeRpc,
    json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
}
