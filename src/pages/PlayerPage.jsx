import { useEffect, useMemo, useState } from 'react'
import TitleBar from '../components/layout/TitleBar'

const Star = ({ filled, onClick }) => (
  <button onClick={onClick} className={`star ${filled ? 'filled' : ''}`} aria-label="rate">★</button>
)

const PlayerPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userRating, setUserRating] = useState(0)

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
      <TitleBar titleFa={data.title_fa} titleEn={data.title_en || data.title} year={data.year} rating={avgRating || 4.5} votes={(data.ratings || []).length} />
      <div className="page">
        <div className="grid">
          {/* Main */}
          <div className="main">
            <div>
              <div className="title-en">{data.title_en || data.title || ''}</div>
              <div className="title-fa">{data.title_fa} {data.year ? `• ${data.year}` : ''}</div>
            </div>

            <div className="chips" style={{ marginTop: 12 }}>
              {(data.ratings || []).map((r, idx) => (
                <div className="chip" key={idx}>{r.source}: <strong style={{ marginRight: 6 }}>{r.value}</strong></div>
              ))}
              {avgRating && (
                <div className="chip">میانگین: <strong style={{ marginRight: 6 }}>{avgRating}</strong></div>
              )}
            </div>

            <div className="video" style={{ marginTop: 12 }}>
              <img className="bg" src={data.cover || data.poster} alt="poster" />
              <button className="play">▶</button>
            </div>

            <div className="user-rating" style={{ marginTop: 12 }}>
              <span>امتیاز شما:</span>
              {[1,2,3,4,5].map(n => (
                <Star key={n} filled={n <= userRating} onClick={() => setUserRating(n)} />
              ))}
              {userRating > 0 && <span style={{ opacity: 0.7 }}> {userRating}/5</span>}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <h3 style={{ marginTop: 0 }}>قسمت‌ها</h3>
            <div className="episodes">
              {(data.episodes || []).map((ep, i) => (
                <div className="episode" key={i}>
                  <img src={ep.poster || data.poster} alt={ep.title} />
                  <div className="meta">
                    <div className="title">{ep.title}</div>
                    {ep.number && <div className="num">قسمت {ep.number}</div>}
                  </div>
                </div>
              ))}
              {(!data.episodes || data.episodes.length === 0) && (
                <div style={{ opacity: 0.7 }}>قسمتی موجود نیست.</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage
