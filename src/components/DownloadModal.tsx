import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Terminal, 
  Github, 
  FolderArchive, 
  Check, 
  Copy, 
  FileCode, 
  Sparkles,
  Info
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const handleDownloadZip = () => {
    setIsDownloading(true);
    // Trigger download via the server zip endpoint
    window.location.href = '/api/download/zip';
    setTimeout(() => {
      setIsDownloading(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2a]/60 backdrop-blur-md p-4 transition-all">
      <div 
        id="download-app-modal"
        className="relative w-full max-w-2xl rounded-[32px] bg-white p-6 sm:p-8 text-left shadow-2xl border border-[#e5e5dc] max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-[#8b8b80] hover:bg-[#f0f0e8] hover:text-[#2d2d2a] transition cursor-pointer"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-[#5A5A40]/10 flex items-center justify-center text-[#5A5A40]">
            <FolderArchive className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2d2d2a]">
              Download App Files & Source Code
            </h2>
            <p className="text-xs text-[#8b8b80]">
              Get the complete ZenFlow application to run locally on your computer or host anywhere.
            </p>
          </div>
        </div>

        {/* Primary Download Card */}
        <div className="mt-6 rounded-2xl bg-[#f9f9f5] border border-[#e5e5dc] p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-[#2d2d2a]">
                  Instant Complete Project ZIP
                </span>
                <span className="rounded-full bg-[#5A5A40]/15 px-2 py-0.5 text-[10px] font-bold text-[#5A5A40] uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-[#8b8b80] max-w-md">
                Contains all React 19 source code, TypeScript components, Tailwind CSS styling, Vite configuration, server code, and README.
              </p>
            </div>

            <button
              id="modal-download-zip-btn"
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5A5A40] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#484833] transition shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>{isDownloading ? 'Preparing ZIP...' : 'Download .ZIP'}</span>
            </button>
          </div>

          {/* Quick file manifest summary */}
          <div className="mt-4 pt-4 border-t border-[#e5e5dc] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#5A5A40]">
            <div className="flex items-center gap-1.5 font-medium">
              <FileCode className="h-3.5 w-3.5" />
              <span>src/ (Components & Views)</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <FileCode className="h-3.5 w-3.5" />
              <span>package.json & tsconfig</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <FileCode className="h-3.5 w-3.5" />
              <span>server.ts (API backend)</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <FileCode className="h-3.5 w-3.5" />
              <span>README.md Setup Guide</span>
            </div>
          </div>
        </div>

        {/* Local Setup Instructions */}
        <div className="mt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b8b80] flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5" />
            How to Run Locally on Your Computer
          </h3>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="rounded-xl border border-[#e5e5dc] bg-white p-3.5 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#2d2d2a]">1. Extract the ZIP and open terminal:</span>
                <button
                  onClick={() => copyToClipboard('cd zenflow-healthy-internet-tracker', 'step1')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#5A5A40] hover:underline cursor-pointer"
                >
                  {copiedStep === 'step1' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedStep === 'step1' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code className="block rounded-lg bg-[#2d2d2a] p-2.5 font-mono text-xs text-[#a3b18a]">
                cd zenflow-healthy-internet-tracker
              </code>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-[#e5e5dc] bg-white p-3.5 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#2d2d2a]">2. Install dependencies (Node.js 18+ required):</span>
                <button
                  onClick={() => copyToClipboard('npm install', 'step2')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#5A5A40] hover:underline cursor-pointer"
                >
                  {copiedStep === 'step2' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedStep === 'step2' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code className="block rounded-lg bg-[#2d2d2a] p-2.5 font-mono text-xs text-[#a3b18a]">
                npm install
              </code>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-[#e5e5dc] bg-white p-3.5 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#2d2d2a]">3. Start development server:</span>
                <button
                  onClick={() => copyToClipboard('npm run dev', 'step3')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#5A5A40] hover:underline cursor-pointer"
                >
                  {copiedStep === 'step3' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedStep === 'step3' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code className="block rounded-lg bg-[#2d2d2a] p-2.5 font-mono text-xs text-[#a3b18a]">
                npm run dev
              </code>
              <p className="mt-2 text-[11px] text-[#8b8b80]">
                Then open <span className="font-mono text-[#5A5A40] font-semibold">http://localhost:3000</span> in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative: Google AI Studio Export */}
        <div className="mt-6 rounded-2xl border border-[#e5e5dc] bg-[#f9f9f5] p-4 text-xs">
          <div className="flex items-start gap-3">
            <Github className="h-5 w-5 text-[#2d2d2a] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-[#2d2d2a]">
                Exporting via Google AI Studio Header
              </h4>
              <p className="text-[#8b8b80] mt-0.5 leading-relaxed">
                You can also export this codebase directly to your personal GitHub account. In the top toolbar of Google AI Studio, click the <strong className="text-[#2d2d2a]">Export to GitHub</strong> or <strong className="text-[#2d2d2a]">Deploy / Share</strong> options to sync all commits and branches directly to a repository.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full border border-[#e5e5dc] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#2d2d2a] hover:bg-[#f0f0e8] transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
