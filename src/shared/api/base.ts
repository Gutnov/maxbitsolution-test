interface RequestOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
}
  
class ApiClient {
  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { headers = {}, timeoutMs = 7000 } = options

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    let response: Response
    try {
      response = await fetch(url, {
        method: 'GET',
        headers,
        signal: controller.signal
      })
    } catch (err: unknown) {
      clearTimeout(timeout)
      if (err && typeof err === 'object' && 'name' in err && (err as { name: string }).name === 'AbortError') {
        throw new Error('TIMEOUT')
      }
      throw err
    }
    clearTimeout(timeout)
    
    if (response.status === 500) {
      throw new Error('SERVER_ERROR')
    }
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
  
    return response.json()
  }
}
  
export const apiClient = new ApiClient()