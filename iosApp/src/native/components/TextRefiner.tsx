import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Share,
  Clipboard,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type RefinementStyle = 'professional' | 'casual' | 'concise' | 'friendly';
type Language = 'english' | 'hindi' | 'spanish' | 'french' | 'german' | 'portuguese' | 'italian' | 'japanese' | 'korean' | 'chinese';
type TabType = 'refine' | 'respond';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleText: {
    marginLeft: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonPrimary: {
    backgroundColor: '#16a34a',
    flexDirection: 'row',
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#4b5563',
  },
  styleButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  styleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  styleButtonActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  styleButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
  },
  styleButtonTextActive: {
    color: '#ffffff',
  },
  styleDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 12,
  },
  outputCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    minHeight: 120,
  },
  outputText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  chatMessage: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chatMessageOther: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 24,
  },
  chatMessageUser: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginLeft: 24,
  },
  chatMessageSender: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  chatMessageText: {
    fontSize: 13,
    color: '#1f2937',
    flex: 1,
  },
  chatDeleteButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 18,
    fontWeight: '700',
  },
  senderButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  senderButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  senderButtonActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  senderButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
  },
  senderButtonTextActive: {
    color: '#ffffff',
  },
  messageCountBadge: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
  loadingSpinner: {
    marginRight: 8,
  },
  tipContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  tipText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  footer: {
    height: 24,
  },
});

