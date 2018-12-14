<template>
    <div class="comment">
        <CommentList
            :list="commentList"
            @on-sort="handleSort"
            @on-loadmore="handleLoadmore"
            @on-reply="handleReply">
        </CommentList>
        <CommentInputBox 
            ref="inputbox"
            @on-publish="handlePublish">
        </CommentInputBox>
    </div>
</template>

<script>
    import CommentList from './CommentList'
    import CommentInputBox from './CommentInputBox'

    export default {
        name: 'Comment',
        props: ['article'],
        components: {
            CommentList,
            CommentInputBox
        },
        computed: {
            commentList () { 
                return this.article.comments;
            }
        },
        methods: {
            handleSort(){

            },
            handleLoadmore(){

            },
            handleReply(){

            },

            // 清空子组件状态
            handleEmpty(){
                this.$refs.inputbox.handleEmpty();
            },

            // 发表评论,调用父级方法
            handlePublish(data, type){
                this.$emit('on-comment', data, type)
            },
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .comment {}
</style>
