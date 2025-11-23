import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";

interface PublicNotesProps {
  slug: string;
}

export default function PublicNotes({ slug }: PublicNotesProps) {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const { data: notesData, isLoading } = useQuery({
    queryKey: ["public-notes", slug],
    queryFn: async () => {
      const response = await instance.get(`/api/publications/${slug}/notes`);
      return response.data;
    },
  });

  const notes = notesData?.notes || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
          Notes
        </h2>
        <div className="border-2 border-black bg-white p-8 text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
          Notes
        </h2>
        <div className="border-2 border-black bg-white p-8 text-center">
          <p className="font-mono text-sm text-black/60">No notes available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-2">
        Notes ({notes.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {notes.map((note: any) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-black bg-white p-4 cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            onClick={() => setSelectedNote(selectedNote === note.id ? null : note.id)}
          >
            <h3 className="font-mono text-sm font-bold uppercase text-black mb-2">
              {note.content?.title}
            </h3>

            {selectedNote === note.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-2 border-t border-black/10"
              >
                <p className="font-mono text-xs text-black/70 whitespace-pre-wrap">
                  {note.content?.content}
                </p>
              </motion.div>
            )}

            <div className="mt-2 pt-2 border-t border-black/10">
              <span className="font-mono text-xs text-black/40">
                {new Date(note.created_at).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
