<template>
    <Card class="message-item" :class="{ 'identified': user && message.uuid === user.uuid }">
        <no-ssr>
            <transition name="fade">
                <span class="tag" v-if="user && message.uuid === user.uuid">我</span>
            </transition>
        </no-ssr>
        <a class="user" :href="message.person.site || 'javascript:;'" target="_blank">
            <img v-lazy="message.person.avatar" :alt="message.person.name" class="avatar">
            <span class="name">{{ message.person.name }}</span>
        </a>
        <div class="content markdown-body" style="font-size: 14px;" v-html="message.person.comment"></div>
        <div class="meta">
            <a class="like"
                :class="{ 'liked': isLiked }"
                style="-webkit-background-clip: text;"
                :title="isLiked ? '已点赞' : ''"
                @click="setLike(message)">
                <i class="icon icon-like-fill"></i>
                <span class="count" v-if="message.person.ups">{{ message.person.ups }}</span>
            </a>
            <time class="time" :datatitme="message.person.createdAt">
                {{ message.person.createdAt | dateFormat }}
            </time>
        </div>
    </Card>
</template>

<script>
    import Card from '@/components/common/Card'
    import { parseTime } from '@/utils/filters'

    export default {
        name: 'MessageItem',
        props: ['message'],
        components: {
            Card
        },
        data(){
            return {
                user: {
                    uuid: 1
                },
                isLiked: false,
            }
        },
        filters: {
            dateFormat: function (value) {
                if (!value) return ''
                return parseTime(value)
            }
        },
        created(){
            this.getLike();
        },
        methods: {
            // 判断是否已点赞留言
            async getLike () {
                const res = await this.$store.dispatch('history/getGuesbookLike');
                if( res && res.indexOf(this.message.uuid) != -1 ){
                    this.isLiked = true;
                    this.liking = true;
                }
            },

            // 点赞留言
            async setLike (message) {                
                if( this.isLiked ){
                    return this.$notify({
                        group: 'auth',
                        type: 'warn',
                        text: '您已点过赞了！'
                    });
                } 

                let data = {
                    uuid: message.uuid,
                    ups: message.person.ups
                }
                const res = await this.$store.dispatch('history/setGuesbookLike', data);
                if( res.code == 0 ){
                    this.isLiked = true;
                    this.$emit( 'updataLike', message.uuid, message.index);
                }
            }
        }
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
            white-space pre-wrap;
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