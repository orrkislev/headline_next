The Search Console API provides programmatic access to much of the functionality of Google Search Console. Use the API to view, add, or remove properties and sitemaps, run advanced queries for Google Search results data for the properties that you manage in Search Console, and test individual pages.

This API is exposed as an HTTP REST service that you can call directly, or using one of our client libraries (recommended).

You must have appropriate access (owner, full, read) to any Google Search Console account that you wish to access using the API. 

/// 
Authorize Requests

bookmark_border

content_copy

Spark icon
AI-generated Key Takeaways
Search Console API auth requirements 
Every request your application sends to the Google Search Console API must include an authorization token. The token also identifies your application to Google.

About authorization protocols
Your application must use OAuth 2.0 to authorize requests. No other authorization protocols are supported. If your application uses Sign In With Google, some aspects of authorization are handled for you.

Authorizing requests with OAuth 2.0
All requests to the Google Search Console API must be authorized by an authenticated user.

The details of the authorization process, or "flow," for OAuth 2.0 vary somewhat depending on what kind of application you're writing. The following general process applies to all application types:

When you create your application, you register it using the Google API Console. Google then provides information you'll need later, such as a client ID and a client secret.
Activate the Google Search Console API in the Google API Console. (If the API isn't listed in the API Console, then skip this step.)
When your application needs access to user data, it asks Google for a particular scope of access.
Google displays a consent screen to the user, asking them to authorize your application to request some of their data.
If the user approves, then Google gives your application a short-lived access token.
Your application requests user data, attaching the access token to the request.
If Google determines that your request and the token are valid, it returns the requested data.
Some flows include additional steps, such as using refresh tokens to acquire new access tokens. For detailed information about flows for various types of applications, see Google's OAuth 2.0 documentation.

Here's the OAuth 2.0 scope information for the Google Search Console API:

Scope	Meaning
https://www.googleapis.com/auth/webmasters	Read/write access.
https://www.googleapis.com/auth/webmasters.readonly	Read-only access.
To request access using OAuth 2.0, your application needs the scope information, as well as information that Google supplies when you register your application (such as the client ID and the client secret).

Tip: The Google APIs client libraries can handle some of the authorization process for you. They are available for a variety of programming languages; check the page with libraries and samples for more details.

Search Console Testing Tools API auth requirements 
Note: The Search Console Testing Tools API requires a key rather than an OAuth token.
Acquiring and using an API key 
Requests to the Search Console Testing Tools API for public data must be accompanied by an identifier, which can be an API key or an access token.

To acquire an API key:

Open the Credentials page in the API Console.
This API supports two types of credentials. Create whichever credentials are appropriate for your project:
OAuth 2.0: Whenever your application requests private user data, it must send an OAuth 2.0 token along with the request. Your application first sends a client ID and, possibly, a client secret to obtain a token. You can generate OAuth 2.0 credentials for web applications, service accounts, or installed applications.

For more information, see the OAuth 2.0 documentation.

API keys: A request that does not provide an OAuth 2.0 token must send an API key. The key identifies your project and provides API access, quota, and reports.

The API supports several types of restrictions on API keys. If the API key that you need doesn't already exist, then create an API key in the Console by clicking Create credentials  > API key. You can restrict the key before using it in production by clicking Restrict key and selecting one of the Restrictions.

To keep your API keys secure, follow the best practices for securely using API keys.

After you have an API key, your application can append the query parameter key=yourAPIKey to all request URLs.

The API key is safe for embedding in URLs; it doesn't need any encoding.

//