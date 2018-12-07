<template>
	<section class="archive-page">
		<Card v-show="!archivesFetching">

			<div slot="header" class="info-header">
				<i class="icon icon-archive"></i>
				<div class="keyword">归档</div>
				<div class="count">
					目前共计
					<em class="num">{{ archivesCount }}</em>
					篇文章
				</div>
			</div>

			<div class="sitemap">
				<div class="block articles">
					<ul class="list archive-list">
						<li class="year-item" v-for="archive in archives" :key="archive.year">
							<h3 class="year">{{ archive.year }}</h3>
							<ul class="list month-list">
								<li class="month-item" v-for="month in archive.months" :key="month.month">
									<h4 class="month">{{ month.month | monthFilter }}</h4>
									<ul class="list article-list">
										<li class="article-item" v-for="article in month.artic" :key="article.uuid">
											<article class="article">
												<time class="time" :datatitme="article.monthDay">
													{{ article.monthDay }}
												</time>
												<span class="source" :class="[getConstantItem(article.source)]">
													{{ article.source | constantFilter }}
												</span>
												<nuxt-link class="link"
													:to="`/article/${article.uuid}`">
													{{ article.title }}
												</nuxt-link>
											</article>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</Card>
	</section>
</template>

<script>
	import Card  from '@/components/common/Card'
	import { monthFilter, constantFilter } from '@/utils/filters'
	import { sourceTranslate } from '@/utils/publicMethods'

	export default {
		name: 'Archive',
		components: {
			Card
		},
		layout({ store }) {
			const mobileLayout = store.getters['app/mobileLayout'];
			if (mobileLayout) return 'mobile';
			return 'default';
		},
		head () {
			return {
				title: '归档'
			}
		},
		filters: {
            monthFilter(value) {
                if (!value) return ''
                return monthFilter(value)
            },
            constantFilter(value) {
                if (!value) return ''
                return constantFilter(value)
            },
        },
        computed: {
            archives () { 
                return this.$store.getters['archive/archive']
            },
            archivesCount () {
            	return this.$store.getters['archive/count']
            }
        },
		data(){
			return {
				archivesFetching: false,
			}
		},
		methods: {
			getConstantItem(source){
                return sourceTranslate(source)
            }
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.archive-page {
		.sitemap {
			.block {
				margin-bottom 20px

				&:last-child {
					margin-bottom 0
				}

				> .title {
					margin-bottom 10px
					padding-bottom 10px
					border-bottom 1px dashed var(--border-color)
				}


				.list {
					padding $padding-xs $padding-lg
					padding-right 0
				}

				.archive-list {
					padding 0
				}

				.year {
					font-size $font-size-lger + 8px
					font-family Damion
				}

				.month {
					font-size $font-size-lger
					font-family Damion
				}

				.article-list {
					.article {
						flexLayout(, flex-start)
						position relative
						margin-bottom $padding-sm
						color var(--text-color-secondary)

						&::before {
							content ''
							position absolute
							left -12px
							top 50%
							transform translateY(-50%)
							width 2px
							height @width
							border 1px solid var(--text-color-secondary)
							border-radius 1px
						}
					}

					.time {
						flex 0 0 42px
						width 42px
						display inline-block
						margin-right 12px
					}

					.link {
						flex 1 0
						display inline-block
						color var(--text-color)
						text-decoration underline
						lineLimit(1)

						&:hover {
							color var(--primary-color)
							transform translateX(5px)
						}
					}

					.source {
						flex 0 0 36px
						display inline-block
						width 36px
						height 20px
						margin-right $padding-sm
						line-height @height
						text-align center
						font-size $font-size-sm
						border-radius 2px
						transition(opacity)
					}
				}
			}
		}
		
		.app.mobile-layout & {
			width 100%
		}
	}
</style>