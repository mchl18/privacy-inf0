import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type PrivacyFile = {
  name: string;
  size: number;
  modified: Date;
};

type UploadRequest = {
  filename: string;
  content: {
    NSPrivacyAccessedAPITypes: string[];
  };
};

export function usePrivacyConfigs() {
  return useQuery({
    queryKey: ["privacyConfigs"],
    queryFn: async () => {
      const response = await fetch("/api/privacy-files");
      if (!response.ok) throw new Error("Failed to fetch configurations");
      return response.json() as Promise<PrivacyFile[]>;
    },
  });
}

export function useUploadConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadRequest) => {
      const response = await fetch("/api/privacy-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save configuration");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privacyConfigs"] });
    },
  });
}

export function useDownloadConfig() {
  return useMutation({
    mutationFn: async (filename: string) => {
      const response = await fetch(`/api/privacy-files/${filename}`);
      if (!response.ok) throw new Error("Failed to download file");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
} 