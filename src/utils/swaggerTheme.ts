export const darkTheme = {
  filename: 'theme.css',
  content: `
    :root {
      --bg-color: #1a1a1a;
      --text-color: #f0f0f0;
      --header-bg: #2d2d2d;
      --header-text: #ffffff;
      --highlight-color: #3498db;
    }
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
    }
    .topbar {
    visibility: hidden;
    height: 0;
    }
    .swagger-ui .opblock .opblock-summary-path,
    .swagger-ui .tab li button.tablinks {
      color: var(--highlight-color);
    }
    .swagger-ui .opblock-body {
      color: var(--text-color);
    }
    .swagger-ui {
    color: var(--text-color);
    }
    .swagger-ui .scheme-container{
      background-color: var(--bg-color);
      color: var(--text-color);
      }
    .swagger-ui .topbar {
      background-color: var(--header-bg);
    }
    .swagger-ui .download-url-input {
      color: var(--highlight-color);
    }
    .swagger-ui .info .title,
    .swagger-ui .opblock-tag,
    .swagger-ui .opblock .opblock-summary-operation-id,
    .swagger-ui .opblock .opblock-summary-path,
    .swagger-ui .opblock .opblock-summary-description,
    .swagger-ui .info .title,
    .swagger-ui .opblock-title_normal p,
    .swagger-ui .opblock-title_large p,
    .swagger-ui .opblock-title_medium p,
    .swagger-ui .opblock-title_small p,
    .swagger-ui table thead tr td, .swagger-ui table thead tr th ,
    .swagger-ui .response-col_status,
    .swagger-ui .opblock-description-wrapper p,
    .swagger-ui .response-col_links,
    .swagger-ui .info p {
      color: var(--text-color);
    }
    .swagger-ui .opblock {
      background-color: #2d2d2d;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      margin-bottom: 16px;
    }
    .swagger-ui .opblock .opblock-summary {
      border-bottom: 1px solid #444;
    }
    .swagger-ui .btn {
      background-color: var(--highlight-color);
      color: white;
    }
    .swagger-ui select {
      background-color: #333;
      color: var(--text-color);
      border: 1px solid #555;
    }
    .swagger-ui input {
      background-color: #333;
      color: var(--text-color);
      border: 1px solid #555;
    }
  `,
};
