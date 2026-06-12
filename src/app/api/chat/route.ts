import { NextResponse } from 'next/server';

const PORTFOLIO_CONTEXT = `
Name: Mustajaab Qadri
Title: AI Engineer | GenAI Developer | Software Engineering Student
Location: Multan, Pakistan
Email: mustajaabx@gmail.com
LinkedIn: https://www.linkedin.com/in/mustajaab/
GitHub: https://github.com/mustajaab1
Education: BS Software Engineering at Ghulam Ishaq Khan Institute (GIKI) (2023 - 2027)

Bio: Passionate AI Engineer specializing in Generative AI, LLMs, RAG Systems, AI Agents, LangChain, LangGraph, NLP, and Full Stack Development. Enthusiastic about building intelligent, real-world applications.

Skills Matrix:
- Generative AI: LangChain, LangGraph, LlamaIndex, RAG Systems, Prompt Engineering, Agentic AI, LLMOps
- Machine Learning: PyTorch, TensorFlow, Keras, Scikit-learn
- Data Science: Pandas, NumPy, EDA (Exploratory Data Analysis), Feature Engineering
- Databases & Vector Search: PostgreSQL, Pinecone, ChromaDB, FAISS
- Web Development: React, Next.js, Node.js, JavaScript, TypeScript, Tailwind CSS
- Developer Tools: Git, GitHub, OpenCV, Streamlit

Professional Experience & Leadership:
1. Microsoft Learn Student Club GIKI: Progression from Web Dev Team Member -> Tech Head -> Learning & Development Head. Led a 20-member team, designed technical learning programs, and increased student engagement by 30-50%.
2. SOPHEP GIKI: Progression from Tech & Sponsorship Subhead -> GIMUN Liaison Head -> Tech Head. Managed a 50-member team, directed tech operations, built a campus-wide event registration portal handling 1,000+ users, and reduced manual workload by 40%.

Project Portfolio:
1. AI PDF Chatbot: LangChain-powered RAG application for semantic document search and conversational interaction with PDFs. Tech: Python, LangChain, FAISS, OpenAI, Streamlit.
2. MindMate: AI-powered mental health platform using NLP and Computer Vision for emotion detection and wellness recommendations. Tech: Python, OpenCV, Machine Learning.
3. AI Resume Analyzer: Intelligent resume screening and job-matching system using NLP and LLM technologies. Tech: Python, LangChain, Transformers.
4. LooksMaximizer: Facial analysis application using computer vision and machine learning. Tech: Python, OpenCV.
5. Gikify: Campus marketplace platform. Tech: React, Node.js, PostgreSQL, REST APIs.

Future Career Goals:
Aspires to work as an AI Engineer / GenAI Engineer, specializing in deploying production-ready Agentic AI systems, advanced RAG architectures, and collaborative multi-agent workflows (LangGraph). Available for internships, freelance projects, and research collaborations.
`;

const SYSTEM_PROMPT = `
You are a helpful, professional, and friendly AI assistant representing Mustajaab Qadri, an AI Engineer and Software Engineering Student.
Your task is to answer recruiter or visitor questions about Mustajaab accurately, enthusiastically, and concisely using the provided portfolio context.

Guidelines:
1. Be polite, professional, and welcoming.
2. Rely only on the portfolio context provided below. Do not make up achievements.
3. Keep answers under 3-4 sentences when possible to maintain user engagement.
4. If asked about contact details, provide his email (mustajaabx@gmail.com) and LinkedIn link.
5. If the answer cannot be found in the context, politely suggest contacting Mustajaab directly.

PORTFOLIO CONTEXT:
${PORTFOLIO_CONTEXT}
`;

