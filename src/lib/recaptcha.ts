/**
 * Utility for Google reCAPTCHA v3 token generation
 */
export async function getRecaptchaToken(action: string = 'submit'): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lf9R2ktAAAAAFR1Q-8N_bO9F-R6u2W35yuJyoC7';
  
  if (typeof window === 'undefined' || !(window as any).grecaptcha) {
    return 'mock-recaptcha-token';
  }

  return new Promise((resolve) => {
    (window as any).grecaptcha.ready(async () => {
      try {
        const token = await (window as any).grecaptcha.execute(siteKey, { action });
        resolve(token || 'mock-recaptcha-token');
      } catch (err) {
        console.warn('reCAPTCHA execution fallback:', err);
        resolve('mock-recaptcha-token');
      }
    });
  });
}
