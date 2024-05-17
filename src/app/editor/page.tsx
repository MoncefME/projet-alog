import { Room } from "@/app/editor/Room";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";

export default function Home() {
  return (
    <main>
      <Room>
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
