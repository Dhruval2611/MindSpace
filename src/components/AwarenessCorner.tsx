import React, { useState } from 'react';
import { 
  Heart, 
  BookOpen, 
  Moon, 
  Users, 
  Coffee, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ExternalLink
} from 'lucide-react';
import { HELPLINE_DIRECTORY } from '../data/initialData';

export const AwarenessCorner: React.FC = () => {
  // Myths vs Facts interactive tab or state
  const [activeMythIndex, setActiveMythIndex] = useState<number | null>(null);

  const mythsVsFacts = [
    {
      myth: "Mental health struggles mean someone is weak or not suited for college.",
      fact: "Mental health conditions are biological and psychological health states, not character flaws. High-achieving, brilliant students frequently navigate anxiety and depression.",
      takeaway: "Asking for help takes immense self-awareness and strength."
    },
    {
      myth: "Mindfulness and yoga can cure all mental illnesses.",
      fact: "Mindfulness is a supportive lifestyle practice that calms the nervous system, but it does not replace medical psychiatric care, psychotherapy, or medications when clinically required.",
      takeaway: "Complementary tools support therapy, but never replace professional medical diagnosis."
    },
    {
      myth: "If a friend is having a difficult time, you need to offer expert solutions or fix their problems.",
      fact: "You don't need to be a certified therapist to help. Empathetic listening without interrupting, checking in regularly, and gently helping them connect with trusted counseling is the most impactful support.",
      takeaway: "Validation and presence matter far more than quick fixes."
    },
    {
      myth: "Therapy is only for people in extreme crisis or severe emergencies.",
      fact: "Therapy is proactive mental hygiene. Many students seek counseling for everyday stress, relationship hurdles, perfectionism, boundary-setting, and life transitions before things escalate.",
      takeaway: "You don't have to wait until you hit rock bottom to speak with a counselor."
    }
  ];

  const studentWellnessPillars = [
    {
      icon: Moon,
      title: "Restorative Sleep",
      tagline: "7–8 Hours Is Non-Negotiable",
      desc: "All-nighters impair memory consolidation and skyrocket cortisol. Prioritizing consistent sleep protects cognitive recall far more than cramming at 3:00 AM.",
      badge: "Cognitive Defense",
      color: "bg-lavender/50 text-forest"
    },
    {
      icon: Users,
      title: "Social Connection",
      tagline: "Break The Study Isolation",
      desc: "Even a 15-minute chai with a classmate or a phone call with home acts as an emotional buffer against loneliness and academic imposter syndrome.",
      badge: "Emotional Buffer",
      color: "bg-peach/50 text-forest"
    },
    {
      icon: Coffee,
      title: "Intentional Micro-Breaks",
      tagline: "Step Away from Blue Light",
      desc: "Use the Pomodoro rhythm (25 mins focus, 5 mins walk/stretch). True breaks mean looking at trees or closing your eyes — not doomscrolling on social feeds.",
      badge: "Focus Reset",
      color: "bg-sage/50 text-forest"
    },
    {
      icon: Heart,
      title: "Realistic Self-Care",
      tagline: "Hydration, Nutrition, Breath",
      desc: "Self-care is not always luxury; it is eating a balanced warm meal, stepping out in morning sunlight, setting digital boundaries, and speaking kindly to yourself.",
      badge: "Foundational",
      color: "bg-forest/10 text-forest"
    }
  ];

  return (
    <section id="awareness" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/40 text-forest text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-forest" />
            <span>Student Mental Literacy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
            Let’s Talk About Mental Health.
          </h2>

          <p className="text-base text-forest/80 leading-relaxed">
            Mental health is just as tangible and vital as physical health. It influences how we think, regulate feelings, sustain relationships, and navigate academic stress.
          </p>
        </div>

        {/* 1. What Mental Health Means & Why Well-Being Matters for Students */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-sage/40 shadow-soft space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-forest/60">
              Understanding The Landscape
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              What Mental Health Really Means
            </h3>
            <p className="text-sm text-forest/80 leading-relaxed">
              Mental health is not merely the absence of a psychological diagnosis; it is our overall emotional, cognitive, and social equilibrium. In a college environment, your mental health determines how you cope with academic setbacks, adapt to independence, and care for yourself under deadlines.
            </p>
            <div className="p-4 rounded-2xl bg-cream border border-forest/10 text-xs text-forest/75 space-y-1.5">
              <p className="font-bold text-forest">Fluctuating Continuum:</p>
              <p>Just as you catch a common cold or sprain a muscle, your mental state naturally ebbs and flows between thriving, surviving, and struggling. Recognizing when you are in the yellow or red zone is healthy literacy.</p>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-forest text-cream shadow-soft space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-peach">
              Student Reality Check
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
              Why Well-Being Matters in College
            </h3>
            <p className="text-sm text-cream/80 leading-relaxed">
              Academic success cannot be sustained by burning out your emotional health. When your mental health is nourished, cognitive retention improves, creative problem-solving increases, and peer relationships become deeply fulfilling.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-cream/90">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="block font-bold text-peach text-sm">73%</span>
                <span className="text-[11px] text-cream/70">of students report periods of overwhelming anxiety during exams.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="block font-bold text-peach text-sm">1 in 3</span>
                <span className="text-[11px] text-cream/70">express difficulty finding trusted peers to talk to openly.</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Four Pillars of Daily Academic Well-Being */}
        <div className="mt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Everyday Coping & Grounding Habits
            </h3>
            <p className="text-xs sm:text-sm text-forest/70 mt-1">
              Practical ways to protect your nervous system during busy semesters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentWellnessPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white p-6 sm:p-7 border border-sage/30 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-forest">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${pillar.color}`}>
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-forest">
                      {pillar.title}
                    </h4>

                    <p className="text-xs font-semibold text-forest/60">
                      {pillar.tagline}
                    </p>

                    <p className="text-xs text-forest/75 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Interactive Myths vs. Facts Section */}
        <div className="mt-20 p-8 sm:p-12 rounded-4xl bg-white border border-sage/40 shadow-soft">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-forest/60">
              Challenging Campus Stigmas
            </span>
            <h3 className="font-serif text-3xl font-bold text-forest">
              Mental Health: Myths vs. Facts
            </h3>
            <p className="text-xs sm:text-sm text-forest/70">
              Click on each myth card to reveal the evidence-based perspective and key takeaway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mythsVsFacts.map((item, index) => {
              const isRevealed = activeMythIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => setActiveMythIndex(isRevealed ? null : index)}
                  className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-300 ${
                    isRevealed
                      ? 'bg-sage-50 border-forest/40 shadow-soft'
                      : 'bg-cream/40 border-sage/40 hover:bg-cream hover:border-forest/20'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Myth Tag */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Myth #{index + 1}
                      </span>
                      <span className="text-xs text-forest/60 underline font-medium">
                        {isRevealed ? 'Hide Fact' : 'Tap to Reveal Fact'}
                      </span>
                    </div>

                    <p className="font-serif text-base sm:text-lg font-bold text-forest">
                      “{item.myth}”
                    </p>

                    {/* Revealed Fact */}
                    {isRevealed && (
                      <div className="pt-4 border-t border-forest/10 space-y-2 animate-in fade-in duration-200">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>The Psychological Fact:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-forest/80 leading-relaxed">
                          {item.fact}
                        </p>
                        <div className="p-3 rounded-xl bg-white border border-sage/50 text-[11px] font-semibold text-forest">
                          💡 <strong>Key Takeaway:</strong> {item.takeaway}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. How to Support a Friend in Distress */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-forest via-forest-600 to-forest p-8 sm:p-12 text-cream shadow-soft">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-peach">
              Peer Empathy Playbook
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold">
              How to Support a Friend Having a Difficult Time
            </h3>
            <p className="text-sm text-cream/80 leading-relaxed">
              When someone is struggling, you don't need all the answers. Your quiet presence and active listening can be a lifeline.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <span className="w-7 h-7 rounded-full bg-peach text-forest font-bold text-xs flex items-center justify-center">1</span>
                <p className="font-bold text-sm text-cream">Listen Without Fixing</p>
                <p className="text-xs text-cream/75 leading-relaxed">
                  Avoid saying "it could be worse" or giving immediate unsolicited advice. Instead say: "I hear you, and that sounds really heavy."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <span className="w-7 h-7 rounded-full bg-lavender text-forest font-bold text-xs flex items-center justify-center">2</span>
                <p className="font-bold text-sm text-cream">Offer Concrete Support</p>
                <p className="text-xs text-cream/75 leading-relaxed">
                  Instead of "let me know if you need anything", offer specific help: "Can I bring you a warm lunch?" or "Would you like to study silently together?"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <span className="w-7 h-7 rounded-full bg-sage text-forest font-bold text-xs flex items-center justify-center">3</span>
                <p className="font-bold text-sm text-cream">Bridge to Help</p>
                <p className="text-xs text-cream/75 leading-relaxed">
                  If they feel overwhelmed, offer to walk with them to the college counseling cell or stay on the line while they dial a confidential helpline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. When & How to Seek Professional Help + Verified Helplines Directory */}
        <div className="mt-20 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-forest/60">
              Professional Care Directory
            </span>
            <h3 className="font-serif text-3xl font-bold text-forest">
              Verified Counseling Services & 24/7 Helplines
            </h3>
            <p className="text-xs sm:text-sm text-forest/70">
              Reaching out is a sign of courage. All contacts listed below are confidential, toll-free, and student-friendly.
            </p>
          </div>

          {/* Directory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HELPLINE_DIRECTORY.map((contact, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-sage/40 shadow-soft flex flex-col justify-between space-y-4 hover:border-forest/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                      <PhoneCall className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-bold text-forest/70 bg-cream px-2 py-0.5 rounded-full">
                      {contact.timing}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-forest">
                    {contact.name}
                  </h4>

                  <p className="text-xs text-forest/75 leading-relaxed">
                    {contact.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-forest/10 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-forest">
                    {contact.phone}
                  </span>
                  
                  {contact.phone.startsWith('+') || contact.phone.startsWith('1') ? (
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-600 underline"
                    >
                      <span>Call Now</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-forest/50 italic">Campus Resource</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Strict Clinical & Diagnostic Boundary Disclaimer */}
          <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Medical Disclaimer:</strong> MINDSPACE 2026 is an educational and peer-connection event. This website does not administer psychological diagnoses, mental health assessments, psychiatric evaluations, or clinical therapies. In life-threatening emergencies or severe psychiatric crises, please visit your nearest hospital emergency room immediately or dial national emergency services.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
