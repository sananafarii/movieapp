import { useEffect, useMemo, useState } from 'react'
import TitleBar from '../components/layout/TitleBar'
import { Flame, Mic, Captions } from 'lucide-react'

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
      <TitleBar titleFa={data.title_fa} titleEn={data.title_en || data.title} year={data.year} rating={avgRating || 4.5} votes={(data.ratings || []).length} />
      <div className="page">
        <div className="grid">
          {/* Episodes list on the left */}
          <aside className="sidebar info-panel">
            <div className="episodes">
              {(data.episodes || []).map((ep, i) => (
                <div className="episode info-item" key={i}>
                  {/* جای عکس - خودتان ایمپورت کنید */}
                  <img src={ep.poster || data.poster} alt={ep.title} />
                  <div className="meta">
                    <div className="title">{ep.title}</div>
                    <div className="num">فصل {ep.season || 1} • قسمت {ep.number || i + 1}</div>
                    <div className="badges">
                      <span className="badge badge-orange">پرطرفدار</span>
                      <span className="badge badge-blue">زیرنویس</span>
                      <span className="badge badge-green">دوبله</span>
                    </div>
                  </div>
                </div>
              ))}
              {(!data.episodes || data.episodes.length === 0) && (
                <div style={{ opacity: 0.7 }}>قسمتی موجود نیست.</div>
              )}
            </div>
          </aside>

          {/* Main video on the right */}
          <div className="main">
            <div className="movie-section" dir="rtl">
              <div className="video" style={{ marginTop: 12 }}>
                {/* <video controls src="/path/to/video.mp4" style={{ width: '100%', height: '100%' }} /> */}
                <img className="bg" src={data.cover || data.poster} alt="poster" />
                <button className="play">▶</button>
              </div>

              {/* Actions aligned to video width, from the right */}
              <div className="video-actions rtl-actions">
                <button className="btn btn-samsung">پخش تلویزیون های سامسونگ</button>
                <button className="btn btn-dark">پخش تلویزیون های قدیمی</button>
                <button className="btn btn-dark">پخش تلویزیون های قدیمی</button>
              </div>

              <div className="problem-row">
                <span className="problem-icon">❗</span>
                <span className="problem-text">حین تماشا با مشکل جدی رو به رو شدید ؟</span>
                <a href="#" className="problem-link"><strong>اعلام مشکل</strong></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage
