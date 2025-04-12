import { describe, test, expect,vi } from 'vitest';
import { getUserByEmail, createResetToken } from '@repo/prisma-db/repo/user';
import { sendResetEmail } from '@repo/email/resend/index';
import { ForgotPassword } from '@repo/auth/better-auth/_actions/forgot-password';

import dotenv from "dotenv";
dotenv.config();

// Mock external functions
vi.mock('@repo/prisma-db/repo/user', () => ({
  getUserByEmail: vi.fn(),
  createResetToken: vi.fn(),
}));

vi.mock('@repo/email/resend/index', () => ({
  sendResetEmail: vi.fn(),
}));

describe.concurrent('ForgotPassword', () => {
  test('returns error when email does not exist', async () => {
    
    (getUserByEmail as any).mockResolvedValue(null);

    const response = await ForgotPassword('nonexistent@example.com');

    expect(response).toEqual({ error: "Email doesn't exist!" });
    expect(getUserByEmail).toHaveBeenCalledWith('nonexistent@example.com');
  });

  test('creates reset token and sends email when email exists', async () => {
    (getUserByEmail as any).mockResolvedValue({ id: '123', email: 'user@example.com' });
    (createResetToken as any).mockResolvedValue({ token: 'reset123' });

    const response = await ForgotPassword('user@example.com');

    expect(createResetToken).toHaveBeenCalledWith('user@example.com');
    expect(sendResetEmail).toHaveBeenCalledWith('user@example.com', 'reset123');
    expect(response).toEqual({ success: 'Email with Reset Token sent!' });
  });
});
