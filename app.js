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

