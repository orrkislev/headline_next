Using the Indexing API

bookmark_border
You can use the Indexing API to tell Google to update or remove job posting or livestreaming event pages from the Google index. The requests must specify the location of a web page. You can also get the status of notifications that you have sent to Google. The Indexing API can only be used to crawl pages with either JobPosting or BroadcastEvent embedded in a VideoObject.

Guidelines
The following guidelines apply when using the Indexing API.

Our spam policies apply to content submitted with the Indexing API.
All calls to https://indexing.googleapis.com/v3/urlNotifications:publish MUST use "application/json" as the Content-Type header.
You can submit one URL only in the body of an update request, or combine up to 100 requests in a batch, as described in Send batch indexing requests. Don't circumvent our submission limits, such as by using multiple accounts.
The request body in these examples is the value of the content variable that is used in the access token examples.
What you can do with the API
When you send a request to the Indexing API, define the location of a standalone web page to notify Google that it can crawl or remove this page from its index.

The following examples show the actions that you can perform with the Indexing API:

Examples
Update a URL	
Send the following HTTP POST request to the https://indexing.googleapis.com/v3/urlNotifications:publish endpoint. For example:


{
  "url": "https://careers.google.com/jobs/google/technical-writer",
  "type": "URL_UPDATED"
}
Remove a URL	
Send the following HTTP POST request to the https://indexing.googleapis.com/v3/urlNotifications:publish endpoint. For example:


{
  "url": "https://careers.google.com/jobs/google/technical-writer",
  "type": "URL_DELETED"
}
Get notification status	
Send a HTTP GET request to the https://indexing.googleapis.com/v3/urlNotifications/metadata endpoint.

Parameters
The following table describes the fields needed for all methods (update and remove a URL):

Fields
url	
Required

The fully-qualified location of the item that you want to update or remove.

type	
Required

The type of the notification that you submitted.

Update a URL
To notify Google of a new URL to crawl or that content at a previously-submitted URL has been updated, follow these steps:

Submit an HTTP POST request to the following endpoint:

https://indexing.googleapis.com/v3/urlNotifications:publish
In the body of the request, specify the location of the page using the following syntax:

{
  "url": "CONTENT_LOCATION",
  "type": "URL_UPDATED"
}
Google responds to successful Indexing API calls with the an HTTP 200. An HTTP 200 response means that Google may try to recrawl this URL soon. The body of the response contains a UrlNotificationMetadata object, whose fields correspond to those returned by a notification status request.
If you don't receive an HTTP 200 response, see the Indexing API specific errors.
If the page's contents change, submit another update notification, which should trigger Google to recrawl the page.
The Indexing API provides a default quota for testing. To use the API, request approval and quota.
Remove a URL
After you delete a page from your servers or add <meta name="robots" content="noindex" /> tag in the <head> section of a given page, notify Google so that we can remove the page from our index and so that we don't attempt to crawl and index the page again. Before you request removal, the URL must return a 404 or 410 status code or the page must contain <meta name="robots" content="noindex" /> meta tag.

To request removal from our index, follow these steps:

Submit a POST request to the following endpoint:

https://indexing.googleapis.com/v3/urlNotifications:publish
Specify the URL that you want to remove in the body of the request using the following syntax:

{
  "url": "CONTENT_LOCATION",
  "type": "URL_DELETED"
}
For example:


{
  "url": "https://careers.google.com/jobs/google/technical-writer",
  "type": "URL_DELETED"
}
Google responds to successful Indexing API calls with the an HTTP 200. An HTTP 200 response means that Google may remove this URL from the index. The body of the response contains a UrlNotificationMetadata object, whose fields correspond to those returned by a notification status request.
If you don't receive an HTTP 200 response, see the Indexing API specific errors.
The Indexing API provides a default quota for testing. To use the API, request approval and quota.
Get notification status
You can use the Indexing API to check the last time Google received each kind of notification for a given URL. The GET request doesn't tell you when Google indexes or removes a URL; it only returns whether you successfully submitted a request.

To get the status of a notification, follow these steps:

Submit a GET request to the following endpoint. The URLs you specify must be URL-encoded. For example, replace : (colons) with %3A and / (forward slashes) with %2F.

https://indexing.googleapis.com/v3/urlNotifications/metadata?url=ENCODED_URL
For example:


GET https://indexing.googleapis.com/v3/urlNotifications/metadata?url=https%3A%2F%2Fcareers.google.com%2Fjobs%2Fgoogle%2Ftechnical-writer
The Indexing API responds with an HTTP 200 message, with a payload that contains details about the notification. The following example shows the body of a response that contains information about an update and delete notification:

