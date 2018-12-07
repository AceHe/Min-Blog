<template>
    <div class="read-tool">
        <div class="tool-meta">
            <a class="tool-item like"
                :class="{ liked, 'liking': liked }"
                style="-webkit-background-clip: text;"
                :title="liked ? '已点赞' : ''"
                :data-count="article.meta.ups"
                @click="like">
                <div class="background"></div>
                    <i class="icon icon-thumb-up-fill" v-if="liked"></i>
                    <i class="icon icon-thumb-up" v-else></i>
                <span class="count" v-if="article.meta.ups">{{ article.meta.ups }}</span>
            </a>
            <a class="tool-item comment"
                v-if="!mobileLayout"
                :data-count="article.meta.comments"
                title="文章评论"
                @click="gotoComment">
                <i class="icon icon-comment"></i>
                <span class="count" v-if="article.meta.comments">{{ article.meta.comments }}</span>
            </a>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ReadTool',
        props:['article', 'liked'],
        data(){
            return{

            }
        },
        computed: {
            mobileLayout(){
                return this.$store.getters['app/mobileLayout']
            }
        },
        created(){

        },
        methods: {
            async like () {
                if( this.liked ) {
                    return this.$notify({
                        group: 'auth',
                        type: 'warn',
                        text: '您已点过赞了！'
                    });
                };

                let data = {
                    uuid: this.article.uuid,
                    ups: this.article.meta.ups
                }
                const res = await this.$store.dispatch('history/setArticleLike', data);
                if( res.code == 0 ){
                    this.isLiked = true;
                    this.$emit( 'on-like', this.article.uuid);
                }
            },

            gotoComment() {
                
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    $tool-width = 36px

    .read-tool {
        flexLayout(column, flex-start)

        .tool-meta
        .tool-action {
            flex 1 0
            width 100%

            .tool-item {
                position relative
                display block
                width 100%
                height $tool-width
                line-height @height
                text-align center
            }
        }

        .tool-meta {
            margin-bottom $padding-xs
            padding-bottom $padding-xs
            border-bottom 1px dashed var(--border-color-dark)

            .tool-item {
                .count {
                    content attr(data-count)
                    position absolute
                    top -2px
                    left 20px
                    line-height 1
                    padding 2px 4px
                    font-size $font-size-sm
                    background var(--primary-color-light)
                    color var(--light-color)
                    font-style italic
                    border-radius 8px
                    transition()
                }
            }

            .like {
                .background {
                    position absolute
                    top -50px + ($tool-width / 2)
                    left @top
                    width 100px
                    height @width
                    background url(https://static.jooger.me/img/common/like.png) no-repeat
                    background-position 0 0
                    pointer-events none
                    overflow hidden
                    z-index 999
                }

                &.liked {
                    background linear-gradient(135deg, #FAD7A1 0%, #E80505 100%)

                    .background {
                        animation fave-like 1s steps(28)
                        background-position -2800px 0
                    }

                    .icon {
                        -webkit-text-fill-color transparent
                        text-shadow 0 2px 20px rgba(#E80505, .4)
                    }

                    .count {
                        background linear-gradient(135deg, #FAD7A1 0%, #E80505 100%)
                        box-shadow 0 10px 20px -12px #E80505
                    }
                }
            }
        }

        .app.mobile-layout & {
            justify-content center
            margin-bottom $padding-md

            .tool-meta
            .tool-action {
                flex 0 0 100%
                width 100%
                text-align center
            }

            .tool-meta {
                margin $padding-lg 0
                border-bottom none

                .like {
                    width 36px
                    margin 0 auto

                    .icon {
                        font-size 24px
                    }
                }
            }

            .share-list {
                flexLayout()
                margin 0 (0 - $padding-xs)

                .share-item {
                    flex 1 0
                    margin 0 $padding-xs
                    padding 4px
                    background-color var(--button-color)

                    &:hover {
                        background-color var(--button-color-hover)
                    }
                }
            }
        }
    }

    .pop-list {
        flexLayout()

        .pop-item {
            flex 1 0
            width $tool-width
            text-align center
            transition()

            &:first-child {
                border-top-left-radius 4px
                border-bottom-left-radius 4px
            }

            &:last-child {
                border-top-right-radius 4px
                border-bottom-right-radius 4px
            }

            &:hover {
                background-color var(--button-color-hover)
            }
        }
    }

    @keyframes fave-like {
        0% {
            background-position 0 0
        }
        100% {
            background-position -2800px 0
        }
    }
</style>
