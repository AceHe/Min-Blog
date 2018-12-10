<template>
    <Card class="comment-list" :class="{ 'sub-comment-list': isChild , 'empty': !list.length }">
        <template v-if="!isChild || list.length">
            <div class="list-header" slot="header" v-if="!isChild">
                <div class="total">
                    共
                    <span class="count">{{ list.length }}</span>
                    条{{ listType }}
                </div>
                <div class="sort">
                    <a class="sort-type" :class="{ active: latestSort }" @click="handleSort('createdAt', -1)">最新</a>
                    <i class="seprate"></i>
                    <a class="sort-type" :class="{ active: hottestSort }" @click="handleSort('ups', -1)">最热</a>
                </div>
            </div>
            <div class="list-content">
                <transition-group tag="div" class="list" name="fade" mode="out-in">
                    <template v-if="list.length">
                        <CommentItem v-for="(item, index) in list"
                            :key="index"
                            :comment="item"
                            :comment-uuid="commentUuid"
                            :is-child="isChild"
                            :index="index"
                            @on-updateLike="handleUpdateLike"
                            @on-reply="handleSetReply"
                            @on-reply-publish="handleSubReplyPublish">
                        </CommentItem>
                    </template>
                </transition-group>
                <transition name="fade" mode="out-in">
                    <div class="indicator" v-if="loading || !hasNoMore">
                        <button class="loadmore" v-if="!hasNoMore && list.length" @click="handleLoadmore">来，继续翻</button>
                        <p class="no-data" v-else>暂无{{ listType }}</p>
                    </div>
                </transition>
            </div>
        </template>

        <!-- isChild == false ? Comment : CommentItem -->
        <!-- 从 Comment组件 进入的时候不会展示 -->
        <!-- 从 CommentItem组件 进入的时候展示 -->
        <CommentInputBox v-if="isChild"
            ref="inputBox"
            :is-child="true"
            :reply="replyTarget"
            @on-publish="handleReplyPublish"
            @on-clear-reply="handleClearReply">
        </CommentInputBox>
    </Card>
</template>

<script>
    import Card  from '@/components/common/Card'
    import CommentInputBox from './CommentInputBox'
    import CommentItem from './CommentItem'

    import { scrollTo } from '@/utils/dom'

    import { addArticleCommentReply } from '@/api/index'

    export default {
        name: 'CommentList',
        props: ['list', 'commentUuid', 'isChild'],
        components: {
            Card,
            CommentInputBox,
            CommentItem
        },
        computed: {
            listType () {
                return this.isChild ? '回复' : this.article ? '评论' : '留言'
            }
        },
        data() {
            return {
                replyTarget: '',

                latestSort: true,
                hottestSort: false,

                loading: false,
                hasNoMore: true,
            }
        },
        methods: {
            // 切换评论排序 最新、最热
            handleSort() {

            },

            // 加载更多评论
            handleLoadmore() {

            },

            // 点赞评论、回复
            handleUpdateLike( index ){
                console.log( this.list[index] );
                // 评论点赞数加一
                this.list[index].person.ups++
            },

            // 回复 文章评论 下的 评论 的 回复
            handleSetReply(index){
                this.replyTarget = this.list[index];
                if (!this.mobileLayout) {
                    const inputBox = this.$refs.inputBox;
                    inputBox.focus();
                    this.$scrollTo(inputBox.$el, 500, {
                        offset: -document.body.clientHeight / 2
                    })
                }
            },

            handleSubReplyPublish(){

            },

            // 回复 文章评论
            async handleReplyPublish( data, type ){
                if( type != 1 ) return;

                let info = data;
                info.type = type;
                info.uuid = this.commentUuid;
                info.replyName = this.replyTarget ? this.replyTarget.person.name : '';
                info.replySite = this.replyTarget ? this.replyTarget.person.site : '';

                const res = await addArticleCommentReply(info);
            },

            // 取消回复
            handleClearReply(){
                this.replyTarget = null
            },
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .comment-list {
        margin-bottom $padding-md

        .list-header {
            flexLayout(, space-between)

            .count {
                color var(--keyword-color)
            }

            .sort {
                font-weight 400
                flexLayout(, space-between)

                .seprate {
                width 1px
                height 12px
                margin 0 6px
                background var(--border-color)
                }

                &-type {
                    color var(--text-color-secondary)

                    &:hover {
                        color var(--text-color)
                    }

                    &.active {
                        color var(--primary-color)
                    }
                }
            }
        }

        .list {
            margin-bottom $padding-md
        }

        &.loading {
            .list-header {
                .sort-type {
                    cursor not-allowed
                    color var(--text-color-secondary)
                }
            }
        }

        &.sub-comment-list {
            margin-top 16px
            padding 0 16px
            border 1px dashed var(--border-color)
            font-size $font-size-sm
            box-shadow none

            .indicator {
                margin $padding-md 0
            }

            &.empty {
                background transparent
            }
        }
    }
</style>
