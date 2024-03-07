'use client';

import { useEffect, useState } from 'react';
import AddFriend from '@/components/AddFriend';

export type Friend = {
  _id: number;
  name: string;
};

export default function Home() {
  const [friendList, setFriendList] = useState<Friend[]>([]);

  useEffect(() => {
    // This gets called on every request
    async function fetchFriendList() {
      // Fetch data from external API
      const res = await fetch(`http://localhost:4000/friends`);
      const data = await res.json();

      // Pass data to the page via props
      setFriendList(data);
    }

    fetchFriendList();
  }, []);

  const onAddFriend = (friend: Friend) => { 
    setFriendList([...friendList, friend]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center flex-col">
        <AddFriend onAddFriend={onAddFriend} />
        <hr className="my-8 w-full" />
        <ul className="flex flex-col gap-4">
          {friendList.map(friend => (
            <li key={friend._id} className="flex items-center gap-4">
              <div>
                - <h2 className="text-xl font-bold">{friend.name}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
