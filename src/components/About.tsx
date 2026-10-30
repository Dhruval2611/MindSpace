import React, { useState, useEffect } from 'react';
import { Eye, Heart, Users, Sparkles, AlertCircle, Play, Pause, RefreshCw } from 'lucide-react';

export const About: React.FC = () => {
  // Interactive Mindful Breathing Exercise State
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isBreathing) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // switch phase
            if (phase === 'Inhale') {
              setPhase('Hold');
              return 4;
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              return 4;
            } else {
              setPhase('Inhale');
              setCyclesCompleted((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing, phase]);

  const toggleBreathing = () => {
    if (!isBreathing) {
      setPhase('Inhale');
      setSecondsLeft(4);
    }
    setIsBreathing(!isBreathing);
  };

  const resetBreathing = () => {
    setIsBreathing(false);
    setPhase('Inhale');
    setSecondsLeft(4);
    setCyclesCompleted(0);
  };

  return (
    <section id="about" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/30 text-forest text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heart & Philosophy</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
            A Little Space to Breathe.
          </h2>
          
          <p className="text-base sm:text-lg text-forest/80 font-normal leading-relaxed">
            College is an incredible chapter, but between academic expectations, future anxieties, and navigating relationships, it is easy to feel overwhelmed. 
            <strong> MINDSPACE</strong> is created to give you pause — to encourage students to talk openly about mental health, understand emotions with curiosity, build healthy coping tools, and connect with peers in a gentle, non-judgmental space.
          </p>
        </div>

        {/* Three Pillar Cards: Awareness, Expression, Connection */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Awareness */}
          <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-soft-lg border border-sage/30 hover:border-sage transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sage/30 text-forest flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Awareness
              </h3>
              <p className="text-forest/75 text-sm leading-relaxed">
                Breaking silence and removing misconceptions around mental health. We provide grounded, stigma-free literacy on recognizing burnout, understanding anxiety, and knowing how and when to reach out for professional guidance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-forest/10 text-xs font-semibold text-forest/60">
              Interactive quizzes • Myth busting • Resource guides
            </div>
          </div>

          {/* Card 2: Expression */}
          <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-soft-lg border border-lavender/40 hover:border-lavender transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-lavender/40 text-forest flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-forest" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Expression
              </h3>
              <p className="text-forest/75 text-sm leading-relaxed">
                Words, colors, movement, and silence. Through open mic poetry, painting, fluid clay, and anonymous emotion boards, students find creative and cathartic avenues to express what is often impossible to put into formal conversation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-forest/10 text-xs font-semibold text-forest/60">
              Open mic • Creative art lounge • Anonymous wall
            </div>
          </div>

          {/* Card 3: Connection */}
          <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-soft-lg border border-peach/40 hover:border-peach transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-peach/40 text-forest flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-forest" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Connection
              </h3>
              <p className="text-forest/75 text-sm leading-relaxed">
                Countering campus loneliness through honest peer presence. Inspired by the Human Library and kindness initiatives, we create micro-conversations where students realize their silent battles are shared by those sitting right beside them.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-forest/10 text-xs font-semibold text-forest/60">
              Human library • Kindness notes • Peer support circles
            </div>
          </div>

        </div>

        {/* Interactive Mindful Breathing Widget ("A Little Space to Breathe") */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-sage-100 via-white to-lavender-100 p-8 sm:p-10 border border-sage/40 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-forest/70">
                Interactive Micro-Practice
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                Take a 60-Second Mindful Pause Right Now
              </h3>
              <p className="text-sm text-forest/80 leading-relaxed">
                The 4-4-4 Box Breathing pattern gently resets your autonomic nervous system, lowering heart rate and quieting mental noise. Try 3 gentle cycles right here on this page.
              </p>
              
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={toggleBreathing}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-forest text-cream font-semibold text-sm hover:bg-forest-600 transition-colors shadow-soft"
                >
                  {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isBreathing ? 'Pause Breathing' : 'Start 4-4-4 Pause'}</span>
                </button>
                
                {cyclesCompleted > 0 && (
                  <button
                    onClick={resetBreathing}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-forest/70 hover:text-forest bg-white/80 border border-forest/15"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}

                {cyclesCompleted > 0 && (
                  <span className="text-xs font-medium text-forest/80 bg-peach/40 px-3 py-1 rounded-full">
                    {cyclesCompleted} {cyclesCompleted === 1 ? 'cycle' : 'cycles'} completed ✨
                  </span>
                )}
              </div>
            </div>

            {/* Breathing Animation Visual Circle */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                
                {/* Outer Breathing Pulsing Ring */}
                <div
                  className={`absolute inset-0 rounded-full border-2 border-dashed border-forest/30 transition-all duration-1000 ${
                    isBreathing
                      ? phase === 'Inhale'
                        ? 'scale-110 border-forest'
                        : phase === 'Hold'
                        ? 'scale-110 border-lavender-500'
                        : 'scale-90 border-peach-500'
                      : 'scale-100'
                  }`}
                />

                {/* Main Calming Orb */}
                <div
                  className={`w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-soft transition-all duration-1000 ${
                    isBreathing
                      ? phase === 'Inhale'
                        ? 'bg-sage scale-105'
                        : phase === 'Hold'
                        ? 'bg-lavender scale-105'
                        : 'bg-peach scale-95'
                      : 'bg-sage/40'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-forest">
                    {isBreathing ? phase : 'Ready?'}
                  </span>
                  <span className="font-serif text-3xl font-bold text-forest">
                    {isBreathing ? `${secondsLeft}s` : 'Breathe'}
                  </span>
                  <span className="text-[10px] text-forest/70 font-medium">
                    {isBreathing ? (phase === 'Hold' ? 'Hold steady' : phase === 'Inhale' ? 'Breathe in' : 'Release gently') : 'Tap to start'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mandatory Educational Disclaimer Note */}
        <div className="mt-12 rounded-2xl bg-forest/5 border border-forest/15 p-5 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-forest/80 leading-relaxed">
            <span className="font-bold text-forest">Important Note & Ethical Disclaimer: </span>
            This festival promotes awareness and peer connection. Activities are educational and are not a substitute for professional mental health care. If you or someone you know is in need of clinical diagnosis, therapy, or emergency psychiatric assistance, please consult a qualified mental health healthcare provider or contact the verified helplines in the Awareness Corner.
          </div>
        </div>

      </div>
    </section>
  );
};
