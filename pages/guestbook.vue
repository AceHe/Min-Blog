<template>
	<section class="guestbook-page">
		<Modal :title="'我的留言'"  
			:showInputBox="showInputBox" 
			@changeBoxState='changeBoxState'>
			<CommentInputBox 
				style="box-shadow: none;" 
				ref="inputBox" 
				is-message
				@addGuesbook="getGuestbook"></CommentInputBox>
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
				<span>已有 {{guesbookTotal}} 条留言</span>
			</div>
		</div>

		<transition-group v-if="guesbookTotal > 0" tag="div" name="fade" mode="out-in" class="list-field">
			<transition-group tag="div" name="fade" mode="out-in" class="column" :style="columnStyle" v-for="(item, index) in columnData" :key="index">
				<MessageItem 
					v-for="m in item" 
					:key="m.uuid" 
					:message="m"
					@updataLike="handleLike"></MessageItem>
			</transition-group>
		</transition-group>

		<p class="no-data" v-if="guesbookTotal == 0">空空如也</p>

		<transition name="fade" mode="out-in" v-if="!hasNoMore">
			<div class="indicator">
				<button class="loadmore" @click="loadmore">来，继续翻</button>
			</div>
		</transition>
	</section>
</template>

<script>
	import CommentInputBox from '@/components/common/Comments/CommentInputBox'
	import Modal from '@/components/common/Modal'
	import MessageItem from '@/components/common/MessageItem'

	import { getGuestbooks } from '@/api/index'

	import { mapMutations } from 'vuex'

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
		fetch ({ store }) {
			store.commit('app/SET_FULL_COLUMN', true)
			return Promise.resolve()
		},
		data(){
			return{
				columnNum: 3, // 留言墙分几列
				columnData: [], // 留言墙列表
				columnStyle: {}, // 留言墙宽度
				columnCount: 0, // 计算留言排列顺序

				guesbookTotal: 0, // 总留言条数

				page: 1,
				limt: 4,

				showInputBox: false,	
			}
		},
		computed: {
			hasNoMore(){
				let result = false;
				if( this.page * this.limt >= this.guesbookTotal ){
					result = true
				}
				return result;
			}
		},
		created(){

			// 留言墙 每列宽度
			this.columnStyle = {
				flexBasis: (100 / this.columnNum) + '%'
			};
			// 留言墙列表 初始化
			this.columnData = [[],[],[]];

			this.getGuestbook();

		},
		methods: {
			// 获取留言墙列表
			async getGuestbook() {
				let data = {
					page: this.page,
					limt: this.limt
				}
                const res = await getGuestbooks(data);
                
                let guesbook = res.data.data;
                this.guesbookTotal = res.data.total;

				for( let item of guesbook ){
					this.columnCount++
					if( this.columnCount % 3 == 1 ){
						item.index = 0;
						this.columnData[0].push( item )
					}else if( this.columnCount % 3 == 2 ){
						item.index = 1;
						this.columnData[1].push( item )
					}else{
						item.index = 2;
						this.columnData[2].push( item )
					}
				}
            },

			// opne Modal
			openBox(){
				this.showInputBox = true;
			},

			// close Modal
			changeBoxState(){
				this.showInputBox = false;
			},

			// 加载更多
			loadmore(){
				this.page++;
				this.getGuestbook();
			},

			// 点赞留言
			handleLike(uuid, index){
				for( let item of this.columnData[index] ){
					if( item.uuid == uuid ){
						item.ups++
					}
				}
			},

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
