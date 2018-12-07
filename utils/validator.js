// 验证是否是移动端
export const isMobile = (ua = '') => {
	if (!ua && window) {
		ua = window.navigator.userAgent
	}
	if (ua) {
		return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(ua)
	}
	return false
}