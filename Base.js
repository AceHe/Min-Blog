import Vue from 'vue'
import { parseTime, monthFilter, constantFilter } from '@/utils/filters'

let extendsObj = {

	layout({ store }) {
		const mobileLayout = store.getters['app/mobileLayout'];
		if (mobileLayout) return 'mobile';
		return 'default';
	},

	computed: {
		mobileLayout(){
			return this.$store.getters['app/mobileLayout']
		}
	},

	filters: {
        monthFilter(value) {
            if (!value) return '';
            return monthFilter(value)
        },
        constantFilter(value) {
            if (!value) return '';
            return constantFilter(value)
        },
        dateFormat(value) {
            if (!value) return '';
            return parseTime(value)
        },
    }
}

export default extendsObj;