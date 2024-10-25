"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requirePayment?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = false,
  requirePayment = false,
}: AuthGuardProps) {
  const { isAuthenticated, hasPaid } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    } else if (requirePayment && !hasPaid) {
      router.push('/pricing');
    }
  }, [isAuthenticated, hasPaid, requireAuth, requirePayment, router, pathname]);

  if ((requireAuth && !isAuthenticated) || (requirePayment && !hasPaid)) {
    return null;
  }

  return <>{children}</>;
}