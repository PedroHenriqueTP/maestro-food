/**
 * API Client Customizado (Wrapper em volta do Fetch)
 * Injeta o cabeçalho x-tenant-id para blindagem Multi-tenant
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Em produção, isso deve vir do LocalStorage, Context, Cookies ou Session
  const mockTenantId = 'default-tenant-uuid';

  const headers = {
    'Content-Type': 'application/json',
    'x-tenant-id': mockTenantId,
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Erro na requisição');
  }

  return response.json() as Promise<T>;
}
