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
								<li class="month-item"  v-for="month in archive.months" :key="month.month">
									<h4 class="month">{{ month.monthStr | monthFilter }}</h4>
									<ul class="list article-list">
										<li class="article-item" v-for="article in month.articles" :key="article._id">
											<article class="article">
												<time class="time" :datatitme="article.createdAt">
													{{ article.createdAt }}
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

	import { getArchive } from '@/api/index'

	export default {
		name: 'Archive',
		components: {
			Card
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
		data(){
			return {
				archives: [],
				archivesCount: 0,
				archivesFetching: false,
			}
		},
		head () {
			return {
				title: '归档'
			}
		},
		created(){
			this.getArchive();
		},
		methods: {
			async getArchive() {
				const res = await getArchive();
				if( res.data.code == 0 ){
                    this.archives = res.data.data;
                    this.archivesCount = res.data.total;
                }else{
                    console.log('ip', res.data)
                }
			},
			getConstantItem(source){
                if( source == 1 ) return 'translate';
                if( source == 2 ) return 'reprint';
                if( source == 3 ) return 'original';
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
	}
</style>