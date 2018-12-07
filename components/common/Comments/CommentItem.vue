<template>
    <div class="comment-item" :class="{ 'sub-comment-item': isChild }">
        <div class="header">
            <div class="user-info">
                <a :href="comment.person.site || 'javascript:void;'" class="author" :class="{ 'no-site': !comment.person.site }" target="_blank" rel="noopener">
                    <div class="avatar">
                        <img :src="comment.person.avatar" alt="">
                    </div>
                    <span class="name">{{ comment.person.name }}</span>
                </a>
                <span class="reply" v-if="forward">
                <span class="text">回复</span>
                <a class="name" :href="forward.person.site || 'javascript:;'" target="_blank" rel="noopener">@{{ forward.person.name }}</a>
                </span>
            </div>
            <span class="meta">
                <span class="location" v-if="comment.person.address">
                    <span>{{ comment.person.address }}</span>
                </span>
                <template v-if="!mobileLayout">
                    <span class="os" v-html="OSParse(comment.person.navigator)" v-if="comment.person.navigator"></span>
                    <span class="ua" v-html="UAParse(comment.person.navigator)" v-if="comment.person.navigator"></span>
                </template>
            </span>
        </div>

        <div class="content markdown-body" style="font-size: 14px;">
            <span v-if="comment.replyPerson && comment.replyPerson.name">
                回复 
                <a :href="comment.replyPerson.site || 'javascript:void;'" class="author" :class="{ 'no-site': !comment.replyPerson.site }" target="_blank" rel="noopener">
                    @{{ comment.replyPerson.name }}
                </a>: 
            </span>
            <span v-html="comment.person.comment"></span>
        </div>

        <div class="status">
            <a class="status-item like"
                :class="{ 'liked': isLiked, liking }"
                style="-webkit-background-clip: text;"
                :title="isLiked ? '已点赞' : ''"
                @click="handleLike">
                <i class="icon" :class="[`icon-thumb-up${isLiked ? '-fill' : ''}`]"></i>
                <span class="count">{{ comment.person.ups }}</span>
            </a>
            <a class="status-item subcomments" @click.stop="handleToggleSubComments">
                <i class="icon icon-comment"></i>
                <span v-if="isChild">回复</span>
                <span v-else-if="showSub">收起回复</span>
                <span v-else>{{ (comment.reply.length > 0 ? `${comment.reply.length}条` : '') + '回复' }}</span>
            </a>
            <time class="status-item time" :datatitme="comment.person.createdAt">
                {{ comment.person.createdAt | getDateFromNow }}
            </time>
        </div>

        <transition name="fade">
            <div class="sub-comments-box" v-if="showSub">
                <CommentList
                    :is-child="true"
                    :comment-uuid="parentUuid"
                    :list="comment.reply"
                    @on-sort="handleSubSort"
                    @on-loadmore="handleSubLoadmore"
                    @on-reply-publish="handleReplyPublish">
                </CommentList>
            </div>
        </transition>
    </div>
</template>

<script>

    import { parseTime } from '@/utils/filters'
    import { UAParse, OSParse } from '@/utils/metaParse'

    export default {
        name: 'ComemntItem',
        props: ['comment', 'commentUuid', 'isChild', 'index'],
        computed: {
            mobileLayout(){
                return this.$store.getters['app/mobileLayout']
            }
        },
        data() {
            return {
                forward: false,
                showSub: false,

                isLiked: false,
                liking: false,

                children: [],

                parentUuid: ''
            }
        },
        filters: {
            getDateFromNow: function (value) {
                if (!value) return ''
                return parseTime(value)
            }
        },
        beforeCreate () {
            this.$options.components.CommentList = require('./CommentList').default
        },
        created(){
            this.getLike();
        },
        methods: {
            // 判断是否已点赞
            async getLike () {
                let res;
                if( this.isChild ){
                    res = await this.$store.dispatch('history/getCommentReplyLike');
                }else{
                    res = await this.$store.dispatch('history/getCommentLike');
                }
                if( res && res.indexOf(this.comment.uuid) != -1 ){
                    this.isLiked = true;
                }
            },

            // OS解析
            OSParse(data){
                return OSParse(data)
            },

            // UA解析
            UAParse(data){
                return UAParse(data)
            },

            // 点赞评论 、回复
            async handleLike(){
                if (this.isLiked || this.liking) {
                    return this.$notify({
                        group: 'auth',
                        type: 'warn',
                        text: '您已点过赞了！'
                    });
                }

                // this.isChild == true 的时候，为点赞评论中的回复
                // console.log( this.comment.uuid, this.commentUuid );
                let data = {};
                let res;
                if( !this.isChild ){
                    data = {
                        commentUuid: this.comment.uuid
                    }
                    res = await this.$store.dispatch('history/setCommentLike', data);
                }else {
                    data = {
                        commentUuid: this.commentUuid,
                        replyUuid: this.comment.uuid,
                    }
                    res = await this.$store.dispatch('history/setCommentReplyLike', data);
                }
                
                if( res.code == 0 ){
                    this.isLiked = true;
                    this.liking = true;
                    this.$emit( 'on-updateLike', this.index);
                }

            },

            // 显示评论的回复
            handleToggleSubComments(){
                console.log( this.isChild )
                if( !this.isChild ){
                    this.showSub = !this.showSub;
                    this.parentUuid = this.comment.uuid;
                }else{
                    this.$emit('on-reply', this.index)
                }
            },

            handleSubSort() {

            },
            handleSubLoadmore() {

            },
            handleReplyPublish() {

            },
        }
    }
</script>

<style lang="stylus">
    @import '~@/assets/style/init'

    .comment-item {
        position relative
        padding $padding-md 0
        border-bottom 1px dashed var(--border-color)

        .header {
            flexLayout(, space-between)

            .user-info {
                flexLayout(, flex-start, center)

                .author {
                    flexLayout(, flex-start, center)

                    .avatar {
                        display inline-block
                        width 24px
                        height @width
                        margin-right 10px
                        border-radius 100%
                        border 1px solid var(--border-color)

                        img {
                            width 100%
                            height @width
                            border-radius 100%
                        }
                    }

                    &.no-site {
                        cursor default
                    }
                }

                .reply {
                    .text {
                        margin 0 10px
                        color var(--text-color-secondary)
                    }
                }

                .name {
                    font-weight 700
                    font-size $font-size-base
                }
            }

            .meta {
                color var(--text-color-secondary)
                font-size $font-size-sm

                > span {
                    margin-left 10px
                }

                .icon {
                    color var(--text-color-secondary)
                    font-size $font-size-sm
                    margin-right 4px
                }
            }
        }

        .content {
            margin $padding-sm 0 $padding-md
        }

        .status {
            &-item {
                display inline-block
                margin-right 20px
                padding 3px 6px
                border-radius 2px
                font-size $font-size-sm
                color var(--text-color-secondary)

                .icon {
                    margin-right 6px
                    font-size $font-size-sm
                }

                &.like
                &.subcomments {
                    &:hover {
                        opacity .8
                    }
                }
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
                    color $text-color

                    .icon {
                        color $text-color
                    }
                }
            }

            .subcomments {
                color var(--text-color-secondary)

                .icon {
                    margin-right 2px
                    color var(--text-color-secondary)
                }
            }

            .time {
                float right
                margin-right 0
            }
        }
    }
</style>
