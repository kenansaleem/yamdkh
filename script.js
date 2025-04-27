// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add fade-in animation to elements
    const animateElements = document.querySelectorAll('.testimonials-section .card');
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // Handle course registration form submission
    const registrationForm = document.getElementById('courseRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the selected course
            const selectedCourse = this.querySelector('input[name="selectedType"]:checked');
            if (!selectedCourse) {           
                return showAlert('الرجاء اختيار دورة تدريبية', 'warning');
            }
            // Get and validate phone number
            const phoneInput = document.getElementById('phoneInput');
            const phoneNumber = phoneInput.value.replace(/\D/g, '');
            if (!phoneNumber) {           
                return showAlert('الرجاء ادخال رقم الهاتف', 'warning');
            }
            if (phoneNumber.length < 10) {
                return showAlert('الرجاء ادخال رقم الهاتف بشكل صحيح', 'warning');
            }
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonHtml = submitButton.innerHTML; // Store original button content
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>جاري التسجيل...';

            // Simulate form submission
            setTimeout(() => {
                showAlert(`تم تسجيلك بنجاح! سنتواصل معك قريباً على الرقم ${phoneInput.value}`, 'success'); // Use original input value in message
                this.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHtml; // Restore original button content
            }, 1500);
        });
    }

    // Optional: Update phone number input handling (remove formatting, keep digit-only)
    const phoneInputField = document.getElementById('phoneInput');
    if (phoneInputField) {
        phoneInputField.addEventListener('input', function (e) {
            // Remove any non-digit characters
            let value = e.target.value.replace(/\D/g, '');

            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            // Update the input field value without hyphens
            e.target.value = value;
        });
    }

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

    // Testimonials Show More functionality
    function testimonialsShowFunctionality() {
        const showMoreBtn = document.getElementById('showMoreBtn');
        const additionalTestimonials = document.querySelector('.additional-testimonials');

        if (showMoreBtn && additionalTestimonials) {
            showMoreBtn.addEventListener('click', function () {
                additionalTestimonials.classList.toggle('d-none');
                showMoreBtn.textContent = additionalTestimonials.classList.contains('d-none') ? 'عرض المزيد' : 'عرض أقل';
            });
        }
    };
    testimonialsShowFunctionality()
    //copyright
    document.querySelector('.copyright').textContent = `  جميع الحقوق محفوظة ${new Date().getFullYear()}©`;
});

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        <strong>${type === 'success' ? 'تم بنجاح!' : type === 'warning' ? 'تنبيه!' : 'خطأ!'}</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
