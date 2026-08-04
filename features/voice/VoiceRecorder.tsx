'use client';

import React, { useState, useRef } from 'react';
import { generateId } from '@/lib/utils';
import { AtlasItem } from '@/types/atlas';

import {
  Mic,
  Square,
  Play,
  Pause,
  Sparkles,
  Loader2,
  Save,
  CheckCircle2,
  Volume2,
  RotateCcw,
} from 'lucide-react';

interface VoiceRecorderProps {
  onSaveVoiceItem: (item: AtlasItem) => void;
}

export function VoiceRecorder({ onSaveVoiceItem }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [rawTranscript, setRawTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  const startRecording = async () => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone recording is not supported in this browser context.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone access error:', err?.message || err);
      setMicError(
        'Microphone access is unavailable or denied. You can still type or paste your spoken ideas directly into the text box below to synthesize with AI.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTranscribeAndSummarize = async () => {
    if (!rawTranscript && !audioUrl) return;
    setIsTranscribing(true);

    try {
      const res = await fetch('/api/ai/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawTranscript: rawTranscript || 'Voice recording audio capture',
        }),
      });

      const data = await res.json();
      if (data.data) {
        setAiResult(data.data);
      }
    } catch (err) {
      console.error('Error during transcription:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSaveToAtlas = () => {
    const newItem: AtlasItem = {
      id: generateId('voice'),
      title: aiResult?.title || `Voice Note (${recordingSeconds}s)`,
      type: 'voice',
      content: aiResult?.cleanedTranscript || rawTranscript || 'Voice memo recording',
      summary: aiResult?.summary || 'Voice recording saved in GoAtlas.',
      keyTakeaways: aiResult?.keyTakeaways || ['Recorded via microphone'],
      category: aiResult?.category || 'Education',
      tags: aiResult?.tags || ['voice', 'memo'],
      keywords: [],
      relatedTopics: [],
      collectionIds: [],
      mediaUrl: audioUrl || undefined,
      readingTimeMinutes: Math.ceil(recordingSeconds / 60) || 1,
      readingProgress: 100,
      isFavorite: false,
      isArchived: false,
      isRead: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      visitCount: 1,
      author: 'Voice Recording',
    };

    onSaveVoiceItem(newItem);
    resetRecorder();
  };

  const resetRecorder = () => {
    setIsRecording(false);
    setRecordingSeconds(0);
    setRawTranscript('');
    setAudioUrl(null);
    setAiResult(null);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="pb-4 border-b border-[#ECECEC]">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-red-500" />
          <h1 className="text-xl font-bold text-neutral-900">
            Voice Memos & Audio Transcriber
          </h1>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Record spoken thoughts. AI automatically transcribes, structures, and indexes them into your knowledge base.
        </p>
      </div>

      <div className="bg-white border border-[#ECECEC] rounded-2xl p-8 text-center space-y-6 shadow-sm">
        {/* Record Button & Visualizer */}
        <div className="space-y-4">
          <div className="relative inline-block">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold transition-all shadow-lg mx-auto ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse scale-110'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8 fill-current" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="text-2xl font-mono font-bold text-neutral-900">
            {formatTime(recordingSeconds)}
          </div>

          <p className="text-xs text-neutral-500 font-medium">
            {isRecording ? 'Recording audio... Click stop when finished.' : 'Click mic to start recording audio'}
          </p>

          {micError && (
            <div className="max-w-md mx-auto p-3 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-xl space-y-1">
              <p>{micError}</p>
              <p className="text-[11px] text-amber-700">
                💡 <strong>Tip:</strong> If you are viewing inside an embedded preview iframe, opening the app in a new tab allows your browser to prompt for microphone permission directly.
              </p>
            </div>
          )}
        </div>

        {/* Audio Player if URL exists */}
        {audioUrl && (
          <div className="max-w-md mx-auto p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
              <span className="flex items-center gap-1">
                <Volume2 className="w-4 h-4 text-blue-600" /> Audio Recording Preview
              </span>
              <button
                onClick={resetRecorder}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <audio src={audioUrl} controls className="w-full h-8" />
          </div>
        )}

        {/* Manual or Speech Text Input */}
        <div className="max-w-xl mx-auto space-y-2 text-left">
          <label className="block text-xs font-semibold text-neutral-700">
            Transcript / Spoken Idea Text
          </label>
          <textarea
            value={rawTranscript}
            onChange={(e) => setRawTranscript(e.target.value)}
            placeholder="Type or dictate spoken audio transcript here..."
            rows={4}
            className="w-full p-3.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleTranscribeAndSummarize}
            disabled={isTranscribing || (!rawTranscript && !audioUrl)}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isTranscribing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Processing Audio with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Synthesize & Structure with AI
              </>
            )}
          </button>
        </div>

        {/* AI Result Card */}
        {aiResult && (
          <div className="max-w-xl mx-auto text-left bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-neutral-900">
              {aiResult.title}
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              {aiResult.summary}
            </p>

            <div className="pt-3 border-t border-blue-200/60 flex justify-end">
              <button
                onClick={handleSaveToAtlas}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                Save to GoAtlas Inbox
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
