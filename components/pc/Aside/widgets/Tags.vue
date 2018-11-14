<template>
    <Card class="widget-tags">
        <div class="title" slot="header">
            <i class="icon icon-tag"></i>
            标签
        </div>
        <div class="tag-list" v-if="tagList.length">
            <Tag v-for="item in tagList"
                :key="item.name"
                :name="item.name"
                :icon="item.icon"
                :count="item.count"
                :link="true"></Tag>
        </div>
        <p class="no-data" v-else>暂无标签</p>
    </Card>
</template>

<script>
    import Card from '@/components/common/Card'
    import Tag from '@/components/common/Tag'

    import { getTags } from '@/api/index'

    export default {
        name: 'Tags',
        components: {
            Card,
            Tag
        },
        data(){
            return{
                tagList: []
            }
        },
        created(){
            this.getTag();
        },
        methods: {
            async getTag() {
                const res = await getTags();
                if( res.data.code == 0 ){
                    this.tagList = res.data.data;
                }else{
                    console.log('ip', res.data)
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .widget-tags {
        .tag-list {
            max-height calc(100vh - 165px)
            overflow auto
        }
    }
</style>
