"use client";

import { ReactNode, use, useEffect, useMemo } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "@/components/editor/Loading";
import { createClient } from "@/utils/supabase/client";
import { checkAccess } from "@/actions/documents";

export function Room({ children }: { children: ReactNode }) {
  const router = useRouter();
  const documentId = useSearchParams()?.get("documentId");
  if (!documentId) {
    throw new Error("Document ID not found.");
  }
  useEffect(() => {
    const checkRoomAccess = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not found.");
      }
      const response = await checkAccess(
        user.data.user?.id || "",
        documentId || ""
      );
      if (!response) {
        console.error("Access denied.");
        router.push("/home");
      }
    };
    checkRoomAccess();
  }, []);

  return (
    <RoomProvider
      id={documentId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
