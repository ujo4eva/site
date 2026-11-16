import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const mixes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mixes' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    date: z.date(),
    order: z.number().int().positive(),
    embedUrl: z.string().url(),
    genre: z.string().optional(),
    description: z.string().optional(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    videoUrl: z.string().url(),
    role: z.enum(['edited', 'graded', 'edited & graded']),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    /** Source code. Leave out for private projects. */
    repo: z.string().url().optional(),
    /** Live site or app, if there is one. */
    url: z.string().url().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional().default(false),
  }),
});

// Work merged into other people's projects. One entry per upstream repo.
const contributions = defineCollection({
  loader: file('./src/content/contributions.json'),
  schema: z.object({
    repo: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    prs: z.array(z.object({ title: z.string(), url: z.string().url() })).min(1),
  }),
});

export const collections = { blog, mixes, videos, projects, contributions };