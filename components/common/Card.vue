<template>
    <div 
        class="card" 
        :class="{ 
            'card-bordered': bordered, 
            'card-no-padding': noPadding 
        }" 
        :style="style">
        <div class="card-header" v-if="$slots.header || header">
            <slot name="header">{{ header }}</slot>
        </div>
        <div class="card-body" :style="borderStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            header:{
                default: ''
            },
            borderStyle:{
                default: null
            },
            bordered:{
                default: false
            },
            noMargin:{
                type: Boolean,
                default: false
            },
            noPadding:{
                type: Boolean,
                default: false
            },
        },
        created(){
            this.style();
        },
        methods: {
            style () {
                const style = {}
                if ( this.noMargin ) {
                    style.margin = 0
                }
                return style
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .card {
        position relative
        margin-bottom $padding-md
        padding 0 $padding-md
        background-color var(--card-color)
        box-shadow 0px 0px 14px 2px var(--box-shadow-color)
        border-radius 2px

        &.card-bordered {
            border 1px solid var(--border-color)
        }

        &-header {
            padding 12px 0 6px
            border-bottom 1px solid var(--border-color)
            font-weight 700

            .icon {
                margin-right 4px
                color var(--disabled-color)
                font-weight normal
            }

            .info-header {
                margin-bottom 10px
                text-align center

                .icon {
                    color var(--disabled-color)
                    font-size 42px
                    font-weight 400
                }

                .keyword {
                    font-size $font-size-lger
                    color var(--keyword-color)
                    letter-spacing 1px
                }

                .count {
                    font-weight 400
                    color var(--text-color-secondary)
                    font-size $font-size-sm

                    .num {
                        margin 0 6px
                        color var(--keyword-color)
                        font-weight 700
                    }
                }
            }
        }

        &-body {
            padding $padding-md 0
        }

        &-no-padding {
            padding 0

            .card-body {
                padding 0
            }
        }

        .app.mobile-layout & {
            box-shadow none
        }
    }
</style>