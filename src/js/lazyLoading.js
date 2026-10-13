export function initLazyLoading() {
  const galleryImages = document.querySelectorAll('img[data-src]');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  galleryImages.forEach((img) => observer.observe(img));
}
