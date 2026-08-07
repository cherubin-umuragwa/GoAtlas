'use client';

import React from 'react';
import type { AtlasNotification } from '@/types/atlas';
import { X, Bell, CheckCircle2, Sparkles, RotateCcw } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  notifications: AtlasNotification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onOpenTargetItem?: (itemId: string) => void;
}

export function NotificationsModal({
  isOpen,
  notifications,
  onClose,
  onMarkRead,
  onOpenTargetItem,
}: NotificationsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-end p-4 pt-16">
      <div className="bg-white border border-neutral-200 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-neutral-900">
              Atlas System Updates
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-500">
              No notifications at this time.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  onMarkRead(n.id);
                  if (n.targetItemId && onOpenTargetItem) {
                    onOpenTargetItem(n.targetItemId);
                    onClose();
                  }
                }}
                className={`p-4 hover:bg-neutral-50 transition-colors cursor-pointer space-y-1 ${
                  !n.read ? 'bg-blue-50/30 font-medium' : 'opacity-70'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" /> {n.title}
                  </span>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {n.message}
                </p>
                <span className="block text-[10px] text-neutral-400 font-mono pt-1">
                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
