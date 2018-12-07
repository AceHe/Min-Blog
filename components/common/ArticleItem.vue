<template>
    <article class="article-item" :class="{ 'no-desc': !article.description }" :title="article.title">

        <nuxt-link class="article-link" :to="`/article/${article.uuid}`">
            <h3 class="title" v-html="title">{{ article.title }}</h3>
            <div class="summary">
                <div class="thumb" v-if="article.thumb">
                    <img v-lazy="article.thumb" alt="">
                </div>
                <p class="description">{{ article.description }}</p>
            </div>
        </nuxt-link>

        <div class="status">
            <div class="meta" v-if="!mobileLayout">
                <div class="meta-item category">
                    <i class="icon" v-if="article.category.name" :class="[`icon-${article.category.icon}`]"></i>
                    {{ article.category.name ? article.category.name : '暂未分类' }}
                </div>
                <template>
                    <div class="meta-item pvs">
                        {{ article.meta.pvs }} 次阅读
                    </div>
                    <div class="meta-item ups">
                        {{ article.meta.ups }} 人喜欢
                    </div>
                    <div class="meta-item comments">
                        {{ article.meta.comments }} 条评论
                    </div>
                </template>
            </div>
            <div class="meta" v-else>
                <div class="meta-item pvs">
                    <i class="icon icon-eye"></i>
                    {{ article.meta.pvs }}
                </div>
                <div class="meta-item ups">
                    <i class="icon icon-thumb-up-fill"></i>
                    {{ article.meta.ups }}
                </div>
                <div class="meta-item comments">
                    <i class="icon icon-comment"></i>
                    {{ article.meta.comments }}
                </div>
            </div>

            <time class="time" :datatitme="article.createdAt">
                <i class="icon icon-time" v-if="!mobileLayout"></i>
                {{ article.createdAt | dateFormat }}
            </time>
            <div class="source" :class="[getConstantItem(article.source)]">{{ article.source | constantFilter }}</div>
        </div>
    </article>
</template>

<script>
    import { parseTime, constantFilter } from '@/utils/filters'

    export default {
        name: 'ArticleItem',
        props: ['article', 'mini', 'keyword'],
        data(){
            return{
                title: ''
            }
        },
        computed: {
            mobileLayout(){
                return this.$store.getters['app/mobileLayout']
            }
        },
        filters: {
            dateFormat(value) {
                if (!value) return ''
                return parseTime(value, '{y}-{m}-{d}')
            },
            constantFilter(value) {
                if (!value) return ''
                return constantFilter(value)
            },
        },
        created(){
            this.title = this.getTitle();
        },
        methods: {
            getTitle () {
                if (this.keyword) {
                    return this.article.title.replace(new RegExp(this.keyword, 'g'), `<span class="keyword">${this.keyword}</span>`)
                }
                return this.article.title
            },
            getConstantItem(source){
                if( source == 1 ) return 'translate';
                if( source == 2 ) return 'reprint';
                if( source == 3 ) return 'original';
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .article-item {
        position relative
        margin-bottom $padding-md
        padding-bottom $padding-md
        border-bottom 1px dashed var(--border-color)

        .article-link {
            display block
            overflow hidden

            .title {
                margin-bottom $padding-md
                transition(,, $ease)
            }

            .summary {
                flexLayout(, flex-start, flex-start)
                margin-bottom $padding-md

                .thumb {
                    flex 0 0 150px
                    position relative
                    width 150px
                    max-height 90px
                    margin-right 16px
                    overflow hidden
                    border 4px solid var(--border-color)

                    img {
                        width 100%
                        height auto
                        min-width 0
                        min-height 0
                        border-radius 2px
                        object-fit cover
                        transition(transform, ,$ease-out)

                        &:hover {
                            transform scale(1.1) rotate(2deg)
                        }
                    }
                }

                .description {
                    flex 1 0
                    margin 0
                    text-align justify
                    overflow hidden
                    color var(--text-color-secondary)
                    lineLimit(4)
                }
            }

            &:hover {
                .title {
                    color var(--heading-color)
                    text-decoration underline
                    transform translateX(5px)
                }
            }
        }

        .status {
            flexLayout(, flex-start,,wrap)
            font-size $font-size-sm
            color var(--text-color-secondary)

            .meta {
                flex 1 0
                flexLayout(, flex-start)

                &-item {
                    flexLayout(, flex-start)
                    position relative
                    margin-right 12px

                    .icon {
                      margin-right $padding-xs
                      font-size $font-size-sm
                      color var(--text-color-secondary)
                    }
                }

                .category {
                    .icon {
                        margin-right $padding-xs
                        font-size $font-size-sm
                    }
                }
            }

            .time {
                .icon {
                    font-size $font-size-sm
                }
            }

            .source {
                margin-left $padding-sm
                width 36px
                height 20px
                line-height @height
                text-align center
                border-radius 2px
                opacity .5
                transition(opacity)

                &:hover {
                  opacity 1
                }
            }
        }
    }
</style>