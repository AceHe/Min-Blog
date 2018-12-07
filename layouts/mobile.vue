<template>
    <div class="app mobile-layout">
        <Message></Message>
        <MobileHeader></MobileHeader>
        <div class="wrapper">
            <main class="main content-container">
                <nuxt></nuxt>
            </main>
            <MobileFooter class="footer"></MobileFooter>
        </div>
    </div>
</template>

<script>
    import MobileHeader from '@/components/mobile/Header'
    import MobileFooter from '@/components/mobile/Footer'

    import Message from '~/components/common/Message'

    export default {
        components: {
            MobileHeader,
            MobileFooter,

            Message
        },
        head () {
            return {
                bodyAttrs: {
                    class: 'mobile theme-' + this.$store.getters['app/theme']
                }
            }
        },
        created() {
            this.getTheme();
            this.getCategory();
            this.getTag();
            this.getHot();
            this.getWebsite();
            this.getFriendLink();
            this.getArchive();
        },
        methods:{
            async getTheme () {
                await this.$store.dispatch('app/getTheme');
            },

            async getCategory () {
                await this.$store.dispatch('article/getCategory');
            },

            async getTag () {
                await this.$store.dispatch('article/getTag');
            },

            async getHot () {
                await this.$store.dispatch('article/getHot');
            },

            async getWebsite () {
                await this.$store.dispatch('website/getWebsite');
            },

            async getFriendLink () {
                await this.$store.dispatch('website/getFriendLink');
            },

            async getArchive () {
                await this.$store.dispatch('archive/getArchive');
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'
    .app {
        width 100vw
        height 100vh

        .wrapper {
            flexLayout(column, flex-start, flex-start)
            width 100%
            height 100%
        }

        .main {
            flex 1 0 auto
            flexLayout(, flex-start, flex-start)
            width 100%
            padding-top 48px
        }
    }
</style>

