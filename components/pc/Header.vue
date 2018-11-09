<template>
    <div class="header">
        <div class="wrapper">
			<router-link to="/" class="logo">
				<span class="logo-text">小何才露尖尖角</span>
			</router-link>
            <transition name="slide-down" mode="out-in">
            	<Tab class="menus" ref="menu"></Tab>
            </transition>
            <div class="search">
                <input type="text" autocomplete="off" placeholder="搜索文章" :autofocus="false" v-model.trim="keyword" @keyup.enter="search">
                <div class="search-btn">
                    <i class="icon icon-search" @click="search"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import Tab from '~/components/common/Tab'

	export default {
	    name: 'PCHeader',
	    components: {
			Tab
		},
	    data() {
	        return {
	            keyword: ''
	        }
	    },
	    methods: {
	        // 搜索文章
	        search() {

	        }
	    }
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.header {
		position fixed 
		width 100% 
		height 60px 
		background-color var(--card-color) 
		box-shadow 0px 0px 14px 2px var(--box-shadow-color) 
		z-index 99 
		
		.wrapper {
			flexLayout(, flex-start) 
			display flex 
			max-width 1088px 
			height 100% 
			margin 0 auto
		}
		
		.logo {
			flexLayout(, flex-start)
			font-family $font-family-logo
			text-decoration none

			img {
				height 36px
				opacity .8
			}

			&-text {
				display inline-block
				margin-left $padding-sm
				font-size 28px
				color var(--text-color)
			}
		}
		
		.menus {
			flex 1 0
			position relative
			margin-left $padding-md
			padding 0 $padding-sm

			.menu-item {
				display inline-block
				padding 18px 24px
				line-height 22px
				color var(--text-color)

				&:hover {
					color var(--primary-color)
				}

				&.active {
					color var(--primary-color)
					font-weight 700
				}
			}
		}
	    
		.search {
			display flex
			width 250px
			height 36px
			background-color var(--body-color)
			border-radius 2px
			transition()

			input {
				flex 1 0
				height 100%
				padding 8px 16px
				border 0
				outline 0
				background none
			}

			&-btn {
				flex 0 0 36px
				margin 8px 0
				line-height 20px
				text-align center
				color var(--text-color-secondary)
				border-left 1px solid var(--border-color)
				cursor pointer
				transition(color)

				&:hover {
					color var(--text-color)
				}
			}

			&:focus-within {
				background var(--border-color)
			}
		}
	}
</style>