<template>
    <div class="md-editor">
        <div class="wrapper">
            <textarea ref="input"
                name="input"
                :placeholder="placeholder"
                :cols="cols"
                :rows="rows"
                v-model="value"
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
        props: ['placeholder', 'rows'],
        data(){
            return{
                value: '',
                cols: 45,
            }
        },
        mounted(){
            if (this.from() === 'about') {
                this.value = `友链申请\n称呼：\n头像：\n简介：\n网站：\nGithub：\n`
            };
        },
        methods: {
            // 父组件执行的 清空value
            handleEmpty(){
                this.value = '';
            },

            // 向父组件传递内容
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