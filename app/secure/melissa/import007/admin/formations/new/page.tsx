"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Calendar, Upload, X } from "lucide-react"
import Link from "next/link"

interface FormationFormData {
  title: string
  type: 'online' | 'presential'
  location?: string
  date: string
  time: string
  price: string
  currency: string
  promoCode?: string
  discount?: string
  maxParticipants: string
  imageUrl?: string
}

export default function NewFormationPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<FormationFormData>({
    title: '',
    type: 'online',
    location: '',
    date: '',
    time: '',
    price: '',
    currency: '€',
    promoCode: '',
    discount: '',
    maxParticipants: '',
    imageUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormationFormData>>({})
  const [imagePreview, setImagePreview] = useState<string>('')

  const validateForm = () => {
    const newErrors: Partial<FormationFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire'
    }

    if (!formData.date) {
      newErrors.date = 'La date est obligatoire'
    }

    if (!formData.time.trim()) {
      newErrors.time = 'L\'heure est obligatoire'
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0'
    }

    if (!formData.maxParticipants || parseInt(formData.maxParticipants) <= 0) {
      newErrors.maxParticipants = 'Le nombre maximum de participants doit être supérieur à 0'
    }

    if (formData.type === 'presential' && !formData.location?.trim()) {
      newErrors.location = 'Le lieu est obligatoire pour les formations présentielles'
    }

    if (formData.discount && (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100)) {
      newErrors.discount = 'La remise doit être entre 0 et 100%'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validation du fichier
    if (file.size > 5 * 1024 * 1024) { // 5MB max
      alert('L\'image ne doit pas dépasser 5MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide')
      return
    }

    setUploading(true)

    try {
      // Créer un nom de fichier unique
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `formations/${fileName}`

      // Upload vers Supabase Storage via API route
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('filePath', filePath)

      const uploadResponse = await fetch('/api/admin/storage/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (!uploadResponse.ok) {
        throw new Error('Erreur lors de l\'upload')
      }

      const { publicUrl } = await uploadResponse.json()

      setFormData(prev => ({ ...prev, imageUrl: publicUrl }))
      setImagePreview(publicUrl)

    } catch (error) {
      console.error('Erreur lors de l\'upload:', error)
      alert('Erreur lors de l\'upload de l\'image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!formData.imageUrl) return

    try {
      // Extraire le nom du fichier de l'URL
      const fileName = formData.imageUrl.split('/').pop()
      if (fileName) {
        await fetch('/api/admin/storage/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: `formations/${fileName}` })
        })
      }

      setFormData(prev => ({ ...prev, imageUrl: '' }))
      setImagePreview('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/formations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          discount: formData.discount ? parseFloat(formData.discount) : undefined,
          maxParticipants: parseInt(formData.maxParticipants)
        })
      })

      if (response.ok) {
        router.push('/secure/melissa/import007/admin/formations')
      } else {
        const errorData = await response.json()
        alert('Erreur lors de la création: ' + errorData.error)
      }
    } catch (error) {
      alert('Erreur lors de la création de la formation')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Effacer l'erreur quand l'utilisateur corrige le champ
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/secure/melissa/import007/admin/formations">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Créer une Formation</h1>
          <p className="text-gray-600 mt-2">Programmez une nouvelle formation Alibaba</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Informations de la formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Titre */}
                  <div className="lg:col-span-2">
                    <Label htmlFor="title">Titre de la formation *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Formation sourcing Alibaba - Niveau débutant"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  {/* Type de formation */}
                  <div>
                    <Label htmlFor="type">Type de formation *</Label>
                    <Select value={formData.type} onValueChange={(value: 'online' | 'presential') => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">En ligne</SelectItem>
                        <SelectItem value="presential">Présentiel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Lieu (conditionnel) */}
                  {formData.type === 'presential' && (
                    <div>
                      <Label htmlFor="location">Lieu *</Label>
                      <Input
                        id="location"
                        placeholder="Ex: Paris, Centre de formation"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={errors.location ? 'border-red-500' : ''}
                      />
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>
                  )}

                  {/* Date */}
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className={errors.date ? 'border-red-500' : ''}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>

                  {/* Heure */}
                  <div>
                    <Label htmlFor="time">Heure *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className={errors.time ? 'border-red-500' : ''}
                    />
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>

                  {/* Prix */}
                  <div>
                    <Label htmlFor="price">Prix *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="299.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>

                  {/* Devise */}
                  <div>
                    <Label htmlFor="currency">Devise *</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la devise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="€">Euro (€)</SelectItem>
                        <SelectItem value="$">Dollar ($)</SelectItem>
                        <SelectItem value="FCFA">FCFA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Nombre maximum de participants */}
                  <div>
                    <Label htmlFor="maxParticipants">Nombre maximum de participants *</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      placeholder="20"
                      value={formData.maxParticipants}
                      onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                      className={errors.maxParticipants ? 'border-red-500' : ''}
                    />
                    {errors.maxParticipants && <p className="text-red-500 text-sm mt-1">{errors.maxParticipants}</p>}
                  </div>

                  {/* Code promo (optionnel) */}
                  <div>
                    <Label htmlFor="promoCode">Code promo (optionnel)</Label>
                    <Input
                      id="promoCode"
                      placeholder="ALIBABA2024"
                      value={formData.promoCode}
                      onChange={(e) => handleInputChange('promoCode', e.target.value)}
                    />
                  </div>

                  {/* Remise (optionnel) */}
                  <div>
                    <Label htmlFor="discount">Remise (%) (optionnel)</Label>
                    <Input
                      id="discount"
                      type="number"
                      step="0.01"
                      placeholder="20"
                      value={formData.discount}
                      onChange={(e) => handleInputChange('discount', e.target.value)}
                      className={errors.discount ? 'border-red-500' : ''}
                    />
                    {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button variant="outline" asChild>
                    <Link href="/secure/melissa/import007/admin/formations">
                      Annuler
                    </Link>
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      'Création en cours...'
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Créer la formation
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Section d'upload d'image */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Image de la formation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Aperçu de l'image"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Supprimer l'image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Ajoutez une image pour votre formation
                      </p>
                      <p className="text-xs text-gray-500">
                        Formats acceptés: JPG, PNG, WebP (max 5MB)
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? 'Upload en cours...' : 'Sélectionner une image'}
                    </Button>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}