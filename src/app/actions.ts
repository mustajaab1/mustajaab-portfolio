'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { cookies, headers } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Contact Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(3, 'Subject must be at least 3 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    // 1. Zod Validation
    const validated = contactSchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        message: validated.error.issues[0].message,
      };
    }

    const { name, email, subject, message } = validated.data;

    // 2. Simple Anti-Spam Rate Limit using Cookies
    const cookieStore = await cookies();
    const rateLimitCookie = cookieStore.get('contact_submitted');
    if (rateLimitCookie) {
      return {
        success: false,
        message: 'You are submitting too fast. Please wait a minute before sending another message.',
      };
    }

    // 3. Save to database (Prisma + PostgreSQL)
    let contact;
    try {
      contact = await prisma.contact.create({
        data: {
          name,
          email,
          subject,
          message,
        },
      });
    } catch (dbError) {
      console.error('Database write error during contact submission:', dbError);
      return {
        success: false,
        message: 'Something went wrong, try again later',
      };
    }

    // 4. Send email notification (Resend)
    // ONLY triggered if DB write succeeded. If email fails, return success anyway since it is stored.
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
      const toEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'mustajaabx@gmail.com';
      
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Contact Form Message: ${subject}`,
        html: `
          <h2>New Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email delivery error (message saved in DB):', emailError);
      // We still return success: true because the message was successfully stored.
    }

    // Set submission cooldown cookie for 60 seconds
    cookieStore.set('contact_submitted', 'true', {
      maxAge: 60,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      success: true,
      message: 'Message sent successfully',
    };
  } catch (err) {
    console.error('Unexpected error in submitContactForm action:', err);
    return {
      success: false,
      message: 'Something went wrong, try again later',
    };
  }
}

// Newsletter Schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export async function subscribeNewsletter(email: string) {
  try {
    const validated = newsletterSchema.safeParse({ email });
    if (!validated.success) {
      return {
        success: false,
        message: validated.error.issues[0].message,
      };
    }

    // Check if already exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: validated.data.email },
    });

    if (existing) {
      return {
        success: false,
        message: 'This email is already subscribed!',
      };
    }

    await prisma.newsletterSubscriber.create({
      data: { email: validated.data.email },
    });

    return {
      success: true,
      message: 'Thank you for subscribing to the newsletter!',
    };
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.',
    };
  }
}

// Track Analytics
export async function trackVisitor(details: {
  device: string;
  browser: string;
  country?: string;
  city?: string;
}) {
  try {
    const headersList = await headers();
    
    // Attempt to parse location from Vercel Geolocation headers if not supplied by client
    const country = details.country || headersList.get('x-vercel-ip-country') || 'Unknown';
    const city = details.city || headersList.get('x-vercel-ip-city') || 'Unknown';

    await prisma.visitorAnalytics.create({
      data: {
        device: details.device || 'Desktop',
        browser: details.browser || 'Unknown',
        country,
        city,
      },
    });

    return { success: true };
  } catch (err) {
    // Fail silently to prevent visitor disruptions
    console.error('Analytics tracking failed:', err);
    return { success: false };
  }
}

// Track Project View
export async function trackProjectView(projectName: string) {
  try {
    const headersList = await headers();
    const visitorIP = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1';

    await prisma.projectView.create({
      data: {
        projectName,
        visitorIP: visitorIP.split(',')[0].trim(),
      },
    });

    return { success: true };
  } catch (err) {
    console.error('Project view tracking failed:', err);
    return { success: false };
  }
}

// Helper: Verify Admin Session
async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return session;
}

// Admin CMS: Delete Contact Message
export async function deleteContactMessage(id: string) {
  try {
    await verifyAdmin();
    await prisma.contact.delete({ where: { id } });
    return { success: true, message: 'Message deleted successfully.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Unauthorized' };
  }
}

// Admin CMS: Create Building In Public Update
export async function addBuildingInPublic(data: {
  focus: string;
  streak: number;
  experiment: string;
  win: string;
  lesson: string;
}) {
  try {
    await verifyAdmin();
    const update = await prisma.buildingInPublicUpdate.create({
      data: {
        focus: data.focus,
        streak: Number(data.streak),
        experiment: data.experiment,
        win: data.win,
        lesson: data.lesson,
      },
    });
    return { success: true, data: update };
  } catch (err: any) {
    return { success: false, message: err.message || 'Unauthorized' };
  }
}

// Admin CMS: Delete Building In Public Update
export async function deleteBuildingInPublic(id: string) {
  try {
    await verifyAdmin();
    await prisma.buildingInPublicUpdate.delete({ where: { id } });
    return { success: true, message: 'Update deleted successfully.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Unauthorized' };
  }
}

// Admin CMS: Create LinkedIn Post
export async function addLinkedInPost(data: {
  title: string;
  category: string;
  thumbnail?: string;
  postUrl: string;
  publishedAt?: string;
}) {
  try {
    await verifyAdmin();
    const post = await prisma.linkedInPost.create({
      data: {
        title: data.title,
        category: data.category,
        thumbnail: data.thumbnail || null,
        postUrl: data.postUrl,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });
    return { success: true, data: post };
  } catch (err: any) {
    return { success: false, message: err.message || 'Unauthorized' };
  }
}

// Admin CMS: Delete LinkedIn Post
export async function deleteLinkedInPost(id: string) {
  try {
    await verifyAdmin();
    await prisma.linkedInPost.delete({ where: { id } });
    return { success: true, message: 'Post deleted successfully.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Unauthorized' };
  }
}
