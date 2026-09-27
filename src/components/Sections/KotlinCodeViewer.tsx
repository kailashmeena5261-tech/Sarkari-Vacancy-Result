import React, { useState } from 'react';
import { Copy, Check, Download, Code2, FileCode, CheckCircle2, ChevronRight } from 'lucide-react';
import { KOTLIN_ANDROID_FILES, KotlinFile } from '../../data/kotlinCodeData';

interface KotlinCodeViewerProps {
  onShowToast: (msg: string) => void;
}

export const KotlinCodeViewer: React.FC<KotlinCodeViewerProps> = ({ onShowToast }) => {
  const [selectedFile, setSelectedFile] = useState<KotlinFile>(KOTLIN_ANDROID_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    onShowToast(`Copied ${selectedFile.name} to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([selectedFile.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = selectedFile.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onShowToast(`Downloaded ${selectedFile.name}`);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-24 text-xs">
      {/* Intro Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold tracking-tight">
            Native Android Jetpack Compose Architecture
          </h2>
        </div>
        <p className="text-xs text-emerald-100">
          Clean Architecture + MVVM + Jetpack Compose Material 3 implementation for Android Studio.
        </p>
      </div>

      {/* File Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {KOTLIN_ANDROID_FILES.map((file) => {
          const isSelected = selectedFile.name === file.name;
          return (
            <button
              key={file.name}
              onClick={() => setSelectedFile(file)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.name}</span>
            </button>
          );
        })}
      </div>

      {/* Code Editor Preview Box */}
      <div className="rounded-2xl border border-slate-700/80 bg-slate-950 text-slate-100 overflow-hidden shadow-xl">
        {/* Editor Top Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="truncate">
            <span className="font-mono text-emerald-400 font-semibold">{selectedFile.name}</span>
            <span className="text-[10px] text-slate-400 block truncate">{selectedFile.path}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownloadFile}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[460px] font-mono text-[11px] leading-relaxed text-slate-300 select-text">
          <pre>{selectedFile.code}</pre>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-slate-700 dark:text-slate-300">
        <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
          Architecture Stack Highlights:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
          <li><strong>UI Layer:</strong> Jetpack Compose with Material 3 dynamic color theming.</li>
          <li><strong>Navigation:</strong> Compose Navigation with type-safe state restoration.</li>
          <li><strong>State Management:</strong> Kotlin Coroutines `StateFlow` + Android ViewModel.</li>
          <li><strong>Network / Local:</strong> Repository pattern with offline fallback cache.</li>
        </ul>
      </div>
    </div>
  );
};
