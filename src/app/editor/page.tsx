import { checkAccess } from "@/actions/documents";
import { Room } from "@/app/editor/Room";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  return (
    <main>
      <Room>
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
