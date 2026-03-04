export default function AdminSettings() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <h2 className="font-bold text-[var(--color-text-primary)] mb-2">Supabase Connection</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">Database is connected and operational.</p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-mono">Connected</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <h2 className="font-bold text-[var(--color-text-primary)] mb-2">Environment</h2>
          <div className="text-sm text-[var(--color-text-muted)] font-mono space-y-1">
            <p>Project: nftewytougpxfgyurrnm</p>
            <p>Region: ap-south-1</p>
            <p>Framework: Next.js 16</p>
          </div>
        </div>
      </div>
    </div>
  );
}
