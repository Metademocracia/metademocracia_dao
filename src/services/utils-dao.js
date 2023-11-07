import graphQl from '@/services/graphQl';
import walletP2p from '@/services/wallet-p2p';


async function isMember() {
  let result = false;
  const account = walletP2p.getAccount();

  if(account.address) {
    const query = `query Proposals($owner: String) {
      nfts(where: {owner_id: $owner}) {
        owner_id
        serie_id
        is_visible
        id
        fecha
      }
    }`;

    const variables = { owner: account.address };
    
    const resp = await graphQl.getQuery(query, variables);

    if(resp) {
      result = resp.data.data.nfts.length > 0 ? true : false;
    }
  }

  return result
}


export default {
  isMember
}
