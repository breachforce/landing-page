"use client"

import { useState } from "react"
import Image from "./ui/SafeImage"
import { ExternalLink, Award, Handshake, Building2 } from "lucide-react"

interface Partner {
  name: string
  logo: string
  website: string
  type: "sponsor" | "partner" | "supporter"
  description?: string // Made optional with ?
}

const partners: Partner[] = [
  {
    name: "BreachArc",
    logo: "logos/breacharc-logo.png", // You'll need to add this logo file
    website: "https://breacharc.com/",
    type: "supporter", // This will show as "Gold Sponsor"
    // description: "Advanced Cybersecurity Solutions & Training",
  },
  // To add new partners in the future, simply add objects here with:
  // - name: Company name
  // - logo: Path to logo file in /public folder
  // - website: Company website URL
  // - type: "sponsor" (Gold Sponsor), "partner" (Strategic Partner), or "supporter" (Community Supporter)
  // - description: Brief company description
]

const typeConfig = {
  sponsor: {
    icon: Award,
    label: "Gold Sponsor",
    color: "text-yellow-200",
    bgColor: "bg-yellow-600/30",
    borderColor: "border-yellow-500/40",
  },
  partner: {
    icon: Handshake,
    label: "Strategic Partner",
    color: "text-blue-200",
    bgColor: "bg-blue-600/30",
    borderColor: "border-blue-500/40",
  },
  supporter: {
    icon: Building2,
    label: "Community Supporter",
    color: "text-green-200",
    bgColor: "bg-green-600/30",
    borderColor: "border-green-500/40",
  },
}

export default function PartnersSection() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null)

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#0f0f10" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/80 border border-gray-600/50 rounded-full text-gray-200 text-sm font-semibold mb-8 backdrop-blur-sm">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <Handshake className="w-4 h-4" />
            Trusted Collaborations
          </div>
          <h2 className="mb-6 tracking-tight leading-tight" style={{
            fontFamily: "'Fira Mono', monospace",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "500",
            color: "white"
          }}>Our Partners</h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            {/* Collaborating with industry leaders to deliver world-class cybersecurity education and experiences */}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
            {partners.map((partner, index) => {
              const config = typeConfig[partner.type]
              const IconComponent = config.icon

              return (
                <div
                  key={partner.name}
                  onMouseEnter={() => setHoveredPartner(partner.name)}
                  onMouseLeave={() => setHoveredPartner(null)}
                  className="group relative bg-gray-800/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:bg-gray-700/90 hover:border-gray-500/50"
                >
                  <div className="p-8 relative z-10">
                    {/* Partner Type Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.bgColor} ${config.borderColor} border rounded-full text-xs font-semibold ${config.color}`}
                      >
                        <IconComponent className="w-3 h-3" />
                        {config.label}
                      </div>
                    </div>

                    {/* Logo Container */}
                    <div className="relative h-24 mt-4 mb-6 flex items-center justify-center">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} logo`}
                        width={160}
                        height={60}
                        className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                      />
                    </div>

                    {/* Partner Info */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl group-hover:text-blue-300 transition-all duration-300" style={{
                        fontFamily: "'Fira Sans', sans-serif",
                        color: "white"
                      }}>
                        {partner.name}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed" style={{
                        fontFamily: "'Fira Sans', sans-serif"
                      }}>{partner.description}</p>
                    </div>

                    {/* Visit Website Link */}
                    <div className="mt-6 pt-6 border-t border-gray-600/50">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-200 hover:text-white text-sm font-medium transition-all duration-300 group-hover:text-blue-300"
                      >
                        <span style={{ fontFamily: "'Fira Sans', sans-serif" }}>Visit Website</span>
                        <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0" />
                  </div>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 animate-pulse" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center gap-6 px-12 py-10 bg-gray-800/90 backdrop-blur-xl border border-gray-600/50 rounded-3xl">
            <div className="flex items-center gap-3 text-gray-200">
              <Building2 className="w-6 h-6" />
              <span className="text-lg font-semibold" style={{ fontFamily: "'Fira Sans', sans-serif" }}>Interested in Partnership?</span>
            </div>
            <p className="text-gray-300 text-center max-w-md leading-relaxed" style={{ fontFamily: "'Fira Sans', sans-serif" }}>
              Join our growing network of cybersecurity leaders and help shape the future of security education.
            </p>
            <a
              href="https://opencollective.com/breachforce"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/25 inline-block"
              style={{ fontFamily: "'Fira Sans', sans-serif" }}
            >
              Become a Partner
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
