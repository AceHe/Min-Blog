<template>
    <Card class="widget-hots">
        <div class="title" slot="header">
            <i class="icon icon-article"></i>
            热门文章
        </div>
        <ul class="hot-list" v-if="hotList.length">
            <li class="hot-item"
                v-for="(item, index) in hotList"
                :key="item._id"
                :title="item.title">
            <span class="index">{{ index + 1 }}</span>
            <nuxt-link
                class="title"
                :to="`/article/${item._id}`"
                :title="item.title">{{ item.title }}</nuxt-link>
            </li>
        </ul>
        <p class="no-data" v-else>暂无热门文章</p>
    </Card>
</template>

<script>
    import Card from '@/components/common/Card'

    export default {
        name: 'Hots',
        components: {
            Card
        },
        data(){
            return{
                hotList: []
            }
        },
        created(){
            this.hotList = [{
                _id: 0,
                title: '撒地方阿斯蒂'
            },{
                _id: 1,
                title: '去微软为其阿斯蒂'
            },{
                _id: 2,
                title: '一题一题一沙发'
            }];
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .widget-hots {
        .hot-list {
            list-style none

            .hot-item {
                display flex
                position relative
                margin-bottom $padding-md

                &:last-child {
                    margin-bottom 0
                }

                .index {
                    flex 0 0 20px
                    display inline-block
                    width 20px
                    height @width
                    line-height @width
                    margin-right $padding-xs
                    background-color var(--border-color)
                    border-radius 4px
                    text-align center
                    font-size $font-size-sm
                    font-style italic
                }

                .title {
                    textOverflow()
                    transition()

                    &:hover {
                        text-decoration underline
                        transform translateX(5px)
                    }
                }

                .meta {
                    flexLayout(, flex-start)
                    font-size $font-size-sm
                    color var(--text-color-secondary)

                    &-item {
                        flexLayout(, flex-start)
                        position relative
                        margin-right 12px

                        &::before {
                            content ''
                            width 2px
                            height @width
                            margin-right 4px
                            border 1px solid var(--text-color-secondary)
                            border-radius 1px
                        }
                    }
                }
            }
        }
    }
</style>