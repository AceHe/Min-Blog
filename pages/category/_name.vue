<template>
    <section class="category-page">
        <div class="info">
            <img class="background" :src="category.image" alt="">
            <div class="mask"></div>
            <div class="content">
                <i class="icon" :class="[`icon-${category.icon}`]"></i>
                <h3 class="name">{{ category.name }}</h3>
                <div class="count">
                    共搜索到
                    <em class="num">10</em>
                    篇文章
                </div>
            </div>
        </div>
        <Card>
            <ArticleList></ArticleList>
        </Card>
    </section>
</template>

<script>
    import Card  from '@/components/common/Card'
    import ArticleList from '@/components/common/ArticleList'

    export default {
        name: 'Category',
        components: {
            Card,
            ArticleList
        },
        data () {
            return {
                category: {}
            }
        },
        head () {
            return {
                title: `${this.$route.params.name} | Category`
            }
        },
        created(){
            this.category = {
                image: 'https://static.jooger.me/img/common/category/coding_1538902881058.png',
                icon: 'code',
                name: '戎码一生',
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .category-page {
        .info {
            height 150px
            position relative
            margin-bottom $padding-sm
            background-color var(--card-color)
            overflow hidden
            text-align center

            .background {
                width 100%
                height auto
                transition()
                filter blur(5px)
            }

            .mask {
                full()
                background-color var(--overlay-color)
                transition()
            }

            .content {
                position absolute
                top 50%
                left 50%
                color var(--light-color)
                transform translate(-50%, -50%)

                .icon {
                    font-size 42px
                    font-weight 400
                    color var(--light-color)
                }

                .name {
                    margin 8px 0 0
                }
            }

            &:hover {
                .background {
                    transform scale(1.1)
                }

                .mask {
                    background-color var(--overlay-color-dark)
                }
            }
        }

        .mobile-layout & {
            .info {
                margin-bottom 0
            }
        }
    }
</style>

