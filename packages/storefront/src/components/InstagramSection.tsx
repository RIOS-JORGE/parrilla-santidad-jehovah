import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../lib/constants'

export function InstagramSection() {
  return (
    <section className="bg-[#0a0a0a] text-[#f5f5f5] px-4 py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#f59e0b]">
          Seguinos en Instagram
        </h2>

        <p className="text-[#f5f5f5]/70 mb-8 text-lg">
          Enterate de nuestras promos, nuevos productos y todo lo que pasa en
          la parrilla.
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#1a1a1a] text-[#f5f5f5] font-bold px-8 py-4 hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors text-lg"
        >
          {/* Instagram SVG icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 7.5C17.5 7.22386 17.2761 7 17 7C16.7239 7 16.5 7.22386 16.5 7.5C16.5 7.77614 16.7239 8 17 8C17.2761 8 17.5 7.77614 17.5 7.5Z"
              fill="currentColor"
            />
          </svg>
          @{INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  )
}
