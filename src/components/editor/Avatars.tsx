import { useOthers, useSelf } from "@/liveblocks.config";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex px-3">
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-4 first:ml-0">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className="relative flex justify-center items-center border-4 border-white rounded-full w-10 h-10 bg-gray-400 -ml-3">
      <img src={picture} alt={name} className="w-full h-full rounded-full" />
    </div>
  );
}
