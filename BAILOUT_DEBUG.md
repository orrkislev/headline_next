# Bailout to Client-Side Rendering Debug Log

## Issue Description
The date page (`/[locale]/[country]/[date]`) intermittently shows bailout to client-side rendering in production:
```html
<!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->
```

## Key Characteristics
- **Never happens in dev server** - only in production (Vercel)
- **Intermittent behavior** - same URL sometimes works, sometimes fails
- **Country page works fine** - only date page affected
- **Exactly 3 bailout templates** appear in failed renders
- **All metadata and JSON-LD missing** when bailout occurs

## Attempted Fixes (All Failed)

### 1. Parameter Handling Consistency
**Theory**: Inconsistent `await params` usage between pages
**Attempted**:
- Changed `generateMetadata` to match country page pattern
- Unified parameter destructuring approach
**Result**: ❌ Still failed

### 2. Timezone Inconsistency
**Theory**: Server/client timezone differences causing hydration mismatch
**Attempted**:
- Removed `new Date().toLocaleString("en-US", { timeZone: timezone })`
- Used simple UTC date comparisons
**Result**: ❌ Still failed

### 3. Missing userCountry Prop
**Theory**: `undefined` userCountry in date page vs defined in country page
**Attempted**:
- Added `userCountry: 'us'` default to date page
- Fixed TranslateToggle conditional logic
**Result**: ❌ Still failed

### 4. Caching Strategy Alignment
**Theory**: Different revalidate settings causing static/dynamic conflicts
**Attempted**:
- Changed date page from `revalidate: false` to `revalidate: 900`
- Matched country page caching behavior
**Result**: ❌ Still failed

### 5. Date Object Serialization
**Theory**: Passing Date objects as props causes server/client mismatch
**Attempted**:
- Changed `currentDate={parsedDate}` to `currentDate={date}` (string)
- Updated DateLinksData to parse date strings consistently
**Result**: ❌ Still failed

### 6. Component Isolation Testing
**Theory**: One of the navigation components causing bailout
**Attempted**:
- Commented out ArchiveLinksData, CountryLinksData, DateLinksData
- Tested with only CountryPageContent
**Result**: ❌ Still failed (bailout persists even with minimal render)

### 7. JSON-LD Script Component
**Theory**: LdJson component causing serialization issues
**Attempted**:
- Removed LdJson component entirely
**Result**: ❌ Still failed

### 8. Mobile Detection Hook
**Theory**: useMobile hook causing hydration mismatch with loader
**Attempted**:
- Removed conditional loader rendering
- Modified effectiveLocale logic
**Result**: ❌ Still failed, and breaks UX (reverted)

## Current State
- **Reverted to original commit**: `ba778aa` (before any bailout fixes)
- **Added console logging** with emoji prefixes to track execution
- **Need to identify**: Exact point where bailout occurs

## Debugging Strategy
Using console.log with unique prefixes:
- 🔍 `[DATE-META]` - generateMetadata execution
- 🎯 `[DATE-PAGE]` - Main page component
- 📅 `[DATELINKS]` - DateLinksData rendering
- 🏠 `[CONTENT]` - CountryPageContent client component

## Key Differences (Date vs Country Page)
1. **Data fetching**: Date page fetches `daySummary`, country page doesn't
2. **Props passed**: Date page passes `pageDate`, country page doesn't
3. **Headers usage**: Country page uses `headers().get('x-user-country')`, date page doesn't
4. **Conditional rendering**: Date page has `{pageDate && <DateNavigator />}`
5. **Redirect logic**: Date page has more complex timezone-based redirects

## Next Steps
1. Deploy with console logging
2. Check browser console during bailout
3. Identify where execution stops or data diverges
4. Focus on server vs client data consistency