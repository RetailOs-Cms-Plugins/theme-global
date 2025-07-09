import BrandGrid from './BrandGrid'
import FunkyGallery from './FunkyGallery'
import PromoSection from './PromoSection'

export default function Page() {
  return (
    <div className="flex flex-col items-center pt-10 h-screen">
      <h1 className="text-4xl font-bold">Blocks</h1>
      <p className="text-lg">This is the blocks page.</p>
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <PromoSection />
        <BrandGrid />
        <FunkyGallery />
      </section>
    </div>
  )
}
