<template>
    <div class="tab">
        <div class="wrapper">
            <nuxt-link v-for="(item, index) in list"
                :key="index"
                class="tab-item"
                :to="{ name: item.key }"
                :class="{ actived: checkActive(item, index) }"
                ref="tab"
                exact
                @click.native="handleChangeTab(item, index)">
                <i class="icon" :class="[`icon-${item.icon}`]" v-if="item.icon"></i>
                <span class="title">{{ item.title }}</span>
            </nuxt-link>
        </div>
        <i class="corner" :style="cornerStyle"></i>
    </div>
</template>

<script>
    export default {
        name: 'Tab',
        data(){
            return{
                list: [],
                cornerStyle: '',

                menuValue: -1,
            }
        },
        created(){
            this.list = [{
                title: '首页',
                key: 'index',
                icon: ''
            },{
                title: '归档',
                key: 'archive',
                icon: ''
            },{
                title: '关于',
                key: 'about',
                icon: ''
            },{
                title: '留言墙',
                key: 'guestbook',
                icon: ''
            }];


            this.init();
        },
        mounted(){
            this.setCornerStyle()
        },
        methods: {
            // 初始化
            init(){
                const name = this.$route.name;
                const index = this.list.findIndex(item => item.key === name);
                this.menuValue = index;
            },

            // 导航激活class样式
            checkActive(item, index){
                return this.menuValue === index;
            },

            // 切换导航
            handleChangeTab(item, index){
                this.menuValue = index;
                this.setCornerStyle();
            },

            // 导航激活图标状态
            setCornerStyle(){
                const index = this.menuValue;
                let el = this.$refs.tab ? this.$refs.tab[index] : null;

                if (!el) {
                    this.cornerStyle = null;
                } else {
                    el = el.$el;
                    this.cornerStyle = {
                        left: el.offsetLeft + 'px',
                        width: el.clientWidth + 'px'
                    }
                }
            }

        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .tab {
        position relative
        height 100%

        .wrapper {
            display flex
            align-items center
            height 100%
        }

        .corner {
            position absolute
            top -1px
            left 0
            height 4px
            width 0
            border-radius 2px
            background-color var(--primary-color)
            box-shadow 0 2px 5px 0 var(--dark-color-light)
            transition()
            z-index 2
        }

        .tab-item {
            display inline-block
            margin-right $padding-lg
            color var(--text-color-secondary)

            .icon {
                display inline-block
                margin-right $padding-xs
                font-size $font-size-base
                transition()
            }

            .title {
                display inline-block
                font-weight bold
            }

            &:hover {
                color var(--text-color)
                .icon {
                    color var(--text-color)
                }
            }

            &.actived {
                color var(--primary-color)

                .icon {
                    color var(--primary-color)
                }
            }
        }
    }
</style>