{
  url: "http://foo.com",
  latest_update: {
    type: "URL_UPDATED",
    notify_time: "2017-07-31T19:30:54.524457662Z"
  },
  latest_remove: {
    type: "URL_DELETED",
    notify_time: "2017-08-31T19:30:54.524457662Z"
  }
}
If you don't receive an HTTP 200 response, see the Indexing API specific errors.
The Indexing API provides a default quota for testing. To use the API, request approval and quota.
Send batch indexing requests
To reduce the number of HTTP connections your client has to make, you can combine up to 100 calls to the Indexing API into a single HTTP request. You do this in a multi-part request called a batch.

Quota is counted at the URL level. For example, if you combine 10 requests into a single HTTP request, it still counts as 10 requests for your quota. Learn more about how to request quota.
When sending a batch request to the Indexing API, use the following endpoint:


https://indexing.googleapis.com/batch
The body of a batch request contains multiple parts. Each part is itself a complete HTTP request, with its own verb, URL, headers, and body. Each part within a batch request cannot exceed 1MB in size.

To make it easier for you to send batch requests, Google's API Client Libraries support batching. For more information about batching with the client libraries, see the following language-specific pages:

Java
Python
JavaScript
PHP
.NET
If you use the batching examples on these pages, you may need to update your code to reflect the implementation requirements described in Get an access token.

The following example batch request message body includes an update notification and a removal notification:


POST /batch HTTP/1.1
Host: indexing.googleapis.com
Content-Length: content_length
Content-Type: multipart/mixed; boundary="===============7330845974216740156=="
Authorization: Bearer oauth2_token

--===============7330845974216740156==
Content-Type: application/http
Content-Transfer-Encoding: binary
Content-ID: <b29c5de2-0db4-490b-b421-6a51b598bd22+2>

POST /v3/urlNotifications:publish [1]
Content-Type: application/json
accept: application/json
content-length: 58

{ "url": "http://example.com/jobs/42", "type": "URL_UPDATED" }
--===============7330845974216740156==
Content-Type: application/http
Content-Transfer-Encoding: binary
Content-ID: <b29c5de2-0db4-490b-b421-6a51b598bd22+1>

POST /v3/urlNotifications:publish [2]
Content-Type: application/json
accept: application/json
content-length: 75

{ "url": "http://example.com/widgets/1", "type": "URL_UPDATED" }
--===============7330845974216740156==
Content-Type: application/http
Content-Transfer-Encoding: binary
Content-ID: <b29c5de2-0db4-490b-b421-6a51b598bd22+3>

POST /v3/urlNotifications:publish [3]
Content-Type: application/json
accept: application/json
content-length: 58

{ "url": "http://example.com/jobs/43", "type": "URL_DELETED" }
--===============7330845974216740156==
For more information, see Sending Batch Requests. 

////////// 
Indexing API Errors

bookmark_border
This document identifies some of the error codes and messages that Google APIs return. Specifically, the errors listed here are in the global, or default, domain for Google APIs. Many APIs also define their own domains, which identify API-specific errors that are not in the global domain. For those errors, the value of the domain property in the JSON response will be an API-specific value, such as youtube.parameter.

This page lists errors by their HTTP status codes as defined in RFC 7231.

The sample JSON response below demonstrates how a global error is communicated:


