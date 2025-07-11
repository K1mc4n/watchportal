// src/components/ui/Share.tsx (Versi yang Diperbarui)

'use client';

import { useCallback, useState } from 'react';
// 1. Impor ButtonProps dan buttonVariants untuk mendapatkan semua prop yang valid
import { Button, type ButtonProps } from './Button'; 
import { useMiniApp } from '@neynar/react';
import { type ComposeCast } from "@farcaster/frame-sdk";

interface CastConfig {
  text: string;
  embeds?: [string] | [string, string]; 
  parent?: ComposeCast.Options['parent'];
  channelKey?: string;
  close?: boolean;
}

// 2. Gabungkan props custom dengan ButtonProps
interface ShareButtonProps extends ButtonProps {
  buttonText: string;
  cast: CastConfig;
}

export function ShareButton({ 
  buttonText, 
  cast, 
  className = '', 
  isLoading = false, 
  // 3. Terima semua prop Button lainnya (seperti variant, size, dll.)
  ...props 
}: ShareButtonProps) {
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
      // 4. Teruskan semua prop tambahan ke komponen Button
      {...props} 
    >
      {buttonText}
    </Button>
  );
}
