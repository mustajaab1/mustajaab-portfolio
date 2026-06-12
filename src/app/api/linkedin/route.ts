import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dbPosts = await prisma.linkedInPost.findMany({
      orderBy: { publishedAt: 'desc' },
    });

    const defaultPosts = [
      {
        id: 'li-1',
        title: 'How to build stateful multi-agent systems using LangGraph conditional routers',
        category: 'LangGraph',
        thumbnail: null,
        postUrl: 'https://www.linkedin.com/in/mustajaab/',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'li-2',
        title: 'Optimizing parent-document retrieval algorithms for high-density corporate PDF parsing',
        category: 'RAG',
        thumbnail: null,
        postUrl: 'https://www.linkedin.com/in/mustajaab/',
        publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'li-3',
        title: 'Why standard keyword lookup fails and how semantic embeddings indices save developer resources',
        category: 'AI Engineering',
        thumbnail: null,
        postUrl: 'https://www.linkedin.com/in/mustajaab/',
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'li-4',
        title: 'Constructing robust tool-calling pipelines using LangChain & Structured Outputs bindings',
        category: 'LangChain',
        thumbnail: null,
        postUrl: 'https://www.linkedin.com/in/mustajaab/',
        publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    const posts = dbPosts.length > 0 ? dbPosts : defaultPosts;

    return NextResponse.json({ success: true, posts });
  } catch (err) {
    console.error('LinkedIn GET error:', err);
    return NextResponse.json({ success: false, error: 'Database query failed' }, { status: 500 });
  }
}
