<template>
    <div class="article-list">
        <div class="list" v-if="articleList.length">
            <ArticleItem  v-for="item in articleList" :key="item._id" 
                :article="item" 
                :mini="mini" 
                :keyword="keyword"></ArticleItem>
        </div>
        <div class="indicator">
            <transition name="fade" mode="out-in">
                <p class="no-more-data">No More</p>
                <!-- <button class="loadmore" @click="loadmore">Continue</button> -->
                <!-- <p class="no-data">Nothing Here</p> -->
            </transition>
        </div>
    </div>
</template>

<script>
    import ArticleItem from '@/components/common/ArticleItem'

    export default {
        name: 'ArticleList',
        components: {
            ArticleItem
        },
        data(){
            return{
                articleList: [],
                mini: 10,
                keyword: 'code',
            }
        },
        created(){
            this.articleList = [{
                _id: 0,
                description: '日常docker使用中，有很多容器间访问的需要，这时候需要知道docker-compose如何暴露出端口给其他服务使用',
                title: '标题标题',
                thumb: 'https://static.jooger.me/img/source/20181020/team_1540034403048.webp?x-oss-process=style/watermark',
                meta: {
                    pvs: 10,
                    ups: 21,
                    comments: 9,
                },
                icon: 'code',
                category: {
                    name: '戎马一生'
                },
                source: '原创',
                createdAt: '2018-08-12'
            }]

            console.log( this.articleList.length )
        },
        methods: {
            loadmore(){

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .article-list {
        .list {
            margin-bottom $padding-md
        }
    }
</style>