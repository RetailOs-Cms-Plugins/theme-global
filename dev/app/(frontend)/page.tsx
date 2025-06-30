export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4 text-lg">
        The design system is now available at{' '}
        <a className="text-blue-600 underline" href="/design-system">
          /design-system
        </a>
        .
      </p>
    </main>
  )
}
