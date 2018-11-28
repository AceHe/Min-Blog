<template>
    <div class="md-editor">
        <div class="wrapper">
            <textarea ref="input"
                name="input"
                :placeholder="placeholder"
                :cols="cols"
                :rows="rows"
                :value="value"
                required="required"
                aria-required="true"
                @input="handleValueChange">
            </textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MDEditor',
        data(){
            return{
                value: '',
                cols: 45,
                rows: 4,
                placeholder: '写点什么'
            }
        },
        mounted(){
            if (this.from() === 'about') {
                this.value = `友链申请\n称呼：\n网站：\nGithub(如果有)：\n`
            }
        },
        methods: {
            handleValueChange (e) {
                this.$emit('input', e.target.value.trim())
            },
            from () {
                return this.$route.query.from
            },
            focus () {
                this.$refs.input.focus()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .md-editor {
        background var(--button-color)

        textarea {
            width 100%
            padding 8px
            resize none
            border none
            background transparent
            background-image none
            transition()
        }

    }
</style>