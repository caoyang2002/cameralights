import AuthGuard from '@/components/auth-guard';

export default function CommunityPage() {
  return (
    <AuthGuard requireAuth requirePayment>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Photography Community</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Community content will go here */}
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Latest Discussions</h2>
              <p className="text-muted-foreground">
                Connect with fellow photographers and share your experiences.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Featured Photos</h2>
              <p className="text-muted-foreground">
                Showcase your best work and get feedback from the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}