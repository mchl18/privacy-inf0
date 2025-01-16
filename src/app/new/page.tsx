"use client";

import { useState } from "react";
import Link from "next/link";
import { PRIVACY_API_TYPES } from "@/types/privacy";
import { useUploadConfig } from "@/hooks/usePrivacyConfig";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Settings2 } from "lucide-react";

export default function NewConfig() {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [configName, setConfigName] = useState("");
  const uploadConfig = useUploadConfig();

  const handleTypeToggle = (typeId: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(typeId)) {
      newSelected.delete(typeId);
    } else {
      newSelected.add(typeId);
    }
    setSelectedTypes(newSelected);
  };

  const handleSubmit = async () => {
    if (!configName) {
      return;
    }

    uploadConfig.mutate(
      {
        filename: `${configName}.json`,
        content: {
          NSPrivacyAccessedAPITypes: Array.from(selectedTypes),
        },
      },
      {
        onSuccess: () => {
          router.push("/configurations");
        },
      }
    );
  };

  return (

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Settings2 className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              New Privacy Configuration
            </h1>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {uploadConfig.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {uploadConfig.error instanceof Error
                ? uploadConfig.error.message
                : "Failed to save configuration"}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Configuration Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="configName">Configuration Name</Label>
                <Input
                  id="configName"
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  placeholder="my-app-privacy-config"
                  className="border-input bg-background"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium text-foreground">
                  Select Privacy API Types
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PRIVACY_API_TYPES.map((type) => (
                    <Card key={type.id} className="overflow-hidden hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3 pt-1">
                          <div className="flex h-6 w-6 items-center justify-center">
                            <Checkbox
                              id={type.id}
                              checked={selectedTypes.has(type.id)}
                              onCheckedChange={() => handleTypeToggle(type.id)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor={type.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {type.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {type.description}
                            </p>
                            <a
                              href={type.documentation}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                            >
                              View Documentation
                              <ArrowLeft className="h-3 w-3 rotate-180" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={uploadConfig.isPending || !configName}
                  className="w-full sm:w-auto"
                >
                  {uploadConfig.isPending ? "Saving..." : "Save Configuration"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

  );
}
