import { useMutation } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Switch } from "../ui/switch";

export default function ProjectPublicToggle({ defaultStatus }: { defaultStatus: boolean }) {
  const params = useParams();
  const slug = params.slug as string;
  const [isActive, setActive] = useState(defaultStatus)

  const mutation = useMutation({
    mutationFn: (value: boolean) => {
      console.log(value)
      return instance.put(`/api/project/${slug}/toggle-public`, { is_public: value })
    },
    onSuccess: (data: any) => {
      toast.success(isActive ? 'This research is public now' : 'This research is private now')
    },
    onError: () => {
      toast.error('Unexpected error occurred')
    }
  })

  const handleChange = (checked: boolean) => {
    setActive(checked)
    mutation.mutate(checked)
  }

  return (
    <div className="flex items-center gap-4">
      <Switch checked={isActive} onCheckedChange={handleChange}>Project publish status</Switch>
      <div className={`font-mono text-xs font-bold uppercase tracking-wider border-4 px-6 py-3 transition-colors ${
        isActive
          ? 'border-green-600 bg-green-600 text-white'
          : 'border-gray-600 bg-gray-600 text-white'
      }`}>
        {isActive ? 'Research is Public • Everyone can view' : 'Research is Private • Only you can view'}
      </div>
    </div>
  );
}
