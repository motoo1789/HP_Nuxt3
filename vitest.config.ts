import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
    test: {
        environmentOptions: {
			nuxt: {
				mock: {
					intersectionObserver: true,
					indexedDb: true,
				}
			}
		 }
    }
})