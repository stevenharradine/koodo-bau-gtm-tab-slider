"use strict";

const dbTabSlider = {};

const pricePhone = "#pricePhone",
		priceTab = "#priceTab";

dbTabSlider.init = () => {
	dbTabSlider.setupSlider();
};

dbTabSlider.setupSlider = () => {
	jQuery(".db-tab-slider").slick({
		dots: true,
		infinite: false,
		prevArrow: '<button class="nav-arrow slick-prev kRaspberry"><span class="kooding-glyph thin-chevron-left"></span></button>',
		nextArrow: '<button class="nav-arrow slick-next kRaspberry"><span class="kooding-glyph thin-chevron-right"></span></button>'
	});

	jQuery(".slick-dots").attr("style", "padding-bottom: 25px;"); // change default inline styling
	jQuery(".slick-dots li").text(""); // remove default pagination numbering
	
	dbTabSlider.navigateWidthFix1();
	dbTabSlider.getWindowWidth();
	dbTabSlider.getCurrentSlide();
};

dbTabSlider.navigateWidthFix1 = () => {
	jQuery(".db-tab-slider").slick("slickGoTo", 1, dbTabSlider.navigateWidthFix2());
};

dbTabSlider.navigateWidthFix2 = () => {
	jQuery(".db-tab-slider").slick("slickGoTo", 0);
	jQuery(".db-tab-slider").addClass("ready"); // adds full opacity to block
};

// user clicks "See how it works" button, navigate to second slide
jQuery("#see-how-it-works").on("click", () => {
	jQuery(".db-tab-slider").slick("slickGoTo", 1);
});

dbTabSlider.getWindowWidth = () => {
	dbTabSlider.windowWidth = jQuery(window).width();
	dbTabSlider.calculateBlockWidth();
};

jQuery(window).on("resize", () => {
	dbTabSlider.getWindowWidth();
});

// method to adjust block width based on screen size
dbTabSlider.calculateBlockWidth = () => {
	let deviceBlockMaxWidth = "";

	if (dbTabSlider.windowWidth >= 1100) { // desktop view
		deviceBlockMaxWidth = 373;
		let deviceBlockWidth = document.querySelector("#db-tab-slider").clientWidth;

		if (deviceBlockWidth > deviceBlockMaxWidth) {
			jQuery(".db-tab-slider").css("width", deviceBlockMaxWidth);
		} else {
			jQuery(".db-tab-slider").css("width", deviceBlockWidth);
		};
	} else if (dbTabSlider.windowWidth <= 1099 && dbTabSlider.windowWidth >= 768 ) { // tablet view
		deviceBlockMaxWidth = 515;
		let deviceBlockWidth = document.querySelector("#db-tab-slider").clientWidth;

		if (deviceBlockWidth > deviceBlockMaxWidth) {
			jQuery(".db-tab-slider").css("width", deviceBlockMaxWidth);
		} else {
			jQuery(".db-tab-slider").css("width", deviceBlockWidth);
		};
	} else if (dbTabSlider.windowWidth <= 767 ) { // mobile view
		deviceBlockMaxWidth = 767;
		let deviceBlockWidth = document.querySelector("#db-tab-slider").clientWidth;

		if (deviceBlockWidth > deviceBlockMaxWidth) {
			jQuery(".db-tab-slider").css("width", deviceBlockMaxWidth);
		} else {
			jQuery(".db-tab-slider").css("width", deviceBlockWidth);
		};
	};
};

// built-in slick.js method to find index of current slide
jQuery(".db-tab-slider").on("afterChange", () => {
	dbTabSlider.getCurrentSlide();
});

dbTabSlider.getCurrentSlide = () => {
	dbTabSlider.currentSlide = jQuery(".db-tab-slider").slick("slickCurrentSlide");
	dbTabSlider.navArrowCheck();
	dbTabSlider.animationCheck();
};

dbTabSlider.navArrowCheck = () => {
	jQuery(".nav-arrow").removeClass("hide-arrow");

	if(dbTabSlider.currentSlide === 0) { // if currentSlide is first slide, hide previous arrow button
		jQuery(".slick-prev").addClass("hide-arrow");
	} else if(dbTabSlider.currentSlide === 4) { // if currentSlide is last slide, hide next arrow button
		jQuery(".slick-next").addClass("hide-arrow");
	};
};

dbTabSlider.animationCheck = () => {
	// if currentSlide is second slide, wait 1 second, then call animations
	if (dbTabSlider.currentSlide === 1) {
		let timeout = window.setTimeout( () => {
			dbTabSlider.animationCountDown(pricePhone);
			dbTabSlider.animationCountUp(priceTab);
		}, 1000);
	} else { // if currentSlide is not second slide, stop all animations
		dbTabSlider.animationStop();
	};
};

// animation counts down from 360 to 0
dbTabSlider.animationCountDown = (price) => {
	jQuery(price).countTo({
		from: 360,
		to: 0,
		speed: 2500,
		refreshInterval: 100,
		onComplete: function() { // after animation finishes, wait 1 second, call CountUp
			let timeout = window.setTimeout( () => {
				dbTabSlider.animationCountUp(this);
			}, 1000);
		}
	});
};

// animation counts up from 0 to 360
dbTabSlider.animationCountUp = (price) => {
	jQuery(price).countTo({
		from: 0,
		to: 360,
		speed: 2500,
		refreshInterval: 100,
		onComplete: function() { // after animation finishes, wait 1 second, call CountDown
			let timeout = window.setTimeout( () => {
				dbTabSlider.animationCountDown(this);
			}, 1000);
		}
	});
};

// stop animations and reset text content to original values
dbTabSlider.animationStop = () => {
	jQuery(pricePhone).countTo("stop");
	jQuery(pricePhone).text("360");
	jQuery(priceTab).countTo("stop");
	jQuery(priceTab).text("0");
};

document.addEventListener("DOMContentLoaded", () => {
	dbTabSlider.init();
});