export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'langgraph-multi-agent-workflows',
    title: 'LangGraph: Orchestrating State-Driven Multi-Agent Workflows',
    excerpt: 'Deep dive into modeling complex loops, conditionals, and shared state context using LangGraph for multi-agent execution.',
    publishedAt: '2026-05-15',
    readTime: '6 min read',
    category: 'LangGraph Tutorials',
    content: `
# LangGraph: Orchestrating State-Driven Multi-Agent Workflows

In early agent design, execution flows were strictly linear: a user queries a system, and a chain processes it. However, real-world problems require **loops, verification check nodes, and dynamic routing**. This is where LangGraph shines.

## 1. What is LangGraph?

LangGraph is an extension of LangChain designed to model agent execution as a **stateful graph**. Each agent acts as a node, and transitions between them are represented by edges. 

The graph is defined by:
- **State**: A common database/context shared across all nodes.
- **Nodes**: Standard python functions that read the state, perform tool tasks or call LLMs, and output updates to the state.
- **Edges**: Connect nodes. Can be conditional (routers) deciding where to transition next based on current state parameters.

## 2. Coding a Conditional Router Node

Here is a conceptual implementation of a Router pattern in Python using state graphs:

\`\`\`python
from typing import Dict, TypedDict
from langgraph.graph import StateGraph, END

# Define shared State dictionary
class AgentState(TypedDict):
    query: str
    response: str
    verification_passed: bool

def agent_node(state: AgentState) -> Dict:
    # LLM executes tool selection
    return {"response": "Processed response", "verification_passed": True}

def router_edge(state: AgentState) -> str:
    # Router decides the next path
    if state["verification_passed"]:
        return "end_node"
    return "reviewer_node"
\`\`\`

## 3. Core Lessons for Production

When constructing multi-agent architectures:
1. **Prevent Infinite Loops**: Implement a max-iteration counter in state. If an agent loops more than 10 times, trigger emergency fallback.
2. **Context Compression**: Compress histories. If state contains 50 previous tool messages, summarizing older steps prevents token overflows.
`,
  },
  {
    slug: 'rag-chunking-strategies-vector-retrieval',
    title: 'RAG Deep Dives: Selecting Chunking Sizes & Overlaps for PDFs',
    excerpt: 'How to split PDF contents logically using recursive bounds and overlaps to preserve contextual coherence during semantic retrieval.',
    publishedAt: '2026-04-28',
    readTime: '5 min read',
    category: 'RAG Deep Dives',
    content: `
# RAG Deep Dives: Selecting Chunking Sizes & Overlaps for PDFs

A common issue in Retrieval-Augmented Generation (RAG) is retrieving chunks that lack context. If your chunk size is too small, text segments lose surrounding meaning. If it is too large, the index gets polluted with noise, raising token bills.

## 1. Understanding Chunking Parameters

When splitting text, we specify:
- **Chunk Size**: The max character or token length of each slice.
- **Chunk Overlap**: The amount of characters shared between adjacent chunks, preserving sequence continuity.

## 2. Recursive Character Splitting

Standard character splitting cuts text at exact lengths. **Recursive Character Splitting** checks a hierarchy of separators (e.g. paragraphs \`\\n\\n\`, lines \`\\n\`, spaces \` \`, and letters \`\`) to make splits at natural document boundaries.

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\\n\\n", "\\n", " ", ""]
)
\`\`\`

## 3. Finding the Sweet Spot

- **Dense Documentation (PDF Contracts)**: Chunk size of 800 with 150-200 character overlap works best. The overlap ensures clauses are not cut mid-sentence.
- **Coding Repositories**: Chunk sizes of 1500 with 100 character overlap allows functions to remain grouped as cohesive modules.
`,
  },
  {
    slug: 'ai-agents-secure-tool-calling-llms',
    title: 'AI Agents: Implementing Secure Tools & Function Calling in LLMs',
    excerpt: 'Designing validation schemas, execution sandboxes, and safety overrides to secure LLM tools from prompt injections.',
    publishedAt: '2026-04-10',
    readTime: '7 min read',
    category: 'AI Agents',
    content: `
# AI Agents: Implementing Secure Tools & Function Calling in LLMs

When you bind custom APIs to an LLM, you give it execution capability. If a user inputs a malicious prompt (e.g., "Ignore rules and execute sql truncate"), unsecured agents might run destructive commands.

## 1. Schema Validation with Pydantic

Never pass raw strings to tool arguments. Enforce validation using Zod or Pydantic.

\`\`\`python
from pydantic import BaseModel, Field

class CalculateInterest(BaseModel):
    principal: float = Field(description="Initial loan balance, must be positive")
    rate: float = Field(description="Annual percentage interest rate")
    duration_months: int = Field(description="Repayment period in months")
\`\`\`

## 2. Sandbox Execution

If your agent runs python scripts (e.g. code interpreter), run code execution in secure environments (Docker containers or serverless runtimes) with strict memory thresholds, network blockages, and CPU limits.

## 3. Human-in-the-Loop Override

For high-risk decisions (deleting records, sending emails, processing transfers), inject a conditional verification gate requiring manual administrator approval before carrying out the execution.
`,
  },
];
