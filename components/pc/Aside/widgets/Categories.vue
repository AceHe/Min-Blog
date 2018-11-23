<template>
    <Card class="widget-categories">
        <div class="title" slot="header">
            <i class="icon icon-category"></i>
            分类
        </div>
        <div class="category-list" v-if="categoryList.length">
            <nuxt-link :to="`/category/${item.name}`" class="category" v-for="item in categoryList" :key="item._id">
                <i class="icon" :class="['icon-' + item.icon]"></i>
                <span class="name">{{ item.name }}</span>
                <span class="count">共 {{ item.count }} 篇文章</span>
            </nuxt-link>
        </div>
        <p class="no-data" v-else>暂无标签</p>
    </Card>
</template>

<script>
    import Card from '@/components/common/Card'

    import { mapGetter } from 'vuex'

    export default {
        name: 'Categories',
        components: {
            Card
        },
        computed: {
            categoryList () { 
                return this.$store.getters['article/category']
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .widget-categories {
        .category-list {
            .category {
                flexLayout(, flex-start)
                margin 4px -4px
                padding $padding-xs
                cursor pointer

                &:last-child {
                    margin-bottom 0
                }

                .name {
                    flex 1 0
                    margin-left $padding-sm
                }

                .count {
                    font-size $font-size-sm
                    color var(--text-color-secondary)
                }

                &:hover {
                    background-color var(--button-color-hover)
                    border-radius 4px
                }
            }
        }
    }
</style>
