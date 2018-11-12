<template>
	<section class="guestbook-page">
		<Modal :title="'我的留言'"  
			:showInputBox="showInputBox" 
			@changeBoxState='changeBoxState'>
			<CommentInputBox style="box-shadow: none;" ref="inputBox" is-message></CommentInputBox>
		</Modal>

		<div class="submit-field">
			<div class="welcome">
				<i class="icon icon-quote-up"></i>
				人的平均寿命77岁，一共28105天，67w小时，4047w分钟，24亿秒左右，这10秒你在读这段话，这10秒你属于我。你好陌生人，我爱你 ❤️
				<i class="icon icon-quote-down"></i>
			</div>
			<div class="submit">
				<button class="submit-btn" @click="openBox">我要上墙</button>
			</div>
			<div class="count">
				<span>已有 18 条留言</span>
			</div>
		</div>

		<transition-group tag="div" name="fade" mode="out-in" class="list-field">
			<transition-group tag="div" name="fade" mode="out-in" class="column" :style="columnStyle" v-for="(item, index) in columnData" :key="index">
				<MessageItem v-for="m in item" :key="m._id" :message="m"></MessageItem>
			</transition-group>
		</transition-group>

		<!-- <p class="no-data">空空如也</p>

		<transition name="fade" mode="out-in">
			<div class="indicator">
				<button class="loadmore">来，继续翻</button>
			</div>
		</transition> -->
	</section>
</template>

<script>
	import CommentInputBox from '@/components/common/Comments/CommentInputBox'
	import Modal from '@/components/common/Modal'

	import MessageItem from '@/components/common/MessageItem'

	export default {
		name: 'Guestbook',
		components: {
			CommentInputBox,
			Modal,
			MessageItem
		},
		head () {
			return {
				title: '留言墙'
			}
		},
		data(){
			return{
				columnNum: 3,
				columnData: [],
				columnStyle: {},

				showInputBox: false,	
			}
		},
		created(){

			this.columnData = [[{
				_id: 0,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Ace'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 1,
			    author: {
					_id: 1,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Fce'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 2,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Lce'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 3,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'LFe'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			}],[{
				_id: 0,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Ace'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 1,
			    author: {
					_id: 1,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Fce'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 2,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Lce'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 3,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'LFe'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			}],[{
				_id: 0,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Ace'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 1,
			    author: {
					_id: 1,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Fce'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 2,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'Lce'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			},{
				_id: 3,
			    author: {
					_id: 0,
					site: 'https://www.baiud.com/',
					avatar: 'https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro',
					name: 'LFe'
			    },
                renderedContent: 'aaaa',
                ups: 'aaaa',
                createdAt: 'aaaa'
			}]],

			this.columnStyle = {
					flexBasis: (100 / this.columnNum) + '%'
			}

		},
		methods: {
			// opne Modal
			openBox(){
				this.showInputBox = true;
			},

			// close Modal
			changeBoxState(){
				this.showInputBox = false;
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.guestbook-page {
		width 100%

		.submit-field {
			margin 48px 0
			text-align center

			.welcome {
				position relative
				width 600px
				max-width calc(100% - 64px)
				line-height 1.8
				margin 0 auto
				font-size $font-size-lger
				text-shadow 0 5px 20px var(--light-color-light)

				.icon {
					position absolute
					font-size $font-size-sm
				}

				.icon-quote-up {
					top -12px
					left -12px
				}

				.icon-quote-down {
					bottom -12px
					right -12px
				}
			}

			.submit-btn {
				margin 36px 0 $padding-md
				padding 6px 32px
				background linear-gradient(135deg, #f21368 0%, #E80505 100%)
				color var(--light-color)
				border none
				box-shadow 0 4px 8px rgba(#E80505, .3)

				&:hover {
					box-shadow 0 4px 25px rgba(#E80505, .4)
				}
			}

			.count {
				color var(--text-color-secondary)
			}
		}

		.list-field {
			flexLayout(, flex-start, flex-start)
			margin 0 (0 - $padding-xs)

			.column {
				flex 1 0
				padding 0 $padding-xs
				overflow hidden
			}
		}

		.app.mobile-layout & {
			.slogan {
				font-size $font-size-base
			}

			.list-field {
				margin 0

				.column {
					padding 0 $padding-sm
				}
			}

			.indicator {
				padding 0 $padding-sm
			}
		}
	}
</style>
