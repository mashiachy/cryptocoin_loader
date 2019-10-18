import 'axios'

const apiKey = '037f04c4741c899742e4520afdbf6416cb26818671b9d756cc0890af9bbc8860';
const axios = require('axios').default;

function genUrl (payload) {
    const baseUrl = 'https://min-api.cryptocompare.com/data';
    return baseUrl + payload;
}

export default {
    getToplistByMarketCup (limit=10, page=0, tsym='USD', ascending=true, sign=false) {
        return axios.get(genUrl('/top/mktcapfull'), {
            params: {
                limit,
                page,
                tsym,
                ascending,
                sign,
                api_key: apiKey,
                myId: new Date().getTime()
            },
            cache: false
        })
    },
}