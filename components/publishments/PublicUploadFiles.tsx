"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const mimeTypes: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain",
  md: "text/markdown",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
  csv: "text/csv",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  json: "application/json",
  xml: "application/xml",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  zip: "application/zip",
  rar: "application/x-rar-compressed",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  wav: "audio/wav",
};

const getFileIcon = (mimeType: string) => {
  const iconMap: Record<string, string> = {
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    txt: "📃",
    md: "📋",
    xlsx: "📊",
    xls: "📊",
    csv: "📊",
    ppt: "📊",
    pptx: "📊",
    json: "🔧",
    xml: "🔧",
    html: "🌐",
    css: "🎨",
    js: "⚡",
    zip: "🗜️",
    rar: "🗜️",
    jpg: "🖼️",
    jpeg: "🖼️",
    png: "🖼️",
    gif: "🖼️",
    svg: "🖼️",
    mp4: "🎬",
    mp3: "🎵",
    wav: "🎵",
  };

  return iconMap[mimeType?.toLowerCase() || ""] || "📁";
};

const isPreviewable = (mimeType: string) => {
  const previewableTypes = ["pdf", "jpg", "jpeg", "png", "gif", "svg", "txt", "html"];
  return previewableTypes.includes(mimeType?.toLowerCase());
};

interface FilePreviewModalProps {
  file: any;
  onClose: () => void;
}

function FilePreviewModal({ file, onClose }: FilePreviewModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useState(() => {
    const loadPreview = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${file.blob_id}`
        );
        const blob = await res.blob();
        const mimeType = file.mime_type?.toLowerCase() || "";
        const fileBlob = new File([blob], `file.${mimeType}`, {
          type: mimeTypes[mimeType] || "application/octet-stream",
        });
        setPreviewUrl(URL.createObjectURL(fileBlob));
      } catch (err) {
        setError("Failed to load file preview");
      } finally {
        setLoading(false);
      }
    };
    loadPreview();
  });

  const mimeType = file.mime_type?.toLowerCase() || "";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getFileIcon(mimeType)}</span>
            <span className="font-mono text-lg font-bold uppercase tracking-wider">
              {mimeType.toUpperCase()} Preview
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 border-2 border-black bg-black text-white font-bold hover:bg-white hover:text-black transition-colors flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-black/5">
          {loading ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-black border-t-transparent animate-spin mx-auto" />
                <p className="font-mono text-sm uppercase tracking-wider">
                  Loading preview...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <p className="font-mono text-sm text-red-600">{error}</p>
            </div>
          ) : previewUrl ? (
            <div className="w-full h-full min-h-[500px]">
              {mimeType === "pdf" ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-[70vh] border-2 border-black"
                  title="PDF Preview"
                />
              ) : ["jpg", "jpeg", "png", "gif", "svg"].includes(mimeType) ? (
                <div className="flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="File Preview"
                    className="max-w-full max-h-[70vh] border-2 border-black"
                  />
                </div>
              ) : (
                <iframe
                  src={previewUrl}
                  className="w-full h-[70vh] border-2 border-black bg-white"
                  title="File Preview"
                />
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-4 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/4_icon_token_RGB.png"
              alt="Walrus"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-mono text-xs text-black/60 break-all">
              {file.blob_id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://walruscan.com/testnet/blob/${file.blob_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold uppercase tracking-wider border-2 border-black bg-white text-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
            >
              View on Walrus Scan
            </a>
            <a
              href={previewUrl || "#"}
              download={`file.${mimeType}`}
              className="font-mono text-xs font-bold uppercase tracking-wider border-2 border-black bg-black text-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PublicUploadFilesProps {
  slug: string;
}

export default function PublicUploadFiles({ slug }: PublicUploadFilesProps) {
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  const { data: filesData } = useQuery({
    queryKey: ["publicUploadFiles", slug],
    queryFn: async () => {
      const response = await fetch(`/api/publications/${slug}/upload-files`);
      return response.json();
    },
  });

  const files = filesData?.files || [];

  const handleFileClick = async (file: any) => {
    const mimeType = file.mime_type?.toLowerCase() || "";

    if (isPreviewable(mimeType)) {
      setSelectedFile(file);
    } else {
      // Download directly
      try {
        const res = await fetch(
          `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${file.blob_id}`
        );
        const blob = await res.blob();
        const fileBlob = new File([blob], `file.${mimeType}`, {
          type: mimeTypes[mimeType] || "application/octet-stream",
        });
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `file.${mimeType}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download failed:", err);
      }
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
          📁 RESEARCH FILES
        </h2>
        <div className="border-4 border-black bg-white p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            No Files Available
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
          📁 RESEARCH FILES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file: any) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              onClick={() => handleFileClick(file)}
            >
              <div className="p-6 space-y-4">
                {/* File Icon & Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {getFileIcon(file.mime_type)}
                    </span>
                    <div>
                      <span className="font-mono text-lg font-bold uppercase tracking-wider text-black block">
                        {file.mime_type?.toUpperCase() || "FILE"}
                      </span>
                      <span className="font-mono text-xs text-black/60">
                        {isPreviewable(file.mime_type)
                          ? "Click to preview"
                          : "Click to download"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blob ID */}
                <div className="bg-black/5 p-3 border-2 border-black/10">
                  <p className="font-mono text-[10px] text-black/60 uppercase tracking-wider mb-1">
                    Blob ID
                  </p>
                  <p className="font-mono text-xs text-black break-all">
                    {file.blob_id}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-black/10">
                  <span className="font-mono text-xs text-black/60">
                    {new Date(file.created_at).toLocaleDateString()}
                  </span>
                  <a
                    href={`https://walruscan.com/testnet/blob/${file.blob_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src="/4_icon_token_RGB.png"
                      alt="Walrus"
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    Scan
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedFile && (
        <FilePreviewModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
}
