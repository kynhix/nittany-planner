'use client';

import { CardDemo } from "@/components/taskcard";

export default function Home() {
  return (
    <div className="flex">
      <CardDemo category={{ id: 0, name: 'This is my category', tasks: [{ id: 0, name: 'my task', completed: false }] }}></CardDemo>
    </div>
  );
}
