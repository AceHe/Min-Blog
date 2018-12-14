<template>
    <div class="article-list">
        <div class="list" v-if="articleList.length">
            <ArticleItem  v-for="item in articleList" :key="item.uuid" 
                :article="item" 
                :mini="mini" 
                :keyword="keyword"></ArticleItem>
        </div>
        <div class="indicator">
            <transition name="fade" mode="out-in">
                <pacman-loader v-if="articleListFetching" color="#f8e71c" size="20px"></pacman-loader>
                <p class="no-more-data" v-else-if="hasNoMore">别翻啦,没有啦</p>
                <button class="loadmore" v-else-if="articleList.length" @click="loadmore">继续翻</button>
                <p class="no-data" v-else>Nothing Here</p>
            </transition>
        </div>
    </div>
</template>

<script>
    import ArticleItem from '@/components/common/ArticleItem'

    import { getArticleList } from '@/api/index'

    export default {
        name: 'ArticleList',
        props: ['mini', 'keyword'],
        components: {
            ArticleItem
        },
        computed:{
            hasNoMore(){
                return this.page * this.limt >= this.total
            }
        },
        data(){
            return{
                articleList: [],
                articleListFetching: false,

                total: 0,
                page: 1,
                limt: 10
            }
        },
        created(){
            this.articleList = [];
            this.getArticleList();
        },
        methods: {
            async getArticleList() {
                let name = this.$route.name;
                let data = {
                    page: this.page,
                    limt: this.limt,
                    key: '',
                    val: ''
                };
                if( name == 'index' ){
                    data.key = 'index';
                    data.val = '';
                }
                else if( name == 'category-name' ){
                    data.key = 'category';
                    data.val = this.$route.params.name;
                }
                else if( name == 'tag-name' ){
                    data.key = 'tag';
                    data.val = this.$route.params.name;
                }
                else if( name == 'search-keyword' ){
                    data.key = 'search';
                    data.val = this.$route.params.keyword;
                }

                const res = await getArticleList(data);
                if( res.data.code == 0 ){
                    this.articleList.push.apply( this.articleList, res.data.data);
                    this.total = res.data.total;
                    this.$emit('input', this.total);
                }else{
                    console.log('ip', res.data)
                }
                this.articleListFetching = false;
            },

            loadmore(){
                this.articleListFetching = true;
                this.page++;
                this.getArticleList();
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