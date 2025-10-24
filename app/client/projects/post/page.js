'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Upload, X, FileText, Calendar, DollarSign } from 'lucide-react'

export default function PostProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Details, 2: Requirements, 3: Review
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    requirements: '',
    skills: '',
    budgetMin: '',
    budgetMax: '',
    duration: '',
    deadline: '',
    attachments: [],
  })
  const [errors, setErrors] = useState({})

  const categories = [
    { value: 'design', label: 'Design & Creative' },
    { value: 'development', label: 'Web & Mobile Development' },
    { value: 'writing', label: 'Writing & Translation' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'video', label: 'Video & Animation' },
    { value: 'data', label: 'Data Entry & Admin' },
    { value: 'other', label: 'Lainnya' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const validateStep = (currentStep) => {
    const newErrors = {}
    
    if (currentStep === 1) {
      if (!formData.title) newErrors.title = 'Judul proyek harus diisi'
      if (!formData.category) newErrors.category = 'Kategori harus dipilih'
      if (!formData.description) newErrors.description = 'Deskripsi harus diisi'
    }
    
    if (currentStep === 2) {
      if (!formData.budgetMin) newErrors.budgetMin = 'Budget minimum harus diisi'
      if (!formData.budgetMax) newErrors.budgetMax = 'Budget maximum harus diisi'
      if (!formData.duration) newErrors.duration = 'Durasi harus diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = () => {
    // TODO: Submit to API
    console.log('Submitting project:', formData)
    router.push('/client/projects?posted=true')
  }

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= num ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>
              {num}
            </div>
            {num < 3 && (
              <div className={`w-24 h-1 ${step > num ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3 px-4">
        <span className="text-sm font-medium text-neutral-700">Detail Proyek</span>
        <span className="text-sm font-medium text-neutral-700">Budget & Timeline</span>
        <span className="text-sm font-medium text-neutral-700">Review</span>
      </div>
    </div>
  )

  return (
    <ClientDashboardLayout title="Post Proyek Baru" subtitle="Temukan freelancer terbaik untuk proyek Anda">
      <div className="max-w-4xl mx-auto">
        <Card>
          {renderStepIndicator()}

          {/* Step 1: Project Details */}
          {step === 1 && (
            <div className="space-y-6">
              <Input
                label="Judul Proyek"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                placeholder="Contoh: Redesign Website Company Profile"
                required
              />

              <Select
                label="Kategori"
                name="category"
                value={formData.category}
                onChange={handleChange}
                error={errors.category}
                options={categories}
                required
              />

              <Textarea
                label="Deskripsi Proyek"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                rows={6}
                placeholder="Jelaskan detail proyek, apa yang Anda butuhkan, hasil yang diharapkan..."
                helperText="Minimal 100 karakter"
                required
              />

              <Textarea
                label="Requirements & Deliverables"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                placeholder="- Mockup design&#10;- Prototype interaktif&#10;- Source files (Figma/Adobe XD)"
                helperText="Pisahkan setiap requirement dengan enter"
              />

              <Textarea
                label="Skills yang Dibutuhkan"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={2}
                placeholder="Contoh: UI/UX Design, Figma, Adobe XD, Prototyping"
                helperText="Pisahkan dengan koma"
              />

              <div className="flex justify-end">
                <Button onClick={handleNext}>Lanjut ke Budget & Timeline</Button>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Timeline */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Budget Range <span className="text-danger-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum"
                    name="budgetMin"
                    type="number"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    error={errors.budgetMin}
                    placeholder="1000000"
                    helperText="Dalam Rupiah"
                    required
                  />
                  <Input
                    label="Maximum"
                    name="budgetMax"
                    type="number"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    error={errors.budgetMax}
                    placeholder="5000000"
                    helperText="Dalam Rupiah"
                    required
                  />
                </div>
              </div>

              <Input
                label="Estimasi Durasi"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                error={errors.duration}
                placeholder="30"
                helperText="Dalam hari"
                required
              />

              <Input
                label="Deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                helperText="Kapan proyek harus selesai?"
              />

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Lampiran (Opsional)
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    id="attachments"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="attachments" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                    <p className="text-neutral-900 font-medium mb-2">
                      <span className="text-primary-600">Klik untuk upload</span> atau drag and drop
                    </p>
                    <p className="text-sm text-neutral-500">
                      Brief, mockup, atau referensi (PDF, DOC, JPG, PNG - Max 10MB)
                    </p>
                  </label>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary-600" />
                          <span className="text-sm text-neutral-900">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-neutral-400 hover:text-danger-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>
                  Kembali
                </Button>
                <Button className="flex-1" onClick={handleNext}>
                  Lanjut ke Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Review Proyek Anda</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-primary-700 font-medium">Judul</label>
                    <p className="text-neutral-900 font-semibold">{formData.title}</p>
                  </div>

                  <div>
                    <label className="text-sm text-primary-700 font-medium">Kategori</label>
                    <p className="text-neutral-900">
                      {categories.find(c => c.value === formData.category)?.label}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-primary-700 font-medium">Deskripsi</label>
                    <p className="text-neutral-900">{formData.description}</p>
                  </div>

                  {formData.skills && (
                    <div>
                      <label className="text-sm text-primary-700 font-medium">Skills</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.skills.split(',').map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-primary-200">
                    <div>
                      <label className="text-sm text-primary-700 font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Budget
                      </label>
                      <p className="text-neutral-900 font-semibold">
                        Rp {parseInt(formData.budgetMin).toLocaleString('id-ID')} - Rp {parseInt(formData.budgetMax).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-primary-700 font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Durasi
                      </label>
                      <p className="text-neutral-900 font-semibold">{formData.duration} hari</p>
                    </div>
                    {formData.deadline && (
                      <div>
                        <label className="text-sm text-primary-700 font-medium">Deadline</label>
                        <p className="text-neutral-900 font-semibold">
                          {new Date(formData.deadline).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    )}
                  </div>

                  {formData.attachments.length > 0 && (
                    <div>
                      <label className="text-sm text-primary-700 font-medium">Lampiran</label>
                      <p className="text-neutral-900">{formData.attachments.length} file</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <h4 className="font-semibold text-warning-900 mb-2">Biaya Post Proyek</h4>
                <p className="text-sm text-warning-800 mb-3">
                  Untuk memposting proyek ini, dikenakan biaya <strong>Rp 25.000</strong>.
                  Biaya ini membantu menjaga kualitas proposal yang masuk.
                </p>
                <p className="text-xs text-warning-700">
                  💡 Biaya akan dikembalikan jika tidak ada freelancer yang apply dalam 7 hari.
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="ghost" className="flex-1" onClick={() => setStep(2)}>
                  Kembali
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  Post Proyek & Bayar Rp 25.000
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </ClientDashboardLayout>
  )
}

