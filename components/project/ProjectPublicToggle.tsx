import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

export default function ProjectPublicToggle({ defaultStatus }: { defaultStatus: boolean }) {
  const params = useParams();
  const slug = params.slug as string;
  const [isActive, setActive] = useState(defaultStatus)
  console.log(defaultStatus)

  const mutation = useMutation({
    mutationFn: (value: boolean) => {
      return instance.put(`/api/project/${slug}/toggle-public`, { is_public: value })
    },
    onSuccess: (data: any) => {
      setActive(prev => !prev)
      toast.success(data.data.project.is_public ? 'This research is public now' : 'This research is private now')
    },
    onError: (e) => {
      toast.success('Unexecpted error occured')
    }
  })

  const handleChange = (checked: boolean) => {
    mutation.mutate(checked)
  }

  return (
    <Switch checked={isActive} onCheckedChange={handleChange}>Project publish status</Switch>
  );
}
