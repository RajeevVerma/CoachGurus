module.exports = {
  developMiddleware: app => {
    app.use(
      "/api",
      proxy({
        target: "http://localhost:3000",
      })
    )
  },
}