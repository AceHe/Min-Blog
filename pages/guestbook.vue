<template>
	<section class="guestbook-page">
		<Modal :title="'我的留言'"  
			:showInputBox="showInputBox" 
			@changeBoxState='changeBoxState'>
			<CommentInputBox 
				style="box-shadow: none;" 
				ref="inputBox"
				:is-message="true"
				@on-publish="handlePublish"></CommentInputBox>
		</Modal>

		<div class="submit-field">
			<div class="welcome">
				<i class="icon icon-quote-up"></i>
				有故事的人说着他自己的故事，坐在他跟前的人喝着咖啡看着窗外，等他说完，深情看一眼，这是简称倾听者的路人。 ❤️
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

		<p class="no-data" v-if="guesbookTotal < 1 && !messageListFetching">空空如也</p>
		<transition name="fade" mode="out-in">
			<div class="indicator" v-if="messageListFetching || !hasNoMore">
				<pacman-loader v-if="messageListFetching" color="#f8e71c" size="20px"></pacman-loader>
				<button class="loadmore" v-else-if="!hasNoMore && messageList.length" @click="loadmore">继续翻</button>
			</div>
		</transition>
	</section>
</template>

<script>
	import CommentInputBox from '@/components/common/Comments/CommentInputBox'
	import Modal from '@/components/common/Modal'
	import MessageItem from '@/components/common/MessageItem'
	import Base from '@/Base'

	import { getGuestbooks, addGuestbook } from '@/api/index'

	export default {
		name: 'Guestbook',
		components: {
			CommentInputBox,
			Modal,
			MessageItem
		},
		extends: Base,
		head () {
			return {
				title: '小何才露尖尖角 - 留言墙'
			}
		},
		fetch ({ store }) {
			store.commit('app/SET_FULL_COLUMN', true)
			return Promise.resolve()
		},
		computed: {
			hasNoMore(){
				return this.page * this.limt >= this.guesbookTotal
			}
		},
		data(){
			return{
				columnNum: 3, // 留言墙分几列
				columnData: [], // 留言墙列表
				columnStyle: {}, // 留言墙宽度
				columnCount: 0, // 计算留言排列顺序

				messageList: [],
				guesbookTotal: 0, // 总留言条数
				messageListFetching: false,

				page: 1,
				limt: 9,

				friendInputBox: true, // 判断是否是第一次进入申请友链
				showInputBox: false,	
			}
		},
		created(){
			// 留言墙列表 初始化
			this.columnData = this.mobileLayout ? [] : [[],[],[]];
			this.columnNum = this.mobileLayout ? 1 : 3;

			// 留言墙 每列宽度
			this.columnStyle = {
				flexBasis: (100 / this.columnNum) + '%'
			};

			this.getGuestbook();
		},
		mounted(){
			
		},
		methods: {
			// 获取留言墙列表
			async getGuestbook() {
				let data = {
					page: this.page,
					limt: this.limt
				}
                const res = await getGuestbooks(data);
                
                this.messageList = res.data.data;
                this.guesbookTotal = res.data.total;

                if( this.mobileLayout ){
                	this.columnData.push( this.messageList )
                }else{
					for( let item of this.messageList ){
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
					};                	
                }

                //	判断是不是申请友链
                if ( this.from() === 'about' && this.friendInputBox ) {
					this.openBox()
					this.$nextTick(() => {
						let inputBox = this.$refs.inputBox;
						inputBox.content = `友链申请\n称呼：\n网站：\nGithub(如果有)：\n`
						inputBox.focus();
					})
				}else{
					this.showInputBox = false;
				}

				this.messageListFetching = false;
            },

			// opne Modal
			openBox(){
				this.showInputBox = true;
			},

			// close Modal
			changeBoxState(){
				this.showInputBox = false;
				this.friendInputBox = false;
			},

			// 加载更多
			loadmore(){
				this.messageListFetching = true;
				this.page++;
				this.getGuestbook();
			},

			// 点赞留言
			handleLike(uuid, index){
				var columnArr = this.mobileLayout ? this.columnData[0] : this.columnData[index];
				for( let item of columnArr ){
					if( item.uuid == uuid ){
						item.person.ups++
					}
				}
			},

			// 发表留言
			async handlePublish( data, type ){
				if( type != 0 ) return;
				const res = await addGuestbook(data);
                if( res.data.code == 0 ){
                	this.friendInputBox = false;
                	this.changeBoxState();

     				this.page = 1;
					this.columnCount= 0;
					this.columnData = this.mobileLayout ? [] : [[],[],[]];
					this.getGuestbook();
                }
			},

			// 获取地址栏参数
			from () {
			    return this.$route.query.from
			}

		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/style/init'

	.guestbook-page {
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
			width 100%
			
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
