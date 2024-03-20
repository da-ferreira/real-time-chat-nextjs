'use server';

import { cookies } from 'next/headers';
import { UserLoginResponse } from '@/@types/users';

export async function setSessionData(sessionData: UserLoginResponse) {
  cookies().set('session', JSON.stringify(sessionData), {
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getSessionData(): Promise<UserLoginResponse | null> {
  const session = cookies().get('session')?.value;
  return session ? JSON.parse(session) : null;
}

export async function removeSessionData() {
  cookies().delete('session');
}
