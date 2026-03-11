import { Sparkles, MessageSquare, Wand2, MessagesSquare, CheckCircle, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useNavigate } from 'react-router';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wand2,
      title: 'Text Refinement',
      description: 'Transform casual messages into professional, polished text with multiple style options.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: MessagesSquare,
      title: 'Smart Response Generator',
      description: 'Analyze chat history to generate contextual, appropriate responses instantly.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get refined text and smart responses in seconds. No waiting, no hassle.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All processing happens locally. Your messages are private and secure.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const useCases = [
    {
      title: 'Professional Communication',
      description: 'Transform casual WhatsApp messages into professional emails and business communications.',
      icon: '💼',
    },
    {
      title: 'Quick Responses',
      description: 'Never struggle to find the right words. Get intelligent response suggestions based on context.',
      icon: '⚡',
    },
    {
      title: 'Save Time',
      description: 'Stop overthinking every message. Let TextRefine help you communicate clearly and confidently.',
      icon: '⏰',
    },
  ];

  const styles = [
    { name: 'Professional', description: 'Perfect for work emails and formal communications' },
    { name: 'Casual', description: 'Natural and relaxed tone for everyday chats' },
    { name: 'Concise', description: 'Short and to the point, removes filler words' },
    { name: 'Friendly', description: 'Warm and approachable for friends and family' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="text-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-3xl shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
            Polish Your Messages
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Before You Send
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Transform casual WhatsApp messages into professional text, or get smart response suggestions 
            based on your conversation history. All in one tap.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => navigate('/app')}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg shadow-xl w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-gray-300 w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600">Refinement Styles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">10</div>
              <div className="text-sm text-gray-600">Chat Messages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">1s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to communicate better, faster, and more confidently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className={`${feature.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get polished messages in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Paste Your Message</h3>
              <p className="text-gray-600">
                Copy text from WhatsApp or type directly into the app
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Style</h3>
              <p className="text-gray-600">
                Select from Professional, Casual, Concise, or Friendly tones
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Copy & Send</h3>
              <p className="text-gray-600">
                Get your refined text and copy it back to WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Refinement Styles */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Multiple Refinement Styles</h2>
            <p className="text-lg text-gray-600">
              Choose the perfect tone for any situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {styles.map((style, index) => (
              <Card key={index} className="p-5 hover:border-green-300 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{style.name}</h3>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-20 bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TextRefine adapts to your communication needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-4">Ready to Transform Your Messages?</h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            Join users who are already communicating better with TextRefine. 
            No signup required. Start refining your messages today.
          </p>
          <Button
            onClick={() => navigate('/app')}
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-50 px-8 py-6 text-lg shadow-xl"
          >
            Launch TextRefine
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-white font-semibold mb-2">TextRefine</h3>
          <p className="text-sm mb-6">Polish your messages before you send</p>
          <p className="text-xs">
            © 2026 TextRefine. Built with privacy and simplicity in mind.
          </p>
        </div>
      </footer>
    </div>
  );
}
