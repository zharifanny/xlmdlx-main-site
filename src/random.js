
      function randomizeImageSrc() {
        const images = document.querySelectorAll(".draggable img");

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
