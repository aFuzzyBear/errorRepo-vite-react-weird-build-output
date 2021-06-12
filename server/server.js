const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')

const rootDir = __dirname.split('/').filter((curr)=>curr !== 'server').join('/')

async function server(){
    const app = express()

    const vite = await createViteServer({
        server:{
            middlewareMode:'ssr'
        }
    })

    app.use(vite.middlewares)

    app.use('*',async(req,res)=>{
        const url = req.originalUrl

        try {
            // Read the index.html
   
            let template = await fs.readFileSync(
                `${rootDir}/index.html`, "utf-8"
            )
            // Apply the HTML Transformation, injects HMR and Vite plugins
            template = await vite.transformIndexHtml(url,template)
            // Load the server entry
            const {render} = await vite.ssrLoadModule(`${rootDir}/src/entry-server.jsx`)
            // render the app
            const appHTML = await render(url)
            // inject the rendered app into the html
            const html = template.replace(`<!--ssr-outlet-->`,appHTML)
            // Send back the rendered app
            res.status(200).set({
                "Content-Type":"text/html"
            }).end(html)
        } catch (error) {
            vite.ssrFixStacktrace(error)
            console.error(error);
            res.status(500).end(error.message)
        }
    })
    app.listen(PORT)
}
const PORT = 8080

server()

console.log(`server is running on http://localhost:${PORT}`);
// console.log(rootDir,template);