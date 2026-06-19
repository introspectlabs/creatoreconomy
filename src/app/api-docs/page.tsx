'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { ChevronDown, ChevronRight, Copy, Check, ExternalLink, Zap, Lock } from 'lucide-react';

interface SchemaProperty {
  type: string;
  description?: string;
  enum?: string[];
  example?: string | number | boolean;
  required?: boolean;
}

interface Schema {
  type: string;
  properties?: Record<string, SchemaProperty>;
  example?: Record<string, unknown>;
}

interface ApiResponse {
  status: number;
  description: string;
  example?: Record<string, unknown> | unknown[];
}

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  description: string;
  tag: string;
  status: 'live' | 'planned';
  auth?: boolean;
  requestBody?: Schema;
  queryParams?: Record<string, SchemaProperty>;
  pathParams?: Record<string, SchemaProperty>;
  responses: ApiResponse[];
}

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  POST: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  PUT: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  PATCH: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  DELETE: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const STATUS_COLORS: Record<number, string> = {
  200: 'text-emerald-400',
  201: 'text-emerald-400',
  202: 'text-emerald-400',
  400: 'text-amber-400',
  401: 'text-orange-400',
  403: 'text-orange-400',
  404: 'text-red-400',
  500: 'text-red-400',
};

const API_SPEC: {
  info: { title: string; version: string; description: string; baseUrl: string };
  tags: { name: string; description: string }[];
  endpoints: Endpoint[];
} = {
  info: {
    title: 'PersonaMatrix API',
    version: '1.0.0',
    description: 'Complete REST API reference for PersonaMatrix — AI persona management, knowledge base, channels, analytics, and more.',
    baseUrl: 'https://personamat4842.builtwithrocket.new',
  },
  tags: [
    { name: 'Video', description: 'Tavus video conversation management' },
    { name: 'Widget', description: 'Embeddable chat widget delivery' },
    { name: 'Dashboard', description: 'Metrics, activity, and system health' },
    { name: 'Personas', description: 'AI persona CRUD and management' },
    { name: 'Knowledge Base', description: 'File upload, crawling, and KB management' },
    { name: 'Conversations', description: 'Conversation history and messages' },
    { name: 'Analytics', description: 'Usage analytics and reporting' },
    { name: 'Channels', description: 'WhatsApp channel assignments' },
    { name: 'Services', description: 'External service integrations' },
    { name: 'Plugins', description: 'Embeds and plugin management' },
    { name: 'API Keys', description: 'API key generation and revocation' },
    { name: 'Organization', description: 'Team members and RBAC' },
    { name: 'Billing', description: 'Subscription and payment management' },
    { name: 'Avatars', description: 'Avatar creation and management' },
    { name: 'User', description: 'User profile and settings' },
    { name: 'Activity', description: 'Activity log and audit trail' },
  ],
  endpoints: [
    {
      method: 'POST',
      path: '/api/tavus',
      summary: 'Create or end a Tavus video conversation',
      description: 'Proxy endpoint for the Tavus v2 API. Use action: "create" to start a new video conversation or action: "end" to terminate an existing one.',
      tag: 'Video',
      status: 'live',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          action: { type: 'string', enum: ['create', 'end'], description: 'Operation to perform', required: true },
          conversation_id: { type: 'string', description: 'Required when action is "end"' },
          persona_id: { type: 'string', description: 'Tavus persona ID (create only)' },
          replica_id: { type: 'string', description: 'Tavus replica ID (create only)' },
          conversation_name: { type: 'string', description: 'Display name for the conversation' },
          conversational_context: { type: 'string', description: 'System context injected into the conversation' },
          custom_greeting: { type: 'string', description: 'Opening message from the AI' },
        },
        example: {
          action: 'create',
          persona_id: 'p_abc123',
          replica_id: 'r_xyz789',
          conversation_name: 'Support Session',
          custom_greeting: 'Hello! How can I help you today?',
        },
      },
      responses: [
        {
          status: 200,
          description: 'Conversation created (action: create)',
          example: {
            conversation_id: 'conv_9f3a2b1c',
            status: 'active',
            conversation_name: 'Support Session',
            persona_id: 'p_abc123',
            replica_id: 'r_xyz789',
            conversation_url: 'https://tavus.daily.co/conv_9f3a2b1c',
            created_at: '2024-06-01T10:00:00Z',
          },
        },
        {
          status: 200,
          description: 'Conversation ended (action: end)',
          example: { success: true },
        },
        {
          status: 400,
          description: 'Missing conversation_id or invalid action',
          example: { error: 'conversation_id is required when action is "end"' },
        },
        {
          status: 500,
          description: 'TAVUS_API_KEY not configured or internal error',
          example: { error: 'Internal server error', message: 'TAVUS_API_KEY is not configured' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/widget',
      summary: 'Serve embeddable chat widget JavaScript',
      description: 'Returns a self-contained JavaScript bundle that injects a floating chat launcher into any host page via Shadow DOM.',
      tag: 'Widget',
      status: 'live',
      responses: [
        {
          status: 200,
          description: 'JavaScript bundle (Content-Type: application/javascript)',
          example: { note: 'Returns raw JavaScript — not JSON. Embed via <script src="/api/widget"></script>' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/dashboard/metrics',
      summary: 'Get dashboard KPI metrics',
      description: 'Returns active persona count, total conversations, average response time, resolution rate, token usage, and knowledge chunk count.',
      tag: 'Dashboard',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Dashboard metrics object',
          example: {
            activePersonas: 12,
            totalConversations: 8420,
            avgResponseTime: '1.2s',
            resolutionRate: '94.2%',
            tokenUsage: 2400000,
            tokenLimit: 5000000,
            knowledgeChunks: 3840,
            updatedAt: '2024-06-01T10:00:00Z',
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized', message: 'Bearer token required' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/dashboard/activity',
      summary: 'Get recent activity feed',
      description: 'Returns a paginated list of recent activity events across all personas and channels.',
      tag: 'Dashboard',
      status: 'planned',
      auth: true,
      queryParams: {
        limit: { type: 'number', description: 'Number of events to return (default: 20)', example: 20 },
        offset: { type: 'number', description: 'Pagination offset', example: 0 },
      },
      responses: [
        {
          status: 200,
          description: 'Paginated activity events',
          example: {
            events: [
              { id: 'evt_001', type: 'conversation.started', personaId: 'p_abc123', personaName: 'Support Agent', channel: 'whatsapp', timestamp: '2024-06-01T09:55:00Z' },
              { id: 'evt_002', type: 'persona.updated', personaId: 'p_def456', personaName: 'Sales Bot', userId: 'usr_789', timestamp: '2024-06-01T09:40:00Z' },
            ],
            total: 142,
            limit: 20,
            offset: 0,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/dashboard/chart',
      summary: 'Get message volume chart data',
      description: 'Returns a 14-day time series of message volume broken down by channel.',
      tag: 'Dashboard',
      status: 'planned',
      auth: true,
      queryParams: {
        days: { type: 'number', description: 'Number of days to return (default: 14)', example: 14 },
      },
      responses: [
        {
          status: 200,
          description: 'Array of daily message volume data points',
          example: {
            data: [
              { date: '2024-05-25', whatsapp: 320, web: 210 },
              { date: '2024-05-26', whatsapp: 410, web: 275 },
              { date: '2024-05-27', whatsapp: 290, web: 195 },
            ],
            totalDays: 14,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/dashboard/system-health',
      summary: 'Get service health status',
      description: 'Returns real-time health and latency for all connected external services.',
      tag: 'Dashboard',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Array of service health objects',
          example: {
            services: [
              { service: 'WhatsApp', status: 'operational', latency: 42, lastChecked: '2024-06-01T10:00:00Z' },
              { service: 'ElevenLabs', status: 'operational', latency: 118, lastChecked: '2024-06-01T10:00:00Z' },
              { service: 'Tavus', status: 'degraded', latency: 850, lastChecked: '2024-06-01T10:00:00Z' },
            ],
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/personas',
      summary: 'List all personas',
      description: 'Returns all AI personas for the authenticated organization.',
      tag: 'Personas',
      status: 'planned',
      auth: true,
      queryParams: {
        status: { type: 'string', enum: ['active', 'paused', 'draft'], description: 'Filter by persona status' },
        search: { type: 'string', description: 'Search by name or description' },
      },
      responses: [
        {
          status: 200,
          description: 'Array of persona objects',
          example: {
            personas: [
              {
                id: 'p_abc123',
                name: 'Support Agent',
                description: 'Handles customer support queries',
                status: 'active',
                model: 'gpt-4o',
                temperature: 0.7,
                voice: 'el_voice_xyz',
                knowledgeChunks: 128,
                channels: ['whatsapp', 'web'],
                createdAt: '2024-05-01T08:00:00Z',
                updatedAt: '2024-05-28T14:30:00Z',
              },
            ],
            total: 12,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/personas',
      summary: 'Create a new persona',
      description: 'Creates a new AI persona with the provided configuration.',
      tag: 'Personas',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Persona display name', required: true },
          description: { type: 'string', description: 'Short description' },
          systemPrompt: { type: 'string', description: 'System prompt / instructions', required: true },
          model: { type: 'string', enum: ['gpt-4o', 'gpt-4-turbo', 'claude-3-5-sonnet', 'gemini-1.5-pro'], description: 'LLM model to use' },
          voice: { type: 'string', description: 'ElevenLabs voice ID' },
          temperature: { type: 'number', description: 'Model temperature (0-1)', example: 0.7 },
        },
        example: { name: 'Support Agent', systemPrompt: 'You are a helpful support agent...', model: 'gpt-4o', temperature: 0.7 },
      },
      responses: [
        {
          status: 201,
          description: 'Created persona object',
          example: {
            id: 'p_newxyz',
            name: 'Support Agent',
            description: '',
            status: 'draft',
            model: 'gpt-4o',
            temperature: 0.7,
            voice: null,
            knowledgeChunks: 0,
            channels: [],
            createdAt: '2024-06-01T10:00:00Z',
            updatedAt: '2024-06-01T10:00:00Z',
          },
        },
        {
          status: 400,
          description: 'Validation error',
          example: { error: 'Validation failed', fields: { name: 'Name is required', systemPrompt: 'System prompt is required' } },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'PUT',
      path: '/api/personas/:id',
      summary: 'Update a persona',
      description: 'Updates an existing persona by ID.',
      tag: 'Personas',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Persona ID', required: true } },
      requestBody: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Persona display name' },
          systemPrompt: { type: 'string', description: 'Updated system prompt' },
          model: { type: 'string', description: 'LLM model' },
          temperature: { type: 'number', description: 'Model temperature' },
        },
        example: { name: 'Updated Support Agent', temperature: 0.5 },
      },
      responses: [
        {
          status: 200,
          description: 'Updated persona object',
          example: { id: 'p_abc123', name: 'Updated Support Agent', model: 'gpt-4o', temperature: 0.5, updatedAt: '2024-06-01T11:00:00Z' },
        },
        {
          status: 404,
          description: 'Persona not found',
          example: { error: 'Not found', message: 'Persona p_abc123 does not exist' },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/personas/:id',
      summary: 'Delete a persona',
      description: 'Permanently deletes a persona and all associated data.',
      tag: 'Personas',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Persona ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Deletion confirmed',
          example: { success: true, deletedId: 'p_abc123' },
        },
        {
          status: 404,
          description: 'Persona not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'PATCH',
      path: '/api/personas/:id/status',
      summary: 'Pause or resume a persona',
      description: 'Toggles the active/paused status of a persona.',
      tag: 'Personas',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Persona ID', required: true } },
      requestBody: {
        type: 'object',
        properties: { status: { type: 'string', enum: ['active', 'paused'], description: 'New status', required: true } },
        example: { status: 'paused' },
      },
      responses: [
        {
          status: 200,
          description: 'Updated persona status',
          example: { id: 'p_abc123', status: 'paused', updatedAt: '2024-06-01T11:30:00Z' },
        },
        {
          status: 404,
          description: 'Persona not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/personas/prompt/enhance',
      summary: 'AI-enhance a system prompt',
      description: 'Uses OpenAI or Gemini to improve and expand a raw system prompt.',
      tag: 'Personas',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          prompt: { type: 'string', description: 'Raw system prompt to enhance', required: true },
          model: { type: 'string', enum: ['openai', 'gemini'], description: 'AI provider to use' },
        },
        example: { prompt: 'You are a support agent', model: 'openai' },
      },
      responses: [
        {
          status: 200,
          description: 'Enhanced prompt',
          example: {
            enhancedPrompt: 'You are a highly skilled customer support agent for PersonaMatrix. Your role is to assist users with technical questions, billing inquiries, and general platform guidance. Always maintain a professional yet friendly tone...',
            tokensUsed: 312,
          },
        },
        {
          status: 400,
          description: 'Missing prompt',
          example: { error: 'prompt is required' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/personas/:id/test/chat',
      summary: 'Send a test chat message to a persona',
      description: 'Sends a test message to a persona and returns the AI response.',
      tag: 'Personas',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Persona ID', required: true } },
      requestBody: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'User message', required: true },
          history: { type: 'string', description: 'Array of prior messages for context' },
        },
        example: { message: 'What can you help me with?' },
      },
      responses: [
        {
          status: 200,
          description: 'AI reply with token usage',
          example: {
            reply: 'I can help you with account management, billing questions, technical troubleshooting, and general platform guidance.',
            tokens: 48,
            latencyMs: 820,
          },
        },
        {
          status: 404,
          description: 'Persona not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/knowledge-base/files',
      summary: 'List all knowledge base files',
      description: 'Returns all uploaded files and their processing status.',
      tag: 'Knowledge Base',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Array of KB file objects',
          example: {
            files: [
              { id: 'kb_001', name: 'product-docs.pdf', type: 'pdf', size: 2048000, status: 'processed', chunks: 84, personaIds: ['p_abc123'], uploadedAt: '2024-05-20T09:00:00Z' },
              { id: 'kb_002', name: 'faq.docx', type: 'docx', size: 512000, status: 'processing', chunks: 0, personaIds: [], uploadedAt: '2024-06-01T10:05:00Z' },
            ],
            total: 2,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/knowledge-base/files',
      summary: 'Upload a knowledge base file',
      description: 'Uploads a file (PDF, DOCX, TXT, CSV, etc.) for processing and indexing.',
      tag: 'Knowledge Base',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          file: { type: 'string', description: 'File binary (multipart/form-data)', required: true },
          personaId: { type: 'string', description: 'Optionally link to a persona on upload' },
        },
      },
      responses: [
        {
          status: 201,
          description: 'Created KB file with processing job',
          example: {
            id: 'kb_003',
            name: 'onboarding-guide.pdf',
            type: 'pdf',
            size: 1024000,
            status: 'queued',
            jobId: 'job_abc789',
            chunks: 0,
            personaIds: ['p_abc123'],
            uploadedAt: '2024-06-01T10:10:00Z',
          },
        },
        {
          status: 400,
          description: 'Unsupported file type or size exceeded',
          example: { error: 'Unsupported file type. Allowed: pdf, docx, txt, csv, md' },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/knowledge-base/files/:id',
      summary: 'Delete a knowledge base file',
      description: 'Permanently removes a file and all its indexed chunks.',
      tag: 'Knowledge Base',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'KB file ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Deletion confirmed',
          example: { success: true, deletedId: 'kb_001', chunksRemoved: 84 },
        },
        {
          status: 404,
          description: 'File not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/knowledge-base/crawl',
      summary: 'Start a domain crawl',
      description: 'Initiates a web crawl for a given domain to extract and index content.',
      tag: 'Knowledge Base',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'Root URL to crawl', required: true },
          depth: { type: 'number', description: 'Maximum crawl depth (default: 3)', example: 3 },
          maxPages: { type: 'number', description: 'Maximum pages to crawl (default: 100)', example: 100 },
          personaId: { type: 'string', description: 'Persona to link crawled content to' },
        },
        example: { url: 'https://docs.example.com', depth: 3, maxPages: 50 },
      },
      responses: [
        {
          status: 202,
          description: 'Crawl job queued',
          example: { jobId: 'job_crawl_xyz', status: 'queued', url: 'https://docs.example.com', estimatedPages: 50, createdAt: '2024-06-01T10:15:00Z' },
        },
        {
          status: 400,
          description: 'Invalid URL or missing fields',
          example: { error: 'Invalid URL format' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/knowledge-base/crawl/:jobId',
      summary: 'Poll crawl job status',
      description: 'Returns the current status and progress of a crawl job.',
      tag: 'Knowledge Base',
      status: 'planned',
      auth: true,
      pathParams: { jobId: { type: 'string', description: 'Crawl job ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Crawl job status',
          example: {
            jobId: 'job_crawl_xyz',
            status: 'running',
            pagesProcessed: 23,
            totalPages: 50,
            chunksCreated: 187,
            startedAt: '2024-06-01T10:15:30Z',
            updatedAt: '2024-06-01T10:17:00Z',
          },
        },
        {
          status: 404,
          description: 'Job not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/conversations',
      summary: 'List conversations',
      description: 'Returns a paginated list of conversations with optional filters.',
      tag: 'Conversations',
      status: 'planned',
      auth: true,
      queryParams: {
        personaId: { type: 'string', description: 'Filter by persona' },
        channel: { type: 'string', enum: ['whatsapp', 'web'], description: 'Filter by channel' },
        status: { type: 'string', enum: ['active', 'resolved', 'escalated'], description: 'Filter by status' },
        from: { type: 'string', description: 'Start date (ISO 8601)', example: '2024-01-01' },
        to: { type: 'string', description: 'End date (ISO 8601)', example: '2024-12-31' },
        limit: { type: 'number', description: 'Page size (default: 20)', example: 20 },
        offset: { type: 'number', description: 'Pagination offset', example: 0 },
      },
      responses: [
        {
          status: 200,
          description: 'Paginated conversation list',
          example: {
            conversations: [
              {
                id: 'conv_001',
                personaId: 'p_abc123',
                personaName: 'Support Agent',
                channel: 'whatsapp',
                status: 'resolved',
                userPhone: '+1234567890',
                messageCount: 14,
                startedAt: '2024-05-31T14:00:00Z',
                endedAt: '2024-05-31T14:22:00Z',
              },
            ],
            total: 8420,
            limit: 20,
            offset: 0,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/conversations/:id/messages',
      summary: 'Get conversation messages',
      description: 'Returns the full message thread for a specific conversation.',
      tag: 'Conversations',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Conversation ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Full message thread',
          example: {
            conversationId: 'conv_001',
            messages: [
              { id: 'msg_001', role: 'user', content: 'Hi, I need help with my account', timestamp: '2024-05-31T14:00:05Z' },
              { id: 'msg_002', role: 'assistant', content: 'Of course! I\'d be happy to help. What seems to be the issue?', timestamp: '2024-05-31T14:00:07Z', tokensUsed: 22 },
            ],
            total: 14,
          },
        },
        {
          status: 404,
          description: 'Conversation not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/conversations/:id',
      summary: 'Delete a conversation',
      description: 'Permanently deletes a conversation and all its messages.',
      tag: 'Conversations',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Conversation ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Deletion confirmed',
          example: { success: true, deletedId: 'conv_001', messagesDeleted: 14 },
        },
        {
          status: 404,
          description: 'Conversation not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/conversations/export',
      summary: 'Export conversations',
      description: 'Exports conversations as CSV or JSON with optional filters.',
      tag: 'Conversations',
      status: 'planned',
      auth: true,
      queryParams: {
        format: { type: 'string', enum: ['csv', 'json'], description: 'Export format (default: csv)' },
        personaId: { type: 'string', description: 'Filter by persona' },
        from: { type: 'string', description: 'Start date (ISO 8601)' },
        to: { type: 'string', description: 'End date (ISO 8601)' },
      },
      responses: [
        {
          status: 200,
          description: 'File download (CSV or JSON)',
          example: { note: 'Returns file download. For JSON format, array of conversation objects with nested messages array.' },
        },
        {
          status: 400,
          description: 'Invalid format or date range',
          example: { error: 'Invalid format. Use csv or json' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/analytics/knowledge',
      summary: 'Get knowledge analytics',
      description: 'Returns domain crawl stats, chunk usage, persona coverage, and sync history.',
      tag: 'Analytics',
      status: 'planned',
      auth: true,
      queryParams: {
        range: { type: 'string', enum: ['7d', '30d', '90d'], description: 'Time range (default: 7d)', example: '7d' },
      },
      responses: [
        {
          status: 200,
          description: 'Knowledge analytics data',
          example: {
            range: '7d',
            crawlStats: { totalDomains: 8, pagesIndexed: 1240, chunksCreated: 3840, lastSync: '2024-06-01T06:00:00Z' },
            chunkUsage: { total: 3840, byPersona: [{ personaId: 'p_abc123', personaName: 'Support Agent', chunks: 1280 }] },
            personaCoverage: [{ personaId: 'p_abc123', name: 'Support Agent', coveragePercent: 87 }],
            syncHistory: [{ domain: 'docs.example.com', syncedAt: '2024-06-01T06:00:00Z', pagesUpdated: 12, status: 'success' }],
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/channels',
      summary: 'List channel groups and assignments',
      description: 'Returns all channel groups (WhatsApp) and their current persona assignments.',
      tag: 'Channels',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Channel groups with assignments',
          example: {
            channels: [
              {
                type: 'whatsapp',
                assignments: [
                  { personaId: 'p_abc123', personaName: 'Support Agent', phoneNumber: '+2234567890', assignedAt: '2024-05-01T08:00:00Z' },
                ],
              },
            ],
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/channels/:type/assignments',
      summary: 'Assign persona to channel',
      description: 'Creates a new persona assignment for a channel type.',
      tag: 'Channels',
      status: 'planned',
      auth: true,
      pathParams: { type: { type: 'string', enum: ['whatsapp'], description: 'Channel type', required: true } },
      requestBody: {
        type: 'object',
        properties: {
          personaId: { type: 'string', description: 'Persona to assign', required: true },
          phoneNumber: { type: 'string', description: 'Phone number', required: true },
        },
        example: { personaId: 'p_abc123', phoneNumber: '+2234567890' },
      },
      responses: [
        {
          status: 201,
          description: 'Created assignment',
          example: { personaId: 'p_abc123', personaName: 'Support Agent', channelType: 'whatsapp', phoneNumber: '+2234567890', assignedAt: '2024-06-01T10:00:00Z' },
        },
        {
          status: 400,
          description: 'Invalid persona ID or phone number',
          example: { error: 'Invalid phone number format' },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/channels/:type/assignments/:personaId',
      summary: 'Remove channel assignment',
      description: 'Removes a persona assignment from a channel.',
      tag: 'Channels',
      status: 'planned',
      auth: true,
      pathParams: {
        type: { type: 'string', enum: ['whatsapp'], description: 'Channel type', required: true },
        personaId: { type: 'string', description: 'Persona ID to unassign', required: true },
      },
      responses: [
        {
          status: 200,
          description: 'Assignment removed',
          example: { success: true, personaId: 'p_abc123', channelType: 'whatsapp' },
        },
        {
          status: 404,
          description: 'Assignment not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/services',
      summary: 'List external services',
      description: 'Returns all available external services with their connection status and health.',
      tag: 'Services',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Array of service objects',
          example: {
            services: [
              { id: 'elevenlabs', name: 'ElevenLabs', category: 'voice', connected: true, latency: 118, lastPinged: '2024-06-01T10:00:00Z' },
              { id: 'heygen', name: 'Heygen', category: 'video', connected: false, latency: null, lastPinged: null },
              { id: 'openai', name: 'OpenAI', category: 'llm', connected: true, latency: 245, lastPinged: '2024-06-01T10:00:00Z' },
            ],
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/services/:id/connect',
      summary: 'Connect an external service',
      description: 'Connects an external service using the provided API key.',
      tag: 'Services',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Service ID (e.g. elevenlabs, heygen)', required: true } },
      requestBody: {
        type: 'object',
        properties: { apiKey: { type: 'string', description: 'Service API key', required: true } },
        example: { apiKey: 'sk-...' },
      },
      responses: [
        {
          status: 200,
          description: 'Service connected',
          example: { id: 'elevenlabs', name: 'ElevenLabs', connected: true, latency: 118, connectedAt: '2024-06-01T10:00:00Z' },
        },
        {
          status: 400,
          description: 'Invalid API key',
          example: { error: 'Invalid API key. Authentication failed.' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/services/:id/disconnect',
      summary: 'Disconnect an external service',
      description: 'Removes the API key and disconnects the service.',
      tag: 'Services',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Service ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Service disconnected',
          example: { success: true, id: 'elevenlabs', disconnectedAt: '2024-06-01T11:00:00Z' },
        },
        {
          status: 404,
          description: 'Service not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/services/:id/ping',
      summary: 'Ping service health',
      description: 'Refreshes the health status and latency for a connected service.',
      tag: 'Services',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Service ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Health check result',
          example: { id: 'elevenlabs', status: 'operational', latency: 112, checkedAt: '2024-06-01T11:05:00Z' },
        },
        {
          status: 404,
          description: 'Service not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/plugins',
      summary: 'List all plugins',
      description: 'Returns all deployed embed plugins for the organization.',
      tag: 'Plugins',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Array of plugin objects',
          example: {
            plugins: [
              {
                id: 'plg_001',
                name: 'Support Widget',
                personaId: 'p_abc123',
                personaName: 'Support Agent',
                type: 'chat-widget',
                theme: 'dark',
                position: 'bottom-right',
                embedSnippet: '<script src="https://personamat4842.builtwithrocket.new/api/widget" data-persona-id="p_abc123"></script>',
                createdAt: '2024-05-15T08:00:00Z',
              },
            ],
            total: 3,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/plugins',
      summary: 'Create a new plugin',
      description: 'Creates a new embed/plugin configuration.',
      tag: 'Plugins',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Plugin display name', required: true },
          personaId: { type: 'string', description: 'Persona to power the plugin', required: true },
          type: { type: 'string', enum: ['chat-widget', 'inline', 'popup'], description: 'Plugin type' },
          theme: { type: 'string', enum: ['dark', 'light'], description: 'Widget theme' },
          position: { type: 'string', enum: ['bottom-right', 'bottom-left'], description: 'Widget position' },
        },
        example: { name: 'Support Widget', personaId: 'p_abc123', type: 'chat-widget', theme: 'dark' },
      },
      responses: [
        {
          status: 201,
          description: 'Created plugin with embed snippet',
          example: {
            id: 'plg_002',
            name: 'Support Widget',
            personaId: 'p_abc123',
            type: 'chat-widget',
            theme: 'dark',
            position: 'bottom-right',
            embedSnippet: '<script src="https://personamat4842.builtwithrocket.new/api/widget" data-persona-id="p_abc123" data-theme="dark"></script>',
            createdAt: '2024-06-01T10:00:00Z',
          },
        },
        {
          status: 400,
          description: 'Validation error',
          example: { error: 'Validation failed', fields: { name: 'Name is required' } },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/plugins/:id',
      summary: 'Delete a plugin',
      description: 'Permanently deletes a plugin configuration.',
      tag: 'Plugins',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Plugin ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Deletion confirmed',
          example: { success: true, deletedId: 'plg_001' },
        },
        {
          status: 404,
          description: 'Plugin not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/api-keys',
      summary: 'List API keys',
      description: 'Returns all API keys for the organization (keys are masked).',
      tag: 'API Keys',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Array of masked API key objects',
          example: {
            keys: [
              { id: 'key_001', name: 'Production Key', environment: 'production', key: 'pm_live_****************************3f9a', scopes: ['personas:read', 'conversations:read'], createdAt: '2024-05-01T08:00:00Z', lastUsed: '2024-06-01T09:45:00Z' },
              { id: 'key_002', name: 'Dev Key', environment: 'development', key: 'pm_test_****************************7b2c', scopes: ['*'], createdAt: '2024-04-15T10:00:00Z', lastUsed: null },
            ],
            total: 2,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/api-keys',
      summary: 'Generate a new API key',
      description: 'Creates a new API key with specified name, environment, and scopes.',
      tag: 'API Keys',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Key display name', required: true },
          environment: { type: 'string', enum: ['production', 'development', 'staging'], description: 'Target environment' },
          scopes: { type: 'string', description: 'Array of permission scopes' },
        },
        example: { name: 'Production Key', environment: 'production', scopes: ['personas:read', 'conversations:read'] },
      },
      responses: [
        {
          status: 201,
          description: 'Created key — value shown only once',
          example: {
            id: 'key_003',
            name: 'Production Key',
            environment: 'production',
            key: 'pm_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
            scopes: ['personas:read', 'conversations:read'],
            createdAt: '2024-06-01T10:00:00Z',
            warning: 'Store this key securely. It will not be shown again.',
          },
        },
        {
          status: 400,
          description: 'Validation error',
          example: { error: 'name is required' },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/api-keys/:id',
      summary: 'Revoke an API key',
      description: 'Permanently revokes and deletes an API key.',
      tag: 'API Keys',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'API key ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Key revoked',
          example: { success: true, revokedId: 'key_001', revokedAt: '2024-06-01T11:00:00Z' },
        },
        {
          status: 404,
          description: 'Key not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/org/members',
      summary: 'List team members',
      description: 'Returns all members of the organization with their roles.',
      tag: 'Organization',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Array of member objects',
          example: {
            members: [
              { id: 'usr_001', name: 'Arjun Mehta', email: 'arjun@example.com', role: 'admin', status: 'active', joinedAt: '2024-01-01T00:00:00Z', lastActive: '2024-06-01T09:00:00Z' },
              { id: 'usr_002', name: 'Priya Sharma', email: 'priya@example.com', role: 'developer', status: 'active', joinedAt: '2024-03-15T00:00:00Z', lastActive: '2024-05-30T14:00:00Z' },
            ],
            total: 8,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/org/members/invite',
      summary: 'Invite a team member',
      description: 'Sends an invitation email to a new team member.',
      tag: 'Organization',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          email: { type: 'string', description: 'Invitee email address', required: true },
          role: { type: 'string', enum: ['admin', 'developer', 'analyst', 'viewer'], description: 'Role to assign', required: true },
        },
        example: { email: 'jane@example.com', role: 'developer' },
      },
      responses: [
        {
          status: 200,
          description: 'Invitation sent',
          example: { success: true, inviteId: 'inv_abc123', email: 'jane@example.com', role: 'developer', expiresAt: '2024-06-08T10:00:00Z' },
        },
        {
          status: 400,
          description: 'Invalid email or role',
          example: { error: 'Invalid role. Allowed: admin, developer, analyst, viewer' },
        },
      ],
    },
    {
      method: 'PUT',
      path: '/api/org/members/:id/role',
      summary: 'Change member role',
      description: 'Updates the role of an existing team member.',
      tag: 'Organization',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Member ID', required: true } },
      requestBody: {
        type: 'object',
        properties: { role: { type: 'string', enum: ['admin', 'developer', 'analyst', 'viewer'], description: 'New role', required: true } },
        example: { role: 'analyst' },
      },
      responses: [
        {
          status: 200,
          description: 'Updated member',
          example: { id: 'usr_002', name: 'Priya Sharma', email: 'priya@example.com', role: 'analyst', updatedAt: '2024-06-01T11:00:00Z' },
        },
        {
          status: 404,
          description: 'Member not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/org/members/:id',
      summary: 'Remove a team member',
      description: 'Removes a member from the organization.',
      tag: 'Organization',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Member ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Member removed',
          example: { success: true, removedId: 'usr_002', removedAt: '2024-06-01T11:30:00Z' },
        },
        {
          status: 404,
          description: 'Member not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/billing/subscription',
      summary: 'Get current subscription',
      description: 'Returns the current plan, renewal date, and next invoice details.',
      tag: 'Billing',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Subscription details',
          example: {
            planId: 'pro',
            planName: 'Pro',
            status: 'active',
            seats: 10,
            renewalDate: '2024-07-01T00:00:00Z',
            nextInvoice: { amount: 299, currency: 'USD', date: '2024-07-01T00:00:00Z' },
            features: ['unlimited_personas', 'priority_support', 'advanced_analytics'],
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/billing/usage',
      summary: 'Get usage metrics',
      description: 'Returns current usage for storage, conversation minutes, and seats.',
      tag: 'Billing',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Usage breakdown',
          example: {
            storage: { used: 2.4, limit: 10, unit: 'GB' },
            conversationMinutes: { used: 1840, limit: 5000, unit: 'minutes' },
            seats: { used: 6, limit: 10 },
            apiCalls: { used: 48200, limit: 100000 },
            periodStart: '2024-06-01T00:00:00Z',
            periodEnd: '2024-06-30T23:59:59Z',
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/billing/subscription/upgrade',
      summary: 'Upgrade or downgrade plan',
      description: 'Changes the subscription plan.',
      tag: 'Billing',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: { planId: { type: 'string', enum: ['starter', 'pro', 'enterprise'], description: 'Target plan ID', required: true } },
        example: { planId: 'pro' },
      },
      responses: [
        {
          status: 200,
          description: 'Updated subscription',
          example: { planId: 'pro', planName: 'Pro', status: 'active', effectiveDate: '2024-06-01T10:00:00Z', proratedAmount: 49.50 },
        },
        {
          status: 400,
          description: 'Invalid plan ID',
          example: { error: 'Invalid planId. Allowed: starter, pro, enterprise' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/avatars',
      summary: 'List avatars',
      description: 'Returns all created avatars for the organization.',
      tag: 'Avatars',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'Array of avatar objects',
          example: {
            avatars: [
              { id: 'av_001', name: 'Alex Replica', type: 'replica', status: 'ready', thumbnailUrl: 'https://cdn.example.com/av_001.jpg', personaId: 'p_abc123', createdAt: '2024-05-10T08:00:00Z' },
              { id: 'av_002', name: 'Stock Avatar #3', type: 'stock', status: 'ready', thumbnailUrl: 'https://cdn.example.com/stock_3.jpg', personaId: null, createdAt: '2024-05-20T09:00:00Z' },
            ],
            total: 2,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'POST',
      path: '/api/avatars/replica',
      summary: 'Create a replica avatar',
      description: 'Uploads a training video and voice sample to create a custom replica avatar.',
      tag: 'Avatars',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Avatar display name', required: true },
          video: { type: 'string', description: 'Training video file (multipart/form-data)', required: true },
          voice: { type: 'string', description: 'Voice sample audio file (multipart/form-data)' },
        },
      },
      responses: [
        {
          status: 202,
          description: 'Avatar creation job queued',
          example: { jobId: 'job_av_xyz', avatarId: 'av_003', status: 'processing', estimatedMinutes: 15, createdAt: '2024-06-01T10:00:00Z' },
        },
        {
          status: 400,
          description: 'Invalid file format or missing fields',
          example: { error: 'Video file is required. Supported formats: mp4, mov' },
        },
      ],
    },
    {
      method: 'DELETE',
      path: '/api/avatars/:id',
      summary: 'Delete an avatar',
      description: 'Permanently deletes an avatar.',
      tag: 'Avatars',
      status: 'planned',
      auth: true,
      pathParams: { id: { type: 'string', description: 'Avatar ID', required: true } },
      responses: [
        {
          status: 200,
          description: 'Deletion confirmed',
          example: { success: true, deletedId: 'av_001' },
        },
        {
          status: 404,
          description: 'Avatar not found',
          example: { error: 'Not found' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/user/profile',
      summary: 'Get user profile',
      description: 'Returns the current authenticated user\'s profile.',
      tag: 'User',
      status: 'planned',
      auth: true,
      responses: [
        {
          status: 200,
          description: 'User profile object',
          example: {
            id: 'usr_001',
            name: 'Arjun Mehta',
            email: 'arjun@example.com',
            organization: 'PersonaMatrix Inc.',
            bio: 'AI product builder',
            role: 'admin',
            avatarUrl: 'https://cdn.example.com/avatars/usr_001.jpg',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-05-28T10:00:00Z',
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'PUT',
      path: '/api/user/profile',
      summary: 'Update user profile',
      description: 'Updates the current user\'s profile information.',
      tag: 'User',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Display name' },
          email: { type: 'string', description: 'Email address' },
          organization: { type: 'string', description: 'Organization name' },
          bio: { type: 'string', description: 'Short bio' },
        },
        example: { name: 'Arjun Mehta', email: 'arjun@example.com' },
      },
      responses: [
        {
          status: 200,
          description: 'Updated user profile',
          example: { id: 'usr_001', name: 'Arjun Mehta', email: 'arjun@example.com', organization: 'PersonaMatrix Inc.', updatedAt: '2024-06-01T10:00:00Z' },
        },
        {
          status: 400,
          description: 'Validation error',
          example: { error: 'Invalid email format' },
        },
      ],
    },
    {
      method: 'PUT',
      path: '/api/user/password',
      summary: 'Change password',
      description: 'Updates the current user\'s password.',
      tag: 'User',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          currentPassword: { type: 'string', description: 'Current password', required: true },
          newPassword: { type: 'string', description: 'New password (min 8 chars)', required: true },
        },
        example: { currentPassword: 'OldPass123!', newPassword: 'NewSecurePass456!' },
      },
      responses: [
        {
          status: 200,
          description: 'Password changed',
          example: { success: true, updatedAt: '2024-06-01T10:00:00Z' },
        },
        {
          status: 400,
          description: 'Incorrect current password or weak new password',
          example: { error: 'Current password is incorrect' },
        },
      ],
    },
    {
      method: 'PUT',
      path: '/api/user/notifications',
      summary: 'Update notification preferences',
      description: 'Saves the user\'s notification settings.',
      tag: 'User',
      status: 'planned',
      auth: true,
      requestBody: {
        type: 'object',
        properties: {
          emailAlerts: { type: 'boolean', description: 'Email alert notifications' },
          weeklyDigest: { type: 'boolean', description: 'Weekly summary email' },
          systemAlerts: { type: 'boolean', description: 'In-app system alerts' },
        },
        example: { emailAlerts: true, weeklyDigest: false, systemAlerts: true },
      },
      responses: [
        {
          status: 200,
          description: 'Updated notification preferences',
          example: { emailAlerts: true, weeklyDigest: false, systemAlerts: true, updatedAt: '2024-06-01T10:00:00Z' },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
    {
      method: 'GET',
      path: '/api/activity',
      summary: 'Get activity log',
      description: 'Returns a paginated, filterable activity log for the organization.',
      tag: 'Activity',
      status: 'planned',
      auth: true,
      queryParams: {
        type: { type: 'string', description: 'Filter by event type' },
        userId: { type: 'string', description: 'Filter by user' },
        from: { type: 'string', description: 'Start date (ISO 8601)' },
        to: { type: 'string', description: 'End date (ISO 8601)' },
        limit: { type: 'number', description: 'Page size (default: 50)', example: 50 },
        offset: { type: 'number', description: 'Pagination offset', example: 0 },
      },
      responses: [
        {
          status: 200,
          description: 'Paginated activity log',
          example: {
            events: [
              { id: 'act_001', type: 'persona.created', userId: 'usr_001', userName: 'Arjun Mehta', resourceId: 'p_abc123', resourceName: 'Support Agent', metadata: {}, timestamp: '2024-06-01T09:00:00Z' },
              { id: 'act_002', type: 'api_key.revoked', userId: 'usr_001', userName: 'Arjun Mehta', resourceId: 'key_001', resourceName: 'Production Key', metadata: {}, timestamp: '2024-06-01T08:45:00Z' },
            ],
            total: 1240,
            limit: 50,
            offset: 0,
          },
        },
        {
          status: 401,
          description: 'Unauthorized',
          example: { error: 'Unauthorized' },
        },
      ],
    },
  ],
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
      title="Copy"
    >
      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
    </button>
  );
}

function SchemaBlock({ schema }: { schema: Schema }) {
  if (!schema.properties) return null;
  return (
    <div className="rounded-lg border border-white/8 overflow-hidden text-xs font-mono">
      <div className="bg-white/3 px-3 py-1.5 text-white/40 text-[10px] uppercase tracking-wider border-b border-white/8">
        Schema
      </div>
      <div className="p-3 space-y-1.5">
        {Object.entries(schema.properties).map(([key, prop]) => (
          <div key={key} className="flex items-start gap-2">
            <span className="text-purple-300 flex-shrink-0">{key}</span>
            {prop.required && (
              <span className="text-red-400 text-[10px] mt-0.5 flex-shrink-0">*</span>
            )}
            <span className="text-amber-300/70 flex-shrink-0">{prop.type}</span>
            {prop.enum && (
              <span className="text-emerald-300/70 flex-shrink-0">
                {prop.enum.map(v => `"${v}"`).join(' | ')}
              </span>
            )}
            {prop.description && (
              <span className="text-white/40">{prop.description}</span>
            )}
          </div>
        ))}
      </div>
      {schema.example && (
        <div className="border-t border-white/8">
          <div className="bg-white/3 px-3 py-1.5 text-white/40 text-[10px] uppercase tracking-wider border-b border-white/8 flex items-center justify-between">
            <span>Request Body Example</span>
            <CopyButton text={JSON.stringify(schema.example, null, 2)} />
          </div>
          <pre className="p-3 text-emerald-300/80 overflow-x-auto text-[11px] leading-relaxed">
            {JSON.stringify(schema.example, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function ResponseBlock({ response }: { response: ApiResponse }) {
  const [open, setOpen] = useState(false);
  const hasExample = response.example !== undefined;

  return (
    <div className="rounded-lg border border-white/8 overflow-hidden">
      <button
        onClick={() => hasExample && setOpen(!open)}
        className={`w-full flex items-center gap-3 px-3 py-2 text-left ${hasExample ? 'hover:bg-white/3 cursor-pointer' : 'cursor-default'} transition-all`}
      >
        <span className={`font-mono font-600 text-sm flex-shrink-0 w-10 ${STATUS_COLORS[response.status] || 'text-white/60'}`}>
          {response.status}
        </span>
        <span className="text-white/50 text-xs flex-1">{response.description}</span>
        {hasExample && (
          open
            ? <ChevronDown size={12} className="text-white/30 flex-shrink-0" />
            : <ChevronRight size={12} className="text-white/25 flex-shrink-0" />
        )}
      </button>
      {open && hasExample && (
        <div className="border-t border-white/8">
          <div className="bg-white/3 px-3 py-1.5 text-white/40 text-[10px] uppercase tracking-wider border-b border-white/8 flex items-center justify-between">
            <span>Response JSON</span>
            <CopyButton text={JSON.stringify(response.example, null, 2)} />
          </div>
          <pre className="p-3 text-sky-300/80 overflow-x-auto text-[11px] leading-relaxed">
            {JSON.stringify(response.example, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-200"
      style={{
        borderColor: open ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
        background: open ? 'rgba(255,255,255,0.03)' : 'transparent',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/3 transition-all"
      >
        <span className={`text-[11px] font-700 px-2 py-0.5 rounded border font-mono flex-shrink-0 w-16 text-center ${METHOD_COLORS[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <span className="font-mono text-sm text-white/80 flex-1 truncate">{endpoint.path}</span>
        <span className="text-xs text-white/40 hidden sm:block flex-shrink-0 max-w-xs truncate">{endpoint.summary}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {endpoint.status === 'live' ? (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
              <Zap size={9} /> Live
            </span>
          ) : (
            <span className="text-[10px] text-white/25 bg-white/5 border border-white/8 rounded-full px-2 py-0.5">
              Planned
            </span>
          )}
          {endpoint.auth && <Lock size={11} className="text-white/25" />}
          {open ? <ChevronDown size={14} className="text-white/40" /> : <ChevronRight size={14} className="text-white/30" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-white/6 px-4 py-4 space-y-4">
          <p className="text-sm text-white/55 leading-relaxed">{endpoint.description}</p>

          {endpoint.pathParams && Object.keys(endpoint.pathParams).length > 0 && (
            <div>
              <h4 className="text-[11px] font-600 text-white/40 uppercase tracking-wider mb-2">Path Parameters</h4>
              <div className="rounded-lg border border-white/8 overflow-hidden text-xs font-mono">
                <div className="p-3 space-y-1.5">
                  {Object.entries(endpoint.pathParams).map(([key, prop]) => (
                    <div key={key} className="flex items-start gap-2">
                      <span className="text-purple-300">{key}</span>
                      {prop.required && <span className="text-red-400 text-[10px] mt-0.5">*</span>}
                      <span className="text-amber-300/70">{prop.type}</span>
                      {prop.enum && <span className="text-emerald-300/70">{prop.enum.map(v => `"${v}"`).join(' | ')}</span>}
                      {prop.description && <span className="text-white/40">{prop.description}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {endpoint.queryParams && Object.keys(endpoint.queryParams).length > 0 && (
            <div>
              <h4 className="text-[11px] font-600 text-white/40 uppercase tracking-wider mb-2">Query Parameters</h4>
              <div className="rounded-lg border border-white/8 overflow-hidden text-xs font-mono">
                <div className="p-3 space-y-1.5">
                  {Object.entries(endpoint.queryParams).map(([key, prop]) => (
                    <div key={key} className="flex items-start gap-2">
                      <span className="text-purple-300">{key}</span>
                      <span className="text-amber-300/70">{prop.type}</span>
                      {prop.enum && <span className="text-emerald-300/70">{prop.enum.map(v => `"${v}"`).join(' | ')}</span>}
                      {prop.description && <span className="text-white/40">{prop.description}</span>}
                      {prop.example !== undefined && <span className="text-white/25">e.g. {String(prop.example)}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {endpoint.requestBody && (
            <div>
              <h4 className="text-[11px] font-600 text-white/40 uppercase tracking-wider mb-2">Request Body</h4>
              <SchemaBlock schema={endpoint.requestBody} />
            </div>
          )}

          <div>
            <h4 className="text-[11px] font-600 text-white/40 uppercase tracking-wider mb-2">
              Responses <span className="text-white/20 normal-case font-400">(click to expand JSON)</span>
            </h4>
            <div className="space-y-1.5">
              {endpoint.responses.map((res, idx) => (
                <ResponseBlock key={`${res.status}-${idx}`} response={res} />
              ))}
            </div>
          </div>

          {endpoint.auth && (
            <div className="flex items-center gap-2 text-xs text-amber-400/60 bg-amber-500/5 border border-amber-500/15 rounded-lg px-3 py-2">
              <Lock size={11} />
              <span>Requires Bearer token authentication</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ApiDocsPage() {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [search, setSearch] = useState('');

  const allTags = ['All', ...API_SPEC.tags.map(t => t.name)];

  const filtered = API_SPEC.endpoints.filter(ep => {
    const matchesTag = activeTag === 'All' || ep.tag === activeTag;
    const matchesSearch =
      !search ||
      ep.path.toLowerCase().includes(search.toLowerCase()) ||
      ep.summary.toLowerCase().includes(search.toLowerCase()) ||
      ep.tag.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const liveCount = API_SPEC.endpoints.filter(e => e.status === 'live').length;
  const plannedCount = API_SPEC.endpoints.filter(e => e.status === 'planned').length;

  return (
    <AppLayout>
      <div className="min-h-screen" style={{ background: 'rgba(8,10,16,1)' }}>
        <div
          className="border-b border-white/6 px-6 py-6"
          style={{ background: 'linear-gradient(135deg, rgba(123,111,212,0.06), rgba(232,160,32,0.04))' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-amber-500/20 border border-purple-500/20 flex items-center justify-center">
                    <ExternalLink size={15} className="text-purple-400" />
                  </div>
                  <h1 className="text-xl font-700 text-white">{API_SPEC.info.title}</h1>
                  <span className="text-[11px] font-600 bg-purple-500/15 text-purple-300 border border-purple-500/25 rounded-full px-2 py-0.5">
                    v{API_SPEC.info.version}
                  </span>
                </div>
                <p className="text-sm text-white/45 max-w-2xl">{API_SPEC.info.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-white/30">Base URL:</span>
                  <code className="text-xs text-amber-300/70 bg-amber-500/8 border border-amber-500/15 rounded px-2 py-0.5 font-mono">
                    {API_SPEC.info.baseUrl}
                  </code>
                  <CopyButton text={API_SPEC.info.baseUrl} />
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-center px-4 py-2 rounded-xl bg-white/4 border border-white/8">
                  <div className="text-lg font-700 text-white">{API_SPEC.endpoints.length}</div>
                  <div className="text-[10px] text-white/35 uppercase tracking-wider">Total</div>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                  <div className="text-lg font-700 text-emerald-400">{liveCount}</div>
                  <div className="text-[10px] text-emerald-400/50 uppercase tracking-wider">Live</div>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-white/4 border border-white/8">
                  <div className="text-lg font-700 text-white/50">{plannedCount}</div>
                  <div className="text-[10px] text-white/25 uppercase tracking-wider">Planned</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search endpoints..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/40 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  activeTag === tag
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :'text-white/40 border-white/8 hover:text-white/70 hover:border-white/15'
                }`}
              >
                {tag}
                {tag !== 'All' && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {API_SPEC.endpoints.filter(e => e.tag === tag).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-white/25">No endpoints match your search.</div>
          ) : (
            <div className="space-y-2">
              {filtered.map((ep, i) => (
                <EndpointCard key={`${ep.method}-${ep.path}-${i}`} endpoint={ep} />
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-white/25 border-t border-white/6 pt-6">
            <span className="flex items-center gap-1.5"><Zap size={11} className="text-emerald-400" /> Live — endpoint is implemented</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/20 inline-block" /> Planned — endpoint is documented but not yet implemented</span>
            <span className="flex items-center gap-1.5"><Lock size={11} /> Requires Bearer token</span>
            <span className="flex items-center gap-1.5"><span className="text-red-400">*</span> Required field</span>
            <span className="flex items-center gap-1.5"><span className="text-sky-300/80">&#123;&#125;</span> Click status code to expand JSON</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
