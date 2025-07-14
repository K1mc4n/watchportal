// Lokasi file: src/components/ui/Footer.tsx
'use client';

import { useState } from 'react';
// Hapus 'PlusSquare' dari impor karena tidak digunakan lagi
import { Home, MessageCircle, type LucideIcon } from 'lucide-react'; 
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

  // Logika untuk tab aktif disederhanakan, tidak ada lagi 'submit'
  const getActiveTab = (): 'home' | 'chat' | null => {
    if (isChatOpen) return 'chat';
    if (pathname === '/') return 'home'; 
    return null;
  };

  const activeTab = getActiveTab();

  return (
    <>
      {isChatOpen && <ChatWindow onClose={handleCloseChat} />}

      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-sm border-t border-neutral-700/50 shadow-lg">
        {/* Konten footer kini hanya memiliki dua tombol */}
        <div className="flex justify-around max-w-lg mx-auto px-1">
          <NavItem href="/" icon={Home} label="Home" isActive={activeTab === 'home'} />
          <ChatButton onClick={handleToggleChat} isActive={activeTab === 'chat'} />
        </div>
      </footer>
    </>
  );
}
