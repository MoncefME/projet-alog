import { Room } from "@/app/editor/Room";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";

export default async function Home({ params }: { params: { roomId: string } }) {
  return (
    <main>
      <Room roomId={`liveblocks:examples:nextjs-yjs-tiptap-${params.roomId}`}>
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
