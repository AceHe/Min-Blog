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