'use client'

import { useState, useEffect } from 'react'
import { projectsApi } from '@/lib/api'

export function useProjects(filters = {}) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [filters])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await projectsApi.getAll(filters)
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const refreshProjects = () => {
    fetchProjects()
  }

  return { projects, loading, error, refreshProjects }
}

export function useProject(id) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    try {
      setLoading(true)
      const data = await projectsApi.getById(id)
      setProject(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const refreshProject = () => {
    fetchProject()
  }

  return { project, loading, error, refreshProject }
}

