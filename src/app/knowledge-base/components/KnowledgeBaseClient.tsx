'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Upload, FileText, File, Trash2, Search, CheckCircle2, AlertCircle, Clock,
  Database, RefreshCw, Video, FileSpreadsheet,
} from 'lucide-react';

type FileStatus = 'READY' | 'PROCESSING' | 'FAILED';

interface KBFile {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  type: string;
  status: FileStatus;
  uploadedAt: string;
  chunks?: number;
}

const initialFiles: KBFile[] = [
  { id: 'kb-1', name: 'Product_FAQ_v3.pdf', size: '2.4 MB', sizeBytes: 2400000, type: 'pdf', status: 'READY', uploadedAt: '2 hours ago', chunks: 142 },
  { id: 'kb-2', name: 'Sales_Playbook_2024.docx', size: '1.1 MB', sizeBytes: 1100000, type: 'docx', status: 'READY', uploadedAt: '1 day ago', chunks: 67 },
  { id: 'kb-3', name: 'Competitor_Analysis_Q4.csv', size: '890 KB', sizeBytes: 890000, type: 'csv', status: 'READY', uploadedAt: '3 days ago', chunks: 28 },
  { id: 'kb-4', name: 'Brand_Voice_Guidelines.pdf', size: '3.2 MB', sizeBytes: 3200000, type: 'pdf', status: 'FAILED', uploadedAt: '5 days ago' },
  { id: 'kb-5', name: 'Content_Strategy_2024.pptx', size: '5.7 MB', sizeBytes: 5700000, type: 'pptx', status: 'PROCESSING', uploadedAt: 'Just now' },
];

const ACCEPTED_EXTENSIONS = '.pdf,.docx,.doc,.csv,.xlsx,.xls,.pptx,.ppt,.txt,.md,.png,.jpg,.jpeg,.webp';

const fileTypeConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  pdf: { color: 'text-red-400', bg: 'bg-red-500/10', icon: <FileText size={16} /> },
  docx: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <FileText size={16} /> },
  doc: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <FileText size={16} /> },
  csv: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <FileSpreadsheet size={16} /> },
  xlsx: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <FileSpreadsheet size={16} /> },
  xls: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <FileSpreadsheet size={16} /> },
  pptx: { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: <Video size={16} /> },
  ppt: { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: <Video size={16} /> },
  txt: { color: 'text-white/50', bg: 'bg-white/5', icon: <FileText size={16} /> },
  md: { color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <FileText size={16} /> },
  png: { color: 'text-sky-400', bg: 'bg-sky-500/10', icon: <File size={16} /> },
  jpg: { color: 'text-sky-400', bg: 'bg-sky-500/10', icon: <File size={16} /> },
  jpeg: { color: 'text-sky-400', bg: 'bg-sky-500/10', icon: <File size={16} /> },
  webp: { color: 'text-sky-400', bg: 'bg-sky-500/10', icon: <File size={16} /> },
};

const getFileConfig = (type: string) =>
  fileTypeConfig[type] ?? { color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <File size={16} /> };

