/**
 * Gencer Taahhüt - İnteraktif Uygulama Mantığı (JavaScript)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Preloader kapatılması (Tüm kaynaklar yüklenince)
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        });
        
        // Güvenlik önlemi: 3 saniye sonra load tetiklenmezse otomatik kapat
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        }, 3000);
    }

    // 2. Mobil hamburger menü kontrolü
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Menü linklerine tıklandığında menüyü kapat
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 3. Header scroll & Scroll Progress Bar & Back to Top Kontrolü
    const mainHeader = document.getElementById("main-header");
    const progressBar = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        // Sticky Header Sıkışma
        if (window.scrollY > 50) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }

        // Scroll Progress Yüzdesi
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }

        // Back to Top Görünürlük
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = "1";
                backToTopBtn.style.visibility = "visible";
            } else {
                backToTopBtn.style.opacity = "0";
                backToTopBtn.style.visibility = "hidden";
            }
        }
    });

    // Back to Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 4. İstatistik Sayaç Efekti (Stat Counter)
    const stats = document.querySelectorAll(".stat-item h4");
    if (stats.length > 0) {
        const runCounter = () => {
            stats.forEach(stat => {
                const target = parseInt(stat.innerText);
                let count = 0;
                const speed = target / 50; // Hız ayarı

                const updateCount = () => {
                    if (count < target) {
                        count += Math.ceil(speed);
                        if (count > target) count = target;
                        stat.innerText = count + "+";
                        setTimeout(updateCount, 20);
                    } else {
                        stat.innerText = target + "+";
                    }
                };
                updateCount();
            });
        };

        // Ekrana girdiğinde tetiklenme kontrolü (Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter();
                    observer.unobserve(entry.target); // Sadece 1 kez çalışsın
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector(".stats-grid");
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // 5. SSS (FAQ) Akordeon Açılış-Kapanış Mekanizması
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        if (questionBtn && answer && icon) {
            questionBtn.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");
                
                // Diğer açık olan SSS elemanlarını kapat (Akordeon davranışı)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                        otherItem.querySelector(".faq-answer").style.maxHeight = "0";
                        otherItem.querySelector(".faq-icon").innerText = "+";
                        otherItem.style.borderColor = "var(--color-border)";
                    }
                });

                if (isOpen) {
                    item.classList.remove("active");
                    answer.style.maxHeight = "0";
                    icon.innerText = "+";
                    item.style.borderColor = "var(--color-border)";
                } else {
                    item.classList.add("active");
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.innerText = "−";
                    item.style.borderColor = "var(--color-primary)";
                }
            });
        }
    });

    // 6. İletişim formu validasyonu ve şık geri bildirim
    const leadForm = document.getElementById("lead-form");
    const responseMsg = document.getElementById("form-response-msg");

    if (leadForm && responseMsg) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("form-name").value.trim();
            const service = document.getElementById("form-service").value;

            responseMsg.style.display = "block";
            responseMsg.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
            responseMsg.style.color = "#34d399";
            responseMsg.style.border = "1px solid rgba(16, 185, 129, 0.4)";
            responseMsg.style.borderRadius = "var(--radius-md)";
            responseMsg.style.padding = "1rem";
            responseMsg.style.marginTop = "1rem";
            responseMsg.innerText = `Teşekkürler Sayın ${name}. ${service.toUpperCase()} alanındaki talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.`;

            leadForm.reset();

            setTimeout(() => {
                responseMsg.style.display = "none";
            }, 5000);
        });
    }

    // 7. Lüks Custom Cursor Animasyonu (Masaüstü için LERP - Yumuşak Takip)
    const cursor = document.getElementById("custom-cursor");
    const cursorDot = document.getElementById("custom-cursor-dot");

    if (cursor && cursorDot && window.innerWidth > 1024) {
        let mouseX = -100;
        let mouseY = -100;
        let cursorX = -100;
        let cursorY = -100;
        let dotX = -100;
        let dotY = -100;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Buton ve linklerin üzerine gelince imlecin büyümesi
        const hoverTargets = document.querySelectorAll("a, button, select, textarea, input, .btn, .faq-question, .gallery-item, .social-icon");
        
        hoverTargets.forEach(target => {
            target.addEventListener("mouseenter", () => {
                cursor.style.width = "56px";
                cursor.style.height = "56px";
                cursor.style.backgroundColor = "rgba(6, 182, 212, 0.08)";
                cursor.style.borderColor = "var(--color-primary)";
            });
            target.addEventListener("mouseleave", () => {
                cursor.style.width = "32px";
                cursor.style.height = "32px";
                cursor.style.backgroundColor = "transparent";
                cursor.style.borderColor = "var(--color-primary)";
            });
        });

        const animateCursor = () => {
            // LERP Formülü: Yumuşak gecikmeli takip efekti
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            dotX += (mouseX - dotX) * 0.25;
            dotY += (mouseY - dotY) * 0.25;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();
    }

    // 10. Mouse Takip Eden Glow Orb Efekti (Dinamik Arka Plan Işığı)
    if (window.innerWidth > 768) {
        const mouseGlow = document.createElement("div");
        mouseGlow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1), top 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            filter: blur(30px);
        `;
        document.body.appendChild(mouseGlow);

        document.addEventListener("mousemove", (e) => {
            mouseGlow.style.left = e.clientX + "px";
            mouseGlow.style.top  = e.clientY + "px";
        });
    }

    // 8. Ana Sayfa Premium Slider Mantığı
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".indicator-dot");
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000; // Her bir slayt 6 saniye kalacak

    function showSlide(index) {
        if (!slides.length) return;
        
        // Aktif sınıfları temizle
        slides.forEach(slide => {
            slide.classList.remove("active");
            // AOS kütüphanesini yeniden tetiklemek için AOS sınıflarını temizle/ekle
            const animElements = slide.querySelectorAll("[data-aos]");
            animElements.forEach(el => {
                el.classList.remove("aos-animate");
            });
        });
        dots.forEach(dot => dot.classList.remove("active"));

        // Yeni aktif slaytı göster
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }

        // AOS animasyonlarını slayt geçişinde yeniden canlandır
        setTimeout(() => {
            const activeAnimElements = slides[currentSlide].querySelectorAll("[data-aos]");
            activeAnimElements.forEach(el => {
                el.classList.add("aos-animate");
            });
        }, 100);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlideShow() {
        if (!slides.length) return;
        stopSlideShow(); // Çiftlemeyi önlemek için temizle
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Indicator noktalarına tıklama fonksiyonunu global scope'a bağlayalım
    window.setSlide = function(index) {
        showSlide(index);
        startSlideShow(); // Süreyi sıfırla
    };

    // Slider üzerine gelince durma (hover durumunda duraklat)
    const sliderContainer = document.getElementById("hero-slider");
    if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", stopSlideShow);
        sliderContainer.addEventListener("mouseleave", startSlideShow);
    }

    // Başlangıç tetiklemesi
    if (slides.length > 0) {
        startSlideShow();
    }

    // 9. Ferhat Ekemen Tesisat Stili: Ekrana Kaydırınca Kartların Birleşikten Yanlara Doğru Yayılması (Scroll Trigger)
    const cardsWrap = document.querySelector(".about-cards-wrap");
    if (cardsWrap) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.25 // %25'i ekrana girdiğinde tetiklensin
        };

        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ekrana girdiğinde "spread" sınıfını ekle (Kartlar yanlara yayılacak)
                    cardsWrap.classList.add("spread");
                } else {
                    // Ekrandan çıkınca sıfırla (İç içe birleşmiş duruma geri dönecek)
                    cardsWrap.classList.remove("spread");
                }
            });
        }, observerOptions);

        cardsObserver.observe(cardsWrap);
    }
});

// Lightbox Galeri Fonksiyonları (Global Scope)
function openLightbox(element) {
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const clickedImgSrc = element.querySelector("img").getAttribute("src");
    const clickedImgAlt = element.querySelector("img").getAttribute("alt");

    if (lightboxModal && lightboxImg) {
        lightboxImg.setAttribute("src", clickedImgSrc);
        lightboxImg.setAttribute("alt", clickedImgAlt);
        lightboxModal.style.visibility = "visible";
        lightboxModal.style.opacity = "1";
        document.body.style.overflow = "hidden"; // Sayfa kaymasını engelle
    }
}

function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox-modal");
    if (lightboxModal) {
        lightboxModal.style.opacity = "0";
        lightboxModal.style.visibility = "hidden";
        document.body.style.overflow = "auto"; // Sayfa kaymasını geri aç
    }
}

