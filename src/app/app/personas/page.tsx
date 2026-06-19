// ... existing code ...
const toneOptions = [
  { value: 'friendly', label: 'Friendly', desc: 'Warm, approachable, conversational', emoji: '😊' },
  { value: 'expert', label: 'Expert', desc: 'Knowledgeable, precise, authoritative', emoji: '🎓' },
  { value: 'premium', label: 'Premium', desc: 'Sophisticated, exclusive, refined', emoji: '✨' },
] as const;

interface QuickTemplate {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}

const quickTemplates: QuickTemplate[] = [
  {
    id: 'tone-behaviour',
    label: 'Tone & Behaviour',
    icon: '🎭',
    prompt: `You are a knowledgeable and approachable creator persona. Always greet your audience warmly, use a conversational tone, and be empathetic to their questions. Focus on delivering genuine value from your expertise — whether in finance, coaching, or course content. Use clear, jargon-free language and keep responses concise and actionable.`,
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    icon: '⚡',
    prompt: `You can help your audience with: (1) Answering questions about your course content and curriculum, (2) Providing guidance based on your coaching frameworks, (3) Sharing finance tips, strategies, and insights from your content library, (4) Recommending the right course module or resource for their situation, (5) Explaining concepts from your videos, newsletters, or PDFs, (6) Directing them to book a 1:1 session or enroll in a course.`,
  },
  {
    id: 'call-flow',
    label: 'Conversation Flow',
    icon: '🔄',
    prompt: `Follow this conversation flow: 1) Greet the audience member and ask how you can help. 2) Understand their goal or challenge. 3) Ask 1-2 clarifying questions if needed. 4) Share relevant insights from your content or frameworks. 5) Recommend a specific course, module, or resource. 6) Invite them to take the next step — enroll, book a call, or join your community.`,
  },
  {
    id: 'objectives',
    label: 'Objectives',
    icon: '🎯',
    prompt: `Primary objective: Help your audience get real value from your expertise and content. Secondary objectives: (1) Guide them toward enrolling in your course or coaching program, (2) Build trust by delivering accurate, helpful information grounded in your content, (3) Increase engagement with your community and content library, (4) Collect audience questions to inform future content creation. Always prioritize genuine helpfulness over hard selling.`,
  },
];

const kbDocuments = [
  { id: 'kb-1', name: 'Course_Curriculum_v3.pdf', type: 'pdf', size: '2.4 MB' },
  { id: 'kb-2', name: 'Coaching_Framework_2024.docx', type: 'docx', size: '1.1 MB' },
  { id: 'kb-4', name: 'Finance_Newsletter_Archive.csv', type: 'csv', size: '890 KB' },
  { id: 'kb-6', name: 'Creator_Voice_Guidelines.pdf', type: 'pdf', size: '3.2 MB' },
];

const initialPersonas: Persona[] = [
  {
    id: 'finance-coach',
    name: 'FinanceCoach — Priya',
    type: 'Finance Creator',
    status: 'active',
    conversations: 842,
    conversion: '9.2%',
    channel: 'Web + WhatsApp',
    emoji: '📈',
    tone: 'expert',
    prompt: '',
    attachedKbIds: ['kb-1'],
  },
  {
    id: 'course-guide',
    name: 'CourseGuide — Jordan',
    type: 'Course Builder',
    status: 'draft',
    conversations: 0,
    conversion: '—',
    channel: 'Not deployed',
    emoji: '🎓',
    tone: 'friendly',
    prompt: '',
    attachedKbIds: [],
  },
];
// ... existing code ...
