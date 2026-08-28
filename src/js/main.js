document.addEventListener('DOMContentLoaded', function () {
  // BURGER MENU
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.nav');

  if (menuToggle && mobileNav) {
    const mobileLinks = mobileNav.querySelectorAll('.nav__link');

    function openMenu() {
      menuToggle.classList.add('is-active');
      mobileNav.classList.add('is-open');

      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Закрити меню');

      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      menuToggle.classList.remove('is-active');
      mobileNav.classList.remove('is-open');

      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Відкрити меню');

      document.body.classList.remove('menu-open');
    }

    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.classList.contains('is-active');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    });
  }

  // HIKES
  const hikesList = document.querySelector('.hikes__list');

  const modal = document.querySelector('#hike-modal');
  const modalOverlay = modal ? modal.querySelector('.modal__overlay') : null;

  const modalClose = modal ? modal.querySelector('.modal__close') : null;

  const modalImage = modal ? modal.querySelector('.modal__image') : null;

  const modalDate = modal ? modal.querySelector('.modal__date') : null;

  const modalTitle = modal ? modal.querySelector('.modal__title') : null;

  const modalDescription = modal
    ? modal.querySelector('.modal__description')
    : null;

  const modalLocation = modal
    ? modal.querySelector('[data-modal-location]')
    : null;

  const modalDuration = modal
    ? modal.querySelector('[data-modal-duration]')
    : null;

  const modalDifficulty = modal
    ? modal.querySelector('[data-modal-difficulty]')
    : null;

  const modalPlaces = modal ? modal.querySelector('[data-modal-places]') : null;

  const modalPrice = modal ? modal.querySelector('[data-modal-price]') : null;

  let hikes = [];
  let hotHikes = [];
  let selectedHike = null;

  // FORMAT HELPERS
  function formatPrice(price) {
    return Number(price).toLocaleString('uk-UA') + ' грн';
  }

  function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');

    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
    });
  }

  // delete func
  function getPlacesWord(number) {
    const value = Number(number);

    const lastTwoDigits = value % 100;
    const lastDigit = value % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'місць';
    }

    if (lastDigit === 1) {
      return 'місце';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'місця';
    }

    return 'місць';
  }

  // CREATE HIKE CARD
  function createHikeCard(hike) {
    const article = document.createElement('article');

    article.className = 'hike-card';

    article.innerHTML = `
      <div class="hike-card__image-wrapper">
        <img
          class="hike-card__image"
          src="${hike.image}"
          alt="${hike.title}"
        />
      </div>

      <div class="hike-card__content">
        <h3 class="hike-card__title">
          ${hike.title}
        </h3>

        <div class="hike-card__details">
          <div class="hike-card__meta">
            <time datetime="${hike.date}">
              ${formatDate(hike.date)}
            </time>
          </div>

          <span class="hike-card__location">${hike.location}</span>
          <span class="hike-card__duration">${hike.duration}</span>
          <span class="hike-card__difficulty">${hike.difficulty}</span>
        </div>

        <p class="hike-card__description">
          ${hike.description}
        </p>

        <div class="hike-card__footer">
          <span class="hike-card__places">
            ${hike.leftPlaces} / ${hike.places} місць
          </span>

          <div class="hike-card__price">
            <strong>
              ${formatPrice(hike.price)}
            </strong>
          </div>
        </div>

        <div class="hike-card__actions">

          <button
            class="button button--secondary hike-card__details-button"
            type="button"
          >
            Детальніше
          </button>

          <button
            class="button hike-card__book-button"
            type="button"
          >
            Забронювати
          </button>

        </div>

      </div>
    `;

    const detailsButton = article.querySelector('.hike-card__details-button');

    const bookButton = article.querySelector('.hike-card__book-button');

    detailsButton.addEventListener('click', function () {
      openModal(hike);
    });

    bookButton.addEventListener('click', function () {
      openBooking(hike);
    });

    return article;
  }

  // RENDER HIKES
  function renderHikes(data) {
    if (!hikesList) {
      return;
    }

    hikesList.innerHTML = '';

    data.forEach(function (hike) {
      const card = createHikeCard(hike);

      hikesList.appendChild(card);
    });
  }

  // LOAD HIKES FROM JSON
  function loadHikes() {
    if (!hikesList) {
      return;
    }

    fetch('/data/hikes.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) {
          throw new Error('hikes.json має містити масив обʼєктів');
        }

        hikes = data;

        renderHikes(hikes);
      })
      .catch(function () {
        hikesList.innerHTML = `
          <p class="hikes__error">
            Не вдалося завантажити розклад походів.
          </p>
        `;
      });
  }

  loadHikes();

  // HOT HIKES
  const hotHikesSection = document.querySelector('.hot-spots');
  const hotHikesList = document.querySelector('.hot-hikes__list');

  function createHotHike(hike) {
    const article = document.createElement('article');

    article.className = 'hot-spot';

    article.innerHTML = `
      <div class="hot-spot__image-wrapper">
        <img
          class="hot-spot__image"
          src="${hike.image}"
          alt="${hike.title}"
        />
      </div>

      <div class="hot-spot__content">
        <span class="hot-spot__label">
          HOT SPOT
        </span>

        <h3 class="hot-spot__title">
          ${hike.title}
        </h3>

        <div class="hot-spot__prices">
          <del>${formatPrice(hike.price)}</del>
          <strong>${formatPrice(hike.discountPrice)}</strong>
        </div>

        <p class="hot-spot__places">
          Залишилось ${hike.leftPlaces} ${getPlacesWord(hike.leftPlaces)}
        </p>

        <div
          class="hot-spot__timer countdown"
          data-countdown="${hike.date}"
          aria-label="Зворотній відлік до початку походу"
        >
          <div class="countdown__item">
            <span
              class="countdown__value"
              data-countdown-days
            >
              00
            </span>
            <span class="countdown__label">
              днів
            </span>
          </div>

          <div class="countdown__item">
            <span
              class="countdown__value"
              data-countdown-hours
            >
              00
            </span>
            <span class="countdown__label">
              годин
            </span>
          </div>

          <div class="countdown__item">
            <span
              class="countdown__value"
              data-countdown-minutes
            >
              00
            </span>
            <span class="countdown__label">
              хвилин
            </span>
          </div>

          <div class="countdown__item">
            <span
              class="countdown__value"
              data-countdown-seconds
            >
              00
            </span>
            <span class="countdown__label">
              секунд
            </span>
          </div>
        </div>

        <button
          class="button"
          type="button"
        >
          Забронювати
        </button>

      </div>
    `;

    const bookButton = article.querySelector('.button');

    bookButton.addEventListener('click', function () {
      openBooking(hike);
    });

    return article;
  }

  function renderHotHikes(data) {
    if (!hotHikesList) {
      return;
    }

    hotHikesList.innerHTML = '';

    data.forEach(function (hike) {
      const hotHike = createHotHike(hike);

      hotHikesList.appendChild(hotHike);
    });

    initHotHikeCountdowns();
  }

  function loadHotHikes() {
    if (!hotHikesSection || !hotHikesList) {
      return;
    }

    fetch('/data/hot-hikes.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) {
          throw new Error('hot-hikes.json має містити масив обʼєктів');
        }

        hotHikes = data;

        if (hotHikes.length === 0) {
          return;
        }

        renderHotHikes(hotHikes);
      })
      .catch(function (error) {
        throw new Error(error);
      });
  }

  loadHotHikes();

  // HOT SPOT COUNTDOWN
  function initHotHikeCountdowns() {
    const countdowns = document.querySelectorAll('[data-countdown]');

    countdowns.forEach(function (countdown) {
      const targetDate = countdown.dataset.countdown;

      const daysElement = countdown.querySelector('[data-countdown-days]');

      const hoursElement = countdown.querySelector('[data-countdown-hours]');

      const minutesElement = countdown.querySelector(
        '[data-countdown-minutes]'
      );

      const secondsElement = countdown.querySelector(
        '[data-countdown-seconds]'
      );

      let countdownInterval = null;

      function updateCountdown() {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference <= 0) {
          if (daysElement) {
            daysElement.textContent = '00';
          }

          if (hoursElement) {
            hoursElement.textContent = '00';
          }

          if (minutesElement) {
            minutesElement.textContent = '00';
          }

          if (secondsElement) {
            secondsElement.textContent = '00';
          }

          clearInterval(countdownInterval);

          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        const seconds = Math.floor((difference / 1000) % 60);

        if (daysElement) {
          daysElement.textContent = String(days).padStart(2, '0');
        }

        if (hoursElement) {
          hoursElement.textContent = String(hours).padStart(2, '0');
        }

        if (minutesElement) {
          minutesElement.textContent = String(minutes).padStart(2, '0');
        }

        if (secondsElement) {
          secondsElement.textContent = String(seconds).padStart(2, '0');
        }
      }

      updateCountdown();

      countdownInterval = setInterval(updateCountdown, 1000);
    });
  }

  // MODAL
  function openModal(hike) {
    if (!modal) {
      return;
    }

    selectedHike = hike;

    if (modalImage) {
      modalImage.src = hike.image;
      modalImage.alt = hike.title;
    }

    if (modalDate) {
      modalDate.textContent = formatDate(hike.date);
    }

    if (modalTitle) {
      modalTitle.textContent = hike.title;
    }

    if (modalDescription) {
      modalDescription.textContent = hike.description;
    }

    if (modalLocation) {
      modalLocation.textContent = hike.location;
    }

    if (modalDuration) {
      modalDuration.textContent = hike.duration;
    }

    if (modalDifficulty) {
      modalDifficulty.textContent = hike.difficulty;
    }

    if (modalPlaces) {
      modalPlaces.textContent = hike.places + ' ' + getPlacesWord(hike.places);
    }

    if (modalPrice) {
      modalPrice.textContent = formatPrice(hike.price);
    }

    modal.classList.add('is-open');

    modal.setAttribute('aria-hidden', 'false');

    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) {
      return;
    }

    modal.classList.remove('is-open');

    modal.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');

    selectedHike = null;
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // BOOKING
  function openBooking(hike) {
    const message =
      'Хочу забронювати похід: ' + hike.title + ', ' + formatDate(hike.date);

    const telegramUrl = 'https://t.me/?text=' + encodeURIComponent(message);

    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  }

  const modalBookButton = document.querySelector('.modal__book-button');

  if (modalBookButton) {
    modalBookButton.addEventListener('click', function () {
      if (selectedHike) {
        openBooking(selectedHike);
      }
    });
  }

  // HOT SPOT COUNTDOWN
  const countdown = document.querySelector('[data-countdown]');

  if (countdown) {
    const targetDate = countdown.dataset.countdown;

    const daysElement = countdown.querySelector('[data-countdown-days]');

    const hoursElement = countdown.querySelector('[data-countdown-hours]');

    const minutesElement = countdown.querySelector('[data-countdown-minutes]');

    const secondsElement = countdown.querySelector('[data-countdown-seconds]');

    let countdownInterval = null;

    function updateCountdown() {
      const now = new Date().getTime();

      const target = new Date(targetDate).getTime();

      const difference = target - now;

      if (difference <= 0) {
        if (daysElement) {
          daysElement.textContent = '00';
        }

        if (hoursElement) {
          hoursElement.textContent = '00';
        }

        if (minutesElement) {
          minutesElement.textContent = '00';
        }

        if (secondsElement) {
          secondsElement.textContent = '00';
        }

        clearInterval(countdownInterval);

        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      const seconds = Math.floor((difference / 1000) % 60);

      if (daysElement) {
        daysElement.textContent = String(days).padStart(2, '0');
      }

      if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, '0');
      }

      if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, '0');
      }

      if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, '0');
      }
    }

    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // FAQ
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) {
        item.classList.remove('is-open');

        return;
      }

      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.open = false;

          otherItem.classList.remove('is-open');
        }
      });

      item.classList.add('is-open');
    });
  });

  // GALLERY
  const galleryTrack = document.querySelector('.gallery__track');

  if (galleryTrack) {
    const galleryItems = Array.from(galleryTrack.children);

    galleryItems.forEach(function (item) {
      const clone = item.cloneNode(true);

      clone.setAttribute('aria-hidden', 'true');

      galleryTrack.appendChild(clone);
    });
  }

  // window.history.scrollRestoration = 'manual';
  // window.scrollTo(0, 0);
});
