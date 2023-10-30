import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location

    // Just a test scenario sending it to a path on my (ANDREW) PC once put in the buffer I'm pretty sure we can do anything with it:
    // Upload to S3
    // Or idk about just passing it straight to Rekognition lambda
    const path = join('/Users/acata/Downloads/', 'tmp', file.name)
    await writeFile(path, buffer)
    console.log('open ${path} to see the uploaded file')
    
    return NextResponse.json({ success: true })
}