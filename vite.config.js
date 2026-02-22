import { defineConfig } from "vite"

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                register: 'src/pages/register.html',
                login: 'src/pages/login.html',
                feed: 'src/pages/feed.html',
                profile: 'src/pages/profile.html',
                post: 'src/pages/post.html'
            }
        }
    }
})