import { getCollection } from 'astro:content';

export interface Section {
  href: string;
  label: string;
  blurb: string;
  count: number;
}

/**
 * Site sections that have published content, in display order.
 * Shared by the nav and the homepage index so both hide empty sections
 * (and drafts) the same way.
 */
export async function getSections(): Promise<Section[]> {
  const [mixes, videos, projects, posts] = await Promise.all([
    getCollection('mixes'),
    getCollection('videos', ({ data }) => !data.draft),
    getCollection('projects'),
    getCollection('blog', ({ data }) => !data.draft),
  ]);

  return [
    { href: '/mixes', label: 'mixes', blurb: "songs i've mixed", count: mixes.length },
    { href: '/videos', label: 'videos', blurb: "stuff i've cut and graded", count: videos.length },
    { href: '/projects', label: 'projects', blurb: "things i've built", count: projects.length },
    { href: '/blog', label: 'writing', blurb: 'notes, occasionally', count: posts.length },
  ].filter((section) => section.count > 0);
}
