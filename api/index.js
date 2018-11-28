import Server from './http'

// 获取网站配置
export function getWebsite() {
  return Server({
    url: '/api/blog/website',
    method: 'GET'
  })
}

// 获取友情链接
export function getFriendLink() {
  return Server({
    url: '/api/blog/friendlink',
    method: 'GET'
  })
}

// 获取分类
export function getCategorys() {
  return Server({
    url: '/api/blog/category',
    method: 'GET'
  })
}

// 获取标签
export function getTags() {
  return Server({
    url: '/api/blog/tag',
    method: 'GET'
  })
}

// 获取热门文章
export function getHots() {
  return Server({
    url: '/api/blog/hot',
    method: 'GET'
  })
}

// 获取归档
export function getArchive() {
  return Server({
    url: '/api/blog/archive',
    method: 'GET'
  })
}

// _______文章__________________________ //

// 获取全部文章列表
export function getArticleList(data) {
  return Server({
    url: '/api/blog/article',
    method: 'POST',
    data: data
  })
}

// 获取文章内容
export function getArticleContent(data) {
  return Server({
    url: '/api/blog/article/uuid',
    method: 'POST',
    data: data
  })
}

// _______留言墙______________________ //

// 留言墙 -- 添加留言
export function addGuestbook(data) {
  return Server({
    url: '/api/blog/guestbook',
    method: 'POST',
    data: data
  })
}

// 留言墙 -- 获取留言
export function getGuestbooks(data) {
  return Server({
    url: '/api/blog/guestbookbypage',
    method: 'POST',
    data: data
  })
}

// 留言墙 -- 点赞留言
export function setGuestbookLike(data) {
  return Server({
    url: '/api/blog/guestbook',
    method: 'PUT',
    data: data
  })
}