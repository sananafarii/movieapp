import { useEffect, useMemo, useState } from 'react'
import TitleBar from '../components/layout/TitleBar'
import VideoControls from '../components/layout/VideoControls'
import { Flame, Captions, Mic } from 'lucide-react'
import episode1 from '../assets/images/episode1.png'
import episode2 from '../assets/images/episode2.png'
import episode3 from '../assets/images/episode3.png'
import episode4 from '../assets/images/episode4.png'
import videoImg from '../assets/images/Video.png'

const PlayerPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    const run = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://ylnk.site/test/?action=info&id=2501')
        if (!res.ok) throw new Error('Network error')
        const json = await res.json()
        if (!ignore) setData(json)
      } catch (e) {
        if (!ignore) setError(e.message || 'Error')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    run()
    return () => { ignore = true }
  }, [])

  const avgRating = useMemo(() => {
    const nums = (data?.ratings || []).map(r => Number(r.value)).filter(n => !Number.isNaN(n))
    if (nums.length === 0) return null
    return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1)
  }, [data])

  if (loading) return <div className="page">در حال بارگذاری...</div>
  if (error) return <div className="page">خطا: {error}</div>
  if (!data) return null

  return (
    <div>
      <TitleBar titleFa="فیلم EL CAMINO" titleEn="فیلم ال کامینو" year={data.year} rating={avgRating || 4.5} votes={(data.ratings || []).length} />
      <div className="page">
        <div className="grid">
          {/* Episodes list on the left */}
          <aside className="sidebar info-panel">
            <div className="episodes">
              {(data.episodes || []).map((ep, i) => {
             
                const episodeImages = [
                  episode1, 
                  episode2,   
                  episode3,  
                  episode4,
                ]
                
                const episodeTitles = [
                  "فیلم EL CAMINO",
                  "فیلم Love Lies Bleeding 2024", 
                  "فیلم Love Lies Bleeding 2024",
                  "متری شیش و نیم"
                ]
                
                return (
                  <div className="episode info-item" key={i}>
                    <img src={episodeImages[i] || ep.poster || data.poster} alt={episodeTitles[i]} />
                    <div className="meta">
                      <div className="title">{episodeTitles[i]}</div>
                      <div className="num">
                        <span>فصل {ep.season || 1}</span>
                        <span>•</span>
                        <span>قسمت {ep.number || i + 1}</span>
                      </div>
                      <div className="badges">
                        <span className="badge badge-orange"><Flame size={14} /></span>
                        <span className="badge badge-blue"><Captions size={14} /> زیرنویس</span>
                        <span className="badge badge-green"><Mic size={14} /> دوبله</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              {(!data.episodes || data.episodes.length === 0) && (
                <div style={{ opacity: 0.7 }}>قسمتی موجود نیست.</div>
              )}
            </div>
          </aside>

          {/* Main video on the right */}
          <div className="main">
            <div className="movie-section">
              <div className="video" style={{ marginTop: 12 }}>
                <img className="bg" src={videoImg} alt="VPN Video" />
                <button className="play">▶</button>
              </div>
            </div>
            <VideoControls />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage
