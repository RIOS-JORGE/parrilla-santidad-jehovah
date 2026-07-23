import { useState, useRef, type ChangeEvent } from 'react'
import { supabase } from '../../lib/supabase'

interface AdminImageUploadProps {
  bucket?: string
  currentUrl?: string | null
  onUpload: (url: string | null) => void
}

export function AdminImageUpload({
  bucket = 'product-images',
  currentUrl,
  onUpload,
}: AdminImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const ext = file.name.split('.').pop() ?? 'jpg'
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (error) {
      console.error('Upload error:', error.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    setPreview(urlData.publicUrl)
    onUpload(urlData.publicUrl)
    setUploading(false)
  }

  async function handleRemove() {
    if (preview) {
      // Extract path from URL if possible (best effort)
      const path = preview.split('/').pop()
      if (path) {
        await supabase.storage.from(bucket).remove([path])
      }
    }
    setPreview(null)
    onUpload(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex items-center gap-4">
      {preview ? (
        <div className="relative w-20 h-20">
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="w-20 h-20 bg-brand-muted flex items-center justify-center text-brand-text/30 text-xs">
          Foto
        </div>
      )}

      <label className="cursor-pointer bg-brand-muted px-3 py-1.5 text-sm text-brand-text/70 hover:text-brand-text transition-colors">
        {uploading ? 'Subiendo...' : 'Subir imagen'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  )
}
