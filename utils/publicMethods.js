//数组排序-从大到小
export const sortByKey = (array,key) => {
	return array.sort(function(a,b){
		var x = a[key];
		var y = b[key];
		return ( (x>y) ? -1 : ( (x<y) ? 1 : 0 ) );
	});
}

// 文章类型转换
export const sourceTranslate = (source) => {
	if( source == 1 ) return 'translate';
    if( source == 2 ) return 'reprint';
    if( source == 3 ) return 'original';
}