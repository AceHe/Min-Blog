<template>
    <nuxt-link
        class="tag"
        :to="`/tag/${name}`"
        v-if="link">
        <i class="icon" :class="[`icon-${icon}`]"></i>
        <span class="name">{{ name }}</span>
        <span class="count" v-if="count >= 0">[{{ count || 0 }}]</span>
    </nuxt-link>
    <span
        class="tag"
        v-else>
        <i class="icon" :class="[`icon-${icon}`]"></i>
        <span class="name">{{ name }}</span>
        <span class="count" v-if="count >= 0">[{{ count || 0 }}]</span>
    </span>
</template>

<script>
    export default {
        name: 'Tag',
        props: ['name', 'icon', 'count', 'link'],
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/style/init'

    .tag {
        display inline-block
        margin 0 8px 8px 0
        padding 4px 8px
        border 1px solid var(--border-color)
        font-size $font-size-sm
        border-radius 4px
        transition()

        .icon {
            margin-right 4px
            font-size $font-size-sm
        }

        .name {
            margin-right 4px
        }

        &:hover {
            background-color var(--primary-color-light)
            border-color var(--primary-color-light)
            color var(--primary-color)
        }
    }
</style>
