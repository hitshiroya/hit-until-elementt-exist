# hit-until-element-exist

## _Cypress Custom Command_

hitUntilElementExist is a custom Cypress command that waits for an element to appear in the DOM. You can configure the timeout and the interval for retries. It's useful when you want to wait for dynamic content to load on a page, ensuring that the element exists before interacting with it.

## Command Signature
```javascript
Cypress.Commands.add('hitUntilElementExist', (selector, options = {}) => { ... });
```
## Parameters:

- **selector (string)**: The CSS selector of the element to wait for.
- **options (object)**: Configuration options to customize the behavior.
  - **timeout (number, default: `60000`)**: The maximum time to wait in milliseconds. If the element is not found within this time, the command will fail.
  - **interval (number, default: `1000`)**: The time interval in milliseconds between each retry to check if the element exists.

## Return Value:

- A **Cypress.Chainable<JQuery>** that wraps the found element, allowing you to interact with it after it has been located.

**Example Usage**:

```javascript
// Wait for an element with selector '#my-element' to appear in the DOM, 
// with a 10-second timeout and 500ms interval between retries
cy.hitUntilElementExist('#my-element', { timeout: 10000, interval: 500 })
    .should('be.visible');  // Perform assertion once element is found
```

**How It Works**:

 **`timeout`**: The function will keep checking for the element until the specified timeout is reached. By default, it will wait for 60 seconds.
 **`interval`**: This defines how often the command will check for the element (in milliseconds). The default is every 1000ms (1 second).
- The function uses `document.querySelector()` to check for the element. If the element is not found, it logs a message and waits for the specified interval before retrying.
- If the element is found, the command returns the element wrapped in Cypress commands, so you can chain further assertions or interactions.

**Why Use This Command**:

- **Handling Dynamic Content**: Useful in situations where elements might take some time to load due to async processes (e.g., API calls, animations, etc.).
- **Customizable Retries**: You can easily adjust the retry interval and timeout based on your needs.
- **Robust and Configurable**: Works with any element on the page, allowing you to add specific waiting logic for dynamic pages.
