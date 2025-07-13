import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test query
    const pengaduanCount = await prisma.pengaduan.count()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      pengaduanCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 