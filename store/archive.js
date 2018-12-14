// 归档--获取
import { getArchive } from '@/api/index'
import { sortByKey } from '@/utils/publicMethods'

const SET_ARCHIVE = 'SET_ARCHIVE';  // 归档数据
const SET_COUNT = 'SET_COUNT';      // 文章数量

export const state = () => ({
	archive: [],
	count: 0
})

export const getters = {
	archive: state => state.archive,
	count: state => state.count
}

export const mutations = {
	SET_ARCHIVE (state, arg) {
		state.archive = arg
	},
	SET_COUNT (state, arg) {
		state.count = arg
	}
}

export const actions = {
	async getArchive ({ commit, state }) {
		const res = await getArchive();
		let data = sortByKey(res.data.data, 'createdAt');

		// 第一步处理 重构数据
        var fristArr = [];
        for( let item of data ){
        	let date = new Date( parseInt(item.createdAt) );
        	var obj = {
        		uuid: item.uuid,
        		year: date.getFullYear(),
        		month: date.getMonth() + 1,
        		day: date.getDate(),
        		yearMonth: date.getFullYear() + '-' + (date.getMonth() + 1),
        		monthDay: (date.getMonth() + 1) + '-' + date.getDate(),
        		title: item.title,
				source: item.source,
        	}
        	fristArr.push( obj )
        }

        // 第二步处理 整理出年份 按年份进行数组分类
        var yearCategory = [];
        var yearArr = [];
        for( let item of fristArr ){
        	yearArr.push( item.year )
        }
        yearArr = Array.from(new Set(yearArr));
        for( let yearItem of yearArr ){
        	var mArr = [];
        	for( let item of fristArr ){
        		if( item.year == yearItem ){
        			mArr.push( item )
        		}
        	}
        	yearCategory.push( mArr )
        }

        // 第三步处理 在年份的基础上整理出月份 按月份进行数组分类
        var monthCategory = [];
        for( let itemArr of yearCategory ){

        	var rusultArr = [];
        	var monthArr = [];
        	for( let item of itemArr ){
        		monthArr.push( item.month );
        	}
        	monthArr = Array.from(new Set(monthArr));
        	for( let monthItem of monthArr ){
        		var dArr = [];
        		for( let item of itemArr ){
        			if( item.month == monthItem ){
        				dArr.push( item )
        			}
        		}
        		rusultArr.push( dArr )
        	}
        	monthCategory.push( rusultArr );
        }

        // 第四步处理 按日期进行数组分类
        var dayCategory = [];
        for( let itemFArr of monthCategory ){
        	for( let itemSArr of itemFArr ){
        		var result = {
        			year: null,
        			months: {
            			month: null,
            			artic: []
            		}
        		}

        		var dayArr = [];
        		for( let itemTArr of itemSArr ){
					var obj = {
            			uuid: itemTArr.uuid,
						title: itemTArr.title,
						monthDay: itemTArr.monthDay,
						source: itemTArr.source,
            		}
            		dayArr.push( obj );

            		result.year = itemTArr.year;
            		result.months.month = itemTArr.month;
            		result.months.artic.push( obj );

        		}
        		dayCategory.push( result )
        	}
        }

        // 最终处理
        var defaultYear;
        var resultArr = [];
    	var num = 0;
        for( let item of dayCategory ){
        	var resultObj = {
        		year: null,
        		months: []
        	}
        	num++;
        	if( num == 1 ){
        		defaultYear = item.year;

        		resultObj.year = item.year;
        		resultObj.months.push( item.months );
        		resultArr.push( resultObj );
        	}else{
        		if( item.year == defaultYear ){
        			for( let itemYear of resultArr ){
        				if( itemYear.year == item.year ){
        					itemYear.months.push( item.months )
        				}
        			}
        		}else{
        			resultObj.year = item.year;
            		resultObj.months.push( item.months );
            		resultArr.push( resultObj );

            		defaultYear = item.year;
        		}
        	}
        }

        commit(SET_COUNT, res.data.total);
		commit(SET_ARCHIVE, resultArr);
		return res;
	}
}