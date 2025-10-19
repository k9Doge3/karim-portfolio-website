export interface EspoCRMContact {
  id: string
  name: string
  emailAddress?: string
  phoneNumber?: string
  accountName?: string
  createdAt: string
  modifiedAt: string
}

export interface EspoCRMLead {
  id: string
  name: string
  status: string
  emailAddress?: string
  phoneNumber?: string
  source?: string
  createdAt: string
  modifiedAt: string
}

export class EspoCRMClient {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "")
    this.apiKey = apiKey
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api/v1/${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`EspoCRM API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Contacts
  async getContacts(params?: {
    offset?: number
    maxSize?: number
    orderBy?: string
    order?: "asc" | "desc"
  }): Promise<{ list: EspoCRMContact[]; total: number }> {
    const searchParams = new URLSearchParams()
    if (params?.offset) searchParams.set("offset", params.offset.toString())
    if (params?.maxSize) searchParams.set("maxSize", params.maxSize.toString())
    if (params?.orderBy) searchParams.set("orderBy", params.orderBy)
    if (params?.order) searchParams.set("order", params.order)

    return this.request(`Contact?${searchParams.toString()}`)
  }

  async getContact(id: string): Promise<EspoCRMContact> {
    return this.request(`Contact/${id}`)
  }

  async createContact(data: Partial<EspoCRMContact>): Promise<EspoCRMContact> {
    return this.request("Contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateContact(id: string, data: Partial<EspoCRMContact>): Promise<EspoCRMContact> {
    return this.request(`Contact/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteContact(id: string): Promise<void> {
    return this.request(`Contact/${id}`, {
      method: "DELETE",
    })
  }

  // Leads
  async getLeads(params?: {
    offset?: number
    maxSize?: number
    orderBy?: string
    order?: "asc" | "desc"
  }): Promise<{ list: EspoCRMLead[]; total: number }> {
    const searchParams = new URLSearchParams()
    if (params?.offset) searchParams.set("offset", params.offset.toString())
    if (params?.maxSize) searchParams.set("maxSize", params.maxSize.toString())
    if (params?.orderBy) searchParams.set("orderBy", params.orderBy)
    if (params?.order) searchParams.set("order", params.order)

    return this.request(`Lead?${searchParams.toString()}`)
  }

  async getLead(id: string): Promise<EspoCRMLead> {
    return this.request(`Lead/${id}`)
  }

  async createLead(data: Partial<EspoCRMLead>): Promise<EspoCRMLead> {
    return this.request("Lead", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateLead(id: string, data: Partial<EspoCRMLead>): Promise<EspoCRMLead> {
    return this.request(`Lead/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteLead(id: string): Promise<void> {
    return this.request(`Lead/${id}`, {
      method: "DELETE",
    })
  }
}

export function createEspoCRMClient() {
  const baseUrl = process.env.ESPOCRM_BASE_URL
  const apiKey = process.env.ESPOCRM_API_KEY

  if (!baseUrl || !apiKey) {
    throw new Error(
      "Missing EspoCRM configuration. Please set ESPOCRM_BASE_URL and ESPOCRM_API_KEY environment variables.",
    )
  }

  return new EspoCRMClient(baseUrl, apiKey)
}
