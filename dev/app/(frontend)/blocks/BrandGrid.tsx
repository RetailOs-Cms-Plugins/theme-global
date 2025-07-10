import React from 'react'

const brands = [
  { alt: 'Peg Perego', src: '/logos/peg-perego.png' },
  { alt: 'Globber', src: '/logos/globber.png' },
  { alt: 'Minene', src: '/logos/minene.png' },
  { alt: 'Viga', src: '/logos/viga.png' },
  { alt: 'Britax', src: '/logos/britax.png' },
  { alt: 'Graco', src: '/logos/graco.png' },
  { alt: 'Chicco', src: '/logos/chicco.png' },
  { alt: 'Laura', src: '/logos/laura.png' },
  { alt: 'Yookidoo', src: '/logos/yookidoo.png' },
  { alt: 'Segal Baby', src: '/logos/segal-baby.png' },
  { alt: 'Barbie', src: '/logos/barbie.png' },
  { alt: 'Paw Patrol', src: '/logos/paw-patrol.png' },
  { alt: 'Tender Leaf Toys', src: '/logos/tender-leaf-toys.png' },
  { alt: 'Melissa & Doug', src: '/logos/melissa-doug.png' },
  { alt: 'Winfun', src: '/logos/winfun.png' },
  { alt: 'Snuza', src: '/logos/snuza.png' },
  { alt: 'Little Tikes', src: '/logos/little-tikes.png' },
  { alt: 'Boon', src: '/logos/boon.png' },
]

const BrandGrid: React.FC = () => (
  <div className="w-full py-8">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
      {brands.map((brand, idx) => (
        <div
          className="flex items-center justify-center w-32 h-16 sm:w-36 sm:h-20 md:w-40 md:h-24 bg-white rounded shadow-sm"
          key={idx}
        >
          <img
            alt={brand.alt}
            className="object-contain max-h-full max-w-full"
            loading="lazy"
            src={brand.src}
          />
        </div>
      ))}
    </div>
  </div>
)

export default BrandGrid
