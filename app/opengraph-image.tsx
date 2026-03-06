import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Cadencio | Gestão para Estúdios de Dança'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Abstract Background Elements */}
        <div 
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: '#0D7377',
            opacity: 0.1,
            borderRadius: '50%',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            background: '#45CCD1',
            opacity: 0.1,
            borderRadius: '50%',
          }}
        />

        {/* Logo Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
          }}
        >
          {/* Logo SVG-like representation */}
          <div
            style={{
              width: 160,
              height: 160,
              background: '#0D7377',
              borderRadius: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(13, 115, 119, 0.2)',
            }}
          >
             <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <polygon points="50,15 85,45 70,85 30,85 15,45" fill="white" />
              <polygon points="50,25 72,48 62,75 38,75 28,48" fill="#45CCD1" opacity="0.6" />
              <polygon points="15,45 5,35 30,40" fill="#24AEB5" opacity="0.8" />
              <polygon points="85,45 95,35 70,40" fill="#0F6266" opacity="0.8" />
            </svg>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h1
              style={{
                fontSize: 100,
                fontWeight: 800,
                color: '#1C1917',
                margin: 0,
                letterSpacing: '-0.05em',
              }}
            >
              Cadencio
            </h1>
            <p
              style={{
                fontSize: 32,
                color: '#78716C',
                margin: 0,
                fontWeight: 500,
                marginTop: 10,
              }}
            >
              Gestão para Estúdios de Dança
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            padding: '12px 24px',
            background: '#F5F5F4',
            borderRadius: 100,
            fontSize: 20,
            fontWeight: 600,
            color: '#0D7377',
          }}
        >
          <div style={{ width: 8, height: 8, background: '#24AEB5', borderRadius: '50%' }} />
          BETA GRATUITO · CADENCIO.APP
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
