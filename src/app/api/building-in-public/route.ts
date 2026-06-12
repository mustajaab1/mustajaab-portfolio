import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dbUpdates = await prisma.buildingInPublicUpdate.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Default updates matching user prompt if DB is empty
    const defaultUpdates = [
      {
        id: 'default-1',
        focus: 'LangGraph workflows and multi-agent systems orchestration.',
        streak: 42,
        experiment: 'Built multi-agent chatbot utilizing LangGraph for routing decisions.',
        win: 'Achieved complete conversational history preservation across complex agent handoffs.',
        lesson: 'Context variables must be structured carefully to prevent circular loop overflows in recursive agent calls.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'default-2',
        focus: 'Vector embeddings retrieval optimization and semantic search index tuning.',
        streak: 40,
        experiment: 'Built an AI PDF Chatbot using LangChain + FAISS.',
        win: 'Successfully optimized text splitting parameter thresholds, leading to 92% retrieval accuracy.',
        lesson: 'Learned vector embeddings require strict overlapping chunking (e.g., 200 character overlap) to preserve continuity.',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'default-3',
        focus: 'Advanced RAG pipelines and metadata filtering.',
        streak: 33,
        experiment: 'Built a multi-document RAG system with hierarchical document summaries.',
        win: 'Reduced retrieval token overhead by 35% through summaries indexing.',
        lesson: 'Indexing summaries separately from raw chunks prevents context saturation.',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    const updates = dbUpdates.length > 0 ? dbUpdates : defaultUpdates;

    return NextResponse.json({ success: true, updates });
  } catch (err) {
    console.error('Building in Public GET error:', err);
    return NextResponse.json({ success: false, error: 'Database query failed' }, { status: 500 });
  }
}
