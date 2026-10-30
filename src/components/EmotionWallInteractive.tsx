import React, { useState, useEffect } from 'react';
import { Heart, Send, Shield, MessageSquarePlus, Smile } from 'lucide-react';
import type { EmotionPost } from '../types';
import { storageService } from '../services/storageService';

export const EmotionWallInteractive: React.FC = () => {
  const [posts, setPosts] = useState<EmotionPost[]>([]);
  const [noteText, setNoteText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('Grateful');
  const [authorTag, setAuthorTag] = useState('');
  const [selectedColor, setSelectedColor] = useState<'sage' | 'lavender' | 'peach' | 'cream'>('lavender');
  const [isPosting, setIsPosting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    // Initial load
    setPosts(storageService.getEmotions());

    const handleUpdate = (e: any) => {
      setPosts(e.detail || storageService.getEmotions());
    };

    window.addEventListener('mindspace_emotions_updated', handleUpdate);
    return () => window.removeEventListener('mindspace_emotions_updated', handleUpdate);
  }, []);

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsPosting(true);
    storageService.addEmotion(
      noteText.trim(),
      selectedEmotion,
      authorTag.trim() || 'Anonymous Student',
      selectedColor
    );

    setNoteText('');
    setAuthorTag('');
    setIsPosting(false);
    setFormOpen(false);
  };

  const handleLike = (id: string) => {
    storageService.likeEmotion(id);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'sage':
        return 'bg-sage-100 border-sage/60 text-forest';
      case 'lavender':
        return 'bg-lavender-100 border-lavender/60 text-forest';
      case 'peach':
        return 'bg-peach-100 border-peach/60 text-forest';
      default:
        return 'bg-cream border-forest/15 text-forest';
    }
  };

  const emotionsList = ['Grateful', 'Hopeful', 'Exhausted', 'Reflective', 'Healing', 'Curious', 'Supported'];

  return (
    <section id="emotion-wall" className="py-24 bg-cream/70 border-y border-sage/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-forest/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender/50 text-forest text-xs font-semibold">
              <Smile className="w-3.5 h-3.5 text-forest" />
              <span>Interactive Space • Activity #5</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
              The Anonymous Emotion Wall
            </h2>
            <p className="text-sm sm:text-base text-forest/75 leading-relaxed">
              Whatever you are holding today — exam fatigue, quiet wins, or unspoken thoughts — release it here. 
              A 100% anonymous, moderated campus board where you are never alone.
            </p>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest text-cream text-sm font-semibold hover:bg-forest-600 shadow-soft transition-all self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-peach" />
            <span>{formOpen ? 'Close Note Form' : 'Post Anonymous Note'}</span>
          </button>
        </div>

        {/* Expandable Note Creation Form */}
        {formOpen && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-sage/50 shadow-soft animate-in slide-in-from-top duration-300">
            <h3 className="font-serif text-xl font-bold text-forest mb-4">
              Share a Thought with the Campus
            </h3>

            <form onSubmit={handlePostNote} className="space-y-4">
              <textarea
                rows={3}
                required
                maxLength={240}
                placeholder="What feels heavy or what gave you a moment of gratitude today? (Keep it kind and supportive...)"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full p-4 rounded-2xl border border-sage/50 bg-cream/30 text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all resize-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                
                {/* Emotion Tag Picker */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-forest/70">Mood:</span>
                  {emotionsList.map((emo) => (
                    <button
                      type="button"
                      key={emo}
                      onClick={() => setSelectedEmotion(emo)}
                      className={`px-3 py-1 rounded-full font-medium transition-all ${
                        selectedEmotion === emo
                          ? 'bg-forest text-cream font-bold'
                          : 'bg-cream text-forest/70 hover:bg-sage/30'
                      }`}
                    >
                      {emo}
                    </button>
                  ))}
                </div>

                {/* Color Theme Picker */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-forest/70">Card Color:</span>
                  {(['lavender', 'sage', 'peach', 'cream'] as const).map((col) => (
                    <button
                      type="button"
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedColor === col ? 'scale-125 border-forest' : 'border-transparent'
                      } ${
                        col === 'lavender' ? 'bg-lavender' : col === 'sage' ? 'bg-sage' : col === 'peach' ? 'bg-peach' : 'bg-cream-200'
                      }`}
                    />
                  ))}
                </div>

              </div>

              {/* Author Tag (optional e.g. "Fresher • Physics") */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-forest/10">
                <input
                  type="text"
                  placeholder="Optional Tag (e.g. 'Fresher • Design' or leave blank for 'Anonymous')"
                  value={authorTag}
                  onChange={(e) => setAuthorTag(e.target.value)}
                  className="w-full sm:w-80 px-3 py-2 text-xs rounded-xl border border-sage/50 bg-cream/20 text-forest placeholder:text-forest/40"
                />

                <button
                  type="submit"
                  disabled={isPosting || !noteText.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest text-cream text-xs font-semibold hover:bg-forest-600 disabled:opacity-50 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-peach" />
                  <span>Post to Wall</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Emotion Cards Masonry / Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`p-6 rounded-3xl border shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between ${getColorClasses(
                post.color
              )}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/70 shadow-2xs">
                    {post.emotion}
                  </span>
                  <span className="text-forest/50">{post.timestamp}</span>
                </div>

                <p className="text-sm font-medium leading-relaxed italic">
                  “{post.text}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-forest/10 flex items-center justify-between text-xs">
                <span className="text-forest/70 font-semibold truncate max-w-[140px]">
                  {post.authorTag}
                </span>

                <button
                  onClick={() => handleLike(post.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-forest font-semibold transition-colors shadow-2xs"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
                  <span>{post.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Moderation Assurance */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-forest/60">
          <Shield className="w-4 h-4 text-forest/50" />
          <span>Anonymous messages are continuously peer-moderated for kindness, safety, and respect.</span>
        </div>

      </div>
    </section>
  );
};
