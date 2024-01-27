import Content from '@/components/Content';
import { AuthProvider } from '@/contexts/AuthContext';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Content>
        <div className="lg:block h-full">{children}</div>
      </Content>
    </AuthProvider>
  );
}
