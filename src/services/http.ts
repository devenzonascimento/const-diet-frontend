import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const baseApiUrl = 'http://192.168.0.109:3333'

export const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

export interface ResponseMessage {
  message: string
}

const handleAxiousError = (error: any) => {
  if (error.toString && error.toString() === 'Cancel') {
    return
  }
  if (!window.navigator.onLine) {
    // toast.error(
    //   i18next
    //     .t('You are not connected to the internet. Please try again later.')
    //     .toString(),
    //   { toastId: 'offline' },
    // )
    return
  }
  if (!error.response) {
    // toast.error(
    //   i18next
    //     .t(
    //       'Could not access servers. Please check your internet connection, or contact our support.',
    //     )
    //     .toString(),
    //   { toastId: 'server-offline' },
    // )
  }
}

interface Methods {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  post<R, T>(
    url: string,
    data?: R,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>
  put<R, T>(
    url: string,
    data?: R,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>
}

export const http: Methods = {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.get(url, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: browserStore.getByKey('token'),
        },
      })
    } catch (error) {
      handleAxiousError(error)
      throw error
    }
  },
  async post<R, T>(
    url: string,
    data?: R,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.post(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: browserStore.getByKey('token'),
        },
      })
    } catch (error) {
      handleAxiousError(error)
      throw error
    }
  },
  async put<R, T>(
    url: string,
    data?: R,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.put(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: browserStore.getByKey('token'),
        },
      })
    } catch (error) {
      handleAxiousError(error)
      throw error
    }
  },
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await axiosInstance.delete(url, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: browserStore.getByKey('token'),
        },
      })
    } catch (error) {
      handleAxiousError(error)
      throw error
    }
  },
}

const browserStore = {
  getByKey: (key: string) => localStorage.getItem(key),
  setByKey: (key: string, value: string) => localStorage.setItem(key, value),
  removeByKey: (key: string) => localStorage.removeItem(key),
}
