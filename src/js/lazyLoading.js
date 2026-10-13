const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll('img[data-src]').forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });

      observer.unobserve(entry.target);
    });
  },
  { rootMargin: '200px' }
);

export function initLazyLoading() {
  const gallery = document.querySelector('.gallery');

  if (gallery) {
    observer.observe(gallery);
  }
}
