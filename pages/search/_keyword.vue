<template>
    <section class="search-page">
        <Card>
            <div slot="header" class="info-header">
                <i class="icon icon-search"></i>
                <div class="search">与
                    <span class="keyword">{{ $route.params.keyword }}</span>
                    关键词有关的文章
                </div>
                <div class="count">
                    共搜索到
                    <em class="num">{{ total }}</em>
                    篇文章
                </div>
            </div>
            <div class="list-content">
                <ArticleList :keyword="$route.params.keyword" v-model="total"></ArticleList>
            </div>
        </Card>
    </section>
</template>

<script>
    import Card  from '@/components/common/Card'
    import ArticleList from '@/components/common/ArticleList'

    export default {
        name: 'Search',
        components: {
            Card,
            ArticleList
        },
        validate ({ params }) {
            return !!params.keyword
        },
        head () {
            return {
                title: `${this.$route.params.keyword} | Search`
            }
        },
        data() {
            return {
                total: 0
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .search-page {
        width 100%
    }
</style>

