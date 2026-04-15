export default function SplineScene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0
    }}>
      <iframe 
        src='https://my.spline.design/earthdayandnight-tHy5pGiHaNtmXTlxYNpelc4s/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        title="3D Earth Background"
        style={{ pointerEvents: 'none' }}
      />
      {/* Overlay to cover the Spline logo – adjusted lower and bigger */}
      <div style={{
        position: 'absolute',
        bottom: '40px',     // lower (was 10px)
        right: '15px',      // slightly more to the right
        width: '150px',     // bigger (was 100px)
        height: '50px',     // bigger (was 30px)
        backgroundColor: '#000000',
        zIndex: 2,
        pointerEvents: 'none'
      }} />
    </div>
  )
}