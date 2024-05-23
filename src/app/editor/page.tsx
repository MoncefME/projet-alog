import { Room } from "@/app/editor/Room";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";

export default async function Home() {
  return (
    <main>
      <Room roomId="liveblocks:examples:nextjs-yjs-tiptap-1">
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
