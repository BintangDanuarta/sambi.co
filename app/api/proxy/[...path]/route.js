/**
 * API Proxy Route
 * Forwards all requests to the backend API to bypass CORS issues
 */

import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sambi-be.vercel.app/api'

export async function GET(request, { params }) {
  try {
    const { path } = await params // Await params first
    const pathString = path.join('/')
    const url = new URL(request.url)
    const queryString = url.search
    
    const backendUrl = `${BACKEND_URL}/${pathString}${queryString}`
    
    const headers = new Headers()
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers.set('Authorization', authHeader)
    }
    headers.set('Content-Type', 'application/json')
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers,
    })
    
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Proxy GET Error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    const { path } = await params // Await params first
    const pathString = path.join('/')
    const backendUrl = `${BACKEND_URL}/${pathString}`
    
    const headers = new Headers()
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers.set('Authorization', authHeader)
    }
    
    const contentType = request.headers.get('content-type')
    
    let body
    
    // Handle multipart/form-data (file uploads)
    if (contentType && contentType.includes('multipart/form-data')) {
      // For file uploads, forward the FormData directly
      // Do NOT set Content-Type header - fetch will set it with boundary
      const formData = await request.formData()
      body = formData
    } else {
      // For JSON requests
      body = await request.text()
      headers.set('Content-Type', contentType || 'application/json')
    }
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body,
    })
    
    // Check if response is JSON
    const responseContentType = response.headers.get('content-type')
    if (responseContentType && responseContentType.includes('application/json')) {
      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    } else {
      // Backend returned HTML or other format (likely error)
      const text = await response.text()
      console.error('Backend returned non-JSON response:', text.substring(0, 200))
      return NextResponse.json(
        { 
          success: false, 
          message: 'Backend endpoint tidak tersedia atau terjadi error di server'
        },
        { status: response.status || 500 }
      )
    }
  } catch (error) {
    console.error('Proxy POST Error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { path } = await params // Await params first
    const pathString = path.join('/')
    const backendUrl = `${BACKEND_URL}/${pathString}`
    
    const body = await request.text()
    
    const headers = new Headers()
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers.set('Authorization', authHeader)
    }
    headers.set('Content-Type', 'application/json')
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers,
      body,
    })
    
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Proxy PUT Error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
  try {
    const { path } = await params // Await params first
    const pathString = path.join('/')
    const backendUrl = `${BACKEND_URL}/${pathString}`
    
    const body = await request.text()
    
    const headers = new Headers()
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers.set('Authorization', authHeader)
    }
    headers.set('Content-Type', 'application/json')
    
    const response = await fetch(backendUrl, {
      method: 'PATCH',
      headers,
      body,
    })
    
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Proxy PATCH Error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { path } = await params // Await params first
    const pathString = path.join('/')
    const backendUrl = `${BACKEND_URL}/${pathString}`
    
    const headers = new Headers()
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers.set('Authorization', authHeader)
    }
    
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers,
    })
    
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Proxy DELETE Error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

