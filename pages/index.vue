<template>
	<section class="home-page">
		<div class="category-panel">
			<Card class="category"
				no-padding
				v-for="item in categoryList"
				:key="item._id">
				<router-link :to="`/category/${item.name}`">
					<img class="background-image" v-if="item.img"
						v-lazy="item.img" alt="">
					<div class="background" :style="{
						backgroundImage: `url(${item.img})`
						}"></div>
					<div class="mask"></div>
					<div class="content">
						<i class="icon" :class="[`icon-${item.icon}`]"></i>
						<h3 class="name">{{ item.name }}</h3>
					</div>
				</router-link>
			</Card>
		</div>
		<Card class="article-panel">
			<ArticleList></ArticleList>
		</Card>
	</section>
</template>

<script>
	import Card  from '@/components/common/Card'
	import Base from '@/Base'
	import ArticleList from '@/components/common/ArticleList'

	export default {
		name: 'Index',
		components: {
			Card,
			ArticleList
		},
		extends: Base,
		head () {
			return {
				title: '小何才露尖尖角 - 首页'
			}
		},
		computed: {
            categoryList () { 
                return this.$store.getters['article/category']
            }
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.home-page {
		.category-panel {
			display flex
			margin 0 -8px 16px

			.category {
				position relative
				flex 1 0
				min-height 100px
				max-height 100px
				margin 0 8px
				text-align center
				overflow hidden
				border-radius 4px

				a {
					width 100%
					text-decoration none
					color var(--light-color)
				}

				.background {
					full()
					background-size cover
					background-position center center
					transition()

					&-image {
						width 100%
						height 100%
					}
				}

				.mask {
					full()
					background-color var(--overlay-color)
					transition()
				}

				.content {
					position absolute
					top 50%
					left 50%
					width 100%
					transform translate(-50%, -50%)

					.icon {
						font-size 28px
						color var(--light-color)
					}

					.name {
						margin 8px 0 0
					}
				}

				&:hover {
					.background {
						transform scale(1.2)
					}

					.mask {
						background-color var(--overlay-color-dark)
					}
				}
			}
		}

		.mobile-layout & {
			width 100%
			padding-top $padding-xs
		}
	}

	.app.mobile-layout {
		.home-page {
			.category-panel {
				margin 0 0 $padding-xs
				padding 0 ($padding-xs / 2)

				.category {
					margin 0 ($padding-xs / 2)
					min-height 60px
					max-height 60px

					.content {
						.icon {
							font-size $font-size-lger
						}

						.name {
							margin-top ($padding-xs / 2)
							font-size $font-size-base
						}
					}
				}
			}
		}
	}
</style>	
