<template>
	<div class="app" :class="{'full-column': fullColumn}">
		<Message></Message>
		<Background></Background>
		<PCHeader></PCHeader>

		<div class="wrapper">
			<main class="main">
				<div class="content-container">
					<nuxt></nuxt>
				</div>
				<transition name="fade" mode="out-in">
					<div class="aside-container" v-if="!fullColumn">
						<PCAside></PCAside>
					</div>
				</transition>
			</main>

			<PCFooter></PCFooter>
		</div>
		<PCTool></PCTool>
	</div>
</template>

<script>
	import PCHeader from '~/components/pc/Header'
	import PCFooter from '~/components/pc/Footer'
	import PCTool from '~/components/pc/Tool'
	import PCAside from '~/components/pc/Aside/Aside'

	import Message from '~/components/common/Message'
	import Background from '~/components/common/Background'

	import { mapGetter, mapActions } from 'vuex'

	export default {
		components: {
			PCHeader,
			PCFooter,
			PCTool,
			PCAside,

			Message,
			Background,
		},
		head () {
			return {
				bodyAttrs: {
					class: 'theme-' + this.$store.getters['app/theme']
				}
			}
		},
		computed: {
			fullColumn () { 
				return this.$store.state.app.fullColumn 
			}
		},
		created() {
			this.getTheme();
			this.getCategory();
			this.getTag();
			this.getHot();
			this.getWebsite();
			this.getFriendLink();
			this.getArchive();
		},
		methods:{
			async getTheme () {
				await this.$store.dispatch('app/getTheme');
			},

			async getCategory () {
				await this.$store.dispatch('article/getCategory');
			},

			async getTag () {
				await this.$store.dispatch('article/getTag');
			},

			async getHot () {
				await this.$store.dispatch('article/getHot');
			},

			async getWebsite () {
				await this.$store.dispatch('website/getWebsite');
			},

			async getFriendLink () {
				await this.$store.dispatch('website/getFriendLink');
			},

			async getArchive () {
				await this.$store.dispatch('archive/getArchive');
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'
	.app {
		width 100vw
		height 100vh

		.wrapper {
			flexLayout(column, flex-start, flex-start)
			width 100%
			height 100%
		}

		.main {
			flex 1 0 auto
			flexLayout(, flex-start, flex-start)
			width 1088px
			margin 0 auto
			padding-top (60 + $padding-md)px

			.content-container {
				width 'calc(1088px - 320px - %s)' % $padding-md
				flex 1 0 @width
				transition(flex-basis)
			}

			.aside-container {
				flex 0 0 320px
				width 320px
				margin-left $padding-md
			}
		}

		&.full-column {
			.content-container {
				flex 1 0 100%
			}
		}
	}
</style>