// _________________поменяла Import_________________
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = __dirname
const outDir = path.resolve(root, 'docs')

// ________________Добавила путь scr________________
const pages = {
  main: {
    file: 'index.html',
    chunks: ['/src/javascripts/index.js', '/src/javascripts/allStyles.js']
  }
}

const chunksByFile = Object.fromEntries(
  Object.values(pages).map(({ file, chunks }) => [file, chunks])
)

function pageChunksPlugin() {
  return {
    name: 'page-chunks',

    transformIndexHtml: {
      order: 'pre',

      handler(html, ctx) {
        const relFile = path
          .relative(root, ctx.filename)
          .split(path.sep)
          .join('/')

        const chunks = chunksByFile[relFile]

        if (!chunks) return html

        return {
          html,
          tags: chunks.map((src) => ({
            tag: 'script',
            attrs: {
              type: 'module',
              src
            },
            injectTo: 'body'
          }))
        }
      }
    }
  }
}

export default defineConfig(({ command }) => ({
  root,
  base: './',

  plugins: [pageChunksPlugin()],

  build: {
    outDir,
    emptyOutDir: true,

    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, { file }]) => [
          name,
          path.resolve(root, file)
        ])
      )
    }
  },

  server: {
    open: true
  }
}))
