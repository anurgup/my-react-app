import { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Wand2, MessagesSquare, Plus, Trash2, User, UserCircle, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

type RefinementStyle = 'professional' | 'casual' | 'concise' | 'friendly';
type Language = 'english' | 'hindi' | 'spanish' | 'french' | 'german' | 'portuguese' | 'italian' | 'japanese' | 'korean' | 'chinese';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'other';
}

const languages = {
  english: { name: 'English', flag: '🇬🇧' },
  hindi: { name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  spanish: { name: 'Español (Spanish)', flag: '🇪🇸' },
  french: { name: 'Français (French)', flag: '🇫🇷' },
  german: { name: 'Deutsch (German)', flag: '🇩🇪' },
  portuguese: { name: 'Português (Portuguese)', flag: '🇵🇹' },
  italian: { name: 'Italiano (Italian)', flag: '🇮🇹' },
  japanese: { name: '日本語 (Japanese)', flag: '🇯🇵' },
  korean: { name: '한국어 (Korean)', flag: '🇰🇷' },
  chinese: { name: '中文 (Chinese)', flag: '🇨🇳' },
};

export function TextRefiner() {
  const [inputText, setInputText] = useState('');
  const [refinedText, setRefinedText] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedRefined, setCopiedRefined] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<RefinementStyle>('professional');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [activeTab, setActiveTab] = useState<'refine' | 'respond'>('refine');
  
  // Chat history state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageSender, setNewMessageSender] = useState<'user' | 'other'>('other');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [responseLanguage, setResponseLanguage] = useState<Language>('english');

  // Mock refinement function with multilingual support
  const refineText = (text: string, style: RefinementStyle, language: Language): string => {
    if (!text.trim()) return '';

    // Language-specific refinements
    const languageTemplates: Record<Language, Record<RefinementStyle, (t: string) => string>> = {
      english: {
        professional: (t) => {
          let refined = t.trim();
          refined = refined.charAt(0).toUpperCase() + refined.slice(1);
          if (!/[.!?]$/.test(refined)) refined += '.';
          refined = refined
            .replace(/\bhi\b/gi, 'Hello')
            .replace(/\bhey\b/gi, 'Hello')
            .replace(/\byeah\b/gi, 'Yes')
            .replace(/\bnope\b/gi, 'No')
            .replace(/\bu\b/gi, 'you')
            .replace(/\bur\b/gi, 'your')
            .replace(/\br\b/gi, 'are')
            .replace(/\bthanks\b/gi, 'Thank you');
          return `${refined}\n\nBest regards`;
        },
        casual: (t) => {
          let refined = t.trim();
          refined = refined.charAt(0).toUpperCase() + refined.slice(1);
          if (!/[.!?]$/.test(refined)) refined += '!';
          return refined;
        },
        concise: (t) => {
          let refined = t.trim();
          refined = refined
            .replace(/\b(just|really|very|actually|basically|literally)\b/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
          refined = refined.charAt(0).toUpperCase() + refined.slice(1);
          if (!/[.!?]$/.test(refined)) refined += '.';
          return refined;
        },
        friendly: (t) => {
          let refined = t.trim();
          refined = refined.charAt(0).toUpperCase() + refined.slice(1);
          if (!/[.!?]$/.test(refined)) refined += '!';
          if (!refined.toLowerCase().includes('thank')) {
            refined += ' Thanks!';
          }
          return refined;
        },
      },
      hindi: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\nसादर,\n(With regards)`;
        },
        casual: (t) => {
          const refined = t.trim();
          return `${refined} 😊`;
        },
        concise: (t) => {
          return t.trim() + '।';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}! धन्यवाद! 🙏\n(Thanks!)`;
        },
      },
      spanish: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\nAtentamente,\n(Best regards)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '.';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}! ¡Gracias!\n(Thanks!)`;
        },
      },
      french: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\nCordialement,\n(Best regards)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '.';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}! Merci!\n(Thanks!)`;
        },
      },
      german: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\nMit freundlichen Grüßen,\n(Best regards)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '.';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}! Danke!\n(Thanks!)`;
        },
      },
      portuguese: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\nAtenciosamente,\n(Best regards)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '.';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}! Obrigado!\n(Thanks!)`;
        },
      },
      italian: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\nCordiali saluti,\n(Best regards)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '.';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}! Grazie!\n(Thanks!)`;
        },
      },
      japanese: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\nよろしくお願いいたします。\n(Best regards)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '。';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}！ありがとう！\n(Thanks!)`;
        },
      },
      korean: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\n감사합니다.\n(Thank you)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '.';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}! 고마워요!\n(Thanks!)`;
        },
      },
      chinese: {
        professional: (t) => {
          const refined = t.trim();
          return `${refined}\n\n此致敬礼\n(Best regards)`;
        },
        casual: (t) => {
          return t.trim() + ' 😊';
        },
        concise: (t) => {
          return t.trim() + '。';
        },
        friendly: (t) => {
          const refined = t.trim();
          return `${refined}！谢谢！\n(Thanks!)`;
        },
      },
    };

    return languageTemplates[language][style](text);
  };

  // Generate response based on chat history with multilingual support
  const generateResponse = (history: ChatMessage[], language: Language): string => {
    if (history.length === 0) return '';

    const lastMessage = history[history.length - 1];
    const lastMessageText = lastMessage.text.toLowerCase();

    // Response templates by language
    const responseTemplates: Record<Language, Record<string, string>> = {
      english: {
        question_when: "I can get back to you on this by tomorrow afternoon. Does that work for you?",
        question_where: "Let me check and send you the details shortly.",
        question_how: "That's a great question! Let me explain...",
        question_default: "Yes, absolutely! I'll help you with that.",
        greeting: "Hello! How can I help you today?",
        thanks: "You're welcome! Happy to help anytime.",
        agreement: "Perfect! Looking forward to it.",
        update: "Thanks for following up! I'm currently working on it and will have an update for you soon.",
        apology: "No worries at all! These things happen.",
        meeting: "I'm available most of this week. What time works best for you?",
        default: "I understand. Let me think about this and get back to you with a thoughtful response.",
      },
      hindi: {
        question_when: "मैं कल दोपहर तक इस पर वापस आ सकता हूं। क्या यह आपके लिए ठीक है?",
        question_where: "मुझे जांचने दें और जल्द ही आपको विवरण भेजूंगा।",
        question_how: "यह एक अच्छा सवाल है! मुझे समझाने दें...",
        question_default: "हां, बिल्कुल! मैं इसमें आपकी मदद करूंगा।",
        greeting: "नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूं?",
        thanks: "आपका स्वागत है! कभी भी मदद करने में खुशी होगी।",
        agreement: "बिल्कुल सही! इसका इंतजार है।",
        update: "फॉलो अप के लिए धन्यवाद! मैं इस पर काम कर रहा हूं और जल्द ही आपको अपडेट दूंगा।",
        apology: "कोई बात नहीं! ये चीजें होती रहती हैं।",
        meeting: "मैं इस सप्ताह अधिकतर उपलब्ध हूं। आपके लिए कौन सा समय सबसे अच्छा है?",
        default: "मैं समझता हूं। मुझे इस पर विचार करने दें और एक विचारशील जवाब के साथ वापस आऊंगा।",
      },
      spanish: {
        question_when: "Puedo responderte mañana por la tarde. ¿Te parece bien?",
        question_where: "Déjame verificar y te envío los detalles pronto.",
        question_how: "¡Esa es una gran pregunta! Déjame explicarte...",
        question_default: "¡Sí, absolutamente! Te ayudaré con eso.",
        greeting: "¡Hola! ¿Cómo puedo ayudarte hoy?",
        thanks: "¡De nada! Encantado de ayudar cuando sea.",
        agreement: "¡Perfecto! Esperándolo con ansias.",
        update: "¡Gracias por hacer seguimiento! Estoy trabajando en ello y tendré una actualización pronto.",
        apology: "¡No te preocupes! Estas cosas pasan.",
        meeting: "Estoy disponible la mayor parte de esta semana. ¿Qué hora te viene mejor?",
        default: "Entiendo. Déjame pensar en esto y te responderé con una respuesta reflexiva.",
      },
      french: {
        question_when: "Je peux vous répondre demain après-midi. Cela vous convient-il?",
        question_where: "Laissez-moi vérifier et je vous enverrai les détails bientôt.",
        question_how: "C'est une excellente question! Laissez-moi vous expliquer...",
        question_default: "Oui, absolument! Je vais vous aider avec ça.",
        greeting: "Bonjour! Comment puis-je vous aider aujourd'hui?",
        thanks: "De rien! Heureux d'aider à tout moment.",
        agreement: "Parfait! J'ai hâte.",
        update: "Merci de faire un suivi! J'y travaille actuellement et j'aurai une mise à jour bientôt.",
        apology: "Pas de soucis! Ces choses arrivent.",
        meeting: "Je suis disponible la plupart de cette semaine. Quelle heure vous convient le mieux?",
        default: "Je comprends. Laissez-moi réfléchir à cela et je reviendrai vers vous avec une réponse réfléchie.",
      },
      german: {
        question_when: "Ich kann mich morgen Nachmittag dazu melden. Passt Ihnen das?",
        question_where: "Lassen Sie mich nachsehen und ich sende Ihnen die Details bald.",
        question_how: "Das ist eine gute Frage! Lassen Sie mich erklären...",
        question_default: "Ja, absolut! Ich werde Ihnen dabei helfen.",
        greeting: "Hallo! Wie kann ich Ihnen heute helfen?",
        thanks: "Gerne! Helfe jederzeit gerne.",
        agreement: "Perfekt! Freue mich darauf.",
        update: "Danke fürs Nachfragen! Ich arbeite gerade daran und werde bald ein Update haben.",
        apology: "Kein Problem! Solche Dinge passieren.",
        meeting: "Ich bin diese Woche meistens verfügbar. Welche Zeit passt Ihnen am besten?",
        default: "Ich verstehe. Lassen Sie mich darüber nachdenken und ich komme mit einer durchdachten Antwort zurück.",
      },
      portuguese: {
        question_when: "Posso retornar sobre isso amanhã à tarde. Isso funciona para você?",
        question_where: "Deixe-me verificar e envio os detalhes em breve.",
        question_how: "Essa é uma ótima pergunta! Deixe-me explicar...",
        question_default: "Sim, absolutamente! Vou ajudá-lo com isso.",
        greeting: "Olá! Como posso ajudá-lo hoje?",
        thanks: "De nada! Feliz em ajudar sempre.",
        agreement: "Perfeito! Ansioso por isso.",
        update: "Obrigado por acompanhar! Estou trabalhando nisso e terei uma atualização em breve.",
        apology: "Sem problemas! Essas coisas acontecem.",
        meeting: "Estou disponível na maior parte desta semana. Que horário funciona melhor para você?",
        default: "Eu entendo. Deixe-me pensar sobre isso e retornarei com uma resposta ponderada.",
      },
      italian: {
        question_when: "Posso tornare su questo domani pomeriggio. Va bene per te?",
        question_where: "Fammi controllare e ti invierò i dettagli a breve.",
        question_how: "Questa è un'ottima domanda! Lascia che ti spieghi...",
        question_default: "Sì, assolutamente! Ti aiuterò con questo.",
        greeting: "Ciao! Come posso aiutarti oggi?",
        thanks: "Prego! Felice di aiutare in qualsiasi momento.",
        agreement: "Perfetto! Non vedo l'ora.",
        update: "Grazie per il follow-up! Ci sto lavorando e avrò un aggiornamento presto.",
        apology: "Nessun problema! Queste cose succedono.",
        meeting: "Sono disponibile per la maggior parte di questa settimana. Che orario funziona meglio per te?",
        default: "Capisco. Lasciami pensare a questo e tornerò con una risposta ponderata.",
      },
      japanese: {
        question_when: "明日の午後までにご返答できます。それでよろしいでしょうか？",
        question_where: "確認して、すぐに詳細をお送りします。",
        question_how: "それは良い質問ですね！説明させてください...",
        question_default: "はい、もちろんです！お手伝いします。",
        greeting: "こんにちは！今日はどのようにお手伝いできますか？",
        thanks: "どういたしまして！いつでも喜んでお手伝いします。",
        agreement: "完璧です！楽しみにしています。",
        update: "フォローアップありがとうございます！現在作業中で、すぐに更新情報をお届けします。",
        apology: "全く問題ありません！そういうこともあります。",
        meeting: "今週はほとんど空いています。いつがご都合よろしいですか？",
        default: "理解しました。考えて、よく考えた返答をさせていただきます。",
      },
      korean: {
        question_when: "내일 오후까지 답변 드릴 수 있습니다. 괜찮으신가요?",
        question_where: "확인해서 곧 자세한 내용을 보내드리겠습니다.",
        question_how: "좋은 질문이네요! 설명해 드리겠습니다...",
        question_default: "네, 물론이죠! 도와드리겠습니다.",
        greeting: "안녕하세요! 오늘 무엇을 도와드릴까요?",
        thanks: "천만에요! 언제든지 기꺼이 도와드리겠습니다.",
        agreement: "완벽해요! 기대하고 있겠습니다.",
        update: "팔로우업 감사합니다! 현재 작업 중이며 곧 업데이트 드리겠습니다.",
        apology: "전혀 괜찮습니다! 이런 일은 일어나기 마련이죠.",
        meeting: "이번 주 대부분 시간이 가능합니다. 언제가 가장 좋으신가요?",
        default: "이해합니다. 생각해보고 신중한 답변으로 돌아오겠습니다.",
      },
      chinese: {
        question_when: "我可以在明天下午之前回复您。这样可以吗？",
        question_where: "让我查一下，很快就把详细信息发给您。",
        question_how: "这是个好问题！让我解释一下...",
        question_default: "是的，当然！我会帮您处理的。",
        greeting: "您好！今天我能帮您什么？",
        thanks: "不客气！随时乐意帮忙。",
        agreement: "完美！期待着。",
        update: "谢谢跟进！我正在处理，很快就会有更新。",
        apology: "完全没问题！这些事情会发生的。",
        meeting: "我这周大部分时间都有空。什么时间最适合您？",
        default: "我明白了。让我考虑一下，然后给您一个深思熟虑的回复。",
      },
    };

    const templates = responseTemplates[language];
    let response = '';

    // Question detection
    if (lastMessageText.includes('?') || 
        lastMessageText.startsWith('when') || 
        lastMessageText.startsWith('what') || 
        lastMessageText.startsWith('where') ||
        lastMessageText.startsWith('how') ||
        lastMessageText.startsWith('why') ||
        lastMessageText.startsWith('can you') ||
        lastMessageText.includes('could you')) {
      
      if (lastMessageText.includes('when')) {
        response = templates.question_when;
      } else if (lastMessageText.includes('where')) {
        response = templates.question_where;
      } else if (lastMessageText.includes('how')) {
        response = templates.question_how;
      } else {
        response = templates.question_default;
      }
    }
    // Greeting detection
    else if (lastMessageText.match(/\b(hi|hello|hey|good morning|good evening)\b/)) {
      response = templates.greeting;
    }
    // Thanks detection
    else if (lastMessageText.match(/\b(thanks|thank you|thx|appreciate)\b/)) {
      response = templates.thanks;
    }
    // Agreement detection
    else if (lastMessageText.match(/\b(ok|okay|sure|sounds good|great)\b/)) {
      response = templates.agreement;
    }
    // Request for update/status
    else if (lastMessageText.includes('update') || lastMessageText.includes('status') || lastMessageText.includes('progress')) {
      response = templates.update;
    }
    // Apology detection
    else if (lastMessageText.match(/\b(sorry|apologize|my bad)\b/)) {
      response = templates.apology;
    }
    // Meeting/schedule related
    else if (lastMessageText.match(/\b(meeting|schedule|call|available)\b/)) {
      response = templates.meeting;
    }
    // Default contextual response
    else {
      response = templates.default;
    }

    return response;
  };

  const handleRefine = () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to refine');
      return;
    }

    setIsRefining(true);
    // Simulate processing time
    setTimeout(() => {
      const refined = refineText(inputText, selectedStyle, selectedLanguage);
      setRefinedText(refined);
      setIsRefining(false);
      toast.success('Text refined successfully!');
    }, 1000);
  };

  const handleGenerateResponse = () => {
    if (chatHistory.length === 0) {
      toast.error('Please add at least one message to the chat history');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const response = generateResponse(chatHistory, responseLanguage);
      setGeneratedResponse(response);
      setIsGenerating(false);
      toast.success('Response generated!');
    }, 1200);
  };

  const addMessage = () => {
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (chatHistory.length >= 10) {
      toast.error('Maximum 10 messages allowed');
      return;
    }

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: newMessageSender,
    };

    setChatHistory([...chatHistory, message]);
    setNewMessage('');
    toast.success('Message added');
  };

  const removeMessage = (id: string) => {
    setChatHistory(chatHistory.filter(m => m.id !== id));
  };

  const copyToClipboard = async (text: string, type: 'original' | 'refined' | 'response') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'original') {
        setCopiedOriginal(true);
        setTimeout(() => setCopiedOriginal(false), 2000);
      } else if (type === 'refined') {
        setCopiedRefined(true);
        setTimeout(() => setCopiedRefined(false), 2000);
      } else {
        setCopiedResponse(true);
        setTimeout(() => setCopiedResponse(false), 2000);
      }
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      toast.success('Text pasted from clipboard!');
    } catch (err) {
      toast.error('Failed to paste. Please paste manually.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="mb-2">TextRefine</h1>
        <p className="text-gray-600 text-sm">
          Polish your messages before sending
        </p>
      </div>

      {/* Feature Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'refine' | 'respond')} className="mb-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="refine" className="gap-2">
            <Wand2 className="w-4 h-4" />
            Refine Text
          </TabsTrigger>
          <TabsTrigger value="respond" className="gap-2">
            <MessagesSquare className="w-4 h-4" />
            Generate Response
          </TabsTrigger>
        </TabsList>

        {/* Refine Tab Content */}
        <TabsContent value="refine" className="space-y-6 mt-6">
          {/* Input Section */}
          <Card className="p-5 shadow-md border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h2 className="font-semibold text-gray-900">Your Message</h2>
            </div>
            <Textarea
              placeholder="Paste or type your message here... (e.g., 'hey can u send me the report asap thanks')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] mb-3 resize-none text-base border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
            <div className="flex gap-2">
              <Button
                onClick={handlePaste}
                variant="outline"
                className="flex-1 border-gray-300"
              >
                Paste from WhatsApp
              </Button>
              {inputText && (
                <Button
                  onClick={() => copyToClipboard(inputText, 'original')}
                  variant="outline"
                  size="icon"
                  className="border-gray-300"
                >
                  {copiedOriginal ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </Card>

          {/* Style Selection */}
          <Card className="p-5 shadow-md border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-5 h-5 text-purple-600" />
              <h2 className="font-semibold text-gray-900">Refinement Style</h2>
            </div>
            <Tabs value={selectedStyle} onValueChange={(v) => setSelectedStyle(v as RefinementStyle)}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="casual">Casual</TabsTrigger>
                <TabsTrigger value="concise">Concise</TabsTrigger>
                <TabsTrigger value="friendly">Friendly</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-xs text-gray-500 mt-3">
              {selectedStyle === 'professional' && 'Perfect for work emails and formal communications'}
              {selectedStyle === 'casual' && 'Natural and relaxed tone for everyday chats'}
              {selectedStyle === 'concise' && 'Short and to the point, removes filler words'}
              {selectedStyle === 'friendly' && 'Warm and approachable for friends and family'}
            </p>
          </Card>

          {/* Language Selection */}
          <Card className="p-5 shadow-md border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Language</h2>
            </div>
            <Select value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as Language)}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  {languages[selectedLanguage].name} {languages[selectedLanguage].flag}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(languages).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {languages[lang as Language].name} {languages[lang as Language].flag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Refine Button */}
          <Button
            onClick={handleRefine}
            disabled={!inputText.trim() || isRefining}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-base font-semibold shadow-lg"
          >
            {isRefining ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Refining...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Refine Text
              </>
            )}
          </Button>

          {/* Refined Output */}
          {refinedText && (
            <Card className="p-5 shadow-md border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-gray-900">Refined Message</h2>
              </div>
              <div className="bg-white rounded-lg p-4 mb-3 border border-green-200 min-h-[120px] text-base text-gray-900 whitespace-pre-wrap">
                {refinedText}
              </div>
              <Button
                onClick={() => copyToClipboard(refinedText, 'refined')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {copiedRefined ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Share
                  </>
                )}
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* Generate Response Tab Content */}
        <TabsContent value="respond" className="space-y-6 mt-6">
          {/* Chat History */}
          <Card className="p-5 shadow-md border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessagesSquare className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">Chat History</h2>
              </div>
              <span className="text-xs text-gray-500">
                {chatHistory.length}/10 messages
              </span>
            </div>

            {/* Chat messages list */}
            {chatHistory.length > 0 && (
              <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg border ${
                      message.sender === 'user'
                        ? 'bg-green-50 border-green-200 ml-8'
                        : 'bg-gray-50 border-gray-200 mr-8'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'user' ? (
                            <User className="w-3 h-3 text-green-600" />
                          ) : (
                            <UserCircle className="w-3 h-3 text-gray-600" />
                          )}
                          <span className="text-xs font-medium text-gray-700">
                            {message.sender === 'user' ? 'You' : 'Other Person'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900">{message.text}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeMessage(message.id)}
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add new message */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  variant={newMessageSender === 'other' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewMessageSender('other')}
                  className="flex-1"
                >
                  <UserCircle className="w-4 h-4 mr-1" />
                  Other
                </Button>
                <Button
                  variant={newMessageSender === 'user' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewMessageSender('user')}
                  className="flex-1"
                >
                  <User className="w-4 h-4 mr-1" />
                  You
                </Button>
              </div>
              <Textarea
                placeholder="Type a message from the conversation..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[80px] resize-none text-sm border-gray-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                  }
                }}
              />
              <Button
                onClick={addMessage}
                variant="outline"
                className="w-full border-gray-300"
                disabled={chatHistory.length >= 10}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Message
              </Button>
            </div>
          </Card>

          {/* Language Selection */}
          <Card className="p-5 shadow-md border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Response Language</h2>
            </div>
            <Select value={responseLanguage} onValueChange={(v) => setResponseLanguage(v as Language)}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  {languages[responseLanguage].name} {languages[responseLanguage].flag}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(languages).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {languages[lang as Language].name} {languages[lang as Language].flag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateResponse}
            disabled={chatHistory.length === 0 || isGenerating}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-6 text-base font-semibold shadow-lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Response
              </>
            )}
          </Button>

          {/* Generated Response */}
          {generatedResponse && (
            <Card className="p-5 shadow-md border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">Suggested Response</h2>
              </div>
              <div className="bg-white rounded-lg p-4 mb-3 border border-blue-200 min-h-[100px] text-base text-gray-900 whitespace-pre-wrap">
                {generatedResponse}
              </div>
              <Button
                onClick={() => copyToClipboard(generatedResponse, 'response')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {copiedResponse ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Response
                  </>
                )}
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer Tips */}
      <div className="mt-12 mb-8 text-center">
        <p className="text-xs text-gray-400">
          💡 Tip: {activeTab === 'refine' 
            ? 'Paste text from WhatsApp, select a style, and get an improved version instantly'
            : 'Add up to 10 messages from your conversation to get a contextual response'}
        </p>
      </div>
    </div>
  );
}