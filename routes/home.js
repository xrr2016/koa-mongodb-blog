module.exports = {
  async index(ctx, next) {
    await ctx.render('index', {
      title: 'This a title',
      desc: 'Here is description.'
    })
  }
}
