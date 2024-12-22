import { useRef, useState } from 'react'

type UseImageUploadProps = {
  onUpload: (file: File) => void
  maxFileSizeMB?: number // Tamanho máximo de cada arquivo em MB
  onError?: (error: string) => void // Callback para lidar com erros
}

export function useImageUpload({
  onUpload,
  maxFileSizeMB = 5, // Padrão: 5MB
  onError,
}: UseImageUploadProps) {
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement

    if (input.files?.length) {
      const file = input.files[0]

      if (!file.type.startsWith('image/')) {
        onError?.(`O arquivo ${file.name} não é uma imagem válida.`)

        return
      }

      const fileSizeMB = file.size / (1024 * 1024)

      if (fileSizeMB > maxFileSizeMB) {
        onError?.(
          `O arquivo ${file.name} excede o tamanho máximo permitido de ${maxFileSizeMB}MB.`,
        )

        return
      }

      // Gerar URL para pré-visualização
      const previewUrl = URL.createObjectURL(file)

      setPreviewUrl(previewUrl)

      onUpload(file)

      input.value = '' // Reseta o valor do input para permitir novo upload com os mesmos arquivos
    }
  }

  // Função para abrir o seletor de arquivos
  const imageUploadTrigger = () => {
    if (!inputFileRef.current) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*' // Aceitar apenas imagens
      input.multiple = false
      input.style.display = 'none'
      input.addEventListener('change', handleChange)
      document.body.appendChild(input)
      inputFileRef.current = input
    }

    inputFileRef.current.click()
  }

  const clearPreviews = () => {
    setPreviewUrl('')
    // Limpa URLs geradas para liberar memória
    for (const url of previewUrl) {
      URL.revokeObjectURL(url)
    }
  }

  return { imageUploadTrigger, previewUrl, clearPreviews }
}
