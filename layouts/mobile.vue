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

