<template>
    <section class="tag-page">
        <Card>
            <div slot="header" class="info-header">
                <i class="icon" :class="[`icon-${tag.icon || 'tag'}`]"></i>
                <div class="search">与
                    <span class="keyword">{{ tag.name }}</span>
                    标签有关的文章
                </div>
                <div class="count">
                    共搜索到
                    <em class="num">{{ tag.count }}</em>
                    篇文章
                </div>
            </div>
            <div class="list-content">
                <ArticleList></ArticleList>
            </div>
        </Card>
    </section>
</template>

<script>
    import Card  from '@/components/common/Card'
    import Base from '@/Base'
    import ArticleList from '@/components/common/ArticleList'

    export default {
        name: 'Tag',
        components: {
            Card,
            ArticleList
        },
        extends: Base,
        validate ({ params }) {
            return !!params.name
        },
        head () {
            return {
                title: `${this.$route.params.name} | Tag`
            }
        },
        computed: {
            tag () { 
                let tagList = this.$store.getters['article/tag'];
                let obj = {};
                for( let item of tagList ){
                    if( item.name === this.$route.params.name ){
                        obj = item;
                    }
                }
                return obj
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .tag-page {
        width 100%
    }
</style>