{
 "error": {
  "errors": [
   {
    "domain": "global",
    "reason": "invalidParameter",
    "message": "Invalid string value: 'asdf'. Allowed values: [mostpopular]",
    "locationType": "parameter",
    "location": "chart"
   }
  ],
  "code": 400,
  "message": "Invalid string value: 'asdf'. Allowed values: [mostpopular]"
 }
}
Errors
MOVED_PERMANENTLY (301)
Error code	Description
movedPermanently	This request and future requests for the same operation have to be sent to the URL specified in the Location header of this response instead of to the URL to which this request was sent.
SEE_OTHER (303)
Error code	Description
seeOther	Your request was processed successfully. To obtain your response, send a GET request to the URL specified in the Location header.
mediaDownloadRedirect	Your request was processed successfully. To obtain your response, send a GET request to the URL specified in the Location header.
NOT_MODIFIED (304)
Error code	Description
notModified	The condition set for an If-None-Match header was not met. This response indicates that the requested document has not been modified and that a cached response should be retrieved. Check the value of the If-None-Match HTTP request header.
TEMPORARY_REDIRECT (307)
Error code	Description
temporaryRedirect	To have your request processed, resend it to the URL specified in the Location header of this response.
BAD_REQUEST (400)
Error code	Description
badRequest	The API request is invalid or improperly formed. Consequently, the API server could not understand the request.
badBinaryDomainRequest	The binary domain request is invalid.
badContent	The content type of the request data or the content type of a part of a multipart request is not supported.
badLockedDomainRequest	The locked domain request is invalid.
corsRequestWithXOrigin	The CORS request contains an XD3 X-Origin header, which is indicative of a bad CORS request.
endpointConstraintMismatch	The request failed because it did not match the specified API. Check the value of the URL path to make sure it is correct.
invalid	The request failed because it contained an invalid value. The value could be a parameter value, a header value, or a property value.
invalidAltValue	The alt parameter value specifies an unknown output format.
invalidHeader	The request failed because it contained an invalid header.
invalidParameter	The request failed because it contained an invalid parameter or parameter value. Review the API documentation to determine which parameters are valid for your request.
invalidQuery	The request is invalid. Check the API documentation to determine what parameters are supported for the request and to see if the request contains an invalid combination of parameters or an invalid parameter value. Check the value of the q request parameter.
keyExpired	The API key provided in the request expired, which means the API server is unable to check the quota limit for the application making the request. Check the Google Developers Console for more information or to obtain a new key.
keyInvalid	The API key provided in the request is invalid, which means the API server is unable to check the quota limit for the application making the request. Use the Google Developers Console to find your API key or to obtain one.
lockedDomainCreationFailure	The OAuth token was received in the query string, which this API forbids for response formats other than JSON or XML. If possible, try sending the OAuth token in the Authorization header instead.
notDownload	Only media downloads requests can be sent to /download/* URL paths. Resend the request to the same path, but without the /download prefix.
notUpload	The request failed because it is not an upload request, and only upload requests can be sent to /upload/* URIs. Try resending the request to the same path, but without the /upload prefix.
parseError	The API server cannot parse the request body.
required	The API request is missing required information. The required information could be a parameter or resource property.
tooManyParts	The multipart request failed because it contains too many parts
unknownApi	The API that the request is calling is not recognized.
unsupportedMediaProtocol	The client is using an unsupported media protocol.
unsupportedOutputFormat	The alt parameter value specifies an output format that is not supported for this service. Check the value of the alt request parameter.
wrongUrlForUpload	The request is an upload request, but it failed because it was not sent to the proper URI. Upload requests must be sent to URIs that contain the /upload/* prefix. Try resending the request to the same path, but with the /upload prefix.
UNAUTHORIZED (401)
Error code	Description
unauthorized	The user is not authorized to make the request.
authError	The authorization credentials provided for the request are invalid. Check the value of the Authorization HTTP request header.
expired	Session Expired. Check the value of the Authorization HTTP request header.
lockedDomainExpired	The request failed because a previously valid locked domain has expired.
required	The user must be logged in to make this API request. Check the value of the Authorization HTTP request header.
PAYMENT_REQUIRED (402)
Error code	Description
dailyLimitExceeded402	A daily budget limit set by the developer has been reached.
quotaExceeded402	The requested operation requires more resources than the quota allows. Payment is required to complete the operation.
user402	The requested operation requires some kind of payment from the authenticated user.
FORBIDDEN (403)
Error code	Description
forbidden	The requested operation is forbidden and cannot be completed.
accessNotConfigured	Your project is not configured to access this API. Please use the Google Developers Console to activate the API for your project.
accessNotConfigured	The project has been blocked due to abuse. See http://support.google.com/code/go/developer_compliance.
accessNotConfigured	The project has been marked for deletion.
accountDeleted	The user account associated with the request's authorization credentials has been deleted. Check the value of the Authorization HTTP request header.
accountDisabled	The user account associated with the request's authorization credentials has been disabled. Check the value of the Authorization HTTP request header.
accountUnverified	The email address for the user making the request has not been verified. Check the value of the Authorization HTTP request header.
concurrentLimitExceeded	The request failed because a concurrent usage limit has been reached.
dailyLimitExceeded	A daily quota limit for the API has been reached.
dailyLimitExceeded	The daily quota limit has been reached, and the project has been blocked due to abuse. See the Google APIs compliance support form to help resolve the issue.
dailyLimitExceededUnreg	The request failed because a daily limit for unauthenticated API use has been hit. Continued use of the API requires signup through the Google Developers Console.
downloadServiceForbidden	The API does not support a download service.
insufficientAudience	The request cannot be completed for this audience.
insufficientAuthorizedParty	The request cannot be completed for this application.
insufficientPermissions	The authenticated user does not have sufficient permissions to execute this request.
limitExceeded	The request cannot be completed due to access or rate limitations.
lockedDomainForbidden	This API does not support locked domains.
quotaExceeded	The requested operation requires more resources than the quota allows.
rateLimitExceeded	Too many requests have been sent within a given time span.
rateLimitExceededUnreg	A rate limit has been exceeded and you must register your application to be able to continue calling the API. Please sign up using the Google Developers Console.
responseTooLarge	The requested resource is too large to return.
servingLimitExceeded	The overall rate limit specified for the API has already been reached.
sslRequired	SSL is required to perform this operation.
unknownAuth	The API server does not recognize the authorization scheme used for the request. Check the value of the Authorization HTTP request header.
userRateLimitExceeded	The request failed because a per-user rate limit has been reached.
userRateLimitExceededUnreg	The request failed because a per-user rate limit has been reached, and the client developer was not identified in the request. Please use the Google Developer Console (https://console.developers.google.com) to create a project for your application.
variableTermExpiredDailyExceeded	The request failed because a variable term quota expired and a daily limit was reached.
variableTermLimitExceeded	The request failed because a variable term quota limit was reached.
NOT_FOUND (404)
Error code	Description
notFound	The requested operation failed because a resource associated with the request could not be found.
notFound	A resource associated with the request could not be found. If you have not used this API in the last two weeks, please re-deploy the App Engine app and try calling it again.
unsupportedProtocol	The protocol used in the request is not supported.
METHOD_NOT_ALLOWED (405)
Error code	Description
httpMethodNotAllowed	The HTTP method associated with the request is not supported.
CONFLICT (409)
Error code	Description
conflict	The API request cannot be completed because the requested operation would conflict with an existing item. For example, a request that tries to create a duplicate item would create a conflict, though duplicate items are typically identified with more specific errors.
duplicate	The requested operation failed because it tried to create a resource that already exists.
GONE (410)
Error code	Description
deleted	The request failed because the resource associated with the request has been deleted
PRECONDITION_FAILED (412)
Error code	Description
conditionNotMet	The condition set in the request's If-Match or If-None-Match HTTP request header was not met. See the ETag section of the HTTP specification for details. Check the value of the If-Match HTTP request header.
REQUEST_ENTITY_TOO_LARGE (413)
Error code	Description
backendRequestTooLarge	The request is too large.
batchSizeTooLarge	The batch request contains too many elements.
uploadTooLarge	The request failed because the data sent in the request is too large.
REQUESTED_RANGE_NOT_SATISFIABLE (416)
Error code	Description
requestedRangeNotSatisfiable	The request specified a range that cannot be satisfied.
EXPECTATION_FAILED (417)
Error code	Description
expectationFailed	A client expectation cannot be met by the server.
PRECONDITION_REQUIRED (428)
Error code	Description
preconditionRequired	The request requires a precondition that is not provided. For this request to succeed, you need to provide either an If-Match or If-None-Match header with the request.
TOO_MANY_REQUESTS (429)
Error code	Description
rateLimitExceeded	Too many requests have been sent within a given time span.
INTERNAL_SERVER_ERROR (500)
Error code	Description
internalError	The request failed due to an internal error.
NOT_IMPLEMENTED (501)
Error code	Description
notImplemented	The requested operation has not been implemented.
unsupportedMethod	The request failed because it is trying to execute an unknown method or operation.
SERVICE_UNAVAILABLE (503)
Error code	Description
backendError	A backend error occurred.
backendNotConnected	The request failed due to a connection error.
notReady	The API server is not ready to accept requests.
Indexing API-specific errors
In all cases below, the request was rejected and Google doesn't crawl the URL. This also applies to the core error messages.

BAD_REQUEST (400)
Error message	Description
Missing attribute. 'url' attribute is required.	User did not set the URL in their request.
Invalid attribute. 'url' is not in standard URL format	User set a URL that does not look like a URL, for example, "abcd"
Unknown type. 'type' attribute is required and must be 'URL_REMOVED' or 'URL_UPDATED'.	User did not set the notification type.
Invalid value at 'url_notification.type' (TYPE_ENUM)	User set the notification type to something other than URL_REMOVED or URL_UPDATED.
FORBIDDEN (403)
Error message	Description
Permission denied. Failed to verify the URL ownership.	User did not complete the Ownership Verification process or is trying to update a URL that they do not own.
TOO_MANY_REQUESTS (429)
Error message	Description
Insufficient tokens for quota 'indexing.googleapis.com/default_requests'