<template>
	<Card class="tool" no-padding>
		<div class="wrapper">
			<transition-group tag="div" name="fade" class="tool-list">
				<a class="tool-item feedback" key="feedback" :href="'mailto:'">
					<i class="icon icon-feedback"></i>
				</a>
				<a class="tool-item theme" key="theme" @click="updateTheme( theme === 'light' ? 'dark' : 'light' )">
					<i class="icon" :class="['icon-' + (theme === 'light' ? 'dark' : 'light')]"></i>
				</a>
				<a class="tool-item up" key="up" v-if="showScrollTop" @click="goTop">
					<i class="icon icon-arrow-up"></i>
				</a>
			</transition-group>
		</div>
	</Card>
</template>

<script>
	import Card  from '@/components/common/Card'
	import { mapActions } from 'vuex'
	import { getScroll, scrollTo } from '@/utils/dom'

	export default {
		name: 'Tool',
		components: {
			Card
		},
		computed: {
			theme () { 
				return this.$store.getters['app/theme']
			}
		},
		data() {
			return {
				showScrollTop: false,
			}
		},
		mounted () {
			window.addEventListener('scroll', this.handleScroll);
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
			handleScroll () {
				const scrollTop = getScroll(document.body, true)
				this.showScrollTop = scrollTop * 2 > window.screen.availHeight
			},

            async updateTheme (theme) {
                await this.$store.dispatch('app/updateTheme', theme);
            },

			goTop () {
				scrollTo(0, 500, {
					easing: 'ease'
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.tool {
		position fixed
		right 0
		bottom 36px

		.tool-item {
			display block
			width 36px
			height @width
			line-height @width
			text-align center
			background var(--card-color)
			cursor pointer
			transition()

			&:hover {
				background var(--button-color-hover)
			}

			&:first-child {
				border-top-left-radius 2px
			}

			&:last-child {
				border-bottom-left-radius 2px
			}
		}
	}
</style>