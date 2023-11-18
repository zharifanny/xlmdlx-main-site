document.addEventListener("DOMContentLoaded", function() {
    // An array of video sources you want to randomize
    const videoSources = [
      "img/kawah.mp4",
      "img/agenta.mp4",
      // Add more video sources as needed
    ];
  
    // Select the video elements
    const videos = document.querySelectorAll("video");
  
    // Function to set a random source for a video
    function setRandomSource(video) {
      const randomIndex = Math.floor(Math.random() * videoSources.length);
      video.src = videoSources[randomIndex];
      videoSources.splice(randomIndex, 1); // Remove the used source from the array
    }
  
    // Set a random source for each video if it hasn't been changed before
    videos.forEach(video => {
      if (!video.classList.contains("source-randomized")) {
        setRandomSource(video);
        video.classList.add("source-randomized"); // Add a class to mark this video as changed
      }
    });
  });
  