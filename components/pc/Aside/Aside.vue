<template>
    <div class="aside">
        <transition name="fade" mode="out-in">
            <Hots></Hots>
        </transition>
        <Affix offset-top="76">
            <transition name="fade" mode="out-in">
                <Categories v-if="['archive', 'article-id', 'category-name', 'tag-name'].includes($route.name)"></Categories>
            </transition>
            <Tags></Tags>
        </Affix>
    </div>
</template>

<script>
    import Hots from './widgets/Hots'
    import Tags from './widgets/Tags'
    import Categories from './widgets/Categories'
    import Affix from '@/components/common/Affix'

    export default {
        name: 'Aside',
        components: {
            Hots,
            Categories,
            Tags,
            Affix
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .aside {

    }
</style>
