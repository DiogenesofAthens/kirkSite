import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center pb-6 pt-28">
      <h1 className="mb-3 font-serif text-[44px] font-normal leading-none tracking-tight text-foreground">404</h1>
      <p className="mb-8 text-[17px] text-muted-foreground">This page doesn’t exist.</p>
      <p className="text-[15px]">
        <Link href="/" className="link">
          Return home
        </Link>
      </p>
    </div>
  )
}
