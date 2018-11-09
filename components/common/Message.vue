<template>
	<transition name="slide-up-message" mode="out-in">
		<div class="message" v-if="visible">
			<div class="wrapper">
				<i class="icon" :class="[`icon-${type}`]" v-if="type"></i>
				<span class="content">{{ message }}</span>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'Message',
		data(){
			return{
				type: 'info',
				visible: false,
				message: '',
				duration: 2000,
				closed: false,

				timer: null
			}
		},
		mounted() {
			this.startTimer();
		},
		methods: {

			startTimer () {
				if (this.duration > 0) {
					this.timer = setTimeout(() => {
						if (!this.closed) {
							this.close()
						}
					}, this.duration)
				}
			},

			close(){
				this.closed = true
			}

		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.message {
		position fixed
		top $padding-md
		right 0
		left 0
		margin 0 auto
		text-align center
		pointer-events none
		opacity 1
		z-index 9999

		.wrapper {
			display inline-block
			padding $padding-xs $padding-md
			background var(--light-color)
			color var(--text-color)
			border-radius 4px
			box-shadow 0 4px 12px 0 var(--dark-color-light)

			.icon {
				display inline-block
				margin-right 2px
				font-weight bold
				vertical-align -.05em

				&-success {
					color $green-6
				}

				&-error {
					color $red-6
				}

				&-warn {
					color $yellow-6
				}

				&-info {
					color $blue-6
				}
			}
		}
	}
</style>