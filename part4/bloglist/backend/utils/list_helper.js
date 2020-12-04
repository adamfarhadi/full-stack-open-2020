const dummy = (blogs) => {
  return blogs ? 1 : 0
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blogEntry) => sum + blogEntry.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}