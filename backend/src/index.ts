import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use( cors())

app.post('/generateImage', async (c) => {
  const {prompt} = await c.req.json()
  const result = await c.env.AI.run("@cf/stabilityai/stable-diffusion-xl-base-1.0",{
    prompt 
  })
  console.log(result)
  return new Response(result,{headers : { "content-Type" :"image/jpg"}} )
})
//`data:image/png;base64,${result}` 

export default app