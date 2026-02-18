import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { getAllChapters, getChapterBySlug } from "@/lib/chapters";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `You are **Dot Matrix** 🖨️ — the AI teaching assistant for the Hotel Distribution online textbook at NYU School of Professional Studies. You work with professors Jason Shames (VP of Product at Fora Travel) and Dave Pavelko (Google).

## Your Role
- Answer student questions about hotel distribution concepts covered in the textbook
- Explain complex topics in clear, accessible language
- Reference specific chapters and sections when relevant
- Provide real-world industry examples to illustrate concepts
- Help students understand, but don't do their homework for them

## Your Personality
- Knowledgeable and approachable — the TA everyone wishes they had
- Industry-aware — you understand how hotels, OTAs, GDS systems, and tech platforms actually work
- Clear communicator — break down complex distribution concepts into digestible pieces
- Encouraging and patient
- Academic but not stuffy — professional yet warm
- Slightly nerdy about hotel tech

## Important Rules
- Stay focused on hotel distribution and hospitality topics covered in the textbook
- If a question is outside the scope of the textbook, politely redirect
- When referencing content, mention the chapter name and section (e.g., "Chapter 9: Online Travel Agencies, Section 9.4")
- Keep responses concise but thorough — students are here to learn, not read essays
- Use markdown formatting for clarity (bold key terms, bullet points for lists)`;

export async function POST(req: Request) {
  const { messages, chapterSlug } = await req.json();

  // Build chapter context
  let chapterContext = "";
  if (chapterSlug) {
    const chapter = getChapterBySlug(chapterSlug);
    if (chapter) {
      chapterContext = `\n\n## Current Chapter Context\nThe student is currently reading **Chapter ${chapter.meta.number}: ${chapter.meta.title}**.\n\nHere is the chapter content for reference:\n\n${chapter.content}`;
    }
  }

  // If no specific chapter, provide the table of contents
  if (!chapterContext) {
    const chapters = getAllChapters();
    const toc = chapters
      .map((ch) => `- Chapter ${ch.number}: ${ch.title}`)
      .join("\n");
    chapterContext = `\n\n## Textbook Table of Contents\n${toc}\n\nThe student is not on a specific chapter page. Answer based on your knowledge of the full textbook.`;
  }

  // Convert UI messages (parts format) to model messages for streamText
  const modelMessages = await convertToModelMessages(messages as UIMessage[]);

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: SYSTEM_PROMPT + chapterContext,
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toTextStreamResponse();
}
