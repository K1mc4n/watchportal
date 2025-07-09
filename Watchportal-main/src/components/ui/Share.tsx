// src/components/ui/Share.tsx

'use client';

import { useCallback, useState } from 'react';
import { Button } from './Button';
import { useMiniApp } from '@neynar/react';
import { type ComposeCast } from "@farcaster/frame-sdk";

// Definisikan tipe cast config yang lebih sederhana dan sesuai
interface CastConfig {
  text: string;
  // Embeds sekarang adalah array of strings, sesuai permintaan SDK
  embeds?: [string] | [string, string]; 
  parent?: ComposeCast.Options['parent'];
  channelKey?: string;
  close?: boolean;
}

interface ShareButtonProps {
  buttonText: string;
  cast: CastConfig;
  className?: string;
  isLoading?: boolean;
}

export function ShareButton({ buttonText, cast, className = '', isLoading = false }: ShareButtonProps) {
  const { actions } = useMiniApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShare = useCallback(async () => {
    if (!actions?.composeCast) {
      console.error('Compose Cast action is not available.');
      alert('Share feature is not available in this client.');
      return;
    }

    try {
      setIsProcessing(true);
      
      // Kita langsung teruskan 'cast' karena tipenya sudah benar
      await actions.composeCast(cast);

    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [cast, actions]);

  return (
    <Button
      onClick={handleShare}
      className={className}
      isLoading={isLoading || isProcessing}
    >
      {buttonText}
    </Button>
  );
}
