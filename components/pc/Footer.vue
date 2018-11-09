<template>
    <footer class="footer">
        <div class="wrapper">
            <div class="copyright">
                <span>版权所有 © {{ new Date() }} <nuxt-link to="/about">小何才露尖尖角</nuxt-link>. 保留所有权利</span>
                <!-- <a href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener" class="record">豫ICP备17040457号</a> -->
            </div>
            <div class="power-by">
                Powered by
                <a class="link" target="_blank" rel="noopener" href="https://github.com/nuxt/nuxt.js">Nuxt.js</a>、
                Design by
                <a class="link" target="_blank" rel="noopener" :href="'https://github.com/AceHe'">AceHe</a>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init';

    .footer {
        width 100%
        margin-top 100px
        box-shadow 0px 0px 14px 2px var(--box-shadow-color)

        .wrapper {
            padding 24px 50px
            text-align center
            background-color var(--card-color)

            .copyright {
                margin-top $padding-sm

                .record {
                    margin-left $padding-sm
                }
            }

            .power-by {
                margin-top $padding-sm
                color var(--text-color-secondary)

                .link {
                    text-decoration underline
                }
            }
        }
    }
</style>