<template>
    <div id="app">
        <div
                id="top_by_market_cap"
                class="coin_wrap"
        >
            <coin-info
                    v-for="(coin, i) in topCoins"
                    :key="i"
                    :coin="coin"
            ></coin-info>
        </div>
        <div
                id="coins"
                class="coin_wrap"
        >
            <coin-info
                    v-for="(coin, i) in otherCoins"
                    :key="i"
                    :coin="coin"
            ></coin-info>
            <span
                    class="btn_load"
                    @click="loadContent()"
            >
                Загрузить
            </span>
        </div>
    </div>
</template>

<script>
    import coinInfo from './components/CoinInfo'

    export default {
        name: 'app',
        components: {
            coinInfo,
        },
        computed: {
            topCoins () {
                return this.$store.getters.topCapByPrice
            },
            otherCoins () {
                return this.$store.getters.mainCapList
            }
        },
        methods: {
            loadContent () {
                this.$store.dispatch('incPages');
                this.$store.dispatch('fetchList');
            }
        }
    }
</script>

<style lang="sass" >
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,400,700&display=swap')

    body, html
        margin: 0
        padding: 0

    div#app
        font-family: 'Roboto', sans-serif
        margin-bottom: 2em

    div#top_by_market_cap
        background-color: lightgray
        border-bottom: 1px solid darkgray

    div.coin_wrap
        display: flex
        flex-direction: column
        align-items: center
        & > div
            margin-bottom: 1.5em
            &:first-child
                margin-top: 1.5em
        span.btn_load
            display: block
            padding: 1em
            border-radius: 5px
            text-transform: uppercase
            background-color: lightgray
            box-shadow: 1px 3px 3px rgba(16, 16, 16, 0.5)
            cursor: pointer
            &:hover
                background-color: darkgray
            &:active
                background-color: grey
</style>