export default function TextRefiner() {
  const [inputText, setInputText] = useState('');
  const [refinedText, setRefinedText] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<RefinementStyle>('professional');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [activeTab, setActiveTab] = useState<TabType>('refine');

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageSender, setNewMessageSender] = useState<'user' | 'other'>('other');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [responseLanguage, setResponseLanguage] = useState<Language>('english');

  const refineText = (text: string, style: RefinementStyle, language: Language): string => {
    if (!text.trim()) return '';

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
        professional: (t) => `${t.trim()}\n\nसादर,\n(With regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}।`,
        friendly: (t) => `${t.trim()}! धन्यवाद! 🙏\n(Thanks!)`,
      },
      spanish: {
        professional: (t) => `${t.trim()}\n\nAtentamente,\n(Best regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}.`,
        friendly: (t) => `${t.trim()}! ¡Gracias!\n(Thanks!)`,
      },
      french: {
        professional: (t) => `${t.trim()}\n\nCordialement,\n(Best regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}.`,
        friendly: (t) => `${t.trim()}! Merci!\n(Thanks!)`,
      },
      german: {
        professional: (t) => `${t.trim()}\n\nMit freundlichen Grüßen,\n(Best regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}.`,
        friendly: (t) => `${t.trim()}! Danke!\n(Thanks!)`,
      },
      portuguese: {
        professional: (t) => `${t.trim()}\n\nAtenciosamente,\n(Best regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}.`,
        friendly: (t) => `${t.trim()}! Obrigado!\n(Thanks!)`,
      },
      italian: {
        professional: (t) => `${t.trim()}\n\nCordiali saluti,\n(Best regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}.`,
        friendly: (t) => `${t.trim()}! Grazie!\n(Thanks!)`,
      },
      japanese: {
        professional: (t) => `${t.trim()}\n\nよろしくお願いいたします。\n(Best regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}。`,
        friendly: (t) => `${t.trim()}！ありがとう！\n(Thanks!)`,
      },
      korean: {
        professional: (t) => `${t.trim()}\n\n감사합니다.\n(Thank you)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}.`,
        friendly: (t) => `${t.trim()}! 고마워요!\n(Thanks!)`,
      },
      chinese: {
        professional: (t) => `${t.trim()}\n\n此致敬礼\n(Best regards)`,
        casual: (t) => `${t.trim()} 😊`,
        concise: (t) => `${t.trim()}。`,
        friendly: (t) => `${t.trim()}！谢谢！\n(Thanks!)`,
      },
    };

    return languageTemplates[language][style](text);
  };

  const generateResponse = (history: ChatMessage[], language: Language): string => {
    if (history.length === 0) return '';

    const lastMessage = history[history.length - 1];
    const lastMessageText = lastMessage.text.toLowerCase();

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
    } else if (lastMessageText.match(/\b(hi|hello|hey|good morning|good evening)\b/)) {
      response = templates.greeting;
    } else if (lastMessageText.match(/\b(thanks|thank you|thx|appreciate)\b/)) {
      response = templates.thanks;
    } else if (lastMessageText.match(/\b(ok|okay|sure|sounds good|great)\b/)) {
      response = templates.agreement;
    } else if (lastMessageText.includes('update') || lastMessageText.includes('status') || lastMessageText.includes('progress')) {
      response = templates.update;
    } else if (lastMessageText.match(/\b(sorry|apologize|my bad)\b/)) {
      response = templates.apology;
    } else if (lastMessageText.match(/\b(meeting|schedule|call|available)\b/)) {
      response = templates.meeting;
    } else {
      response = templates.default;
    }

    return response;
  };

  const handleRefine = () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to refine');
      return;
    }

    setIsRefining(true);
    setTimeout(() => {
      const refined = refineText(inputText, selectedStyle, selectedLanguage);
      setRefinedText(refined);
      setIsRefining(false);
      Alert.alert('Success', 'Text refined successfully!');
    }, 1000);
  };

  const handleGenerateResponse = () => {
    if (chatHistory.length === 0) {
      Alert.alert('Error', 'Please add at least one message to the chat history');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const response = generateResponse(chatHistory, responseLanguage);
      setGeneratedResponse(response);
      setIsGenerating(false);
      Alert.alert('Success', 'Response generated!');
    }, 1200);
  };

  const addMessage = () => {
    if (!newMessage.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    if (chatHistory.length >= 10) {
      Alert.alert('Error', 'Maximum 10 messages allowed');
      return;
    }

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: newMessageSender,
    };

    setChatHistory([...chatHistory, message]);
    setNewMessage('');
    Alert.alert('Success', 'Message added');
  };

  const removeMessage = (id: string) => {
    setChatHistory(chatHistory.filter(m => m.id !== id));
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);
    Alert.alert('Success', 'Copied to clipboard!');
  };

  const shareText = async (text: string) => {
    try {
      await Share.share({
        message: text,
        title: 'TextRefine',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>✨</Text>
          <Text style={styles.headerTitle}>TextRefine</Text>
          <Text style={styles.headerSubtitle}>Polish your messages before sending</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'refine' && styles.tabActive]}
            onPress={() => setActiveTab('refine')}
          >
            <Text style={styles.tabIcon}>✨</Text>
            <Text style={[styles.tabText, activeTab === 'refine' && styles.tabTextActive]}>
              Refine
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'respond' && styles.tabActive]}
            onPress={() => setActiveTab('respond')}
          >
            <Text style={styles.tabIcon}>💬</Text>
            <Text style={[styles.tabText, activeTab === 'respond' && styles.tabTextActive]}>
              Respond
            </Text>
          </TouchableOpacity>
        </View>

        {/* Refine Tab */}
        {activeTab === 'refine' && (
          <>
            {/* Input Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Text>💬</Text>
                <Text style={styles.cardTitleText}>Your Message</Text>
              </Text>
              <TextInput
                style={styles.textarea}
                placeholder="Paste or type your message here..."
                value={inputText}
                onChangeText={setInputText}
                multiline
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => shareText(inputText || 'Share text')}
              >
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Share Text</Text>
              </TouchableOpacity>
            </View>

            {/* Style Selection */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Text>✨</Text>
                <Text style={styles.cardTitleText}>Refinement Style</Text>
              </Text>
              <View style={styles.styleButtonsContainer}>
                {(['professional', 'casual', 'concise', 'friendly'] as RefinementStyle[]).map(
                  (style) => (
                    <TouchableOpacity
                      key={style}
                      style={[
                        styles.styleButton,
                        selectedStyle === style && styles.styleButtonActive,
                      ]}
                      onPress={() => setSelectedStyle(style)}
                    >
                      <Text
                        style={[
                          styles.styleButtonText,
                          selectedStyle === style && styles.styleButtonTextActive,
                        ]}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
              <Text style={styles.styleDescription}>
                {selectedStyle === 'professional' &&
                  'Perfect for work emails and formal communications'}
                {selectedStyle === 'casual' && 'Natural and relaxed tone for everyday chats'}
                {selectedStyle === 'concise' && 'Short and to the point, removes filler words'}
                {selectedStyle === 'friendly' &&
                  'Warm and approachable for friends and family'}
              </Text>
            </View>

            {/* Language Selection */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Text>🌐</Text>
                <Text style={styles.cardTitleText}>Language</Text>
              </Text>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue as Language)}
                style={styles.picker}
              >
                {Object.keys(languages).map((lang) => (
                  <Picker.Item
                    key={lang}
                    label={`${languages[lang as Language].flag} ${languages[lang as Language].name}`}
                    value={lang}
                  />
                ))}
              </Picker>
            </View>

            {/* Refine Button */}
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={handleRefine}
              disabled={!inputText.trim() || isRefining}
            >
              {isRefining ? (
                <ActivityIndicator color="#ffffff" size="small" style={styles.loadingSpinner} />
              ) : (
                <Text style={styles.buttonText}>✨</Text>
              )}
              <Text style={styles.buttonText}>
                {isRefining ? 'Refining...' : 'Refine Text'}
              </Text>
            </TouchableOpacity>

            {/* Output Card */}
            {refinedText && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  <Text>✨</Text>
                  <Text style={styles.cardTitleText}>Refined Message</Text>
                </Text>
                <View style={styles.outputCard}>
                  <Text style={styles.outputText}>{refinedText}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => copyToClipboard(refinedText)}
                >
                  <Text style={styles.buttonText}>📋 Copy to Share</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* Respond Tab */}
        {activeTab === 'respond' && (
          <>
            {/* Chat History Card */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { marginBottom: 16 }]}>
                <Text>💬</Text>
                <Text style={styles.cardTitleText}>Chat History</Text>
              </Text>
              <Text style={styles.messageCountBadge}>
                {chatHistory.length}/10 messages
              </Text>

              {chatHistory.length > 0 && (
                <View style={{ marginBottom: 16 }}>
                  {chatHistory.map((message) => (
                    <View
                      key={message.id}
                      style={[
                        styles.chatMessage,
                        message.sender === 'user'
                          ? styles.chatMessageUser
                          : styles.chatMessageOther,
                      ]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.chatMessageSender}>
                          {message.sender === 'user' ? 'You' : 'Other Person'}
                        </Text>
                        <Text style={styles.chatMessageText}>{message.text}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.chatDeleteButton}
                        onPress={() => removeMessage(message.id)}
                      >
                        <Text style={styles.deleteButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Add New Message */}
              <View style={{ marginTop: 16 }}>
                <View style={styles.senderButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.senderButton,
                      newMessageSender === 'other' && styles.senderButtonActive,
                    ]}
                    onPress={() => setNewMessageSender('other')}
                  >
                    <Text
                      style={[
                        styles.senderButtonText,
                        newMessageSender === 'other' && styles.senderButtonTextActive,
                      ]}
                    >
                      Other
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.senderButton,
                      newMessageSender === 'user' && styles.senderButtonActive,
                    ]}
                    onPress={() => setNewMessageSender('user')}
                  >
                    <Text
                      style={[
                        styles.senderButtonText,
                        newMessageSender === 'user' && styles.senderButtonTextActive,
                      ]}
                    >
                      You
                    </Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={[styles.textarea, { minHeight: 80 }]}
                  placeholder="Type a message from the conversation..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                  placeholderTextColor="#9ca3af"
                />

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonSecondary,
                    chatHistory.length >= 10 && { opacity: 0.5 },
                  ]}
                  onPress={addMessage}
                  disabled={chatHistory.length >= 10}
                >
                  <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                    + Add Message
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Response Language Selection */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Text>🌐</Text>
                <Text style={styles.cardTitleText}>Response Language</Text>
              </Text>
              <Picker
                selectedValue={responseLanguage}
                onValueChange={(itemValue) => setResponseLanguage(itemValue as Language)}
                style={styles.picker}
              >
                {Object.keys(languages).map((lang) => (
                  <Picker.Item
                    key={lang}
                    label={`${languages[lang as Language].flag} ${languages[lang as Language].name}`}
                    value={lang}
                  />
                ))}
              </Picker>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary, { backgroundColor: '#2563eb' }]}
              onPress={handleGenerateResponse}
              disabled={chatHistory.length === 0 || isGenerating}
            >
              {isGenerating ? (
                <ActivityIndicator color="#ffffff" size="small" style={styles.loadingSpinner} />
              ) : (
                <Text style={styles.buttonText}>✨</Text>
              )}
              <Text style={styles.buttonText}>
                {isGenerating ? 'Analyzing...' : 'Generate Response'}
              </Text>
            </TouchableOpacity>

            {/* Generated Response */}
            {generatedResponse && (
              <View style={[styles.card, { borderColor: '#93c5fd' }]}>
                <Text style={styles.cardTitle}>
                  <Text>✨</Text>
                  <Text style={styles.cardTitleText}>Suggested Response</Text>
                </Text>
                <View style={[styles.outputCard, { backgroundColor: '#f0f9ff' }]}>
                  <Text style={styles.outputText}>{generatedResponse}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary, { backgroundColor: '#2563eb' }]}
                  onPress={() => copyToClipboard(generatedResponse)}
                >
                  <Text style={styles.buttonText}>📋 Copy Response</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* Tips */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            💡 Tip: {activeTab === 'refine'
              ? 'Select a style and get an improved version instantly'
              : 'Add up to 10 messages from your conversation to get a contextual response'}
          </Text>
        </View>

        <View style={styles.footer} />
      </View>
    </ScrollView>
  );
}
