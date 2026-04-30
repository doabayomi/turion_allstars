// JavaScript Document

// ===== PARTICLE SYSTEM =====

// Create floating particles
function createParticles() {
	const particlesContainer = document.getElementById('particles');
	const particleCount = 30;

	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement('div');
		particle.className = 'particle';
		particle.style.left = Math.random() * 100 + '%';
		particle.style.animationDelay = Math.random() * 15 + 's';
		particle.style.animationDuration =
			(Math.random() * 10 + 15) + 's';

		// Randomly assign yellow or cyan color
		if (Math.random() > 0.5) {
			particle.style.setProperty('--particle-color', '#2ddede');
			const before = particle.style.getPropertyValue(
				'--particle-color');
			particle.style.background = '#2ddede';
		} else {
			particle.style.setProperty('--particle-color', '#f8cc48');
			const before = particle.style.getPropertyValue(
				'--particle-color');
			particle.style.background = '#f8cc48';
		}

		particlesContainer.appendChild(particle);
	}
}

// ===== MOBILE MENU FUNCTIONALITY =====

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
	menuToggle.classList.toggle('active');
	navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
	link.addEventListener('click', () => {
		menuToggle.classList.remove('active');
		navLinks.classList.remove('active');
	});
});

// ===== NAVIGATION HIGHLIGHTING =====

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
	const scrollPosition = window.pageYOffset + 100;

	sections.forEach((section, index) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;

		if (scrollPosition >= sectionTop &&
			scrollPosition < sectionTop + sectionHeight) {
			navItems.forEach(item => item.classList.remove('active'));
			const currentNav = document.querySelector(
				`.nav-link[href="#${section.id}"]`);
			if (currentNav) currentNav.classList.add('active');
		}
	});
}

// ===== SCROLL EFFECTS =====

// Navbar scroll effect
window.addEventListener('scroll', function() {
	const navbar = document.getElementById('navbar');
	if (window.scrollY > 50) {
		navbar.classList.add('scrolled');
	} else {
		navbar.classList.remove('scrolled');
	}
	updateActiveNav();
});

// Initial active nav update
updateActiveNav();

// ===== SMOOTH SCROLLING =====

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// ===== FEATURES TABS =====

// Feature tabs functionality
const tabs = document.querySelectorAll('.tab-item');
const panels = document.querySelectorAll('.content-panel');

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
		const tabId = tab.getAttribute('data-tab');

		// Remove active class from all tabs and panels
		tabs.forEach(t => t.classList.remove('active'));
		panels.forEach(p => p.classList.remove('active'));

		// Add active class to clicked tab and corresponding panel
		tab.classList.add('active');
		document.getElementById(tabId).classList.add('active');
	});
});

// ===== REGISTER MODAL =====

const registerModal = document.getElementById('registerModal');
const closeRegisterBtn = document.getElementById('closeRegisterBtn');
const registerForm = document.getElementById('registerForm');
const formSteps = Array.from(document.querySelectorAll('.form-step'));
const stepCounter = document.getElementById('currentStep');
const socialLinks = document.querySelectorAll('.social-link');
const stepError = document.getElementById('stepError');
const stepErrorSocial = document.getElementById('stepErrorSocial');
let currentRegistrationStep = 1;
let socialClicked = false;
let selectedSocial = '';

function openRegisterModal() {
	registerModal.classList.add('active');
	registerModal.setAttribute('aria-hidden', 'false');
	document.body.classList.add('no-scroll');
	showRegisterStep(1);
}

function closeRegisterModal() {
	registerModal.classList.remove('active');
	registerModal.setAttribute('aria-hidden', 'true');
	document.body.classList.remove('no-scroll');
}

function showRegisterStep(step) {
	currentRegistrationStep = step;
	formSteps.forEach(stepEl => {
		stepEl.classList.toggle('active', Number(stepEl.dataset.step) === step);
	});
	stepCounter.textContent = step;
	stepError.textContent = '';
	stepErrorSocial.textContent = '';
	if (step === 4) {
		populateSummary();
	}
}

function resetSocialSelection() {
	socialClicked = false;
	selectedSocial = '';
	socialLinks.forEach(link => link.classList.remove('active'));
}

function validateRegisterStep(step) {
	if (step === 1) {
		const firstName = registerForm.firstName.value.trim();
		const lastName = registerForm.lastName.value.trim();
		const email = registerForm.email.value.trim();
		const city = registerForm.city.value.trim();
		const state = registerForm.state.value;
		const category = registerForm.gamingCategory.value;

		if (!firstName || !lastName || !email || !city || !state || !category) {
			stepError.textContent = 'Please complete all required fields before continuing.';
			return false;
		}
		return true;
	}

	if (step === 2) {
		if (!socialClicked) {
			stepErrorSocial.textContent = 'Please click at least one social link to continue.';
			return false;
		}
		return true;
	}

	return true;
}

