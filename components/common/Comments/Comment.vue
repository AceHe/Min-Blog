<template>
    <div class="comment">
        <CommentList
            :list="commentList"
            @on-sort="handleSort"
            @on-loadmore="handleLoadmore"
            @on-reply="handleReply">
        </CommentList>
        <CommentInputBox @on-publish="handlePublish"></CommentInputBox>
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
        data(){
            return {
                commentList: {}
            }
        },
        created(){
            // 获取评论
            this.commentList = this.article.comments;
        },
        methods: {
            handleSort(){

            },
            handleLoadmore(){

            },
            handleReply(){

            },

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
