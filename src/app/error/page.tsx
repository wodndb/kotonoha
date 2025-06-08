"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>ERROR</CardTitle>
            <CardDescription>Sorry, something went wrong</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
