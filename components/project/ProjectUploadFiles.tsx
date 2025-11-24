"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import { useParams } from "next/navigation";
import Image from "next/image";

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

export default function ProjectUploadFiles() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: filesData } = useQuery({
    queryKey: ["uploadFiles", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}/upload-files`);
      return response.data;
    },
  });

  const files = filesData?.files || [];

  if (!files || files.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
          📁 UPLOADED FILES
        </h2>
        <div className="border-4 border-black bg-white p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            No Uploaded Files Found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
        📁 UPLOADED FILES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file: any) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="p-6 space-y-4">
              {/* File Icon & Type */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{getFileIcon(file.mime_type)}</span>
                  <span className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                    {file.mime_type?.toUpperCase() || "FILE"}
                  </span>
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
                <div className="flex items-center gap-2">
                  <a
                    href={`https://aggregator.walrus-testnet.walrus.space/v1/blobs/${file.blob_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold uppercase tracking-wider border-2 border-black bg-black text-white px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                  >
                    Download
                  </a>
                  <a
                    href={`https://walruscan.com/testnet/blob/${file.blob_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black flex items-center gap-1"
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
