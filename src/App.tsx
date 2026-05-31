import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Compass, 
  Moon, 
  Check, 
  X, 
  Calendar, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Star, 
  ChevronLeft, 
  ArrowRight, 
  Globe, 
  ShieldAlert, 
  Sun, 
  Activity, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Music2, 
  Heart, 
  Award,
  Bell,
  RefreshCw,
  Send,
  Zap,
  Milestone,
  GitCommit,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Flame,
  User
} from 'lucide-react';

// Offerings data defined here to keep the component organized
interface Offering {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  duration: string;
  price: string;
  colorGrade: string;
}

const OFFERINGS: Offering[] = [
  {
    id: "deep-soul",
    title: "1:1 Deep Soul Awakening",
    tagline: "Intensiv-Begleitung & energetisches Alignment",
    description: "Eine 12-wöchige, tiefgreifende Reise zu deinem wahren Kern. Wir lösen alte karmische Blockaden, aktivieren deine ursprünglichen Lichtcodes und verankern dein Bewusstsein auf einer vollkommen neuen Schwingungsebene.",
    features: [
      "Wöchentliche Deep-Dive Sessions (90 Min) per Zoom",
      "Persönliche Begleitung via verschlüsseltem Direct Messenger",
      "Individuelle Trance-Channelings für deine Lebensfragen",
      "Dein persönliches Integrations-Arbeitsbuch & Audios"
    ],
    duration: "12 Wochen Begleitung",
    price: "Premium Mentoring",
    colorGrade: "from-amber-500/20 to-orange-600/10"
  },
  {
    id: "cosmic-circle",
    title: "Cosmic Circle Mastermind",
    tagline: "Gruppen-Energiearbeit & Higher Consciousness",
    description: "Der heilige, geschützte Raum für bewusste Leader, Therapeutinnen und Visionäre. Gemeinsam weiten wir das kollektive Bewusstseinsfeld, empfangen luzide kosmische Impulse und transformieren alte Strukturen in strahlende Kraft.",
    features: [
      "Zwei Live-Übertragungen im Monat im exklusiven Kreis",
      "Gemeinsames globales Energie-Heilungssystem",
      "Direkte Interaktion & Netzwerken mit High-Vibe Seelen",
      "Saisonale Rituale zu Portaltagen und Neumondphasen"
    ],
    duration: "6 Monate Circle",
    price: "Collective Field",
    colorGrade: "from-violet-500/20 to-purple-600/10"
  },
  {
    id: "light-body",
    title: "Light Body Activation",
    tagline: "Einzelsitzung zur Chakren- & Aura-Harmonisierung",
    description: "Eine hochenergetische, fokussierte Einzelsitzung zur unmittelbaren Ausrichtung deines bioenergetischen Systems. Finde sofortige Erholung von emotionalem Stress, löse Blockaden und stärke deine Aura nachhaltig.",
    features: [
      "90 Minuten intuitive Frequenz-Übertragung & Heilarbeit",
      "Detaillierter Scan deines feinstofflichen Energiefeldes",
      "Lokalisierte Blockadenlösung (Chakrenausgleich)",
      "Persönliches Frequenz-Integrations-Audio für danach"
    ],
    duration: "Einzelsitzung (90 Min)",
    price: "Energetisches Alignment",
    colorGrade: "from-cyan-500/20 to-blue-600/10"
  }
];

const ORACLE_CARDS = [
  {
    id: 1,
    title: "Kosmisches Vertrauen",
    subtitle: "Schlüsselcode: URVERTRAUEN",
    message: "Lasse alle Anspannung des Suchens los. Du wirst geliebt, geschützt und in jedem Atemzug getragen. Was wirklich für dich bestimmt ist, findet den Weg in deine Realität.",
    chakra: "Wurzelchakra",
    element: "Erde",
    affirmation: "„Ich bin sicher, getragen und verwurzelt im Herzen des Universums.“"
  },
  {
    id: 2,
    title: "Herzens-Expansion",
    subtitle: "Schlüsselcode: FREQUENZ DER LIEBE",
    message: "Dein Herz ist das stärkste elektromagnetische Feld deines Körpers. Dehne es weit über das Physische aus und empfange die unendliche Fülle kosmischer Zuneigung.",
    chakra: "Herzchakra",
    element: "Äther / Luft",
    affirmation: "„Ich öffne mich vollkommen für die heilende Frequenz der universellen Liebe.“"
  },
  {
    id: 3,
    title: "Innere Wahrheit",
    subtitle: "Schlüsselcode: SEELENSTIMME",
    message: "Deine Worte tragen Schwingung und Schöpferkraft. Sprich deine göttliche Absicht mit reinem Herzen aus. Halte dich nicht länger klein; deine Stimme wird gebraucht.",
    chakra: "Halschakra",
    element: "Klang",
    affirmation: "„Ich bringe meine Wahrheit mit Mut, Sanftmut und Liebe zum Ausdruck.“"
  },
  {
    id: 4,
    title: "Kosmische Vision",
    subtitle: "Schlüsselcode: SEHERKRAFT",
    message: "Hinter den dichten Schleiern des Alltags liegt die reine Klarheit deiner Seele. Vertraue deinen geheimnisvollen Eingebungen, Visionen und Synchronizitäten.",
    chakra: "Drittes Auge",
    element: "Licht",
    affirmation: "„Ich blicke über die Illusion hinaus und sehe die göttliche Wahrheit.“"
  },
  {
    id: 5,
    title: "Göttliche Einheit",
    subtitle: "Schlüsselcode: TRANSZENDENZ",
    message: "Du bist nicht abgetrennt von der Schöpfung. Du bist das gesamte unendliche Universum, das sich selbst für einen Moment lang als Mensch erfährt. Kehre heim in das freie Gewahrsein.",
    chakra: "Kronenchakra",
    element: "Reines Bewusstsein",
    affirmation: "„Ich öffne mich für den göttlichen Funken und fließe in Einheit mit dem All.“"
  }
];

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'burnout' | 'initiation' | 'awakening' | 'portal' | 'today';
}

