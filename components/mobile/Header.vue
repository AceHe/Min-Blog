<template>
	<div class="header" :class="{ 'menu-opened': menuOpened }">
		<div class="wrapper">
			<a class="menu-trigger" @click="menuOpened = !menuOpened">
				<div class="menu-lines">
					<span class="line"></span>
					<span class="line"></span>
				</div>
			</a>
			<div class="title">
				<transition name="slide-down" mode="out-in">
					<router-link to="/" class="logo" v-if="!showArticleTitle">
						<span class="logo-text">小何才露尖尖角</span>
					</router-link>
					<div class="article-title" v-else>{{ articleTitle }}</div>
				</transition>
			</div>
			<a class="search-trigger" @click="searchOpened = true">
				<i class="icon icon-search"></i>
			</a>
		</div>

		<transition name="fade" mode="out-in">
			<div class="overylay" v-if="overylayVisible" @click="closeOverlay"></div>
		</transition>

		<div class="menu-field">
			<transition name="slide-menu" mode="out-in">
				<div class="menu" v-if="menuOpened">
					<nuxt-link class="menu-item"
						v-for="menu in config.MENUS"
						:key="menu.key"
						:to="{ name: menu.key }"
						@click.native="menuOpened = false"
						exact>
						<div class="menu-icon">
							<i class="icon" :class="['icon-' + menu.key]"></i>
						</div>
						<div class="title">{{ menu.title }}</div>
					</nuxt-link>
				</div>
			</transition>
		</div>

		<transition name="slide-search" mode="out-in">
			<div class="search-field" v-if="searchOpened">
				<input type="text"
					ref="searchInput"
					autocomplete="off"
					autofocus
					placeholder="搜索文章"
					v-model.trim="keyword"
					@keyup.enter="search">
				<div class="close-btn" @click="searchOpened = false">
					<i class="icon icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		computed: {
			overylayVisible(){
				return this.menuOpened || this.searchOpened
			},
			showArticleTitle () { 
				return this.$store.getters['app/showArticleTitle']
			},
			articleTitle () {
				return this.$store.getters['article/title']
			}
		},
		data() {
			return {
				menuOpened: false,
				searchOpened: false,
				keyword: '',
				config: {
					MENUS:[{ 
							key: 'index', title: '首页' 
						},{ 
							key: 'archive', title: '归档' 
						},{ 
							key: 'about', title: '关于' 
						},{ 
							key: 'guestbook', title: '留言墙' 
						}
					]
				}
			}
		},
		methods: {
			closeOverlay(){
				this.menuOpened = false;
    			this.searchOpened = false;
			},
			search(){
				if (!this.keyword) return;
				this.$router.push(`/search/${this.keyword}`);
				this.keyword = '';
				this.searchOpened = false;
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	$header-height = 48px

	.header {
		position fixed
		width 100%
		height $header-height
		z-index 99

		.wrapper {
			flexLayout(, space-between)
			position relative
			height 100%
			padding 0 $padding-xs
			background-color var(--card-color)
			z-index 2

			& > a {
				flexLayout()
				height 100%
			}
		}

		.menu-trigger {
			flex 0 0 $header-height

			.line {
				position relative
				display block
				height 2px
				border-radius 1px
				background-color var(--text-color)
				transform scale(1.2)
				transform-origin left center
				transition()

				&:nth-child(1) {
					width 18px
				}

				&:nth-child(2) {
					width 12px
					margin-top $padding-xs
				}
			}
		}

		.logo {
			flex 1 0
			font-family $font-family-logo
			text-align center

			&-text {
				display inline-block
				font-size $font-size-lger
				color var(--text-color)
			}
		}

		.article-title {
			font-size $font-size-lg
			font-weight 700
		}

		.search-trigger {
			flex 0 0 $header-height
			text-align right
		}

		.menu-field {
			position fixed
			top $header-height
			right 0
			left 0
		}

		.search-field {
			flexLayout(, flex-start)
			position fixed
			top 0
			right 0
			left 0
			height $header-height
			z-index 3
			background-color var(--light-color)

			input {
				flex 1 0
				height 100%
				padding $padding-xs $padding-sm
				border none
			}

			.close-btn {
				flex 0 0 $header-height
				width $header-height
				height 100%
				line-height $header-height
				text-align center

				.icon {
					color var(--text-color-secondary)
				}
			}
		}

		.menu {
			position relative
			width 100%
			padding $padding-xs
			background-color var(--light-color)
			z-index 1

			&-item {
				flexLayout(, flex-start)
				padding $padding-sm $padding-sm
				font-size $font-size-lg
				border-radius 4px

				.menu-icon {
					flex 0 0 36px
				}

				&.active {
					background var(--primary-color)
					color var(--light-color)

					.icon {
						color var(--light-color)
					}
				}
			}
		}

		.overylay {
			position fixed
			width 100%
			height 100vh
			background-color var(--overlay-color)
			-webkit-touch-callout none
			touch-action none
			user-select none
			overflow hidden
		}

		&.menu-opened {
			.menu-trigger {
				.line {
					width 18px
					transform rotate(45deg) translate(-3.5px, -1px) scale(1.2)

					&:nth-child(2) {
						transform rotate(-45deg) translate(-2.5px, .5px) scale(1.2)
					}
				}
			}
		}
	}
</style>