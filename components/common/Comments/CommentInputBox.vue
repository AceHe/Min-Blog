<template>
    <Card class="comment-input-box" :class="{ 'child-input-box': isChild, loading, 'message-input-box': isMessage }" :no-margin="isMessage">
        <no-ssr>
            <div class="wrapper">

                <div class="author">
                    <div class="form">
                        <div class="name">
                            <i class="icon icon-name"></i>
                            <input 
                                v-model.trim="name"
                                type="text" 
                                placeholder="昵称（必填）" 
                                required="required" 
                                name="name" 
                                autocomplete="false">
                        </div>
                        <div class="email">
                            <i class="icon icon-email-fill"></i>
                            <input 
                                v-model.trim="email"
                                type="email" 
                                placeholder="邮箱（必填）" 
                                required="required" 
                                name="email" 
                                autocomplete="false">
                        </div>
                        <div class="site">
                            <i class="icon icon-site"></i>
                            <input 
                                v-model.trim="site"
                                type="url" 
                                placeholder="站点" 
                                required="required" 
                                name="site" 
                                autocomplete="false">
                        </div>
                    </div>
                </div>


                <div class="content">
                    <MDEditor class="editor" 
                        ref="editor" 
                        v-model="content"
                        :disabled="false" 
                        :rows="3" 
                        :placeholder="'说点儿什么'">
                    </MDEditor>
                </div>

                <div class="action">
                    <div class="action-item submit">
                        <button class="submit-btn" @click="submit">
                            <span>留言</span>
                        </button>
                    </div>
                </div>

            </div>
        </no-ssr>
    </Card>
</template>

<script>
    import Card  from '@/components/common/Card'
    import MDEditor  from '@/components/common/MDEditor'

    import { addGuestbook } from '@/api/index'

    export default {
        name: 'CommentInputBox',
        components: {
            Card,
            MDEditor
        },
        data(){
            return {
                isChild: true,
                isMessage: true,
                loading: false,

                name: '',
                email: '',
                site: '',
                content: ''
            }
        },
        methods: {
            async submit() {
                let data = {
                    name: this.name,
                    email: this.email,
                    site: this.site,
                    content: this.content
                }
                const res = await addGuestbook(data);
                if( res.data.code == 0 ){
                    this.$emit( 'addGuesbook' );
                }                
            }
        }
    }
    
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .comment-input-box {
        padding $padding-md $padding-lg

        .wrapper {
            .clear {
                flex 0 0 !important

                button {
                    width 64px
                    height 36px

                    .icon {
                        color var(--text-color-secondary)
                        transition(color)
                    }

                    &:hover {
                        .icon {
                            color var(--text-color)
                        }
                    }
                }
            }

            .author {
                flexLayout(, flex-start, flex-start)
                margin-bottom $padding-sm

                .avatar {
                    flex 0 0 36px
                    width 36px
                    height @width
                    margin-right $padding-sm
                    overflow hidden

                    img {
                        width 100%
                        height @width
                        border-radius 50%
                    }
                }

                .form {
                    flex 1 0
                    flexLayout(, flex-start)

                    > div {
                        flex 1 0
                        position relative
                        margin-right $padding-sm

                        > .icon {
                            position absolute
                            top 50%
                            left 8px
                            transform translateY(-50%)
                            color var(--text-color-secondary)
                        }

                        input {
                            width 100%
                            height 36px
                            padding $padding-xs $padding-sm $padding-xs 30px
                            border none
                            background var(--button-color)
                            background-image none
                            transition()
                        }

                        &:last-child {
                            margin-right 0
                        }
                    }
                }

                .info {
                    flexLayout(, space-between)
                    .user {
                        flexLayout(, flex-start)
                    }

                    .status {
                        color var(--text-color-secondary)
                        font-size $font-size-sm
                    }

                    .action {
                        &-item {
                            margin-left $padding-sm
                        }

                        .exit {
                            color var(--text-color-secondary)
                        }
                    }
                }
            }

            .reply {
                flexLayout(, flex-start)
                margin-bottom 12px

                .target {
                    flex 1 0
                    height 36px
                    line-height @height
                    margin-right 12px
                    padding 0 8px
                    background var(--button-color)
                }

                .clear {
                    button {
                        width 80px
                    }
                }
            }

            .content {
                margin 0 0 12px
            }

            .action {
                flexLayout(, space-between)
                &-item {
                    display inline-block
                }

                .cancel-btn {
                    margin-right 12px
                    background transparent
                    color var(--text-color-secondary)
                    border 1px solid var(--border-color)

                    &:hover {
                        background $bg
                        border-color @background
                        color var(--text-color)
                    }
                }

                .submit-btn {
                    width 100%
                    padding 6px 32px
                }
            }
        }

        &.child-input-box {
            margin 0
            padding 0
            background transparent
            box-shadow none

            .card-body {
                padding 0
            }
        }

        &.loading {
            button {
                cursor not-allowed
            }

            .wrapper {
                .content {
                    cursor not-allowed
                    opacity .5
                }
            }
        }

        &.message-input-box {
            background var(--light-color)

            .submit {
                width 100%
            }
        }

        .app.mobile-layout & {
            .wrapper {
                .form {
                    flex-wrap wrap

                    > div {
                        flex-basis 100%
                        margin-bottom $padding-sm
                        margin-right 0

                        &:last-child {
                            margin-bottom 0
                        }
                    }
                }

                .submit {
                    width 100%
                }
            }
        }
    }
</style>