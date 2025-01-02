/**
 * Waits for an element to exist with configurable timeout and interval
 * @param {string} selector - Element selector to wait for
 * @param {Object} options - Configuration options
 * @param {number} options.timeout - Maximum time to wait in milliseconds (default: 60000)
 * @param {number} options.interval - Time between retries in milliseconds (default: 1000)
 * @returns {Cypress.Chainable<JQuery>} The found element
 */
Cypress.Commands.add('hitUntilElementExist', (selector, options = {}) => {
    const defaultOptions = {
        timeout: 60000,    // Default 60 second timeout
        interval: 1000     // Check every 1 second
    };
    
    const opts = { ...defaultOptions, ...options };
    
    return cy.wrap(null, { timeout: opts.timeout }).then(() => {
        function hitUntilElementExist() {
            return cy.document({ timeout: opts.interval }).then(doc => {
                const element = doc.querySelector(selector);
                if (element) {
                    return cy.wrap(element);
                }
                cy.log(`Element ${selector} not found. Waiting ${opts.interval}ms before retry...`);
                return cy.wait(opts.interval).then(hitUntilElementExist);
            });
        }
        
        return hitUntilElementExist();
    });
});