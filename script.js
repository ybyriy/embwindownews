   // Бургер-меню
        const burger = document.querySelector('.burger');
        const navUl = document.querySelector('nav ul');

        burger.addEventListener('click', () => {
            navUl.classList.toggle('show');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('nav ul a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('show');
            });
        });
   
        // Фильтрация товаров
        const filterLinks = document.querySelectorAll('.filter');
        const categories = document.querySelectorAll('.category');

        filterLinks.forEach(link => {
            link.addEventListener('click', function() {
                filterLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                categories.forEach(category => {
                    if (filter === 'all') {
                        category.classList.remove('hidden');
                    } else {
                        if (category.getAttribute('data-category') === filter) {
                            category.classList.remove('hidden');
                        } else {
                            category.classList.add('hidden');
                        }
                    }
                });
            });
        });
 document.querySelectorAll('.product-slider').forEach(sliderContainer => {
            const slider = sliderContainer.querySelector('.product-slides');
            const prevBtn = sliderContainer.querySelector('.prev');
            const nextBtn = sliderContainer.querySelector('.next');
            let currentIndex = 0;
            const slides = slider.querySelectorAll('img');
            const totalSlides = slides.length;

            function updateSlider() {
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
                updateSlider();
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
                updateSlider();
            });
        });

        // Модальное окно для кликабельных изображений
        const modal = document.getElementById('imageModal');
        const modalImg = modal.querySelector('img');
        const modalClose = modal.querySelector('.modal-close');
        const images = document.querySelectorAll('.product-slides img');

        images.forEach(img => {
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.style.display = 'flex';
            });
        });

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Закрытие модального окна при клике вне изображения
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function(){
        document.getElementById('phone-fab').classList.add('visible');
    }, 6000); // появляется через 6 секунд
});

    document.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    document.exitFullscreen(); // Выход из полноэкранного режима, если он включен
  }
});
// всплывающее окно
window.onload = function() {
  const popup = document.getElementById('myPopup');
  const closeBtn = document.querySelector('.close-btn');

  // Показываем окно через 10000 мс (10 секунд)
  setTimeout(() => {
    popup.style.display = 'block';
  }, 10000);

  // Закрытие при нажатии на крестик
  closeBtn.onclick = function() {
    popup.style.display = 'none';
  };
};
// видеов полном экране
document.querySelector('video').addEventListener('click', function() {
  if (this.requestFullscreen) {
    this.requestFullscreen();
  } else if (this.webkitRequestFullscreen) {
    this.webkitRequestFullscreen(); // Для Safari/Chrome
  }
});



function calculateOrder() {
    const pricePerStitchSqCm = 4.5; // Базовый тариф вышивки за 1 кв. см
    
    const productType = document.getElementById('product-type').value;
    const sewingCost = (productType === 'salv') ? 250 : 
                   (productType === 'lunch') ? 350 : 
                   (productType === 'salvok') ? 1250 : 1350;

    const fabricPricePerSqCm = parseFloat(document.getElementById('fabric-type').value);
    const prodWidth = parseFloat(document.getElementById('prod-width').value) || 0;
    const prodHeight = parseFloat(document.getElementById('prod-height').value) || 0;

    const stitchWidth = parseFloat(document.getElementById('stitch-width').value) || 0;
    const stitchHeight = parseFloat(document.getElementById('stitch-height').value) || 0;
    const complexity = parseFloat(document.getElementById('stitch-type').value);
    const threadMultiplier = parseFloat(document.getElementById('thread-type').value);

    const qty = parseInt(document.getElementById('quantity').value) || 1;

    // Скрытие/показ блока нитей, если вышивка не выбрана
    const threadBlock = document.getElementById('thread-block');
    if (complexity === 0) {
        threadBlock. style.display = 'none';
    } else {
        threadBlock.style.display = 'block';
    }

    // 1. Расчет стоимости чистой ткани (+4 см на швы)
    const fabricArea = (prodWidth + 4) * (prodHeight + 4); 
    const totalFabricPrice = fabricArea * fabricPricePerSqCm;

    // 2. Расчет стоимости вышивки с учетом наценки за нить
    let totalEmbroideryPrice = 0;
    if (complexity > 0) {
        const stitchArea = stitchWidth * stitchHeight;
        totalEmbroideryPrice = stitchArea * pricePerStitchSqCm * complexity * threadMultiplier;
    }

    // 3. Себестоимость одного изделия
    const singleProductPrice = totalFabricPrice + sewingCost + totalEmbroideryPrice;

    // 4. Расчет всей партии со скидкой за объем
    let totalPrice = singleProductPrice * qty;
    
    if (qty >= 4 && qty < 8) totalPrice *= 0.95; // 5% скидка от 4 шт
    if (qty >= 8) totalPrice *= 0.90;          // 10% скидка от 8 шт

    document.getElementById('total-price').innerText = Math.round(totalPrice);
}

// Отслеживание изменений
const inputs = ['product-type', 'fabric-type', 'prod-width', 'prod-height', 'stitch-width', 'stitch-height', 'stitch-type', 'thread-type', 'quantity'];
inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', calculateOrder);
    document.getElementById(id).addEventListener('change', calculateOrder);
});

calculateOrder();

// 1. Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('PWA запущен!'))
      .catch((err) => console.error('Ошибка PWA:', err));
  });
}

// 2. Логика отложенной всплывающей кнопки установки
let deferredPrompt;
const banner = document.getElementById('pwa-install-banner');
const installBtn = document.getElementById('pwa-install-btn');
const closeBtn = document.getElementById('pwa-close-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Блокируем стандартную плашку браузера
  e.preventDefault();
  // Сохраняем событие, чтобы вызвать его позже по кнопке
  deferredPrompt = e;

  // Проверяем, не закрывал ли пользователь баннер ранее в этой сессии
  if (!sessionStorage.getItem('pwa-banner-closed')) {
    // Показываем наш баннер только спустя 30 секунд
    setTimeout(() => {
      // Дополнительно проверяем, что пользователь все еще на сайте 
      // и событие установки готово к вызову
      if (deferredPrompt) {
        banner.style.display = 'block';
      }
    }, 30000); // 30000 миллисекунд = 30 секунд
  }
});

// Нажатие на кнопку "Установить"
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  // Показываем системное окно установки поверх нашего сайта
  deferredPrompt.prompt();
  // Ждем ответа пользователя (установил или нажал отмена)
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`Пользователь выбрал: ${outcome}`);
  // Прячем наш баннер, задача выполнена
  banner.style.display = 'none';
  deferredPrompt = null;
});

// Нажатие на крестик (закрыть)
closeBtn.addEventListener('click', () => {
  banner.style.display = 'none';
  // Запоминаем выбор, чтобы не надоедать пользователю при обновлении страниц
  sessionStorage.setItem('pwa-banner-closed', 'true');
});
