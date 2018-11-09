<template>
    <Card class="message-item" :class="{ 'identified': user && message.author._id === user._id }">
        <no-ssr>
            <transition name="fade">
                <span class="tag" v-if="user && message.author._id === user._id">我</span>
            </transition>
        </no-ssr>
        <a class="user" :href="message.author.site || 'javascript:;'" target="_blank">
            <img :src="message.author.avatar" :alt="message.author.name" class="avatar">
            <span class="name">{{ message.author.name }}</span>
        </a>
        <div class="content markdown-body" style="font-size: 14px;" v-html="message.renderedContent"></div>
        <div class="meta">
            <a class="like"
                :class="{ 'liked': isLiked, liking }"
                style="-webkit-background-clip: text;"
                :title="isLiked ? '已点赞' : ''"
                @click="like(message)">
                <i class="icon icon-like-fill"></i>
                <span class="count" v-if="message.ups">{{ message.ups | countFilter }}</span>
            </a>
            <time class="time" :datatitme="message.createdAt">
                {{ message.createdAt | dateFormat }}
            </time>
        </div>
    </Card>
</template>

<script>
    import Card from '@/components/common/Card'
    import { dateFormat, countFilter } from '@/utils/filters'

    export default {
        name: 'MessageItem',
        props: ['message'],
        components: {
            Card
        },
        data(){
            return {
                user: {
                    _id: 1
                },
                isLiked: false,
                liking: false,
            }
        },
        filters: {
            dateFormat: function (value) {
                if (!value) return ''
                return dateFormat(value)
            },
            countFilter: function (value) {
                if (!value) return ''
                return countFilter(value)
            }
        },
        methods: {
            like () {
                this.$message.info('你已经点过赞了')
            }
        },
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .message-item {
        position relative
        overflow hidden

        &.identified {
            .tag {
                position absolute
                top -24px
                right -24px
                display block
                width 50px
                height 50px
                padding-top 30px
                text-align center
                background-color rgba($orange-6, .2)
                font-size $font-size-sm
                color $orange-6
                transform rotate(45deg)
            }
        }


        .user {
            flexLayout(, flex-start)

            .avatar {
                width 18px
                height @width
                border-radius 50%
                margin-right $padding-sm
            }
        }

        .content {
            margin $padding-sm 0
        }

        .meta {
            flexLayout(, space-between)

            .time
            .icon {
                color var(--text-color-secondary)
                font-size $font-size-sm
            }

            .like {
                color var(--text-color-secondary)

                .icon {
                    color var(--text-color-secondary)
                    transition()
                }

                &.liking {
                    opacity .6
                    cursor not-allowed
                }

                &.liked {
                    background linear-gradient(135deg, #fad7a1 0%, #e80505 100%)

                    .icon
                    span {
                        -webkit-text-fill-color transparent
                        text-shadow 0 2px 20px rgba(#E80505, .2)
                    }

                    &:hover {
                        opacity 1
                    }
                }

                &:hover {
                    color var(--text-color)

                    .icon {
                        color var(--text-color)
                    }
                }
            }
        }
    }
</style>