'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, File, Trash2, RefreshCw, Search, CheckCircle2, AlertCircle, Clock, Plus, Filter, Database, X, Globe, Loader2, Network, ChevronDown, RotateCcw, Zap, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { personas } from '@/app/persona-library/components/personaData';

type FileStatus = 'READY' | 'PROCESSING' | 'FAILED';
type ActiveTab = 'upload' | 'crawler';

interface KBFile {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  type: string;
  status: FileStatus;
  uploadedAt: string;
  persona?: string;
  pages?: number;
  chunks?: number;
  domain?: string;
  sourceLabel?: string;
}

const initialFiles: KBFile[] = [
  {
    id: 'kb-1',
    name: 'ZaraSkin_Product_Catalog_v3.pdf',
    size: '2.4 MB',
    sizeBytes: 2400000,
    type: 'pdf',
    status: 'READY',
    uploadedAt: '2 hours ago',
    persona: 'ZaraSkin Sales Agent',
    pages: 48,
    chunks: 142,
  },
  {
    id: 'kb-2',
    name: 'NutriBlend_SKU_Feed_Apr2026.csv',
    size: '1.1 MB',
    sizeBytes: 1100000,
    type: 'csv',
    status: 'READY',
    uploadedAt: '1 day ago',
    persona: 'NutriBlend Store Bot',
    pages: 22,
    chunks: 67,
  },
  {
    id: 'kb-3',
    name: 'StyleHouse_Summer_Collection_2026.pdf',
    size: '5.8 MB',
    sizeBytes: 5800000,
    type: 'pdf',
    status: 'PROCESSING',
    uploadedAt: 'Just now',
    persona: 'StyleHouse Fashion Bot',
    pages: undefined,
    chunks: undefined,
  },
  {
    id: 'kb-4',
    name: 'FitFuel_Supplement_FAQ_v2.txt',
    size: '340 KB',
    sizeBytes: 340000,
    type: 'txt',
    status: 'READY',
    uploadedAt: '3 days ago',
    persona: 'FitFuel Voice Agent',
    pages: undefined,
    chunks: 28,
  },
  {
    id: 'kb-5',
    name: 'GlowUp_Shade_Match_Guide.csv',
    size: '890 KB',
    sizeBytes: 890000,
    type: 'csv',
    status: 'FAILED',
    uploadedAt: '5 days ago',
    persona: undefined,
    pages: undefined,
    chunks: undefined,
  },
  {
    id: 'kb-6',
    name: 'Brand_Voice_Guidelines_D2C.pdf',
    size: '3.2 MB',
    sizeBytes: 3200000,
    type: 'pdf',
    status: 'READY',
    uploadedAt: '1 week ago',
    persona: 'ZaraSkin Sales Agent',
    pages: 31,
    chunks: 95,
  },
];

