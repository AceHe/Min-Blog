<template>
	<transition name="slide-down" mode="out-in">
		<div class="modal" v-if="value">
			<div class="overlay" @click="close"></div>
				<div class="wrapper" :style="wrapperStyle">
				<h3 class="title" v-if="title">{{ title }}</h3>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'Modal'
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.modal {
		position fixed
		left 0
		top 0
		width 100%
		height 100%
		z-index 999
		opacity 1

		.overlay {
			full()
			background var(--overlay-color)
			-webkit-touch-callout none
			touch-action none
			user-select none
			overflow hidden
		}

		.wrapper {
			position absolute
			top 50%
			left 50%
			padding $padding-md
			transform translate(-50%, -50%)
			background-color var(--light-color)
			border-radius 4px
			box-shadow 0 2px 15px 0 var(--dark-color-light)

			.title {
				margin-bottom $padding-md
				text-align center
			}
		}

		.app.mobile-layout & {
			.wrapper {
				max-width 90%
			}
		}
	}
</style>