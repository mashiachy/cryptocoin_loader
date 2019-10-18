import ccAPI from '@/cryptoCompareAPI'

class CoinInfo {
    constructor (nameCoin, imageSrc, symbolCoin, price, symbolPrice) {
        this.nameCoin = nameCoin;
        this.imageSrc = 'https://www.cryptocompare.com/' + imageSrc;
        this.symbolCoin = symbolCoin;
        this.price = price;
        this.symbolPrice = symbolPrice;
    }
    getPrice () {
        return this.symbolPrice + ' ' + this.price
    }
}

export default {
    state: {
        mainCap: [],
        pgs: 1,
        countInPg: 25,
        loadingMain: false,
        topCap: [],
        loadingTop: false
    },
    actions: {
        async fetchTop100 ({commit}) {
            try {
                commit('setLoadingTop', true);
                const resp = await ccAPI.getToplistByMarketCup(100, 0);
                commit('setTopCap', resp.data.Data);
                commit('setLoadingTop', false);
            } catch (error) {
                commit('setLoadingTop', false);
            }
        },
        async fetchList ({commit, state}) {
            try {
                commit('setLoadingMain', true);
                const list = [];
                const bI = 100 / state.countInPg;
                for (let i = 0; i < state.pgs; i++) {
                    let resp = await ccAPI.getToplistByMarketCup(state.countInPg, bI + i);
                    Array.prototype.push.apply(list, resp.data.Data)
                }
                commit('setMainCap', list);
                commit('setLoadingMain', false);
            } catch (error) {
                commit('setLoadingMain', false);
            }
        },
        incPages ({commit}) {
            commit('incPgs')
        }
    },
    mutations: {
        incPgs: state => state.pgs++,
        setLoadingMain: (state, payload) => state.loadingMain = payload,
        setLoadingTop: (state, payload) => state.loadingTop = payload,
        setTopCap: (state, payload) => {
            state.topCap.splice(0, state.topCap.length);
            payload.forEach(loadCoin => {
                state.topCap.push(new CoinInfo(
                    loadCoin.CoinInfo.Name,
                    loadCoin.CoinInfo.ImageUrl,
                    loadCoin.DISPLAY.USD.FROMSYMBOL,
                    loadCoin.RAW.USD.PRICE,
                    loadCoin.DISPLAY.USD.TOSYMBOL
                ))
            });
        },
        setMainCap: (state, payload) => {
            state.mainCap.splice(0, state.mainCap.length);
            payload.forEach(loadCoin => {
                state.mainCap.push(new CoinInfo(
                    loadCoin.CoinInfo.Name,
                    loadCoin.CoinInfo.ImageUrl,
                    loadCoin.DISPLAY.USD.FROMSYMBOL,
                    loadCoin.RAW.USD.PRICE,
                    loadCoin.DISPLAY.USD.TOSYMBOL
                ))
            });
        }
    },
    getters: {
        topCapByPrice: state => state.topCap.sort((a, b) => b.price - a.price),
        mainCapList: state => state.mainCap,
        getLoadingTop: state => state.loadingTop,
        getLoadingMain: state => state.loadingMain,
    }
}