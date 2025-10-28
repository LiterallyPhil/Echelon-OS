import api from '@forge/api';

export async function getProductContext(): Promise<{ accountId?: string }> {
  try {
    // In a real Forge environment, api.context() provides accountId and more
    const ctx = await (api as any).context?.();
    return { accountId: ctx?.accountId };
  } catch (_err) {
    return {};
  }
}


