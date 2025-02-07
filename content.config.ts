import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    works: defineCollection({
      type: 'data',
      source: 'works/*.yml',
      schema: z.object({
        role: z.string(),
        description: z.string(),
        company: z.string(),
        location: z.string(),
        employment: z.string(),
        about: z.string(),
        start_date: z.string(),
        end_date: z.string(),
        objectives: z.string(),
        stacks: z.string(),
        note: z.string(),
      })
    })
  }
})

