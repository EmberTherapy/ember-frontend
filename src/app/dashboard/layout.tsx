import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
        <Toaster
          position="bottom-right"
          richColors
          visibleToasts={1}
        />
    </div>
  );
}