import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import { useParams } from "next/navigation";

export default function ProjectNotes() {
  const params = useParams();
  const slug = params.slug as string;

  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const { data: notesData } = useQuery({
    queryKey: ["notes", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/project/${slug}/notes`);
      return response.data;
    },
  });

  const notes = notesData?.notes || [];

  if (!notes || notes.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
          ✍️ NOTES
        </h2>
        <div className="border-4 border-black bg-white p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="font-mono text-lg font-bold uppercase tracking-wider text-black">
            No Notes Found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-2xl font-bold uppercase tracking-wider border-b-4 border-black pb-2">
        ✍️ NOTES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note: any) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            onClick={() =>
              setSelectedNote(selectedNote === note.id ? null : note.id)
            }
          >
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-black">
                  {note.content?.title}
                </h3>
                <span className="text-2xl">📝</span>
              </div>

              {selectedNote === note.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 border-t-2 border-black/10"
                >
                  <p className="font-mono text-sm text-black/80 whitespace-pre-wrap">
                    {note.content?.content}
                  </p>
                </motion.div>
              )}

              <div className="flex items-center gap-4 pt-2 border-t-2 border-black/10">
                <span className="font-mono text-xs text-black/60">
                  {new Date(note.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
