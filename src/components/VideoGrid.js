"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VideoGrid;
var react_1 = require("react");
var tutorial_videos_json_1 = require("@site/docs/tutorial-videos.json");
function VideoGrid() {
    return (<div className="video-grid">
      {tutorial_videos_json_1.default.videos.map(function (video) { return (<div key={video.id} className="video-item">
          <div className="video-container" onClick={function (e) {
                var target = e.currentTarget;
                target.innerHTML = "<iframe src='https://www.youtube.com/embed/".concat(video.id, "?autoplay=1' title='").concat(video.title, "' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>");
            }}>
            <img src={"https://img.youtube.com/vi/".concat(video.id, "/maxresdefault.jpg")} alt={video.title} style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                cursor: 'pointer',
            }}/>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '68px',
                height: '48px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '12px',
            }}>
              <div style={{
                borderStyle: 'solid',
                borderWidth: '12px 0 12px 20px',
                borderColor: 'transparent transparent transparent white',
                position: 'absolute',
                top: '12px',
                left: '26px',
            }}/>
            </div>
          </div>
          <div className="video-info">
            <span className="video-title">{video.title}</span>
          </div>
        </div>); })}
    </div>);
}