const supportedFormats = [
  { ext: 'PDF', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { ext: 'DOCX', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { ext: 'XLSX', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { ext: 'PPTX', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { ext: 'CSV', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { ext: 'TXT', color: 'text-white/50', bg: 'bg-white/5', border: 'border-white/10' },
  { ext: 'HTML', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { ext: 'MD', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { ext: 'RTF', color: 'text-white/50', bg: 'bg-white/5', border: 'border-white/10' },
  { ext: 'JSON', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { ext: 'XML', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { ext: 'PNG', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { ext: 'JPG', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { ext: 'GIF', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { ext: 'WEBP', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { ext: 'SVG', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { ext: 'MP3', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { ext: 'WAV', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { ext: 'OGG', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { ext: 'FLAC', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { ext: 'AAC', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { ext: 'MP4', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { ext: 'WEBM', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { ext: 'MOV', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { ext: 'AVI', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { ext: 'MKV', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
];

const statusConfig = {
  READY: {
    icon: CheckCircle2,
    badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    dot: 'bg-emerald-400',
    label: 'READY',
  },
  PROCESSING: {
    icon: Clock,
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    dot: 'bg-amber-400',
    label: 'PROCESSING',
  },
  FAILED: {
    icon: AlertCircle,
    badge: 'bg-red-500/15 text-red-400 border border-red-500/25',
    dot: 'bg-red-400',
    label: 'FAILED',
  },
};

const fileTypeIcon = (type: string) => {
  if (type === 'pdf') return { color: 'text-red-400', bg: 'bg-red-500/10' };
  if (type === 'docx') return { color: 'text-blue-400', bg: 'bg-blue-500/10' };
  if (type === 'csv') return { color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
  if (type === 'txt') return { color: 'text-white/50', bg: 'bg-white/5' };
  if (type === 'crawl') return { color: 'text-cyan-400', bg: 'bg-cyan-500/10' };
  return { color: 'text-purple-400', bg: 'bg-purple-500/10' };
};

const CRAWL_DEPTH_OPTIONS = [
  { value: 1, label: 'Depth 1 — Root page only' },
  { value: 2, label: 'Depth 2 — Root + linked pages' },
  { value: 3, label: 'Depth 3 — Up to 3 levels deep' },
  { value: 4, label: 'Depth 4 — Up to 4 levels deep' },
  { value: 5, label: 'Depth 5 — Full domain crawl' },
];

const MAX_PAGES_OPTIONS = [10, 25, 50, 100, 250, 500];

export default function KnowledgeBaseClient() {
  const [files, setFiles] = useState<KBFile[]>(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FileStatus | 'ALL'>('ALL');
  const [retrying, setRetrying] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Domain Crawler state
  const [crawlerName, setCrawlerName] = useState('');
  const [crawlerUrl, setCrawlerUrl] = useState('');
  const [crawlDepth, setCrawlDepth] = useState(2);
  const [maxPages, setMaxPages] = useState(50);
  const [selectedPersonaId, setSelectedPersonaId] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState(0);
  const [crawlPagesFound, setCrawlPagesFound] = useState(0);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  // Domain status panel state
  const [syncingDomains, setSyncingDomains] = useState<Set<string>>(new Set());
  const [rescanningDomains, setRescanningDomains] = useState<Set<string>>(new Set());
  const [domainSyncTimes, setDomainSyncTimes] = useState<Record<string, string>>({});

  // Copyright declaration state
  const [copyrightChecked, setCopyrightChecked] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [showCopyrightModal, setShowCopyrightModal] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setPendingFiles(droppedFiles);
    setCopyrightChecked(false);
    setShowCopyrightModal(true);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      setPendingFiles(selected);
      setCopyrightChecked(false);
      setShowCopyrightModal(true);
      // reset input so same file can be re-selected
      e.target.value = '';
    }
  };

  const handleConfirmUpload = () => {
    if (!copyrightChecked) return;
    setShowCopyrightModal(false);
    handleFileUpload(pendingFiles);
    setPendingFiles([]);
    setCopyrightChecked(false);
  };

  const handleCancelUpload = () => {
    setShowCopyrightModal(false);
    setPendingFiles([]);
    setCopyrightChecked(false);
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles: KBFile[] = uploadedFiles.map((f, i) => ({
      id: `kb-new-${Date.now()}-${i}`,
      name: f.name,
      size: f.size > 1000000 ? `${(f.size / 1000000).toFixed(1)} MB` : `${Math.round(f.size / 1000)} KB`,
      sizeBytes: f.size,
      type: f.name.split('.').pop()?.toLowerCase() || 'file',
      status: 'PROCESSING' as FileStatus,
      uploadedAt: 'Just now',
      persona: undefined,
      pages: undefined,
      chunks: undefined,
    }));

    setFiles((prev) => [...newFiles, ...prev]);
    toast.success(`${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''} uploaded — processing started`);

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          newFiles.some((nf) => nf.id === f.id)
            ? { ...f, status: 'READY' as FileStatus, chunks: Math.floor(Math.random() * 80) + 20 }
            : f
        )
      );
      toast.success('Files processed and ready');
    }, 3000);
  };

  const handleDelete = (id: string, name: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.error(`"${name}" removed from knowledge base`);
  };

  const handleRetry = (id: string) => {
    setRetrying(id);
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: 'PROCESSING' as FileStatus } : f));
    setTimeout(() => {
      setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: 'READY' as FileStatus, chunks: 34 } : f));
      setRetrying(null);
      toast.success('File reprocessed successfully');
    }, 2500);
  };

  const handleSyncDomain = (fileId: string, domainName: string) => {
    setSyncingDomains((prev) => new Set(prev).add(fileId));
    toast.success(`Syncing ${domainName}…`);
    setTimeout(() => {
      setSyncingDomains((prev) => {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      });
      setDomainSyncTimes((prev) => ({ ...prev, [fileId]: 'Just now' }));
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? { ...f, chunks: (f.chunks || 0) + Math.floor(Math.random() * 10), uploadedAt: 'Just now' }
            : f
        )
      );
      toast.success(`${domainName} synced successfully`);
    }, 2500);
  };

  const handleRescanDomain = (fileId: string, domainName: string) => {
    setRescanningDomains((prev) => new Set(prev).add(fileId));
    setFiles((prev) => prev.map((f) => f.id === fileId ? { ...f, status: 'PROCESSING' as FileStatus } : f));
    toast.success(`Rescanning ${domainName}…`);
    const newPages = Math.floor(Math.random() * 80) + 20;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
      if (current >= newPages) {
        clearInterval(interval);
        setRescanningDomains((prev) => {
          const next = new Set(prev);
          next.delete(fileId);
          return next;
        });
        setDomainSyncTimes((prev) => ({ ...prev, [fileId]: 'Just now' }));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, status: 'READY' as FileStatus, pages: newPages, chunks: Math.floor(newPages * (Math.random() * 8 + 6)), uploadedAt: 'Just now' }
              : f
          )
        );
        toast.success(`Rescan complete — ${newPages} pages indexed for "${domainName}"`);
      }
    }, 200);
  };

  const isValidUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleStartCrawl = () => {
    if (!crawlerName.trim()) {
      toast.error('Please enter a name for this crawl');
      return;
    }
    if (!crawlerUrl.trim()) {
      toast.error('Please enter a domain URL to crawl');
      return;
    }
    if (!isValidUrl(crawlerUrl.trim())) {
      toast.error('Please enter a valid URL (e.g. https://example.com)');
      return;
    }

    const selectedPersona = personas.find((p) => p.id === selectedPersonaId);
    const domain = new URL(crawlerUrl.trim()).hostname;

    setIsCrawling(true);
    setCrawlProgress(0);
    setCrawlPagesFound(0);

    const crawlId = `kb-crawl-${Date.now()}`;
    const newEntry: KBFile = {
      id: crawlId,
      name: crawlerName.trim(),
      size: '—',
      sizeBytes: 0,
      type: 'crawl',
      status: 'PROCESSING',
      uploadedAt: 'Just now',
      persona: selectedPersona?.name,
      pages: undefined,
      chunks: undefined,
      domain: domain,
      sourceLabel: `Crawl · ${domain}`,
    };

    setFiles((prev) => [newEntry, ...prev]);
    toast.success(`Domain crawl started for ${domain}`);

    // Simulate crawl progress
    const totalPages = Math.min(maxPages, Math.floor(Math.random() * maxPages * 0.8) + Math.floor(maxPages * 0.2));
    let currentPage = 0;
    const interval = setInterval(() => {
      currentPage += Math.floor(Math.random() * 4) + 1;
      if (currentPage >= totalPages) {
        currentPage = totalPages;
        clearInterval(interval);

        const finalChunks = Math.floor(totalPages * (Math.random() * 8 + 6));
        const finalSize = totalPages * 0.04;

        setFiles((prev) =>
          prev.map((f) =>
            f.id === crawlId
              ? {
                  ...f,
                  status: 'READY' as FileStatus,
                  pages: totalPages,
                  chunks: finalChunks,
                  size: `${finalSize.toFixed(1)} MB`,
                  sizeBytes: Math.floor(finalSize * 1000000),
                }
              : f
          )
        );

        setIsCrawling(false);
        setCrawlProgress(100);
        setCrawlPagesFound(totalPages);
        toast.success(`Crawl complete — ${totalPages} pages indexed for "${crawlerName.trim()}"`);

        // Reset form
        setCrawlerName('');
        setCrawlerUrl('');
        setCrawlDepth(2);
        setMaxPages(50);
        setSelectedPersonaId('');
        setCrawlProgress(0);
        setCrawlPagesFound(0);
      } else {
        setCrawlPagesFound(currentPage);
        setCrawlProgress(Math.round((currentPage / totalPages) * 100));
      }
    }, 300);
  };

  const filtered = files.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.domain?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const readyCount = files.filter((f) => f.status === 'READY').length;
  const processingCount = files.filter((f) => f.status === 'PROCESSING').length;
  const failedCount = files.filter((f) => f.status === 'FAILED').length;
  const totalSize = files.reduce((acc, f) => acc + f.sizeBytes, 0);
  const totalSizeStr = totalSize > 1000000 ? `${(totalSize / 1000000).toFixed(1)} MB` : `${Math.round(totalSize / 1000)} KB`;

  const selectedPersona = personas.find((p) => p.id === selectedPersonaId);

  // Derive domain entries (crawl + html types) for the status panel
  const domainEntries = files.filter((f) => f.type === 'crawl' || f.type === 'html');

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Files', value: files.length.toString(), icon: Database, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Ready', value: readyCount.toString(), icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Processing', value: processingCount.toString(), icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Total Size', value: totalSizeStr, icon: File, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        ].map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div key={stat.label} className="glass rounded-2xl border border-white/8 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <StatIcon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-lg font-700 text-white tabular-nums">{stat.value}</p>
                <p className="text-[11px] text-white/35 mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Domain Status Panel */}
      {domainEntries.length > 0 && (
        <div className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <Activity size={15} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-700 text-white">Domain Status</h3>
              <p className="text-[11px] text-white/35 mt-0.5">Crawl progress, page &amp; chunk counts, and sync controls per domain</p>
            </div>
            <span className="ml-auto text-[11px] font-600 text-white/30 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
              {domainEntries.length} domain{domainEntries.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {domainEntries.map((entry) => {
              const isSyncing = syncingDomains.has(entry.id);
              const isRescanning = rescanningDomains.has(entry.id);
              const isActive = isSyncing || isRescanning || entry.status === 'PROCESSING';
              const lastSync = domainSyncTimes[entry.id] || entry.uploadedAt;

              const crawlPercent = entry.status === 'READY' ? 100 : entry.status === 'PROCESSING' ? (isRescanning ? crawlProgress : 60) : 0;

              return (
                <div key={entry.id} className="px-5 py-4 hover:bg-white/2 transition-all">
                  <div className="flex items-start gap-4">
                    {/* Domain Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${entry.type === 'crawl' ? 'bg-cyan-500/10' : 'bg-blue-500/10'}`}>
                      {entry.type === 'crawl' ? (
                        <Network size={15} className="text-cyan-400" />
                      ) : (
                        <Globe size={15} className="text-blue-400" />
                      )}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-600 text-white truncate">{entry.name}</span>
                        {entry.domain && (
                          <span className="text-[10px] text-cyan-400/60 bg-cyan-500/8 border border-cyan-500/15 px-2 py-0.5 rounded-full truncate max-w-[180px]">
                            {entry.domain}
                          </span>
                        )}
                        {/* Status badge */}
                        {entry.status === 'READY' && !isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-600 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            <CheckCircle2 size={9} /> Ready
                          </span>
                        )}
                        {(entry.status === 'PROCESSING' || isActive) && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-600 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                            <div className="w-2 h-2 border border-amber-400 border-t-transparent rounded-full animate-spin" />
                            {isRescanning ? 'Rescanning' : isSyncing ? 'Syncing' : 'Processing'}
                          </span>
                        )}
                        {entry.status === 'FAILED' && !isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-600 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/25">
                            <AlertCircle size={9} /> Failed
                          </span>
                        )}
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <FileText size={11} className="text-white/25" />
                          <span className="text-[11px] text-white/50">
                            {entry.pages != null ? (
                              <><span className="text-white font-600">{entry.pages}</span> pages</>
                            ) : entry.status === 'PROCESSING' ? (
                              <span className="text-amber-400/70">crawling…</span>
                            ) : (
                              <span className="text-white/25">—</span>
                            )}
                          </span>
                        </div>
                        <div className="w-px h-3 bg-white/10" />
                        <div className="flex items-center gap-1.5">
                          <Database size={11} className="text-white/25" />
                          <span className="text-[11px] text-white/50">
                            {entry.chunks != null ? (
                              <><span className="text-white font-600">{entry.chunks}</span> chunks</>
                            ) : entry.status === 'PROCESSING' ? (
                              <span className="text-amber-400/70">indexing…</span>
                            ) : (
                              <span className="text-white/25">—</span>
                            )}
                          </span>
                        </div>
                        <div className="w-px h-3 bg-white/10" />
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} className="text-white/25" />
                          <span className="text-[11px] text-white/50">
                            Last sync: <span className="text-white/70">{lastSync}</span>
                          </span>
                        </div>
                        {entry.persona && (
                          <>
                            <div className="w-px h-3 bg-white/10" />
                            <span className="text-[11px] text-purple-300/70 bg-purple-500/8 border border-purple-500/15 px-2 py-0.5 rounded-full">
                              {entry.persona}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Crawl Progress Bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-white/25">
                            {entry.status === 'PROCESSING' || isActive ? 'Crawl progress' : 'Crawl complete'}
                          </span>
                          <span className="text-[10px] text-white/40 tabular-nums font-600">{crawlPercent}%</span>
                        </div>
                        <div className="w-full bg-white/6 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              entry.status === 'READY' && !isActive ?'bg-gradient-to-r from-emerald-500 to-cyan-500'
                                : entry.status === 'FAILED' ?'bg-red-500/60' :'bg-gradient-to-r from-cyan-500 to-blue-500'
                            }`}
                            style={{ width: `${crawlPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5 flex-wrap sm:flex-nowrap">
                      <button
                        onClick={() => handleSyncDomain(entry.id, entry.domain || entry.name)}
                        disabled={isActive}
                        title="Sync — fetch latest content"
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-600 border border-white/10 text-white/50 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        {isSyncing ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : (
                          <Zap size={11} />
                        )}
                        Sync
                      </button>
                      <button
                        onClick={() => handleRescanDomain(entry.id, entry.domain || entry.name)}
                        disabled={isActive}
                        title="Rescan — re-crawl all pages"
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-600 border border-white/10 text-white/50 hover:text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        {isRescanning ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : (
                          <RotateCcw size={11} />
                        )}
                        Rescan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        <div className="flex border-b border-white/8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-600 transition-all ${
              activeTab === 'upload' ? 'text-white border-b-2 border-purple-500 bg-purple-500/5' : 'text-white/40 hover:text-white/70 hover:bg-white/3'
            }`}
          >
            <Upload size={15} />
            Upload Files
          </button>
          <button
            onClick={() => setActiveTab('crawler')}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-600 transition-all ${
              activeTab === 'crawler' ? 'text-white border-b-2 border-cyan-500 bg-cyan-500/5' : 'text-white/40 hover:text-white/70 hover:bg-white/3'
            }`}
          >
            <Network size={15} />
            Domain Crawler
          </button>
        </div>

        {/* Upload Files Tab */}
        {activeTab === 'upload' && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging ? 'bg-purple-500/10 scale-[1.01]' : 'hover:bg-purple-500/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.xlsx,.pptx,.csv,.txt,.html,.md,.rtf,.json,.xml,.png,.jpg,.jpeg,.gif,.webp,.svg,.mp3,.wav,.ogg,.flac,.aac,.mp4,.webm,.mov,.avi,.mkv"
              className="hidden"
              onChange={handleFileInputChange}
            />
            <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all ${
              isDragging ? 'bg-purple-500/25' : 'bg-white/5'
            }`}>
              <Upload size={24} className={isDragging ? 'text-purple-400' : 'text-white/30'} />
            </div>
            <p className="text-sm font-600 text-white/70 mb-1">
              {isDragging ? 'Drop files to upload' : 'Drag & drop files here, or click to browse'}
            </p>
            <p className="text-xs text-white/35 mb-4">Files are chunked and embedded for semantic search</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {supportedFormats.map((fmt) => (
                <span key={fmt.ext} className={`text-[11px] font-600 px-2.5 py-1 rounded-lg border ${fmt.color} ${fmt.bg} ${fmt.border}`}>
                  {fmt.ext}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Copyright Declaration Modal */}
        {showCopyrightModal && (
          <div className="mx-6 mb-6 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-700 text-white mb-0.5">Copyright Declaration Required</h4>
                <p className="text-xs text-white/45 leading-relaxed">
                  You are about to upload <span className="text-white/70 font-600">{pendingFiles.length} file{pendingFiles.length !== 1 ? 's' : ''}</span>. Please confirm ownership before proceeding.
                </p>
              </div>
            </div>

            {/* File list preview */}
            {pendingFiles.length > 0 && (
              <div className="mb-4 flex flex-col gap-1.5 max-h-28 overflow-y-auto">
                {pendingFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8">
                    <FileText size={11} className="text-white/30 flex-shrink-0" />
                    <span className="text-xs text-white/60 truncate">{f.name}</span>
                    <span className="ml-auto text-[10px] text-white/25 flex-shrink-0">
                      {f.size > 1000000 ? `${(f.size / 1000000).toFixed(1)} MB` : `${Math.round(f.size / 1000)} KB`}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Copyright checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group mb-4">
              <div
                onClick={() => setCopyrightChecked((v) => !v)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-150 ${
                  copyrightChecked
                    ? 'bg-emerald-500 border-emerald-500' :'bg-white/5 border-white/20 group-hover:border-white/40'
                }`}
              >
                {copyrightChecked && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-xs text-white/60 leading-relaxed select-none"
                onClick={() => setCopyrightChecked((v) => !v)}
              >
                I confirm that I own or have the legal right to use all content in these files, and I take full responsibility for any copyright claims arising from this upload.
              </span>
            </label>

            <div className="flex gap-2.5">
              <button
                onClick={handleCancelUpload}
                className="flex-1 py-2.5 rounded-xl text-sm font-600 text-white/50 border border-white/10 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={!copyrightChecked}
                className="flex-1 py-2.5 rounded-xl text-sm font-600 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: copyrightChecked ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(255,255,255,0.08)' }}
              >
                Confirm &amp; Upload
              </button>
            </div>
          </div>
        )}

        {/* Domain Crawler Tab */}
        {activeTab === 'crawler' && (
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Network size={22} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-700 text-white">Domain Crawler</h3>
                  <p className="text-xs text-white/40 mt-0.5">Crawl an entire domain and index all linked &amp; nested pages automatically</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-600 text-white/50 uppercase tracking-wider mb-2">
                    Crawl Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Docs Site, Help Center, Marketing Pages"
                    value={crawlerName}
                    onChange={(e) => setCrawlerName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                  />
                  <p className="text-[11px] text-white/25 mt-1.5">A label to identify this crawl in your knowledge base</p>
                </div>

                {/* Domain URL */}
                <div>
                  <label className="block text-xs font-600 text-white/50 uppercase tracking-wider mb-2">
                    Domain URL <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="url"
                      placeholder="https://docs.example.com"
                      value={crawlerUrl}
                      onChange={(e) => setCrawlerUrl(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                    />
                    {crawlerUrl && (
                      <button onClick={() => setCrawlerUrl('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-white/25 mt-1.5">The crawler will follow all internal links from this starting URL</p>
                </div>

                {/* Crawl Settings Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Crawl Depth */}
                  <div>
                    <label className="block text-xs font-600 text-white/50 uppercase tracking-wider mb-2">Crawl Depth</label>
                    <div className="relative">
                      <select
                        value={crawlDepth}
                        onChange={(e) => setCrawlDepth(Number(e.target.value))}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all pr-9"
                      >
                        {CRAWL_DEPTH_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#1a1a2e] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    </div>
                  </div>

                  {/* Max Pages — hidden when depth is 1 (single page only) */}
                  {crawlDepth !== 1 && (
                  <div>
                    <label className="block text-xs font-600 text-white/50 uppercase tracking-wider mb-2">Max Pages</label>
                    <div className="relative">
                      <select
                        value={maxPages}
                        onChange={(e) => setMaxPages(Number(e.target.value))}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all pr-9"
                      >
                        {MAX_PAGES_OPTIONS.map((n) => (
                          <option key={n} value={n} className="bg-[#1a1a2e] text-white">
                            {n} pages
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    </div>
                  </div>
                  )}
                </div>

                {/* Attach to Persona */}
                <div>
                  <label className="block text-xs font-600 text-white/50 uppercase tracking-wider mb-2">Attach to Persona</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setPersonaDropdownOpen((v) => !v)}
                      className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-left focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all hover:bg-white/8"
                    >
                      {selectedPersona ? (
                        <span className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] font-700 flex items-center justify-center flex-shrink-0">
                            {selectedPersona.avatar}
                          </span>
                          <span className="text-white">{selectedPersona.name}</span>
                        </span>
                      ) : (
                        <span className="text-white/30">Select a persona (optional)</span>
                      )}
                      <ChevronDown size={13} className={`text-white/30 transition-transform flex-shrink-0 ${personaDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {personaDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1a1a2e] border border-white/12 rounded-xl shadow-2xl z-20 overflow-hidden max-h-52 overflow-y-auto">
                        <button
                          onClick={() => { setSelectedPersonaId(''); setPersonaDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/40 hover:bg-white/5 hover:text-white/70 transition-all text-left"
                        >
                          <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            <X size={10} className="text-white/30" />
                          </span>
                          No persona (unassigned)
                        </button>
                        <div className="border-t border-white/8" />
                        {personas.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => { setSelectedPersonaId(p.id); setPersonaDropdownOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-all text-left ${
                              selectedPersonaId === p.id ? 'bg-cyan-500/8 text-cyan-300' : 'text-white/70 hover:text-white'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg text-[10px] font-700 flex items-center justify-center flex-shrink-0 ${
                              selectedPersonaId === p.id ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {p.avatar}
                            </span>
                            <span className="flex-1 truncate">{p.name}</span>
                            {p.status === 'active' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-white/25 mt-1.5">
                    The crawled domain will be linked to this persona and used in its knowledge context
                  </p>
                </div>

                {/* Crawl Progress */}
                {isCrawling && (
                  <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Loader2 size={13} className="text-cyan-400 animate-spin" />
                        <span className="text-xs font-600 text-cyan-300">Crawling in progress…</span>
                      </div>
                      <span className="text-xs text-white/40 tabular-nums">{crawlPagesFound} pages found</span>
                    </div>
                    <div className="w-full bg-white/8 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${crawlProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-white/30 mt-1.5">
                      {crawlDepth === 1 ? 'Crawling root page only' : `Following internal links up to depth ${crawlDepth} · max ${maxPages} pages`}
                    </p>
                  </div>
                )}

                {/* Start Crawl Button */}
                <button
                  onClick={handleStartCrawl}
                  disabled={isCrawling || !crawlerName.trim() || !crawlerUrl.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: isCrawling ? undefined : 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}
                >
                  {isCrawling ? (
                    <><Loader2 size={15} className="animate-spin" />Crawling Domain…</>
                  ) : (
                    <><Network size={15} />Start Domain Crawl</>
                  )}
                </button>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                {[
                  { icon: Network, color: 'text-cyan-400', bg: 'bg-cyan-500/10', title: 'Nested Pages', desc: 'Follows all internal links' },
                  { icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Depth Control', desc: 'Set how deep to crawl' },
                  { icon: Database, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Persona Linked', desc: 'Domain attached to persona' },
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
                      <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <ItemIcon size={14} className={item.color} />
                      </div>
                      <div>
                        <p className="text-xs font-600 text-white/70">{item.title}</p>
                        <p className="text-[11px] text-white/30 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        {/* Table Header / Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 sm:px-5 py-4 border-b border-white/8">
          <div className="relative w-full sm:flex-1 sm:max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50">
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5 sm:pb-0">
            <Filter size={12} className="text-white/25 flex-shrink-0" />
            {(['ALL', 'READY', 'PROCESSING', 'FAILED'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-[11px] font-600 px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  statusFilter === s
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :'text-white/35 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={() => { setActiveTab('upload'); fileInputRef.current?.click(); }}
            className="btn-primary flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-600 text-white sm:ml-auto self-start sm:self-auto"
          >
            <Plus size={12} /> Upload
          </button>
        </div>

        {/* Column Headers — hidden on mobile */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-2.5 border-b border-white/5">
          <div className="col-span-5 text-[11px] font-600 text-white/30 uppercase tracking-wider">Name</div>
          <div className="col-span-2 text-[11px] font-600 text-white/30 uppercase tracking-wider">Size</div>
          <div className="col-span-2 text-[11px] font-600 text-white/30 uppercase tracking-wider">Status</div>
          <div className="col-span-2 text-[11px] font-600 text-white/30 uppercase tracking-wider">Persona</div>
          <div className="col-span-1 text-[11px] font-600 text-white/30 uppercase tracking-wider text-right">Actions</div>
        </div>

        {/* File Rows */}
        <div className="divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Database size={32} className="text-white/10 mb-3" />
              <p className="text-sm font-500 text-white/30">No files found</p>
              <p className="text-xs text-white/20 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            filtered.map((file) => {
              const sc = statusConfig[file.status];
              const StatusIcon = sc.icon;
              const ft = fileTypeIcon(file.type);

              return (
                <div key={file.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-5 py-3.5 hover:bg-white/3 transition-all group">
                  {/* Name */}
                  <div className="sm:col-span-5 flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg ${ft.bg} flex items-center justify-center flex-shrink-0`}>
                      {file.type === 'html' ? (
                        <Globe size={14} className={ft.color} />
                      ) : file.type === 'crawl' ? (
                        <Network size={14} className={ft.color} />
                      ) : (
                        <FileText size={14} className={ft.color} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-500 text-white truncate">{file.name}</p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        {file.sourceLabel ? (
                          <span className="text-cyan-400/60">{file.sourceLabel} · </span>
                        ) : null}
                        {file.chunks ? `${file.chunks} chunks` : file.status === 'PROCESSING' ? (file.type === 'crawl' ? 'Crawling…' : 'Chunking…') : 'Failed to process'}
                        {file.pages ? ` · ${file.pages} pages` : ''}
                        {' · '}{file.uploadedAt}
                      </p>
                    </div>
                    {/* Mobile: show status badge inline */}
                    <div className="sm:hidden flex-shrink-0">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-600 px-2 py-0.5 rounded-full ${sc.badge}`}>
                        {file.status === 'PROCESSING' ? (
                          <div className="w-2 h-2 border border-amber-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <StatusIcon size={9} />
                        )}
                        {sc.label}
                      </span>
                    </div>
                  </div>

                  {/* Size — hidden on mobile */}
                  <div className="hidden sm:flex sm:col-span-2 items-center">
                    <span className="text-sm text-white/55 tabular-nums">{file.size}</span>
                  </div>

                  {/* Status — hidden on mobile (shown inline above) */}
                  <div className="hidden sm:flex sm:col-span-2 items-center">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-600 px-2.5 py-1 rounded-full ${sc.badge}`}>
                      {file.status === 'PROCESSING' ? (
                        <div className="w-2.5 h-2.5 border border-amber-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <StatusIcon size={10} />
                      )}
                      {sc.label}
                    </span>
                  </div>

                  {/* Persona — hidden on mobile */}
                  <div className="hidden sm:flex sm:col-span-2 items-center">
                    {file.persona ? (
                      <span className="text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-lg">
                        {file.persona}
                      </span>
                    ) : (
                      <span className="text-xs text-white/20">—</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="hidden sm:flex sm:col-span-1 items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {file.status === 'FAILED' && (
                      <button
                        onClick={() => handleRetry(file.id)}
                        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/25 transition-all"
                        title="Retry processing"
                      >
                        <RefreshCw size={11} className={retrying === file.id ? 'animate-spin' : ''} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(file.id, file.name)}
                      className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/25 transition-all"
                      title="Delete file"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
            <p className="text-[11px] text-white/25">
              Showing {filtered.length} of {files.length} files
            </p>
            {failedCount > 0 && (
              <p className="text-[11px] text-red-400/70 flex items-center gap-1.5">
                <AlertCircle size={10} /> {failedCount} file{failedCount > 1 ? 's' : ''} failed — retry to reprocess
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
