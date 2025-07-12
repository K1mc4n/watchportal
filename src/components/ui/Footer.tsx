// Lokasi file: src/components/ui/Footer.tsx

'use client';

import { useState } from 'react';
// Hapus 'Trophy' dari daftar impor
import { Home, Newspaper, PlusSquare, MessageCircle, Swords, ListChecks, type LucideIcon } from 'lucide-react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChatWindow } from '~/components/ui/ChatWindow';

const NavItem = ({ href, icon: Icon, label, isActive }: { href: string; icon: LucideIcon; label: string; isActive: boolean; }) => (
  <Link href={href} className="flex-1">
    <div className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${isActive ? 'text-gold' : 'text-gray-500 hover:text-gold'}`}>
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  </Link>
);

const ChatButton = ({ onClick, isActive }: { onClick: () => void; isActive: boolean; }) => (
    <div className="flex-1" onClick={onClick}>
        <div className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors cursor-pointer ${isActive ? 'text-gold' : 'text-gray-500 hover:text-gold'}`}>
          <MessageCircle className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Chat AI</span>
        </div>
    </div>
);

export function Footer() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleChat = () => setIsChatOpen(!isChatOpen);
  const handleCloseChat = () => setIsChatOpen(false);

  // Hapus 'leaderboard' dari tipe dan fungsi
  const getActiveTab = (): 'home' | 'news' | 'submit' | 'quiz' | 'quests' | 'chat' | null => {
    if (isChatOpen) return 'chat';
    if (pathname.startsWith('/leaderboard')) return null; // Leaderboard tidak lagi memiliki status aktif di footer
    if (pathname.startsWith('/quiz')) return 'quiz';
    if (pathname.startsWith('/quests')) return 'quests';
    if (pathname.startsWith('/news')) return 'news';
    if (pathname.startsWith('/submit')) return 'submit';
    if (pathname === '/') return 'home'; 
    return null;
  };

  const activeTab = getActiveTab();

  return (
    <>
      {isChatOpen && <ChatWindow onClose={handleCloseChat} />}

      <footer className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-700 shadow-lg">
        {/* Hapus NavItem untuk Leaderboard */}
        <div className="flex justify-around max-w-lg mx-auto px-1">
          <NavItem href="/" icon={Home} label="Home" isActive={activeTab === 'home'} />
          <NavItem href="/news" icon={Newspaper} label="News" isActive={activeTab === 'news'} />
          <NavItem href="/quests" icon={ListChecks} label="Quests" isActive={activeTab === 'quests'} />
          <NavItem href="/quiz" icon={Swords} label="Challenge" isActive={activeTab === 'quiz'} />
          <NavItem href="/submit" icon={PlusSquare} label="Submit" isActive={activeTab === 'submit'} />
          <ChatButton onClick={handleToggleChat} isActive={activeTab === 'chat'} />
        </div>
      </footer>
    </>
  );
}
