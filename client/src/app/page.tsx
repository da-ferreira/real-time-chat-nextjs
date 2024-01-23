import Content from '@/components/Content';

export default function Home() {
  return (
    <Content>
      <div className="hidden lg:block h-full">
        <div className="h-full flex items-center justify-center">
          <p className="text-4xl font-semibold text-gray-600">Inicie uma conversa</p>
        </div>
      </div>
    </Content>
  );
}
