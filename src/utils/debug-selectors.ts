/**
 * Runtime DOM Selector Validation
 * 
 * This browser utility checks for the presence of expected DOM elements at runtime.
 * Unlike the static analyzer (scripts/check-selectors.js), this tool:
 * 1. Validates elements in the live DOM, including dynamically created elements
 * 2. Only checks specific selectors that are expected on the current page
 * 3. Can be run at different states in your application (e.g., after modal opens)
 * 
 * Usage: 
 * - Import and call in browser console: import { validateSelectors } from './utils/debug-selectors'; validateSelectors();
 * - Or call specific validation groups: validateContactForm(), validateAdminElements(), etc.
 */

type ValidationReport = {
    found: string[];
    missing: string[];
};

/**
 * Checks if a specific element exists in the current DOM
 */
function validateElement(selector: string, type: 'ID' | 'CLASS', report: ValidationReport): void {
    let element;
    if (type === 'ID') {
        element = document.getElementById(selector);
    } else {
        element = document.getElementsByClassName(selector)[0];
    }
    
    if (element) {
        report.found.push(`${type}: ${selector}`);
    } else {
        report.missing.push(`${type}: ${selector}`);
    }
}

/**
 * Validates common blog components expected on most pages
 */
export function validateCommonElements(): ValidationReport {
    const report: ValidationReport = { found: [], missing: [] };
    
    // Blog containers
    validateElement('blog', 'ID', report);
    validateElement('hidden-posts', 'ID', report);
    validateElement('load-more-btn', 'ID', report);
    
    // Common UI elements
    validateElement('close-popup', 'CLASS', report);
    validateElement('close-modal', 'CLASS', report);
    validateElement('modal', 'CLASS', report);
    
    logReport('COMMON ELEMENTS', report);
    return report;
}

/**
 * Validates post creation related elements
 */
export function validatePostElements(): ValidationReport {
    const report: ValidationReport = { found: [], missing: [] };
    
    validateElement('post-title', 'ID', report);
    validateElement('post-author', 'ID', report);
    validateElement('post-content', 'ID', report);
    validateElement('post-image', 'ID', report);
    validateElement('image-preview', 'ID', report);
    
    logReport('POST ELEMENTS', report);
    return report;
}

/**
 * Validates contact form elements
 */
export function validateContactForm(): ValidationReport {
    const report: ValidationReport = { found: [], missing: [] };
    
    validateElement('contact-btn', 'ID', report);
    validateElement('contact-popup', 'ID', report);
    validateElement('contact-form', 'ID', report);
    validateElement('name', 'ID', report);
    validateElement('email', 'ID', report);
    validateElement('message', 'ID', report);
    
    logReport('CONTACT FORM', report);
    return report;
}

/**
 * Validates about section elements
 */
export function validateAboutSection(): ValidationReport {
    const report: ValidationReport = { found: [], missing: [] };
    
    validateElement('about-btn', 'ID', report);
    validateElement('about-popup', 'ID', report);
    
    logReport('ABOUT SECTION', report);
    return report;
}

/**
 * Validates admin-specific elements
 */
export function validateAdminElements(): ValidationReport {
    const report: ValidationReport = { found: [], missing: [] };
    
    validateElement('posts-table', 'ID', report);
    validateElement('posts-body', 'ID', report);
    validateElement('search', 'ID', report);
    validateElement('sort-by', 'ID', report);
    validateElement('post-modal', 'ID', report);
    
    logReport('ADMIN ELEMENTS', report);
    return report;
}

/**
 * Helper to log the validation report
 */
function logReport(title: string, report: ValidationReport): void {
    console.log(`=== ${title} VALIDATION REPORT ===`);
    console.log(`✅ Found: ${report.found.length}`);
    console.log(report.found);
    console.log(`❌ Missing: ${report.missing.length}`);
    console.log(report.missing);
}

/**
 * Main validation function that checks all selectors
 * Can be called at any point during runtime to validate the current DOM state
 */
export function validateSelectors(): ValidationReport {
    console.log('=== RUNTIME DOM SELECTOR VALIDATION ===');
    console.log('Validating DOM elements in the current page state...');
    
    const allReports = {
        common: validateCommonElements(),
        posts: validatePostElements(),
        contact: validateContactForm(),
        about: validateAboutSection(),
        admin: validateAdminElements()
    };
    
    // Combine all reports
    const combinedReport: ValidationReport = { 
        found: [], 
        missing: [] 
    };
    
    Object.values(allReports).forEach(report => {
        combinedReport.found.push(...report.found);
        combinedReport.missing.push(...report.missing);
    });
    
    console.log('\n=== OVERALL VALIDATION SUMMARY ===');
    console.log(`✅ Total found elements: ${combinedReport.found.length}`);
    console.log(`❌ Total missing elements: ${combinedReport.missing.length}`);
    
    if (combinedReport.missing.length > 0) {
        console.warn('\n⚠️ Some expected DOM elements are missing. This may cause JavaScript errors.');
    }
    
    return combinedReport;
}