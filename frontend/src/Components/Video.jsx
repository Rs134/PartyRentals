function Video() {
    return (
      <div className="video-section">
        <div className="video1">
          <iframe
            width="1000"
            height="650"
            style={{ border: "none" }}
            src="https://www.youtube.com/embed/FRwmDoGtqYc?si=90uXwPjkLgAq7suI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }
  
  export default Video;
  