const AWAKENING_STORY: TimelineEvent[] = [
  {
    year: "2011",
    title: "Die Illusion des Erfolgs",
    subtitle: "Gefangen in der Corporate-Tretmühle",
    description: "Als erfolgreiche Projektleiterin in der Münchner Wirtschaft führte ich ein Leben voller Termindruck, Zahlen, KPIs und chronischem innerem Stress. Mein Verstand regierte alles, während meine seelische Stimme im Lärm des Corporate-Alltags völlig verstummte.",
    iconType: 'burnout'
  },
  {
    year: "2014",
    title: "Der physische Zusammenbruch",
    subtitle: "Das Erwachen am tiefsten Punkt",
    description: "Nach einem schweren Burnout kam der absolute Stillstand. In dieser erzwungenen Dunkelheit und Ruhe hörte ich zum ersten Mal wieder das leise Flüstern meiner Seele. Ein tiefes Erwachen setzte ein: Ich begriff das multidimensionale feinstoffliche Spüren als Gabe, nicht als Last.",
    iconType: 'initiation'
  },
  {
    year: "2016",
    title: "Die spirituelle Schatzsuche",
    subtitle: "Initiation in alten Heilsystemen",
    description: "Es folgten intensive Studien der schamanischen Trance-Heilung und systemischen Familienaufstellung in Peru und Indien. Ich lernte von weisen Ältesten, Alchemie zu betreiben, Frequenzen zu modulieren und den menschlichen Lichtkörper in seiner Ganzheit zu verstehen.",
    iconType: 'awakening'
  },
  {
    year: "2019",
    title: "Die Pforten öffnen sich",
    subtitle: "Eröffnung der ersten Münchner Praxis",
    description: "Inge Schneider Seelencoaching war geboren. In meiner Praxis durfte ich miterleben, wie hunderte Seelen durch Chakrenharmonisierung und systemische Lichtarbeit von emotionalem Groll, karmischen Lasten und tiefsitzenden Ahnenschulden befreit wurden.",
    iconType: 'portal'
  },
  {
    year: "Heute",
    title: "Souveränität & Urkraft",
    subtitle: "Internationale Heilarbeit & Transformation",
    description: "Heute begleite ich Führungskräfte, Macherinnen und Suchende weltweit im Higher-Consciousness Mentoring. Durch das harmonische Verschmelzen von realer Bodenständigkeit und transzendenter Energiearbeit wecken wir deine kosmische Bestimmung.",
    iconType: 'today'
  }
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Muss ich spirituell veranlagt sein, um von deinen Sitzungen zu profitieren?",
    answer: "Nein, überhaupt nicht. Inge Schneiders Methoden holen dich genau dort ab, wo du dich gerade befindest. Viele unserer Klienten kommen aus rationalen oder wirtschaftlichen Berufen und schätzen die unprätentiöse, geerdete Verbindung aus moderner Quantenphysik, Systemtheorie und feinstofflicher Heilarbeit. Alles, was du brauchst, ist die Offenheit, dich auf eine neue innere Erfahrung einzulassen."
  },
  {
    question: "Wie läuft eine Fern-Energieübertragung genau ab?",
    answer: "Energie ist weder an Zeit noch an physikalischen Raum gebunden. Ähnlich wie ein Radiosender, den du überall auf der Welt empfangen kannst, wenn dein Empfänger auf die richtige Frequenz eingestellt ist, erzeugen wir im Gespräch ein hochfrequentes, geschütztes Resonanzfeld. Während der Sitzung entspannst du dich zu Hause, während Inge auf feinstofflicher Ebene Blockaden löst, deine Aura harmonisiert und dein System neu ausrichtet."
  },
  {
    question: "Was unterscheidet systemisches Seelencoaching von klassischer Beratung oder Therapie?",
    answer: "Klassische Beratung bleibt meist auf der Verstandes- und Verhaltensebene stehen. Inge Schneiders Seelencoaching hingegen geht tiefer: Wir gehen an die energetische Wurzel deiner Blockaden, lösen unbewusste Generationsverstrickungen (Ahnen-Resonanzen) auf und arbeiten direkt mit deinen Chakren. So wird Heilung dort möglich, wo der reine Verstand kapitulieren muss."
  },
  {
    question: "Wie viele Sitzungen sind nötig und wann spüre ich erste Veränderungen?",
    answer: "Die meisten Klienten spüren bereits während oder unmittelbar nach der allerersten Sitzung (z.B. der Light Body Session) eine spürbare, physische Erleichterung, mentale Klarheit und tiefe Entspannung. Für tiefe lebenstransformatorische Prozesse empfehlen wir eine mittelfristige Begleitung (z.B. unser 12-Wochen-Awakening-Programm), um die Frequenzen dauerhaft und stabil in deinem Alltag zu etablieren."
  },
  {
    question: "Ist die Heilarbeit von Inge eine anerkannte medizinische Behandlung?",
    answer: "Inge Schneiders energetisches Seelencoaching und Frequenzarbeiten dienen der Aktivierung deine Selbstheilungskräfte und der seelischen Selbsterkenntnis. Sie stellen keinen Ersatz für eine medizinische Diagnose oder psychotherapeutische Behandlung durch approbierte Ärzte dar, wirken jedoch hervorragend komplementär zur Schulmedizin."
  }
];

interface SolfeggioFrequency {
  hz: number;
  title: string;
  effect: string;
  chakra: string;
  mantra: string;
}

const SOLFEGGIO_FREQUENCIES: SolfeggioFrequency[] = [
  { hz: 396, title: "Befreiung & Erdung", effect: "Linderung von unbewussten Ängsten, Schuldgefühlen und blockierenden Mustern.", chakra: "Wurzelchakra (Muladhara)", mantra: "LAM" },
  { hz: 432, title: "Kosmische Harmonie", effect: "Ausrichtung auf die Heilfrequenz der Natur. Reduziert Stress und verlangsamt den Puls.", chakra: "Herz & Geist", mantra: "OM" },
  { hz: 528, title: "Transformation & Wunder", effect: "Die Frequenz der Bio-Regeneration und des zellulären Gleichgewichts.", chakra: "Solarplexus (Manipura)", mantra: "RAM" },
  { hz: 639, title: "Herzens-Verbindung", effect: "Heilung von Beziehungen, Vertiefung des Mitgefühls und Beseitigung von Trennungsgedanken.", chakra: "Herzchakra (Anahata)", mantra: "YAM" },
  { hz: 741, title: "Erwachen der Intuition", effect: "Klärt Geist und Zellen von Toxinen und erweitert die geistige Klarheit.", chakra: "Halschakra (Vishuddha)", mantra: "HAM" },
  { hz: 852, title: "Rückkehr zum Geist", effect: "Stärkt die spirituelle Intuition und öffnet den inneren Seherkanal.", chakra: "Drittes Auge (Ajna)", mantra: "OM SHANTI" },
  { hz: 963, title: "Göttliches Erwachen", effect: "Vollkommene Verschmelzung mit dem göttlichen Bewusstsein und der Urquelle.", chakra: "Kronenchakra (Sahasrara)", mantra: "SOHAM" }
];

