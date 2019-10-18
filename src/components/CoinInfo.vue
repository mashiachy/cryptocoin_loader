<template>
    <div class="coin_item">
        <img
                class="item_image"
                :src="coin.imageSrc"
                :alt="'image of ' + coin.Name"
        >
        <h2
                class="item_name"
        >
            {{coin.nameCoin}}
        </h2>
        <span
                class="item_price"
        >
            {{coin.getPrice()}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "CoinInfo",
        props: [
            'coin'
        ]
    }
</script>

<style scoped lang="sass">
    div.coin_item
        display: flex
        align-items: center
        background-color: white
        width: 640px
        padding: 1em
        max-height: 360px
        border-radius: 5px
        box-shadow: 1px 3px 3px rgba(16, 16, 16, 0.5)
        img.item_image
            height: 80px
            margin-left: 1em
            margin-right: 1em
        span.item_price
            font-size: 2em
            font-weight: 100
            margin-left: auto
</style>