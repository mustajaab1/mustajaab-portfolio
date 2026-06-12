import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated as admin
  if (!session || (session.user as any)?.role !== 'admin') {
    redirect('/admin/login');
  }

  // Fetch all dashboard data from PostgreSQL using Prisma
  const [
    contacts,
    subscribers,
    analytics,
    projectViews,
    publicUpdates,
    linkedinPosts
  ] = await Promise.all([
    prisma.contact.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.visitorAnalytics.findMany({ orderBy: { visitedAt: 'desc' }, take: 100 }),
    prisma.projectView.findMany({ orderBy: { visitedAt: 'desc' }, take: 100 }),
    prisma.buildingInPublicUpdate.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.linkedInPost.findMany({ orderBy: { publishedAt: 'desc' } }),
  ]);

  return (
    <AdminDashboardClient
      contacts={contacts}
      subscribers={subscribers}
      analytics={analytics}
      projectViews={projectViews}
      publicUpdates={publicUpdates}
      linkedinPosts={linkedinPosts}
    />
  );
}