function populateSummary() {
	const nameParts = [registerForm.firstName.value.trim()];
	if (registerForm.middleName.value.trim()) {
		nameParts.push(registerForm.middleName.value.trim());
	}
	nameParts.push(registerForm.lastName.value.trim());

	document.getElementById('summaryName').textContent = nameParts.join(' ');
	document.getElementById('summaryEmail').textContent = registerForm.email.value.trim();
	document.getElementById('summaryPhone').textContent = registerForm.phone.value.trim() || 'Not provided';
	document.getElementById('summaryLocation').textContent = `${registerForm.city.value.trim()}, ${registerForm.state.value}`;
	document.getElementById('summaryCategory').textContent = registerForm.gamingCategory.value;
	document.getElementById('summarySocial').textContent = selectedSocial || 'Social link clicked';
}

function openRegisterFromLink(event) {
	event.preventDefault();
	openRegisterModal();
}

const registerTriggers = document.querySelectorAll('a[href="#features"], .cta-button.cta-primary');
registerTriggers.forEach(trigger => {
	trigger.addEventListener('click', openRegisterFromLink);
});

closeRegisterBtn.addEventListener('click', closeRegisterModal);
registerModal.addEventListener('click', event => {
	if (event.target === registerModal) {
		closeRegisterModal();
	}
});

document.querySelectorAll('.next-step').forEach(button => {
	button.addEventListener('click', () => {
		if (!validateRegisterStep(currentRegistrationStep)) {
			return;
		}
		showRegisterStep(currentRegistrationStep + 1);
	});
});

document.querySelectorAll('.prev-step').forEach(button => {
	button.addEventListener('click', () => {
		showRegisterStep(Math.max(1, currentRegistrationStep - 1));
	});
});

socialLinks.forEach(link => {
	link.addEventListener('click', () => {
		socialClicked = true;
		selectedSocial = link.textContent.trim();
		socialLinks.forEach(item => item.classList.remove('active'));
		link.classList.add('active');
		stepErrorSocial.textContent = '';
	});
});

registerForm.addEventListener('submit', function(event) {
	event.preventDefault();
	alert('Thanks! Your registration request has been received.');
	registerForm.reset();
	resetSocialSelection();
	showRegisterStep(1);
	closeRegisterModal();
});

// ===== FORM HANDLING =====

// Form submission
document.getElementById('contactForm').addEventListener('submit',
	function(e) {
		e.preventDefault();
		// Add your form submission logic here
		alert('Message sent! We\'ll get back to you soon.');
		this.reset();
	});

// ===== TEXT ROTATION SYSTEM =====

// Text rotation with character animation
const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;
let isAnimating = false;

function wrapTextInSpans(element) {
	const text = element.textContent;
	element.innerHTML = text.split('').map((char, i) =>
		`<span class="char" style="animation-delay: ${i * 0.05}s">${
			char === ' ' ? '&nbsp;' : char}</span>`
	).join('');
}

function animateTextIn(textSet) {
	const glitchText = textSet.querySelector('.glitch-text');
	const subtitle = textSet.querySelector('.subtitle');

	// Wrap text in spans for animation
	wrapTextInSpans(glitchText);

	// Update data attribute for glitch effect
	glitchText.setAttribute('data-text', glitchText.textContent);

	// Show subtitle after main text
	setTimeout(() => {
		subtitle.classList.add('visible');
	}, 800);
}

function animateTextOut(textSet) {
	const chars = textSet.querySelectorAll('.char');
	const subtitle = textSet.querySelector('.subtitle');

	// Animate characters out
	chars.forEach((char, i) => {
		char.style.animationDelay = `${i * 0.02}s`;
		char.classList.add('out');
	});

	// Hide subtitle
	subtitle.classList.remove('visible');
}

function rotateText() {
	if (isAnimating) return;
	isAnimating = true;

	const currentSet = textSets[currentIndex];
	const nextIndex = (currentIndex + 1) % textSets.length;
	const nextSet = textSets[nextIndex];

	// Animate out current text
	animateTextOut(currentSet);

	// After out animation, switch sets
	setTimeout(() => {
		currentSet.classList.remove('active');
		nextSet.classList.add('active');
		animateTextIn(nextSet);

		currentIndex = nextIndex;
		isAnimating = false;
	}, 600);
}

// Initialize first text set
textSets[0].classList.add('active');
animateTextIn(textSets[0]);

// Start rotation after initial display
setTimeout(() => {
	setInterval(rotateText, 5000); // Change every 5 seconds
}, 4000);

// ===== GLITCH EFFECTS =====

// Add random glitch effect
setInterval(() => {
	const glitchTexts = document.querySelectorAll('.glitch-text');
	glitchTexts.forEach(text => {
		if (Math.random() > 0.95) {
			text.style.animation = 'none';
			setTimeout(() => {
				text.style.animation = '';
			}, 200);
		}
	});
}, 3000);

// ===== INITIALIZATION =====

// Initialize particles
createParticles();
