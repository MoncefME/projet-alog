import { Room } from "@/app/editor/Room";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  // use checkAccess to verify user has access to document
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  return (
    <main>
      <Room>
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
