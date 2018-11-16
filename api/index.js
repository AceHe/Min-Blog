import Server from './http'

// 获取分类
export function getArticles() {
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