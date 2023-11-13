// import Counter from './components/counter';
import 'server-only';

import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Audio Archive - Landing Page</h1>
      <a href="/api/download" target="_blank" rel="noopener noreferrer">
        Download
      </a>
    </main>
  );
}
