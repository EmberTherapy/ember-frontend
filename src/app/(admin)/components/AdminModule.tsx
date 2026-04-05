type AdminCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function AdminModule({ title, children }: AdminCardProps) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">{title}</h2>
      <div>{children}</div>
    </div>
  );
}