export default function App() {
  // Navigation active section tracking
  const [activeTab, setActiveTab] = useState<string>("philosophie");

  // Oracle state
  const [currentOracleIndex, setCurrentOracleIndex] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Audio frequency tuner state
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [selectedHz, setSelectedHz] = useState<number>(432);
  const [playingState, setPlayingState] = useState<boolean>(false);

  // Audio synthesizer references using Refs to prevent garbage collection or state conflicts
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOfferingId, setSelectedOfferingId] = useState<string>("deep-soul");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", agree: false });
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Digitaler Altar / Intention-Wall State
  interface Intention {
    id: string;
    text: string;
    author: string;
    auraColor: 'amber' | 'violet' | 'cyan' | 'rose';
    createdAt: string;
    x: number; // floating coordinate %
    y: number; // floating coordinate %
    scale: number;
    speedY: number; // speed for custom floating moves
  }

  const [intentions, setIntentions] = useState<Intention[]>([
    { id: "1", text: "Klarheit für meinen beruflichen Neuanfang und Mut einzustehen.", author: "Anonym", auraColor: 'amber', createdAt: "Vor 2 Std.", x: 20, y: 70, scale: 1.1, speedY: 0.12 },
    { id: "2", text: "Heilung, sanftes Loslassen & tiefer Frieden für meine Familie.", author: "Anonym", auraColor: 'rose', createdAt: "Vor 4 Std.", x: 50, y: 35, scale: 0.9, speedY: 0.08 },
    { id: "3", text: "Mut, meine wahre feinstoffliche Begabung ganz zu leben.", author: "Anonym", auraColor: 'cyan', createdAt: "Gestern", x: 75, y: 55, scale: 1.2, speedY: 0.06 },
    { id: "4", text: "Umfassendes Urvertrauen in den göttlichen Zeitplan des Lebens.", author: "Anonym", auraColor: 'violet', createdAt: "Gestern", x: 15, y: 40, scale: 0.95, speedY: 0.1 },
    { id: "5", text: "Auflösung energetischer Verstrickungen der alten Ahnenlinien.", author: "Anonym", auraColor: 'amber', createdAt: "Heute", x: 40, y: 80, scale: 1.05, speedY: 0.15 },
    { id: "6", text: "Heilung von Erschöpfung und Rückkehr zu tiefer Lebensfreude.", author: "Anonym", auraColor: 'rose', createdAt: "Vor 10 Min.", x: 82, y: 20, scale: 1.0, speedY: 0.11 }
  ]);
  const [newIntentionText, setNewIntentionText] = useState<string>("");
  const [newIntentionColor, setNewIntentionColor] = useState<'amber' | 'violet' | 'cyan' | 'rose'>("amber");
  const [isAddingIntention, setIsAddingIntention] = useState<boolean>(false);

  // Floating animation effect for Digitaler Altar
  useEffect(() => {
    const interval = setInterval(() => {
      setIntentions(prev => 
        prev.map(item => {
          let nextY = item.y - item.speedY;
          if (nextY < 5) {
            nextY = 92; // reset to bottom
          }
          return { ...item, y: nextY };
        })
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Testimonial slider state
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const testimonials = [
    {
      quote: "Absolute Klarheit gefunden. Die Begleitung durch Inge Schneider war wie ein Erwachen aus einem dichten, schweren Traum. Mein gesamtes Leben und mein Business richten sich nun nach meiner wahren Seelenfrequenz aus.",
      author: "Amélie V.",
      role: "Unternehmerin & Mentorin",
      location: "Zürich"
    },
    {
      quote: "Eine zutiefst lebensverändernde Reise. Inge hält einen unbeschreiblich reinen, kraftvollen Raum der Transformation. Meine eigenen medialen Sinne haben sich seither um das Vielfache vertieft.",
      author: "Dr. med. Christian B.",
      role: "Ganzheitsmediziner & Heiler",
      location: "München"
    },
    {
      quote: "Nach nur einer einzigen Light Body Session fühlte ich mich mental, physisch und emotional komplett neuentstanden. Tiefe Blockaden im Solarplexus sind vollkommen verflogen. Ich zitterte vor Glück und tiefer Erleichterung.",
      author: "Sarah K.",
      role: "Schriftstellerin & Künstlerin",
      location: "Wien"
    }
  ];

  // Frequency Synthesizer generator helper safely engineered
  const startSynth = (frequency: number) => {
    try {
      if (!audioEnabled) return;
      
      // Initialize Context if not done
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop old oscillator
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch(e){}
        oscRef.current.disconnect();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Warm, safe lower volume to prevent startling
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.2); // Smooth fade in

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      
      oscRef.current = osc;
      gainRef.current = gain;
      setPlayingState(true);
    } catch (e) {
      console.error("Audio activation failed:", e);
    }
  };

  const stopSynth = () => {
    if (oscRef.current && gainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const gain = gainRef.current;
      const osc = oscRef.current;
      try {
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.82); // fade out
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch(e){}
          if (oscRef.current === osc) {
            oscRef.current = null;
          }
        }, 900);
      } catch (e) {
        try { osc.stop(); }catch(_){}
        osc.disconnect();
        oscRef.current = null;
      }
    }
    setPlayingState(false);
  };

  // Keep track of oscillator frequency changes dynamically
  useEffect(() => {
    if (playingState && audioEnabled) {
      if (oscRef.current && audioCtxRef.current) {
        oscRef.current.frequency.exponentialRampToValueAtTime(selectedHz, audioCtxRef.current.currentTime + 0.5);
      } else {
        startSynth(selectedHz);
      }
    } else {
      stopSynth();
    }
  }, [selectedHz, playingState, audioEnabled]);

  // Handle cleanup of audio resources on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch(e){}
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Handle Oracle Card Selection with a beautiful shuffle illusion
  const drawOracleCard = () => {
    setIsDrawing(true);
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentOracleIndex(Math.floor(Math.random() * ORACLE_CARDS.length));
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsDrawing(false);
      }
    }, 120);
  };

  // Open booking modal and select default mentoring
  const openBooking = (offeringId: string) => {
    setSelectedOfferingId(offeringId);
    setBookingSubmitted(false);
    setIsModalOpen(true);
  };

  // Submit the feedback form
  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.agree) {
      return;
    }
    setBookingSubmitted(true);
  };

  // Scroll to a helper id selector smoothly
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Selected Hz details object lookup
  const currentHzInfo = SOLFEGGIO_FREQUENCIES.find(f => f.hz === selectedHz) || SOLFEGGIO_FREQUENCIES[1];

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center font-sans selection:bg-white/20 selection:text-white text-white bg-neutral-950">
      
      {/* 1. Immersive Fixed Background Video */}
      <video 
        id="bg-video"
        className="fixed inset-0 w-full h-full object-cover z-[0] opacity-80 mix-blend-screen"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Luxury dark vignette overlay to ensure text is beautifully readable */}
      <div className="fixed inset-0 bg-radial from-transparent via-neutral-950/70 to-neutral-950/95 pointer-events-none z-[1]" />
      <div className="fixed inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/90 pointer-events-none z-[1]" />

      {/* Floating Solfeggio indicator on the top-right margins */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs">
        <Activity className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span className="text-white/60">Globale Schwingung:</span>
        <span className="font-semibold tracking-wider text-amber-200">432 Hz Erd-Resonanz</span>
      </div>

      {/* 2. Sticky Glass Header Navigation */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/40 backdrop-blur-lg border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 text-white tracking-widest hover:opacity-90 transition-opacity" onClick={() => scrollToSection('hero')}>
            <svg 
              id="schneider-logo-svg"
              xmlns="http://www.w3.org/2000/svg" 
              className="text-amber-200 transition-transform duration-500 hover:rotate-45"
              width="24" 
              height="24" 
              viewBox="0 0 256 256" 
              fill="currentColor"
            >
              <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
            </svg>
            <span className="text-xl font-medium tracking-[0.2em] uppercase text-white">SCHNEIDER</span>
          </a>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "philosophie", label: "Philosophie" },
              { id: "interactive-space", label: "Energie-Tuner" },
              { id: "mentorings", label: "Mentorings" },
              { id: "testimonials", label: "Erfahrungen" }
            ].map((tab) => (
              <button
                id={`nav-${tab.id}`}
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 relative py-2 ${
                  activeTab === tab.id ? 'text-amber-200' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-200/80"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Header Action Button */}
          <div>
            <button 
              id="cta-nav-button"
              onClick={() => openBooking("deep-soul")}
              className="liquid-glass text-xs uppercase tracking-widest text-amber-100 hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] bg-white/5 border border-white/10"
            >
              Session buchen
            </button>
          </div>

        </div>
      </nav>

      {/* 3. Content Wrapper - z10 relative */}
      <div className="z-10 relative max-w-5xl w-full px-6 mx-auto space-y-40 py-24 md:py-32">
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-center text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="space-y-8 flex flex-col items-center"
          >
            {/* Spiritual Floating Tag */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-amber-200/90 font-medium font-mono">
                Erwachen • Transformation • Alchemie
              </span>
            </div>

            {/* High-impact Typography Title */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.1] max-w-4xl">
              Erwecke deine <br />
              <span className="font-semibold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent italic drop-shadow-sm">
                kosmische Urkraft.
              </span>
            </h1>

            {/* High-end Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-white/75 font-light tracking-wide max-w-2xl leading-relaxed">
              Premium Seelencoaching, systemische Heilung & energetische Transformation mit <strong>Inge Schneider</strong>. Weil deine wahre Essenz vollkommene Klarheit und innere Freiheit verdient.
            </p>

            {/* Glowing Main call-to-action button */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                id="hero-primary-cta"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(251,191,36,0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBooking("deep-soul")}
                className="px-8 py-4 bg-gradient-to-r from-amber-200 to-amber-300 text-neutral-900 font-semibold text-xs tracking-[0.2em] uppercase rounded-full cursor-pointer transition-all duration-300 shadow-lg flex items-center gap-3"
              >
                <span>Deine Session buchen</span>
                <ChevronRight className="w-4 h-4 text-neutral-950" />
              </motion.button>

              <button
                id="hero-secondary-cta"
                onClick={() => scrollToSection("interactive-space")}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm text-white font-medium text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>Energie-Tuner</span>
              </button>
            </div>

            {/* Dynamic Micro-Indicator */}
            <div className="pt-16 animate-bounce opacity-40">
              <span className="text-[10px] uppercase tracking-widest font-mono text-white/50 block">Entdecke den Kosmos</span>
              <div className="w-[1px] h-10 bg-white/30 mx-auto mt-2" />
            </div>

          </motion.div>
        </section>


        {/* ================= PHILOSOPHY / ÜBER MICH ================= */}
        <section id="philosophie" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left side: Abstract sacred geometry placeholder or orbital live model */}
            <div className="relative flex justify-center items-center">
              
              <div className="w-full aspect-square max-w-[380px] rounded-full border border-white/10 relative flex justify-center items-center p-6 liquid-glass shadow-2xl overflow-visible">
                
                {/* Glowing Core */}
                <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60 rounded-full" />
                
                {/* Spinning Rings using Framer Motion */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute w-5/6 h-5/6 rounded-full border border-dashed border-amber-300/20"
                />

                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-4/6 h-4/6 rounded-full border border-double border-white/5"
                />

                <div className="absolute w-[80%] h-[80%] rounded-full bg-neutral-950/40 backdrop-blur-sm shadow-inner" />

                {/* Micro alignment indicator text */}
                <div className="z-10 text-center space-y-3 p-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/60 block">INTEGRATION</span>
                  <div className="font-extralight text-sm tracking-widest text-white/80 max-w-[200px] leading-relaxed">
                    „Wie oben, so unten. Deine Frequenz bestimmt deine Realität.“
                  </div>
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">AURA-STATUS: OPTIMAL</span>
                  </div>
                </div>

                {/* Small orbiting dots */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2"
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-amber-300/80 blur-[1px] shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                </motion.div>

                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6"
                >
                  <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 rounded-full bg-blue-300/80 blur-[0.5px]" />
                </motion.div>

              </div>
              
            </div>

            {/* Right side: Luxurious introduction copy in German */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold">DIE KOSMISCHE SIGNATUR DEINES SEINS</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-snug">
                Deine Begleiterin für <br />
                <span className="font-medium text-white italic">Seelenruhe & Urkraft</span>
              </h2>
              
              <div className="h-[1px] w-12 bg-amber-200/80 my-4" />

              <div className="text-white/80 font-light text-sm md:text-base space-y-5 leading-relaxed">
                <p>
                  Herzlich willkommen in meinem Raum der feinstofflichen Schwingung und kosmischen Alchemie. Ich bin <strong>Inge Schneider</strong>. Seit über einem Jahrzehnt begleite ich bewusste Menschen, Leader und Suchende dabei, die tiefen Strömungen ihrer Seele zu entschlüsseln, systemische Verstrickungen aufzulösen und ihre wahre göttliche Essenz zu verwirklichen.
                </p>
                <p>
                  Mein Weg verbindet fundierte energetische Arbeit, schamanische Transformations-Alchemie und wegweisendes Seelencoaching. Gemeinsam stimmen wir deine Chakren und feinstofflichen Körper optimal ab, damit du mit kompromissloser Klarheit und grenzenlos fließender Lebenskraft in deine Schöpferkraft treten kannst.
                </p>
                <p>
                  Es ist mir ein tiefes Anliegen, dich mit deinen ureigenen kosmischen Codes rückzuverbinden, alte karmische fesseln liebevoll zu sprengen und dich in deiner strahlenden, freien Authentizität glänzen zu sehen.
                </p>
              </div>

              {/* Extra micro trust items */}
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-200 flex-shrink-0" />
                  <span className="text-[11px] uppercase tracking-wider text-white/70">12+ Jahre Heilarbeit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-200 flex-shrink-0" />
                  <span className="text-[11px] uppercase tracking-wider text-white/70">500+ Seelen geführt</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 4. MEINE AWAKENING-STORY (DIE HELDENREISE) ================= */}
        <section id="story" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold block">DIE HELDENREISE</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Inge Schneiders Awakening-Story</h2>
            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
              Der Weg von rationaler Strenge im Corporate Life hin zur multidimensionalen Erleuchtung und tief greifenden Heilarbeit. Ein energetischer Transformations-Schnittstelle.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto px-4 md:px-0">
            {/* The vertical timeline bar centering */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 z-0" />

            {/* Glowing animated path overlay */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-200 via-cyan-400 to-purple-500 blur-[1px] opacity-40 -translate-x-1/2 z-0" />

            <div className="space-y-12 relative z-10">
              {AWAKENING_STORY.map((item, index) => {
                const isLeft = index % 2 === 0;
                
                // Decide icon
                let IconComponent = Compass;
                if (item.iconType === 'burnout') IconComponent = ShieldAlert;
                else if (item.iconType === 'initiation') IconComponent = Zap;
                else if (item.iconType === 'awakening') IconComponent = Compass;
                else if (item.iconType === 'portal') IconComponent = Sparkles;
                else if (item.iconType === 'today') IconComponent = Milestone;

                return (
                  <motion.div 
                    key={index}
                    className={`flex flex-col md:flex-row items-stretch md:justify-between relative ${isLeft ? 'md:flex-row-reverse' : ''}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                    }}
                  >
                    {/* Spacer / Left side element mock in desktop */}
                    <div className="hidden md:block w-[45%]" />

                    {/* Central checkpoint milestone indicator */}
                    <div className="absolute left-6 md:left-1/2 top-1.5 -translate-x-1/2 z-20">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-neutral-950 border-2 border-white/20 flex items-center justify-center text-amber-200 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                        whileInView={{ 
                          borderColor: "rgba(251,191,36,0.9)",
                          boxShadow: "0 0 25px rgba(251,191,36,0.5)",
                          scale: 1.1 
                        }}
                        viewport={{ once: false, margin: "-100px" }}
                      >
                        <IconComponent className="w-4 h-4 text-amber-200 animate-pulse" />
                      </motion.div>
                      
                      {/* Pulse ring indicator */}
                      <motion.div 
                        className="absolute inset-0 rounded-full border border-amber-200/50 -z-10"
                        whileInView={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      />
                    </div>

                    {/* Timeline card */}
                    <motion.div 
                      className={`ml-14 md:ml-0 w-full md:w-[45%] liquid-glass rounded-3xl p-6 bg-neutral-950/45 border border-white/5 space-y-3 transition-colors duration-500`}
                      whileHover={{ scale: 1.02 }}
                      whileInView={{ 
                        borderColor: "rgba(251,191,36,0.25)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3), 0 0 15px rgba(251,191,36,0.05)"
                      }}
                      viewport={{ once: false, margin: "-100px" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-amber-200/90 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                          HELDENREISE
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-light text-white tracking-wide">{item.title}</h3>
                        <p className="text-xs text-amber-200/70 font-medium italic">{item.subtitle}</p>
                      </div>

                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </section>

        {/* ================= INGES METHODOLOGIES SECTION ================= */}
        <section id="methoden" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold block">INTEGRATIVE ANSÄTZE</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Inge Schneiders feinstoffliches Handwerk</h2>
            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
              Eine Symbiose aus systemischer Ahnen-Alchemie, schamanischer Heilarbeit und hochenergetischer Schwingungsmedizin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            
            {/* Method 1 */}
            <div className="liquid-glass rounded-3xl p-6 bg-neutral-950/40 border border-white/5 space-y-4 hover:border-white/20 transition-all duration-300">
              <div className="p-3 bg-white/5 rounded-2xl w-12 h-12 flex items-center justify-center text-amber-200">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-light text-white tracking-wide">Systemische Ahnen-Alchemie</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Verborgene Verstrickungen der Herkunftsfamilie erkennen und energetisch harmonisieren. Wir befreien deinen Lebensfluss von übernommenen Lasten und karmischen Verträgen vergangener Generationen.
              </p>
            </div>

            {/* Method 2 */}
            <div className="liquid-glass rounded-3xl p-6 bg-neutral-950/40 border border-white/5 space-y-4 hover:border-white/20 transition-all duration-300">
              <div className="p-3 bg-white/5 rounded-2xl w-12 h-12 flex items-center justify-center text-amber-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-light text-white tracking-wide">Schamanische Trance-Reisen</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Direkter Dialog mit deinem Unterbewusstsein und deinen geistigen Begleitern. Erhalte unverschleierte Antworten auf brennende Lebensfragen direkt aus der Urquelle deines göttlichen Seins.
              </p>
            </div>

            {/* Method 3 */}
            <div className="liquid-glass rounded-3xl p-6 bg-neutral-950/40 border border-white/5 space-y-4 hover:border-white/20 transition-all duration-300">
              <div className="p-3 bg-white/5 rounded-2xl w-12 h-12 flex items-center justify-center text-amber-200">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-light text-white tracking-wide">Lichtkörper-Aktivierung</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Erhöhung deiner Zellschwingung durch gezielten Frequenzausgleich und geführte Quantenheilung. Aktiviere dein energetisches Schutzschild für Alltag, Business und Partnerschaft.
              </p>
            </div>

          </div>
        </section>


        {/* ================= INTERACTIVE ENERGY & SOUND TUNER ================= */}
        <section id="interactive-space" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold block">INTERACTIVE ERFAHRUNG</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Klang- & Tagesenergie-Ausrichtung</h2>
            <p className="text-white/60 text-xs md:text-sm font-light">
              Nutze diese luxuriösen Tools zur täglichen Frequenz-Ausrichtung. Experimentiere mit den Solfeggio-Klangschwingungen oder ziehe ein weises Tagesorakel für deine intuitive Vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Tuner widget: Left (7 cols) */}
            <div className="md:col-span-7 liquid-glass rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8 bg-black/30 border border-white/5 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-amber-200 animate-pulse" />
                    <span className="text-xs tracking-widest uppercase font-semibold text-white">Solfeggio Frequenzgenerator</span>
                  </div>
                  
                  {/* Sound Toggle controls */}
                  <button
                    id="sound-opt-in-toggle"
                    onClick={() => {
                      const prev = audioEnabled;
                      setAudioEnabled(!prev);
                      if (prev) {
                        setPlayingState(false);
                      } else {
                        setPlayingState(true);
                      }
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-widest transition-all duration-300 border ${
                      audioEnabled 
                        ? 'bg-amber-200/20 text-amber-200 border-amber-300/30' 
                        : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                    }`}
                  >
                    {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
                    <span>{audioEnabled ? 'Sound Aktiv' : 'Ton aktivieren'}</span>
                  </button>
                </div>

                <p className="text-xs text-white/70 font-light mb-6 leading-relaxed">
                  Schwingungen formen Materie. Wähle eine Solfeggio-Frequenz aus, um deinen mentalen Raum sofort in Harmonie zu baden. Perfekt für Meditation oder Fokus.
                </p>

                {/* Tuning selector row/buttons */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
                  {SOLFEGGIO_FREQUENCIES.map((freq) => (
                    <button
                      id={`hz-button-${freq.hz}`}
                      key={freq.hz}
                      onClick={() => {
                        setSelectedHz(freq.hz);
                        // AUTOPLAY if enabled
                        if (audioEnabled) {
                          setPlayingState(true);
                        }
                      }}
                      className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                        selectedHz === freq.hz
                          ? 'bg-amber-100 text-neutral-900 border-amber-300 font-semibold shadow-lg scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/5'
                      }`}
                    >
                      <span className="text-sm font-mono tracking-tighter">{freq.hz}</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-80 mt-1 font-sans">Hz</span>
                    </button>
                  ))}
                </div>

                {/* Active frequency detailed card */}
                <motion.div 
                  key={selectedHz}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/60 rounded-2xl p-5 border border-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-200 tracking-widest uppercase font-semibold font-mono">
                      Frequenz: {selectedHz} Hz
                    </span>
                    <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded-full text-white/80 border border-white/10 font-mono uppercase tracking-widest">
                      Chakra: {currentHzInfo.chakra}
                    </span>
                  </div>

                  <h3 className="text-lg font-light text-white tracking-wide">
                    {currentHzInfo.title}
                  </h3>

                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {currentHzInfo.effect}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-white/50 border-t border-white/5 font-mono">
                    <span>Mantra Resonanz: <strong className="text-white/80">{currentHzInfo.mantra}</strong></span>
                    {playingState && audioEnabled && (
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                        <span>Resonanz ertönt aktiv...</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sound tuner instructions warning */}
              <div className="pt-4 border-t border-white/5 text-[10px] text-white/40 leading-relaxed font-light">
                *Hinweis: Wenn Sie auf „Ton aktivieren“ klicken, erzeugt Ihr Browser ein beruhigendes, synthetisches Sinushum. Bitte stellen Sie Ihre Lautsprecher auf eine sanfte, meditative Lautstärke ein.
              </div>

            </div>

            {/* Oracle pull widget: Right (5 cols) */}
            <div className="md:col-span-5 liquid-glass rounded-3xl p-6 md:p-8 flex flex-col justify-between spacing-y-6 bg-black/30 border border-white/5">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="w-4 h-4 text-amber-200" />
                  <span className="text-xs tracking-widest uppercase font-semibold text-white">Kosmische Botschaft</span>
                </div>
                <p className="text-xs text-white/75 font-light leading-relaxed">
                  Empfange eine direkte energetische Tagesbotschaft. Vertraue dem Ruf deiner Seele und ziehe eine geweihte Frequenz-Karte für deine tiefere Praxis.
                </p>
              </div>

              {/* Active display or card container placeholder */}
              <div className="my-6 relative min-h-[210px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {currentOracleIndex === null ? (
                    /* Initial Stack State */
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full max-w-[180px] aspect-[4/6] rounded-xl bg-gradient-to-tr from-amber-600/10 to-purple-800/10 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-4"
                    >
                      <Sparkles className="w-8 h-8 text-amber-200/50 mb-3 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">Kartenstapel bereit</span>
                    </motion.div>
                  ) : (
                    /* Selected Active Card */
                    <motion.div
                      id="oracle-card-display"
                      key={currentOracleIndex}
                      initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                      className="w-full rounded-2xl p-5 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-amber-500/20 text-center shadow-2xl relative"
                    >
                      <div className="absolute top-2 left-2 right-2 flex justify-between text-[8px] font-mono tracking-widest uppercase opacity-40">
                        <span>Inge Schneider Orakel</span>
                        <span>{ORACLE_CARDS[currentOracleIndex].chakra}</span>
                      </div>

                      <div className="mt-2 space-y-2">
                        <span className="text-[9px] text-amber-300 font-mono tracking-widest uppercase block">
                          {ORACLE_CARDS[currentOracleIndex].subtitle}
                        </span>
                        
                        <h4 className="text-md font-medium tracking-wide text-white">
                          {ORACLE_CARDS[currentOracleIndex].title}
                        </h4>
                        
                        <p className="text-[11px] text-white/80 leading-relaxed font-light italic max-w-sm px-1">
                          "{ORACLE_CARDS[currentOracleIndex].message}"
                        </p>

                        <div className="pt-2 border-t border-white/5 space-y-1">
                          <span className="text-[8px] uppercase tracking-widest text-white/40 font-mono block">MEDITATIONSAFFIRMATION</span>
                          <span className="text-[10px] text-amber-100 font-light block leading-normal">
                            {ORACLE_CARDS[currentOracleIndex].affirmation}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action trigger button */}
              <button
                id="draw-oracle-button"
                onClick={drawOracleCard}
                disabled={isDrawing}
                className="w-full py-3 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 border border-white/10 rounded-2xl flex items-center justify-center gap-2 cursor-pointer text-amber-100"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-200 ${isDrawing ? 'animate-spin' : ''}`} />
                <span>{isDrawing ? 'Schwingungen mischen...' : 'Energetische Karte ziehen'}</span>
              </button>

            </div>

          </div>

        </section>


        {/* ================= 8. DIGITALER ALTAR / INTENTION-WALL ================= */}
        <section id="altar" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold block">FEINSTOFFLICHER SPEICHER</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Kollektiver Altar & Intention-Wall</h2>
            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
              Verankere deine tiefste Sehnsucht, deinen Wunsch oder deine Intention für die kommende Woche anonym im kollektiven Energiefeld. Deine Absicht schwebt als leuchtender Lichtpunkt im endlosen Raum der Heilerstube.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Interactive night sky Altar space (7 cols) */}
            <div className="lg:col-span-7 bg-neutral-950/70 border border-white/5 rounded-3xl p-6 relative flex flex-col justify-between min-h-[420px] overflow-hidden shadow-inner group">
              
              {/* Starry background sparkles/noise */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-neutral-950/80 to-black pointer-events-none" />
              
              {/* Ambient radial glows */}
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/[0.03] rounded-full blur-3xl pointer-events-none" />

              {/* Floating Instructions */}
              <div className="relative z-10 flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-white/40 border-b border-white/5 pb-3">
                <span>Intention-Kosmos (LIVE)</span>
                <span>Bewege die Maus über die Lichtorte</span>
              </div>

              {/* The Space of particles */}
              <div className="flex-grow relative h-72 w-full mt-4">
                
                {intentions.map((item) => {
                  
                  // Color mapped styles
                  let colorClass = "bg-amber-300";
                  let bgGlow = "shadow-[0_0_15px_rgba(251,191,36,0.8)]";
                  if (item.auraColor === 'violet') {
                    colorClass = "bg-purple-300";
                    bgGlow = "shadow-[0_0_15px_rgba(168,85,247,0.8)]";
                  } else if (item.auraColor === 'cyan') {
                    colorClass = "bg-cyan-300";
                    bgGlow = "shadow-[0_0_15px_rgba(6,182,212,0.8)]";
                  } else if (item.auraColor === 'rose') {
                    colorClass = "bg-rose-300";
                    bgGlow = "shadow-[0_0_15px_rgba(244,63,94,0.8)]";
                  }

                  return (
                    <div
                      key={item.id}
                      className="absolute transition-all duration-300 pointer-events-auto group/dot"
                      style={{ 
                        left: `${item.x}%`, 
                        bottom: `${item.y}%`, 
                        transform: `scale(${item.scale})` 
                      }}
                    >
                      {/* Floating glowing dot */}
                      <motion.div 
                        whileHover={{ scale: 1.4 }}
                        className={`w-3.5 h-3.5 rounded-full ${colorClass} ${bgGlow} cursor-help relative`}
                      >
                        {/* Orbiting halo */}
                        <div className={`absolute -inset-1 rounded-full border border-current opacity-30 animate-ping text-white`} />
                      </motion.div>

                      {/* Tooltip Card with Intention Contents */}
                      <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-48 scale-0 group-hover/dot:scale-100 transition-all duration-300 origin-bottom z-30 pb-2">
                        <div className="bg-neutral-950/95 border border-white/10 rounded-2xl p-4.5 shadow-2xl space-y-1.5 backdrop-blur-md">
                          <p className="text-[11px] text-white/95 leading-relaxed font-light">
                            „{item.text}“
                          </p>
                          <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-white/40 pt-1.5 border-t border-white/5">
                            <span>{item.author}</span>
                            <span>{item.createdAt}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Bottom bar inside Sky view */}
              <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-white/30 font-mono">
                <span>AKTIVE SCHWINGUNGEN: {intentions.length} POLE</span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                  <span>ALCHIMISTISCHES RESONANZFELD SYNCHRON</span>
                </span>
              </div>

            </div>

            {/* Submission Form (5 cols) */}
            <div className="lg:col-span-5 liquid-glass rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 bg-black/30 border border-white/5 relative">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-200" />
                  <h3 className="text-xs uppercase tracking-widest text-white font-semibold">Absicht dem Feuer übergeben</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Formuliere dein Anliegen in klaren, prägnanten Worten. Wähle die Aura-Farbe, die am ehesten dem gewünschten energetischen Fokus entspricht (z.B. Amber = Urkraft, Cyan = Klarheit).
                </p>
              </div>

              {/* Form implementation */}
              <div className="space-y-4">
                
                {/* Intention Text */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">Dein anonymer Wochenwunsch</label>
                  <textarea 
                    id="altar-text-input"
                    rows={3}
                    maxLength={100}
                    value={newIntentionText}
                    onChange={(e) => setNewIntentionText(e.target.value)}
                    placeholder="z.B. Kraftvoll Altes loslassen, um für die Liebe empfänglich zu sein..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wide text-white placeholder-white/20 focus:outline-none focus:border-amber-300 transition-colors resize-none font-light"
                  />
                  <div className="text-right text-[9px] font-mono text-white/40">
                    {newIntentionText.length}/100 Zeichen
                  </div>
                </div>

                {/* Aura-Chakra Color selections */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">Energetische Ausstrahlung (Aura-Farbe)</label>
                  
                  <div className="grid grid-cols-4 gap-2">
                    
                    {/* Amber Option */}
                    <button
                      id="opt-color-amber"
                      onClick={() => setNewIntentionColor('amber')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        newIntentionColor === 'amber' 
                          ? 'bg-amber-500/10 border-amber-300 text-amber-100 font-bold scale-105' 
                          : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/5'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      <span className="text-[8px] font-mono tracking-tight uppercase">Urkraft</span>
                    </button>

                    {/* Violet Option */}
                    <button
                      id="opt-color-violet"
                      onClick={() => setNewIntentionColor('violet')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        newIntentionColor === 'violet' 
                          ? 'bg-purple-500/10 border-purple-300 text-purple-100 font-bold scale-105' 
                          : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/5'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                      <span className="text-[8px] font-mono tracking-tight uppercase">Seele</span>
                    </button>

                    {/* Cyan Option */}
                    <button
                      id="opt-color-cyan"
                      onClick={() => setNewIntentionColor('cyan')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        newIntentionColor === 'cyan' 
                          ? 'bg-cyan-500/10 border-cyan-300 text-cyan-100 font-bold scale-105' 
                          : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/5'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                      <span className="text-[8px] font-mono tracking-tight uppercase">Geist</span>
                    </button>

                    {/* Rose Option */}
                    <button
                      id="opt-color-rose"
                      onClick={() => setNewIntentionColor('rose')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        newIntentionColor === 'rose' 
                          ? 'bg-rose-500/10 border-rose-300 text-rose-100 font-bold scale-105' 
                          : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/5'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                      <span className="text-[8px] font-mono tracking-tight uppercase">Liebe</span>
                    </button>

                  </div>
                </div>

                {/* Confirm submit trigger button */}
                <button
                  id="submit-altar-intention"
                  disabled={!newIntentionText.trim()}
                  onClick={() => {
                    const text = newIntentionText.trim();
                    if (!text) return;
                    
                    const newItem: Intention = {
                      id: Date.now().toString(),
                      text,
                      author: "Anonym",
                      auraColor: newIntentionColor,
                      createdAt: "Gerade eben",
                      x: Math.floor(Math.random() * 80) + 10, // keep between 10% and 90%
                      y: 10, // start near the bottom
                      scale: 1.0 + Math.random() * 0.3,
                      speedY: 0.1 + Math.random() * 0.15
                    };

                    setIntentions(prev => [newItem, ...prev]);
                    setNewIntentionText("");
                    
                    // Show a little success toast
                    setIsAddingIntention(true);
                    setTimeout(() => setIsAddingIntention(false), 2000);
                  }}
                  className={`w-full py-4 bg-gradient-to-r from-amber-200 to-amber-300 hover:from-amber-100 hover:to-amber-200 text-neutral-950 font-bold text-xs tracking-[0.2em] font-sans uppercase rounded-xl transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
                    !newIntentionText.trim() ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Aufsteigen lassen</span>
                </button>

                <AnimatePresence>
                  {isAddingIntention && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-2.5 bg-amber-500/10 border border-amber-300/20 rounded-xl"
                    >
                      <span className="text-[10px] text-amber-200 font-mono uppercase tracking-widest">
                        ✨ Absicht steigt empor ...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>
        </section>


        {/* ================= OFFERINGS GRID (MENTORINGS) ================= */}
        <section id="mentorings" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold block">AURA-BEGLEITUNG</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Kollektion feinstofflicher Mentorings</h2>
            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
              Drei exklusive Pfade der Entfaltung, maßgeschneidert auf deinen aktuellen Bewusstseinszustand. Finde deinen Weg zurück zur wahren Quelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            {OFFERINGS.map((offering) => {
              return (
                <div 
                  id={`offering-card-${offering.id}`}
                  key={offering.id}
                  className="liquid-glass rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8 bg-neutral-950/40 border border-white/5 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl relative overflow-hidden group"
                >
                  
                  {/* Glowing custom background accent per card type */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${offering.colorGrade} rounded-full blur-3xl opacity-65 pointer-events-none group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="space-y-4">
                    
                    {/* Header tags */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase">
                        {offering.price}
                      </span>
                      <span className="text-[10px] text-white/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 font-mono">
                        {offering.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-light text-white tracking-wide leading-snug group-hover:text-amber-100 transition-colors">
                      {offering.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-amber-200/80 font-mono font-medium tracking-wide">
                      {offering.tagline}
                    </p>

                    <div className="h-[1px] w-8 bg-white/10 group-hover:w-16 transition-all duration-500" />

                    {/* Description */}
                    <p className="text-xs text-white/70 font-light leading-relaxed">
                      {offering.description}
                    </p>

                    {/* Bullet List */}
                    <ul className="pt-4 space-y-3">
                      {offering.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/65 font-light">
                          <Check className="w-3.5 h-3.5 text-amber-200 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  {/* Primary card button action */}
                  <button
                    id={`request-button-${offering.id}`}
                    onClick={() => openBooking(offering.id)}
                    className="w-full py-3 bg-white/5 hover:bg-white/15 text-xs tracking-widest uppercase rounded-xl transition-all duration-300 border border-white/10 hover:border-amber-200/40 text-amber-100 hover:text-white flex items-center justify-center gap-2 cursor-pointer group-hover:bg-amber-100 group-hover:text-neutral-900 group-hover:border-transparent"
                  >
                    <span>Absicht bekunden</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                </div>
              );
            })}
          </div>

          {/* Micro assurance banner */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-white/5">
                <Globe className="w-5 h-5 text-amber-200" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Multidimensionaler Fern-Support</h4>
                <p className="text-[11px] text-white/60 font-light">Unsere Sitzungen finden flexibel digital oder an unseren weltweiten Retreat-Orten statt.</p>
              </div>
            </div>
            <button
              id="assurance-contact-cta"
              onClick={() => openBooking("deep-soul")}
              className="text-[10px] uppercase tracking-widest text-amber-200 border-b border-amber-200/30 hover:border-amber-200 font-mono py-1 transition-all"
            >
              Individuelle Beratung anfordern
            </button>
          </div>

        </section>


        {/* ================= TESTIMONIALS SLIDER SECTION ================= */}
        <section id="testimonials" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold block">ZEUGNISSE</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Vollzogene Metamorphosen</h2>
          </div>

          <div className="relative max-w-3xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 border border-white/5 bg-black/20 overflow-hidden">
            
            {/* Quote design accents */}
            <div className="absolute top-4 left-6 text-6xl text-white/[0.03] select-none font-serif">“</div>
            <div className="absolute bottom-4 right-6 text-6xl text-white/[0.03] select-none font-serif">”</div>

            <div className="space-y-6 relative z-10 text-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-md md:text-xl font-light leading-relaxed text-white/90 italic">
                    „{testimonials[activeTestimonial].quote}“
                  </p>
                  
                  <div className="space-y-1 pt-4">
                    <h4 className="text-sm tracking-wider font-semibold text-amber-200 uppercase">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-white/50 font-mono">
                      {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="flex justify-center items-center gap-2 pt-6">
                {testimonials.map((_, index) => (
                  <button
                    id={`testimonial-dot-${index}`}
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'w-6 bg-amber-200' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </section>


        {/* ================= 15. FAQ – SPIRITUELLE SKEPSIS AUFLÖSEN ================= */}
        <section id="faq" className="scroll-mt-24 space-y-12 max-w-4xl mx-auto">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-semibold block">SKEPSIS CORRIGIEREN</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">Aufklärung & Offenheit (FAQ)</h2>
            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
              Vielleicht zögerst du oder dein Verstand sucht nach Erklärungen. Hier findest du offene, ehrliche Antworten auf tiefere Fragen zur feinstofflichen Heilarbeit.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  id={`faq-item-${index}`}
                  key={index}
                  className="liquid-glass rounded-3xl bg-neutral-950/30 border border-white/5 overflow-hidden hover:border-white/10 transition-colors duration-300"
                >
                  {/* Header/Toggle Trigger */}
                  <button
                    id={`faq-trigger-${index}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex justify-between items-center gap-4 hover:bg-white/[0.01] transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-normal text-white/90 tracking-wide md:text-base leading-snug">
                      {faq.question}
                    </span>
                    <div className="p-1.5 rounded-full bg-white/5 text-amber-200 flex-shrink-0">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-white' : ''}`} />
                    </div>
                  </button>

                  {/* Body Expandable with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.35, ease: "easeOut" }, opacity: { duration: 0.25, delay: 0.1 } } }}
                        exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3, ease: "easeIn" }, opacity: { duration: 0.15 } } }}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 border-t border-white/5">
                          <p className="text-xs sm:text-xs md:text-sm text-white/70 font-light leading-relaxed antialiased">
                            {faq.answer}
                          </p>
                          
                          {/* Sensus energy label */}
                          <div className="mt-4 flex items-center justify-start gap-1.5 text-[9px] font-mono tracking-widest text-white/30 uppercase">
                            <Sparkles className="w-3 h-3 text-amber-200" />
                            <span>Integrierte Wahrheit</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </section>

      </div>


      {/* ================= 4. THE LIQUID GLASS FOOTER ================= */}
      <motion.footer 
        id="liquid-glass-footer"
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70 mt-32 md:mt-64 max-w-7xl mx-auto z-10 relative mb-12"
      >
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
          
          {/* First column (md:col-span-5) */}
          <div className="md:col-span-5 space-y-5">
            
            <div className="flex items-center gap-3 text-white tracking-widest">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 256 256" 
                fill="currentColor"
                className="text-amber-200"
              >
                <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
              </svg>
              <span className="text-xl font-medium uppercase tracking-[0.2em]">Schneider</span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm text-white/50 font-light">
              Inge Schneider bietet erstklassiges Premium-Seelencoaching, systemische Heilarbeit und energetische Transformation für tiefe Lebensklarheit.
            </p>

            <div className="pt-2 text-xs text-white/40 space-y-1">
              <div>Telefon: +49 (0) 89 24FREQUENZ</div>
              <div>Praxis für systemische Frequenz-Heilung • D-80331 München</div>
            </div>

          </div>

          {/* Footer second column links structure wrapper (md:col-span-7) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 md:gap-8">
            
            {/* Discover */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">Discover</h4>
              <ul className="text-xs space-y-3 font-light text-white/50">
                {["Labs & Workshops", "Deep Dive Series", "Global Circle", "Resource Vault", "Future Roadmap"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Mission */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">The Mission</h4>
              <ul className="text-xs space-y-3 font-light text-white/50">
                {["Origin Story", "The Collective", "Newsroom Hub", "Join the Team"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concierge */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">Concierge</h4>
              <ul className="text-xs space-y-3 font-light text-white/50">
                {["Get in Touch", "Legal Privacy", "User Agreement", "Report Concern"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-50">Curated by @GotInGeorgiG</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-50">Join the Journey:</span>
            
            <div className="flex items-center gap-4">
              {[
                { icon: Music2, href: "#", name: "Music2" },
                { icon: Facebook, href: "#", name: "Facebook" },
                { icon: Twitter, href: "#", name: "Twitter" },
                { icon: Youtube, href: "#", name: "Youtube" },
                { icon: Instagram, href: "#", name: "Instagram" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={i}
                    href={social.href} 
                    aria-label={`Folge Inge Schneider auf ${social.name}`}
                    className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

          </div>

        </div>

      </motion.footer>


      {/* ================= 5. INTERACTIVE BOOKING PORTAL MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blend */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              id="booking-modal-body"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="liquid-glass w-full max-w-lg bg-neutral-950/90 border border-white/10 rounded-3xl p-6 md:p-8 z-10 relative overflow-hidden text-left"
            >
              
              {/* Close button */}
              <button
                id="close-booking-modal"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-purple-600" />

              {!bookingSubmitted ? (
                /* Form State */
                <div className="space-y-6 mt-2">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase block">Initiierung</span>
                    <h3 className="text-xl md:text-2xl font-light text-white tracking-wide">
                      Verbinde dich mit deiner Bestimmung
                    </h3>
                    <p className="text-xs text-white/60 font-light">
                      Fülle diese Initiierungs-Absicht aus. Inge Schneider analysiert dein energetisches Feld und kontaktiert dich für die persönliche Abstimmung.
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    
                    {/* Mentoring Program Select */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">Gewähltes Mentoring</label>
                      <select 
                        id="booking-mentoring-select"
                        value={selectedOfferingId}
                        onChange={(e) => setSelectedOfferingId(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wide text-white focus:outline-none focus:border-amber-300 transition-colors"
                      >
                        {OFFERINGS.map((item) => (
                          <option key={item.id} value={item.id} className="bg-neutral-950 text-white">
                            {item.title} ({item.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">Dein Name / Kosmische Kennung</label>
                      <input 
                        id="booking-name-input"
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="z.B. Maria Licht"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wide text-white placeholder-white/20 focus:outline-none focus:border-amber-300 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">Deine E-Mail-Adresse</label>
                      <input 
                        id="booking-email-input"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="deine.seele@frequenz.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wide text-white placeholder-white/20 focus:outline-none focus:border-amber-300 transition-colors"
                      />
                    </div>

                    {/* Personal Intention Message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">Deine aktuelle Absicht / Innerer Ruf (Optional)</label>
                      <textarea 
                        id="booking-message-input"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Welche Frequenz oder Blockade beschäftigt dich aktuell am meisten?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wide text-white placeholder-white/20 focus:outline-none focus:border-amber-300 transition-colors resize-none"
                      />
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="flex items-start gap-2.5 pt-2">
                      <input 
                        id="booking-agree-checkbox"
                        type="checkbox" 
                        required
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="mt-0.5 rounded accent-amber-300"
                      />
                      <label htmlFor="booking-agree-checkbox" className="text-[10px] text-white/50 leading-relaxed font-light">
                        Ich stimme zu, dass meine Daten zur energetischen Kontaktaufnahme vertraulich verarbeitet werden dürfen.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="booking-submit-button"
                      type="submit"
                      className="w-full py-4.5 bg-gradient-to-r from-amber-200 to-amber-300 hover:from-amber-100 hover:to-amber-200 text-neutral-950 font-bold text-xs tracking-[0.2em] uppercase rounded-xl transition-all duration-300 cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kosmische Absicht senden</span>
                    </button>

                  </form>

                </div>
              ) : (
                /* Success Confirmation State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center border border-amber-300/30">
                    <Check className="w-6 h-6 text-amber-200" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">RUF EMPFANGEN</span>
                    <h3 className="text-xl font-light text-white tracking-wide">
                      Vielen Dank, {formData.name}
                    </h3>
                    <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed font-light">
                      Deine Absicht wurde übertragen. Inge Schneider wird dein Anliegen persönlich prüfen und sich innerhalb der nächsten 24 Stunden per E-Mail (<strong className="text-white">{formData.email}</strong>) bei dir melden.
                    </p>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] text-white/50 font-light italic">
                    „Sobald der Schüler bereit ist, erscheint der Meister. Halte deine Energie hoch.“
                  </div>

                  <button
                    id="booking-success-close"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-mono uppercase tracking-widest text-white rounded-lg transition-colors"
                  >
                    Schließen
                  </button>

                </motion.div>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
