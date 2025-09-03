const VideoControls = () => {
  return (
    <div className="video-controls">
      <div className="controls-top">
        <div className="problem-section">
          <a href="#" className="problem-link">
            <span className="problem-link-text">اعلام کنید</span>
            <span className="problem-link-icon">‹</span>
          </a>
          <span className="problem-text">حین تماشا با مشکلی رو به رو شدید؟</span>
        </div>
        
        <div className="player-buttons">
          <button className="btn btn-dark">پلیر تلوزیون های قدیمی</button>
          <button className="btn btn-dark">پلیر تلوزیون های قدیمی</button>
          <button className="btn btn-samsung">پلیر تلوزیون های سامسونگ</button>
        </div>
      </div>

      <div className="warning-section">
        <div className="warning-bar">
          <button className="subscription-btn">خرید اشتراک</button>
          <span className="warning-text">پیش از شروع تماشای آنلاین وی پی ان خود را خاموش کنید</span>
          <div className="warning-icon-box">
            <span className="warning-icon">⚠️</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoControls
