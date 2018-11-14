<template>
    <div class="aside">
        <transition name="fade" mode="out-in">
            <Hots></Hots>
        </transition>
        <transition name="fade" mode="out-in">
            <Categories v-if="['archive', 'article-id', 'category-name', 'tag-name'].includes($route.name)"></Categories>
        </transition>
        <Tags></Tags>
    </div>
</template>

<script>
    import Hots from './widgets/Hots'
    import Tags from './widgets/Tags'
    import Categories from './widgets/Categories'

    export default {
        name: 'Aside',
        components: {
            Hots,
            Categories,
            Tags
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .aside {

    }
</style>
