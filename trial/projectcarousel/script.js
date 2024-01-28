let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const totalItems = document.querySelectorAll('.carousel-item').length;

function changeSlide(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    updateCarousel();
}

function updateCarousel() {
    const translateValue = -currentIndex * 100 + '%';
    carousel.style.transform = 'translateX(' + translateValue + ')';
}

// Add your 3D spinning logic for each menu item as needed

// Example: Add a class to the current item for styling or animation
function updateCurrentItem() {
    const items = document.querySelectorAll('.carousel-item');
    
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
}

// Initial setup
updateCarousel();
updateCurrentItem();
