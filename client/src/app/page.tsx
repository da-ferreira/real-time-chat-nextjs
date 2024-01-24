import Content from '@/components/Content';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Content>
        <div className="hidden lg:block h-full">
          <div className="h-full flex items-center justify-center">
            <p className="text-4xl font-semibold text-gray-600">Inicie uma conversa</p>
          </div>
        </div>
      </Content>
    </AuthProvider>
  );
}
