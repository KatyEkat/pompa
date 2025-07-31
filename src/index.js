document.addEventListener("DOMContentLoaded", () => {
	const cartNotification = document.getElementById("cartNotification");
	const sizeSelector = document.getElementById("sizeSelector");
	const closeButton = sizeSelector.querySelector(".size-selector__close");
	const overlay = document.getElementById("overlay");

	document.querySelectorAll(".product-card").forEach((card) => {
		const slider = card.querySelector(".product-card__slides");
		const dots = card.querySelectorAll(".product-card__dot");
		const slides = card.querySelectorAll(".product-card__slide");
		let currentSlide = 0;
		let startX = 0;
		let isDragging = false;

		function goToSlide(index) {
			if (index < 0) index = 0;
			if (index >= slides.length) index = slides.length - 1;

			slider.style.transform = `translateX(-${index * 100}%)`;
			dots.forEach((dot) => dot.classList.remove("product-card__dot--active"));
			dots[index].classList.add("product-card__dot--active");
			currentSlide = index;
		}

		dots.forEach((dot, index) => {
			dot.addEventListener("click", () => goToSlide(index));
		});

		slider.addEventListener("mousedown", handleTouchStart);
		slider.addEventListener("touchstart", handleTouchStart, { passive: true });

		slider.addEventListener("mousemove", handleTouchMove);
		slider.addEventListener("touchmove", handleTouchMove, { passive: false });

		slider.addEventListener("mouseup", handleTouchEnd);
		slider.addEventListener("mouseleave", handleTouchEnd);
		slider.addEventListener("touchend", handleTouchEnd);

		function handleTouchStart(e) {
			isDragging = true;
			startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
			slider.style.transition = "none";
		}

		function handleTouchMove(e) {
			if (!isDragging) return;

			const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
			const diff = startX - x;

			if (e.type === "touchmove" && Math.abs(diff) > 10) {
				e.preventDefault();
			}

			slider.style.transform = `translateX(calc(-${
				currentSlide * 100
			}% - ${diff}px))`;
		}

		function handleTouchEnd(e) {
			if (!isDragging) return;
			isDragging = false;

			const x = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
			const diff = startX - x;
			slider.style.transition = "transform 0.3s ease";

			if (diff > 50 && currentSlide < slides.length - 1) {
				goToSlide(currentSlide + 1);
			} else if (diff < -50 && currentSlide > 0) {
				goToSlide(currentSlide - 1);
			} else {
				goToSlide(currentSlide);
			}
		}
	});

	document.querySelectorAll(".product-card__cart-button").forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			sizeSelector.classList.add("size-selector--active");
			overlay.classList.add("show");
			document.body.style.overflow = "hidden";
		});
	});

	closeButton.addEventListener("click", () => {
		sizeSelector.classList.remove("size-selector--active");
		overlay.classList.remove("show");
		document.body.style.overflow = "";
	});

	overlay.addEventListener("click", () => {
		sizeSelector.classList.remove("size-selector--active");
		overlay.classList.remove("show");
		document.body.style.overflow = "";
	});

    
    const sizeElements = document.querySelectorAll(".size-selector__size");

    sizeElements.forEach(function (size) {
        size.addEventListener("click", function (e) {
            e.preventDefault();
    
            sizeElements.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");
    
            document
                .querySelector(".size-selector__button")
                .removeAttribute("disabled");
        });
    });

	const addToCartButton = document.querySelector(".size-selector__button");

	addToCartButton.addEventListener("click", () => {
		sizeSelector.classList.remove("size-selector--active");
		overlay.classList.remove("show");
		document.body.style.overflow = "";
		cartNotification.classList.add("show");

		setTimeout(function () {
			cartNotification.classList.remove("show");
		}, 3000);
	});

	const cartCloseButton = cartNotification.querySelector("svg");
	cartCloseButton.addEventListener("click", () => {
		cartNotification.classList.remove("show");
	});

	const productCards = document.querySelectorAll(".product-card");

	productCards.forEach((card) => {
		const slides = card.querySelectorAll(".product-card__slide");
		const slider = card.querySelector(".product-card__slides");
		let currentSlide = 0;

		const goToSlide = (index) => {
			if (index < 0) index = 0;
			if (index >= slides.length) index = slides.length - 1;
			slider.style.transform = `translateX(-${index * 100}%)`;
			currentSlide = index;
		};

		const prevBtn = card.querySelector(".product-card__arrow--left");
		const nextBtn = card.querySelector(".product-card__arrow--right");

		prevBtn?.addEventListener("click", () => goToSlide(currentSlide - 1));
		nextBtn?.addEventListener("click", () => goToSlide(currentSlide + 1));
	});
});
