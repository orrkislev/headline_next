/**
 * Track time exploration events in Google Analytics
 * This is used as a conversion metric for Google Ads
 *
 * @param {string} action - The type of interaction (slider, arrow, summary_click, play)
 * @param {Object} params - Additional parameters to track
 */
export function trackTimeExploration(action, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_exploration', {
      action_type: action,
      ...params
    });
  }
}

/**
 * Track when user clicks through to a source article
 *
 * @param {string} source - The source name
 * @param {string} url - The article URL
 */
export function trackSourceClick(source, url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'source_click', {
      source_name: source,
      article_url: url
    });
  }
}
