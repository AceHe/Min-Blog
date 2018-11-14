<template>
    <section class="article-page">

        <div class="article-widget">
            <Card class="article-detail">
                <article class="article" v-if="article">
                    <span class="source original">{{ article.source | constantFilter }}</span>
                    <h2 class="title">{{ article.title }}</h2>
                    <div class="meta">
                        <nuxt-link :to="`/category/${article.category.name}`" class="meta-item category">
                            <i class="icon" v-if="article.category" :class="[`icon-${article.category.icon || 'tag'}`]"></i>
                            {{ article.category ? article.category.name : '暂未分类' }}
                        </nuxt-link>
                        <div class="meta-item comments">
                            {{ article.meta.comments }} 条评论
                        </div>
                        <div class="meta-item ups">
                            {{ article.meta.ups }} 人喜欢
                        </div>
                        <div class="meta-item pvs">
                            {{ article.meta.pvs }} 次阅读
                        </div>
                    </div>

                    <div class="thumb" v-if="article.thumb">
                        <img :src="article.thumb" alt="">
                    </div>

                    <div class="content markdown-body"
                        :style="{ fontSize: articleFontSize + 'px' }"
                        v-html="article.renderedContent"></div>

                    <div class="article-info">
                        <div class="from" v-if="[1, 3].includes(article.source) && article.from">
                            原文链接：
                            <a :href="article.from" target="_blank">{{ article.from }}</a>
                        </div>
                        <div class="created-at">
                            发布时间：{{ article.createdAt | dateFormat }}
                        </div>
                        <div class="updated-at">
                            更新时间：{{ article.updatedAt | dateFormat }}
                        </div>
                        <div class="copyright">
                            版权声明：自由转载-署名-非商业性使用<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh" target="_blank"
                                rel="external nofollow noopenter">CC BY-NC 3.0 CN</a>
                        </div>
                    </div>

                    <div class="tags">
                        <Tag v-for="tag in article.tag"
                            :key="tag._id"
                            :name="tag.name"
                            :icon="tag.icon || 'tag'"
                            :link="true">
                        </Tag>
                    </div>

                </article>
            </Card>

            <!-- <Comment class="article-comments" :article="article"></Comment> -->
        </div>
    </section>
</template>

<script>
    import Card  from '@/components/common/Card'
    import Tag from '@/components/common/Tag'

    import { dateFormat, constantFilter } from '@/utils/filters'

    export default {
        name: 'ArticleDetail',
        components: {
            Card,
            Tag
        },
        filters: {
            dateFormat(value) {
                if (!value) return ''
                return dateFormat(value)
            },
            constantFilter(value) {
                if (!value) return ''
                return constantFilter(value)
            },
        },
        data(){
            return {
                article: {},
                articleFontSize: 16
            }
        },
        head () {
            const data = this.article || {};
            return {
                title: data.title || 'Article Not Found',
                meta: [{ 
                    hid: 'keywords', 
                    name: 'keywords', 
                    content: data.keywords ? data.keywords.join(',') : data.title 
                },{ 
                    hid: 'description', 
                    name: 'description', 
                    content: data.description || data.title 
                }]
            }
        },
        created(){
            this.article = {
                source: 1,
                title: '标题碧桃i他',
                name: 'ace',
                category: {
                    name: '戎马一生',
                    icon: 'code'
                },
                meta: {
                    comments: 10,
                    ups: 6,
                    pvs: 32
                },
                renderedContent: '<p>Hello World</p>',
                thumb: 'https://static.jooger.me/img/source/20180927/nuxt2.0.png?x-oss-process=style/banner',
                from: 'www.baidu.com',
                createdAt: '2018',
                updatedAt: '2018',
                tag: [{
                    _id: 0,
                    name: 'Vue',
                    icon: ''
                },{
                    _id: 1,
                    name: 'Js',
                    icon: 'js'
                }]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    $action-widget-width = 36px

    .article-page {
        position relative
        width 100%

        .action-widget {
            position absolute
            top 0
            left -($action-widget-width + $padding-md)
            width $action-widget-width
            margin-right $padding-md
            z-index 999
        }

        .article-widget {
            width 100%
        }

        .article-detail {
            padding $padding-md
            overflow hidden

            .source {
                position absolute
                top -8px
                left -28px
                display block
                width 80px
                height 42px
                line-height 58px
                transform rotateZ(-45deg)
                text-align center
                font-size $font-size-sm
            }

            .title {
                margin $padding-md 0
                font-size $font-size-lger + 2px
                text-align center
            }

            .meta {
                flexLayout(, center)
                margin $padding-sm 0 $padding-md
                color var(--text-color-secondary)
                font-size $font-size-sm

                .category {
                    .icon {
                        margin-right $padding-xs
                    }
                }

                &-item {
                    flexLayout(, flex-start)
                    position relative
                    margin-right $padding-sm

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

            .thumb {
                img {
                    width 100%
                    margin-bottom $padding-md
                    border 6px solid var(--border-color)
                }
            }

            .tags {
                margin-top $padding-md
                padding-top $padding-md
                border-top 1px dashed var(--border-color)
                text-align center
            }

            .like {
                flexLayout()
            }

            .article-info {
                margin-top $padding-xs
                padding $padding-xs
                line-height 2
                background-color var(--body-color)
                border-left 4px solid var(--primary-color-light)
                font-weight 300

                a {
                    text-decoration underline
                }
            }
        }

        .article-related {
            overflow: hidden;

            .related-list.swiper {
                overflow hidden

                .swiper-wrapper {
                    height 120px
                    overflow hidden

                    .swiper-slide.related-item {
                        display inline-block
                        width 250px
                        height 100%
                        border 8px solid var(--border-color)
                        text-align center

                        .item-box {
                            position relative
                            display block
                            width auto
                            height 100%
                            overflow hidden
                        }

                        .thumb {
                            width 100%
                            height 100%
                            background-size cover
                            background-position center
                            transition()
                        }

                        .mask {
                            full()
                            background-color var(--overlay-color)
                            transition()
                        }

                        .title
                        time {
                            position absolute
                            left 50%
                            width 100%
                            padding 0 $padding-xs
                            transform translateX(-50%)
                            font-weight 400
                            color var(--light-color)
                        }

                        .title {
                            top $padding-sm
                        }

                        time {
                            bottom $padding-sm
                            font-size $font-size-sm
                        }

                        &:hover {
                            .thumb {
                                transform scale(1.2)
                            }

                            .mask {
                                background-color var(--overlay-color-dark)
                            }
                        }
                    }
                }
            }
        }

        .app.mobile-layout & {

            .article-related {
                .swiper-wrapper {
                    height 100px

                    .swiper-slide.related-item {
                        width 180px !important
                    }
                }
            }
        }
    }
</style>
