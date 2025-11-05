/**
 * Track time exploration events in Google Analytics
 * This is used as a conversion metric for Google Ads
 *
 * Only fires once per session to prevent over-optimization in Google Ads.
 * This ensures conversions (time_exploration) never exceed ad clicks.
 *
 * @param {string} action - The type of interaction (slider, arrow, summary_click, play)
 * @param {Object} params - Additional parameters to track
 */
export function trackTimeExploration(action, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Check if we've already tracked time exploration in this session
    const sessionKey = 'time_exploration_tracked';

    if (sessionStorage.getItem(sessionKey)) {
      // Already tracked in this session, don't track again
      return;
    }

    // Mark as tracked for this session
    sessionStorage.setItem(sessionKey, 'true');

    // Track the event
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
