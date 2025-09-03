import { Save } from 'lucide-react'
import imdbLogo from '../../assets/images/image 8.png'

const QualityBadge = () => (
  <div className="qbadge">
    <div className="qbadge-top">1080</div>
    <div className="qbadge-bottom">WebDL</div>
  </div>
)

const TitleBar = ({ titleFa, titleEn, year, rating = 4.5, votes = 10, quality = '1080p - webdl', seasons = [], currentSeason = 1, currentEpisode = 1, onChangeQuality, onChangeSeason, onChangeEpisode }) => {
  return (
    <div className="titlebar" dir="rtl">
      <div className="titlebar-container">
        {/* Right: custom badge + titles */}
        <div className="titlebar-title">
          <QualityBadge />
          <div>
            <div className="title-en">{titleEn}</div>
            <div className="title-fa">{titleFa} {year ? `• ${year}` : ''}</div>
          </div>
        </div>

        {/* Center: season/episode (plain) + quality input + rating with stars */}
        <div className="titlebar-controls">
          <span className="plain-text">فصل {currentSeason} • قسمت {currentEpisode}</span>

          <div className="select-field">
            <select aria-label="quality" defaultValue={quality}>
              <option>1080p - webdl</option>
              <option>720p - webdl</option>
              <option>480p - webdl</option>
            </select>
            <span className="caret">▾</span>
          </div>

          <div className="rating rating-inline">
            <img src={imdbLogo} alt="imdb" className="rating-logo" />
            <span className="stars">★ ★ ★ ★ ☆</span>
            <span className="rating-text">{rating}</span>
          </div>
        </div>

        {/* Left: action buttons near exit button */}
        <div className="titlebar-actions" dir="ltr">
          <button className="tb-btn" aria-label="share">🔗</button>
          <button className="tb-btn" aria-label="save"><Save size={18} /></button>
        </div>
      </div>
    </div>
  )
}

export default TitleBar
