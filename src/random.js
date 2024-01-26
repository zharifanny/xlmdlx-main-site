
      function randomizeImageSrc() {
        const images = document.querySelectorAll(".draggable img");

        //randomize image
        const possibleSources = [
          "img/mindhealing.webp",
          "img/pale_blue.jpg",
          "img/weak.jpg",
          "img/v.jpg",
          "img/ical99.jpg",
          "img/ayaka2022.webp",
          "img/parakanxfaishal.png",
          "img/ppt.jpeg",
          "img/w scan.jpeg",
          "img/e.gif",
          "img/26.png",
          "img/times.jpg",
          "img/eyeof.jpg",
          "img/bonfire.png",
          "img/toshiki.jpg",
          "img/kukri.png",

        ];

        images.forEach((img) => {
          const randomIndex = Math.floor(Math.random() * possibleSources.length);

          img.src = possibleSources[randomIndex];

          // Remove the used source to prevent duplication
          possibleSources.splice(randomIndex, 1);
        });
      }

      window.onload = randomizeImageSrc;


      //randomize video
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
      