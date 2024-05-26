import { checkAccess } from "@/actions/documents";
import { Room } from "@/app/editor/Room";
import { AccessDenied } from "@/components/core/AccessDenied";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";
import { createClient } from "@/utils/supabase/server";

export default async function Home({ params }: { params: { roomId: string } }) {
  const supabase = createClient();
  const currentUser = await supabase.auth.getUser();
  if (!currentUser) {
    return <AccessDenied />;
  }

  const hasAccess = await checkAccess(
    currentUser.data.user?.id || "",
    params.roomId
  );

  if (!hasAccess) {
    return <AccessDenied />;
  }
  return (
    <main>
      <Room roomId={`liveblocks:examples:nextjs-yjs-tiptap-${params.roomId}`}>
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
