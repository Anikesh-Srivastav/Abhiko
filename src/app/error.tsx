'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-6 text-2xl font-headline font-bold">Something went wrong!</h2>
        <p className="mt-2 text-muted-foreground">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
