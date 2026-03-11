import { TextRefiner } from '../components/TextRefiner';
import { Toaster } from '../components/ui/sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';

export function AppPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Back Button */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
      
      <TextRefiner />
      <Toaster />
    </div>
  );
}
