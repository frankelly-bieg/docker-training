'use client';

import { useState } from 'react';
import type { Friend } from '@/app/page';

type AddFriendProps = {
  onAddFriend: (friend: Friend) => void;
};

export default function AddFriend({ onAddFriend }: AddFriendProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || name.length < 3) return;
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      const friend = await response.json();

      onAddFriend(friend);
      setName('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        className="p-2 border border-gray-300 rounded-lg text-black"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg" disabled={isLoading}>
        {isLoading ? 'Adding friend...' : 'Add Friend'}
      </button>
    </form>
  );
}
