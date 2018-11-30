<template>
	<div class="affix" :class="{'is-fixed': fixed}" :style="style">
		<slot></slot>
	</div>
</template>

<script>
	import { getScroll, getOffset } from '@/utils/dom'

	export default {
		name: 'Affix',
		props: ['offsetTop'],
		data(){
			return {
				fixed: false,
				style: {},
				initialOffset: 0
			}
		},
		mounted () {
			this.initialOffset = getOffset(this.$el);

			window.addEventListener('scroll', this.handleScroll, false)
		},
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll, false)
		},
		methods: {
			handleScroll(){
				const elOffset = getOffset(this.$el); 
				const scrollTop = getScroll(window, true); // 滚动距离

				// console.log( elOffset.top , this.offsetTop , scrollTop, this.fixed )

				if ( (elOffset.top - this.offsetTop) < scrollTop && !this.fixed ) {
					this.fixed = true;
					this.style = {
						top: `${this.offsetTop}px`,
						width: `${this.$el.offsetWidth}px`
					}
				} else if ( (this.initialOffset.top - this.offsetTop) > scrollTop && this.fixed ) {
					this.fixed = false;
					this.style = null;
				}
			}			
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.affix {
		&.is-fixed {
			position fixed
			z-index 100
			max-height calc(100% - 100px)
		}
	}
</style>