const statusConfig = {
  READY: { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', label: 'Ready', icon: <CheckCircle2 size={11} /> },
  PROCESSING: { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25', label: 'Processing', icon: <Clock size={11} /> },
  FAILED: { badge: 'bg-red-500/15 text-red-400 border-red-500/25', label: 'Failed', icon: <AlertCircle size={11} /> },
};

const supportedFormats = [
  { ext: 'PDF', color: 'text-red-400', bg: 'bg-red-500/10' },
  { ext: 'DOCX', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { ext: 'DOC', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { ext: 'PPTX', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { ext: 'CSV', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { ext: 'XLSX', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { ext: 'TXT', color: 'text-white/50', bg: 'bg-white/5' },
  { ext: 'MD', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { ext: 'PNG', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { ext: 'JPG', color: 'text-sky-400', bg: 'bg-sky-500/10' },
];

export default function KnowledgeBaseClient() {
  const [files, setFiles] = useState<KBFile[]>(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FileStatus | 'ALL'>('ALL');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    processUpload(dropped);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUpload(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const processUpload = (uploadedFiles: File[]) => {
    const newFiles: KBFile[] = uploadedFiles.map((f, i) => ({
      id: `kb-new-${Date.now()}-${i}`,
      name: f.name,
      size: f.size > 1000000 ? `${(f.size / 1000000).toFixed(1)} MB` : `${Math.round(f.size / 1000)} KB`,
      sizeBytes: f.size,
      type: f.name.split('.').pop()?.toLowerCase() || 'file',
      status: 'PROCESSING' as FileStatus,
      uploadedAt: 'Just now',
    }));
    setFiles((prev) => [...newFiles, ...prev]);
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          newFiles.some((nf) => nf.id === f.id)
            ? { ...f, status: 'READY' as FileStatus, chunks: Math.floor(Math.random() * 80) + 20 }
            : f
        )
      );
    }, 3000);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleRetry = (id: string) => {
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: 'PROCESSING' as FileStatus } : f));
    setTimeout(() => {
      setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: 'READY' as FileStatus, chunks: 34 } : f));
    }, 2500);
  };

  const filtered = files.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const readyCount = files.filter((f) => f.status === 'READY').length;
  const processingCount = files.filter((f) => f.status === 'PROCESSING').length;
  const totalSize = files.reduce((acc, f) => acc + f.sizeBytes, 0);
  const totalSizeStr = totalSize > 1000000 ? `${(totalSize / 1000000).toFixed(1)} MB` : `${Math.round(totalSize / 1000)} KB`;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Documents', value: files.length.toString(), icon: <Database size={18} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Ready', value: readyCount.toString(), icon: <CheckCircle2 size={18} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Processing', value: processingCount.toString(), icon: <Clock size={18} />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Total Size', value: totalSizeStr, icon: <File size={18} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-lg font-bold text-white tabular-nums">{stat.value}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
          isDragging
            ? 'border-[#7c3aed]/60 bg-[#7c3aed]/8'
            : 'border-white/12 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXTENSIONS}
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div className="w-12 h-12 rounded-2xl bg-[#7c3aed]/15 border border-[#7c3aed]/25 flex items-center justify-center">
          <Upload size={22} className="text-[#a78bfa]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white">Drop files here or click to upload</p>
          <p className="text-xs text-white/40 mt-1">Supports PDF, DOCX, PPTX, CSV, XLSX, TXT, MD, and images</p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center mt-1">
          {supportedFormats.map((f) => (
            <span key={f.ext} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${f.color} ${f.bg} border-white/10`}>
              {f.ext}
            </span>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as FileStatus | 'ALL')}
          className="px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white/70 focus:outline-none focus:border-[#7c3aed]/50 transition-all"
        >
          <option value="ALL">All Status</option>
          <option value="READY">Ready</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* File List */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <FileText size={20} className="text-white/25" />
            </div>
            <p className="text-sm text-white/35">No documents found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((file) => {
              const cfg = getFileConfig(file.type);
              const sc = statusConfig[file.status];
              return (
                <div key={file.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors">
                  <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-white/35">{file.size}</span>
                      <span className="text-white/15">·</span>
                      <span className="text-[11px] text-white/35">{file.uploadedAt}</span>
                      {file.chunks && (
                        <>
                          <span className="text-white/15">·</span>
                          <span className="text-[11px] text-white/35">{file.chunks} chunks</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.badge}`}>
                    {sc.icon}
                    {sc.label}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {file.status === 'FAILED' && (
                      <button
                        onClick={() => handleRetry(file.id)}
                        className="w-7 h-7 rounded-lg border border-amber-500/25 text-amber-400 hover:bg-amber-500/10 flex items-center justify-center transition-all"
                        title="Retry"
                      >
                        <RefreshCw size={12} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="w-7 h-7 rounded-lg border border-white/8 text-white/30 hover:text-red-400 hover:border-red-500/25 flex items-center justify-center transition-all"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
