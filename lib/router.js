'use strict'

const log = require('./log')
const Router = require('router')
const configRouter = require('./config-router')
const isAdmin = require('./mid/basic-auth')
const app = configRouter(Router())
const workerRouter = require('./router/worker')
const apikeyRouter = require('./router/apikey')

app.get('/test', (req, res, next) => {
  res.end('whwhwhw')
})
// render homepage
app.get('/',
  require('./router/getlink-api'),
  require('./router/render-homepage')
)

app.post('/',
  require('./router/getlink-demo'),
  require('./router/render-homepage')
)

app.get('/register', (req, res) => {
  res.end('Đang code !!!')
})

app.post('/register', (req, res) => {
  res.end('Đang code !!!')
})

app
  .use('/apikeys', isAdmin)
  .get('/apikeys',
    apikeyRouter.list
  )
  .get('/apikeys/create',
    apikeyRouter.create
  )
  .get('/apikeys/:id/remove',
    apikeyRouter.remove
  )

app
  .use('/workers', isAdmin)
  .get('/workers',
    workerRouter.renderList
  )
  .get('/workers/create',
    workerRouter.renderCreateForm
  )
  .post('/workers/create',
    workerRouter.handleCreate,
    workerRouter.renderCreateForm
  )
  .get('/workers/:id/remove',
    workerRouter.remove
  )

// simple err handle
app.use(
  (err, req, res, next) => {
    res.statusCode = 500
    log.error(err)
    res.end('Bần tăng đang bận đánh quái ở bãi train')
  }
)

module.exports = app
