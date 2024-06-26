import { Auth } from '@auth/core'
import Discord from '@auth/core/providers/discord'
import Google from '@auth/core/providers/google'
import Auth0 from '@auth/core/providers/auth0'
import { eventHandler, toWebRequest } from 'h3'

export default eventHandler(async (event) =>
  Auth(toWebRequest(event), {
    basePath: '/r',
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      Auth0,
      Discord({
        clientId: process.env.AUTH_DISCORD_ID,
        clientSecret: process.env.AUTH_DISCORD_SECRET
      }),
      Google({
        clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
      })
    ]
  })
)
