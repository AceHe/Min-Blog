import BezierEasing from 'bezier-easing'

export const $ = selector => document.querySelector(String(selector))
export const easing = {
	'ease': [0.25, 0.1, 0.25, 1.0],
	'linear': [0.00, 0.0, 1.00, 1.0],
	'ease-in': [0.55, 0.055, 0.675, 0.19],
	'ease-out': [0.215, 0.61, 0.355, 1],
	'ease-in-out': [0.645, 0.045, 0.355, 1]
}

// 获取target的scroll top
export const getScroll = (target, top) => {
	const prop = top ? 'pageYOffset' : 'pageXOffset';
	let ret = target[prop];
	if (typeof ret !== 'number') {
		ret = (window.document.documentElement)[top ? 'scrollTop' : 'scrollLeft'];
	}
	return ret
}

// 获取element的offset
export const getOffset = (element) => {
	const rect = element.getBoundingClientRect();
	const scrollTop = getScroll(window, true);
	const scrollLeft = getScroll(window);
	const docElem = window.document.body;
	const clientTop = docElem.clientTop || 0; // 元素边框的厚度
	const clientLeft = docElem.clientLeft || 0;

	return {
		top: rect.top + scrollTop - clientTop, // 元素距离顶部的高度
		left: rect.left + scrollLeft - clientLeft //元素距离右边的宽度
	}
}

export const scrollTo = (element = null, duration = 500, options = {}) => {

	if (typeof element === 'string') {
		element = $(element)
	}
	if (element === undefined || element === null) {
		return
	}

	options.easing = options.easing || easing.linear;

	const page = $('html, body');
	let initialY = page.scrollTop;
	let elementY = 0;

	if (Object.is(typeof element, 'number')) {
		elementY = element
	} else {
		elementY = initialY + (element).getBoundingClientRect().top
	}

	let targetY = page.scrollHeight - elementY < window.innerHeight
	  ? page.scrollHeight - window.innerHeight
	  : elementY

	if (options.offset) {
		targetY += options.offset
	}

	let diff = targetY - initialY;
	let be = BezierEasing.apply(BezierEasing, options.easing);
	let start;

	let done = () => {
		options.onDone && options.onDone()
	}

	if (!diff) return;

	window.requestAnimationFrame(function step (timestamp) {
		if (!start) start = timestamp;

		const time = timestamp - start;
		let progress = Math.min(time / duration, 1);
		progress = be(progress);

		window.scrollTo(0, initialY + diff * progress);

		if (time < duration) {
			window.requestAnimationFrame(step)
		} else {
			done()
		}
	})
}