// Helper: Rule-based fallback chatbot when no keys are available
function getLocalFallbackResponse(query: string): string {
  const lowercaseQuery = query.toLowerCase();

  if (
    lowercaseQuery.includes('hello') ||
    lowercaseQuery.includes('hi') ||
    lowercaseQuery.includes('hey')
  ) {
    return "Hi there! I'm Mustajaab's AI assistant. I can tell you about his AI projects, technical skills, leadership experience, or how to contact him. What would you like to know?";
  }

  if (lowercaseQuery.includes('skill') || lowercaseQuery.includes('technolog') || lowercaseQuery.includes('know')) {
    return "Mustajaab is highly skilled in Generative AI (LangChain, LangGraph, RAG, Prompt Engineering, Agentic AI), Machine Learning (PyTorch, TensorFlow, Scikit-learn), Databases (PostgreSQL, Pinecone, ChromaDB, FAISS), Web Development (React, Next.js, Node.js, TS/JS, Tailwind), and tools like OpenCV and Streamlit.";
  }

  if (lowercaseQuery.includes('project') || lowercaseQuery.includes('portfolio') || lowercaseQuery.includes('built')) {
    return "Mustajaab has built several notable projects including: \n1. AI PDF Chatbot (RAG app utilizing LangChain + FAISS)\n2. MindMate (mental health platform with OpenCV emotion detection)\n3. AI Resume Analyzer (NLP screening tool)\n4. LooksMaximizer (CV facial analysis)\n5. Gikify (campus marketplace). You can view details and GitHub links in the Projects section above!";
  }

  if (lowercaseQuery.includes('experience') || lowercaseQuery.includes('job') || lowercaseQuery.includes('work') || lowercaseQuery.includes('leader')) {
    return "Mustajaab has strong leadership experience at GIKI: he is the Tech Head & Learning/Dev Head of the Microsoft Learn Student Club, leading 20+ members, and is also the Tech Head of SOPHEP, where he built a registration system handling 1,000+ users and managed 50+ members.";
  }

  if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('hire') || lowercaseQuery.includes('email') || lowercaseQuery.includes('linkedin') || lowercaseQuery.includes('reach')) {
    return "You can contact Mustajaab directly via email at mustajaabx@gmail.com, connect with him on LinkedIn (linkedin.com/in/mustajaab/), or submit a message through the contact form at the bottom of this page. He's open to internships and AI engineering opportunities!";
  }

  if (lowercaseQuery.includes('education') || lowercaseQuery.includes('university') || lowercaseQuery.includes('college') || lowercaseQuery.includes('giki')) {
    return "Mustajaab is currently pursuing his BS in Software Engineering at the Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI) (2023 - 2027), located in Pakistan.";
  }

  if (lowercaseQuery.includes('chat') || lowercaseQuery.includes('agent') || lowercaseQuery.includes('bot') || lowercaseQuery.includes('rag')) {
    return "Mustajaab builds advanced agentic AI systems using LangGraph, LangChain, and RAG. This very assistant can run on Gemini or OpenAI, or fall back to rule-based logic if API keys aren't configured!";
  }

  return "I'm Mustajaab's AI assistant. I can help you evaluate his fit as an AI Engineer! Ask me about his projects (like the PDF Chatbot), skills (such as LangGraph/LangChain), GIKI university details, or leadership experience.";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required.' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content;

    // 1. Try Google Gemini API if key is present
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\nUser Question: ${latestMessage}\nAnswer:`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 250,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (answer) {
            return NextResponse.json({ role: 'assistant', content: answer.trim() });
          }
        }
      } catch (geminiErr) {
        console.error('Gemini API call failed:', geminiErr);
      }
    }

    // 2. Try OpenAI API if key is present
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.map((m: any) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.3,
            max_tokens: 250,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const answer = data.choices?.[0]?.message?.content;
          if (answer) {
            return NextResponse.json({ role: 'assistant', content: answer.trim() });
          }
        }
      } catch (openaiErr) {
        console.error('OpenAI API call failed:', openaiErr);
      }
    }

    // 3. Fallback to Local Keyword Bot if no keys or API failed
    const fallbackAnswer = getLocalFallbackResponse(latestMessage);
    return NextResponse.json({ role: 'assistant', content: fallbackAnswer });
  } catch (err: any) {
    console.error('Error in chat API route:', err);
    return NextResponse.json({ role: 'assistant', content: 'Sorry, I encountered an internal error. Please feel free to email Mustajaab at mustajaabx@gmail.com!' });
  }
}
