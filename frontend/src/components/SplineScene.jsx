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
        style={{ pointerEvents: 'none' }}  // allows clicking through to UI
      />
    </div>
  )
}