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
                <button class="loadmore" 
                    v-if=" page * limt < total "
                    @click="loadmore">Continue</button>
                <p class="no-more-data" v-else-if=" total != 0 ">No More</p>
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
        components: {
            ArticleItem
        },
        data(){
            return{
                articleList: [],
                mini: 10,
                keyword: 'code',

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

                console.log( 'data',data )

                const res = await getArticleList(data);
                if( res.data.code == 0 ){
                    this.articleList.push.apply( this.articleList, res.data.data);
                    this.total = res.data.total;
                    this.$emit('input', this.total);
                }else{
                    console.log('ip', res.data)
                }
            },

            loadmore(){
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