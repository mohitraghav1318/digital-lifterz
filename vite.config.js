import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Readable } from 'node:stream'

function vercelApiDevPlugin() {
  return {
    name: 'digital-lifterz-vercel-api-dev',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        try {
          const pathname = req.url?.split('?')[0] || '/'
          const route = pathname === '/' ? '/services' : pathname
          const handlerPath = route.endsWith('/')
            ? route.slice(0, -1)
            : route
          const modulePath = new URL(`./api${handlerPath}.js`, import.meta.url)
          const apiModule = await import(`${modulePath.href}?t=${Date.now()}`)

          if (typeof apiModule.default !== 'function') {
            return next()
          }

          const origin = `http://${req.headers.host || 'localhost'}`
          const requestUrl = new URL(req.url || '/', `${origin}/api`)
          const method = req.method || 'GET'
          const hasBody = !['GET', 'HEAD'].includes(method)
          const request = new Request(requestUrl, {
            method,
            headers: req.headers,
            body: hasBody ? Readable.toWeb(req) : undefined,
            duplex: hasBody ? 'half' : undefined,
          })

          const response = await apiModule.default(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => {
            res.setHeader(key, value)
          })

          const body = Buffer.from(await response.arrayBuffer())
          res.end(body)
        } catch (error) {
          if (error.code === 'ERR_MODULE_NOT_FOUND') {
            return next()
          }

          server.ssrFixStacktrace(error)
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: error.message || 'API error.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  if (!process.env.ADMIN_SESSION_SECRET && mode !== 'production') {
    process.env.ADMIN_SESSION_SECRET = 'local-development-session-secret-32'
  }

  return {
  plugins: [
    react(),
    tailwindcss(),
    vercelApiDevPlugin(),
  ],
  }
})
