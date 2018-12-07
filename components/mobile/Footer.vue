<template>
	<footer class="footer">
		<div class="wrapper">
			<div class="copyright">
				<span> 版权所有 © {{ new Date() | dateFormat }}  
					<nuxt-link to="/about">Ace·Hemin</nuxt-link>. 保留所有权利
				</span>
			</div>
			<!-- <div class="record">
				<a href="http://" target="_blank" rel="noopener" class="record">
					备号
				</a>
			</div> -->
			<div class="power-by">
				Powered by
                <a class="link" target="_blank" rel="noopener" href="https://github.com/nuxt/nuxt.js">Nuxt.js</a>、
                Design by
                <a class="link" target="_blank" rel="noopener" :href="'https://jooger.me'">jooger.me</a>
			</div>
		</div>
	</footer>
</template>

<script>
	import { parseTime } from '@/utils/filters'

	export default {
		name: 'Footer',
		filters: {
            dateFormat(value) {
                if (!value) return ''
                return parseTime(value, '{y}')
            }
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.footer {
		width 100%
		margin-top $padding-md
		font-size $font-size-sm
		line-height 1.8

		.wrapper {
			padding $padding-lg
			text-align center
			background-color var(--card-color)
		}
	}
</style>