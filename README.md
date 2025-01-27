# `relative-time-element`

A lightweight and dynamic custom HTML element to display human-readable relative time differences (e.g., "5 minutes ago" or "2 days hence") with automatic live updates. The element also provides the exact timestamp in its `title` attribute for clarity.

## Features
- Displays **only relative times** like "just now," "3 hours ago," or "1 month hence" in the element's text.
- The exact timestamp is stored in the element's `title` attribute.
- Supports customizable locales and time zones for formatting the `title`.
- Automatically updates as time passes.

---

## Installation

### Via NPM
```bash
npm install relative-time-element
```

### Via CDN
Include the script directly in your HTML using a CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/relative-time-element/out/index.js"></script>
```

---

## Usage

### Basic Example
Simply use the `<relative-time>` element with the `is="relative-time"` attribute and a `datetime` attribute.

```html
<time is="relative-time" datetime="2025-01-01T12:00:00Z"></time>
```

- **Displayed Text**: `3 days ago`
- **Title (on hover)**: `Wednesday, January 1, 2025 at 12:00:00 PM UTC`

### Advanced Example with Locale and Time Zone
Customize the display by specifying the `locale` and `timezone` attributes:

```html
<time is="relative-time" 
      datetime="2025-01-01T12:00:00Z" 
      locale="fr-FR" 
      timezone="Europe/Paris">
</time>
```

- **Displayed Text**: `3 days ago`
- **Title (on hover)**: `mercredi 1 janvier 2025 à 13:00:00 heure d’Europe centrale`

**Note**: The `locale` and `timezone` attributes affect only the `title` attribute, not the relative time text.

---

## API

### Attributes
| Attribute  | Description                                                                                     | Default           |
|------------|-------------------------------------------------------------------------------------------------|-------------------|
| `datetime` | The ISO 8601 timestamp to display as a relative time (e.g., `2025-01-01T12:00:00Z`).            | **Required**      |
| `locale`   | The [BCP 47 locale][BCP47] for formatting the `title` attribute.                                | Browser default   |
| `timezone` | The [IANA time zone][IANA] used for the `title` attribute formatting.                           | Browser time zone |

[BCP47]: https://en.wikipedia.org/wiki/IETF_language_tag
[IANA]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
---
---

## Roadmap / Future Plans

Here are some exciting features planned for future versions:

1. **Multilanguage Support**  
   Add built-in support for displaying relative times in multiple languages (e.g., `2 días antes` for Spanish).

2. **Customizable Styles for "Ago" and "Hence" using `:state` CSS Selector**  
   Provide CSS hooks or attributes to differentiate colors or styles for past and future times.  
   Example:  
   ```css
   relative-time:state(past) {
       color: blue;
   }
   relative-time:state(future) {
       color: orange;
   }
   ```

3. **Performance Optimization**  
   Improve efficiency by batching updates for elements that need frequent changes, reducing unnecessary re-renders.

4. **Custom Update Intervals**  
   Allow developers to set custom intervals for updates to balance performance and precision.

5. **Event Listeners for Updates**  
   Add events (e.g., `time-update`) that fire whenever the displayed time is updated, allowing advanced integrations.  
   Example:  
   ```javascript
   document.querySelector('relative-time').addEventListener('time-update', (e) => {
       console.log('Updated time:', e.detail);
   });
   ```

6. **Built-in Accessibility Enhancements**  
   Ensure full compliance with ARIA standards for accessibility, including better support for screen readers.

---

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests on the [GitLab repository](https://gitlab.com/DaniBr/relative-time-element).  

We also maintain a mirror on [GitHub](https://github.com/DaniBr/relative-time-element) for those who prefer using it. Contributions via GitHub are equally appreciated.  

---

## License

This project is licensed under the [MIT License](LICENSE).
