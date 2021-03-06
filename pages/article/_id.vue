<template>
    <section class="article-page">
        <div class="action-widget" v-if="!mobileLayout">
            <Affix offset-top="76">
                <ReadTool
                    v-if="article"
                    :article="article"
                    :liked="liked"
                    :liking="articleLiking"
                    @on-like="like"></ReadTool>
            </Affix>
        </div>
        <div class="article-widget">
            <Card class="article-detail">
                <article class="article" v-if="article">
                    <span v-if="!mobileLayout" class="source" :class="[getConstantItem(article.source)]">{{ article.source | constantFilter }}</span>
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

                    <div class="thumb" v-if="article.thumb && !mobileLayout">
                        <img v-lazy="article.thumb" alt="">
                    </div>

                    <div class="content markdown-body"
                        v-copyright
                        :style="{ fontSize: articleFontSize + 'px' }"
                        v-html="article.renderedContent"></div>

                    <div class="article-info">
                        <div class="from" v-if="[2, 3].includes(article.source) && article.from">
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

                    <div class="tags" v-if="article">
                        <Tag v-for="tag in article.tag"
                            :key="tag.uuid"
                            :name="tag.name"
                            :icon="tag.icon || 'tag'"
                            :link="true">
                        </Tag>
                    </div>

                    <div class="action" v-if="mobileLayout">
                        <ReadTool
                            v-if="article"
                            :article="article"
                            :liked="liked"
                            :liking="articleLiking"
                            @on-like="like">
                        </ReadTool>
                    </div>

                </article>
            </Card>

            <Comment 
                v-if="article"
                class="article-comments" 
                ref="comment"
                :article="article"
                @on-comment="handleComment"></Comment>
        </div>
    </section>
</template>

<script>
    import Card  from '@/components/common/Card'
    import Tag from '@/components/common/Tag'
    import Affix from '@/components/common/Affix'
    import ReadTool from '@/components/common/ReadTool'
    import Comment from '@/components/common/Comments/Comment'
    import Base from '@/Base'

    import Bus from '@/utils/bus'
    import { sourceTranslate } from '@/utils/publicMethods'
    import { getScroll } from '@/utils/dom'

    import { getArticleContent, addArticleComment } from '@/api/index'

    export default {
        name: 'ArticleDetail',
        components: {
            Card,
            Tag,
            Affix,
            ReadTool,
            Comment
        },
        extends: Base,
        async asyncData({ params }) {
            const { data } = await getArticleContent( { uuid: params.id } )
            return { article: data.data }
        },
        validate ({ params }) {
            return !!params.id
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
        computed: {
            // 是否展示标题
            showArticleTitle () { 
                return this.$store.getters['app/showArticleTitle']
            },
            // 判断是否已点赞文章
            liked () {
                const res = this.$store.getters['history/articleLike'];
                return !!res.find(item => item === this.article.uuid)
            }
        },
        data(){
            return {
                article: {},

                articleLiking: false,
                articleFontSize: 16,

                scrollTop: 0
            }
        },
        created(){
            this.init();
        }, 
        mounted (){
            window.addEventListener('scroll', this.handleScroll);

            Bus.$on('getComment',()=>{
                this.handleGetArticle(false);
            });
        },
        beforeDestroy (){
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            // 设置头部标题\获取已点赞文章
            async init () {
                let title = this.article ? this.article.title : '';
                await this.$store.dispatch('app/setTitle', title);
                await this.$store.dispatch('history/getArticleLike');
            },

            // 点赞文章
            async like( uuid ) {
                this.article.meta.ups++
            },

            // 发表留言
            async handleComment(data, type) {
                if( type != 2 ) return;
                let info = data;
                info.uuid = this.article.uuid;
                const res = await addArticleComment(info);

                if( res.data.code == 0 ){
                    this.handleGetArticle(true)
                }
            },

            // 重新获取文章内容评论
            async handleGetArticle(reply){
                let data = { uuid: this.article.uuid };
                let res = await this.$store.dispatch('article/getArticle', data);

                if( res.code == 0 ){
                    this.article = res.data;
                    if(!reply) return;
                    this.$scrollToComments();
                    this.$refs.comment.handleEmpty();
                }
            },

            // 是否显示标题
            handleScroll(){
                const scrollTop = getScroll(document.body, true);

                if (scrollTop < 80) {
                    this.scrollTop = scrollTop
                    if (this.showArticleTitle) {
                        this.$store.commit('app/SET_ARTICLE_TITLE_VISIBLE', false)
                    }
                    return
                }

                if (scrollTop > this.scrollTop && !this.showArticleTitle) {
                    this.$store.commit('app/SET_ARTICLE_TITLE_VISIBLE', true)
                } else if (this.scrollTop > scrollTop  && this.showArticleTitle) {
                    this.$store.commit('app/SET_ARTICLE_TITLE_VISIBLE', false)
                }

                this.scrollTop = scrollTop
            },

            getConstantItem(source){
                return sourceTranslate(source)
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

