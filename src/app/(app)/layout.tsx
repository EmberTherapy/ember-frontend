import { Toaster } from 'sonner';
import './app.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="header">
        <h1>Ember</h1>
      </header>
      {children}
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
        />
    </div>
  );
}