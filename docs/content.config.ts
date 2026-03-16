import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    components: defineCollection({
      type: 'page',
      source: 'components/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        status: z.enum(['stable', 'beta', 'deprecated']).optional().default('stable'),
      }),
    }),
  },
})
