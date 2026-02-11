# Barcode Admin Dashboard
Why RTK + RTK Query is the right choice here

Centralized auth state (no prop drilling)
Automatic caching & garbage collection (memory-safe)
Built-in loading/error states
Token handling via middleware
Scales cleanly as APIs grow
Zero boilerplate compared to old Redux

Memory & Performance Optimization (Important)
RTK Query already:

Auto-cleans unused cache
Deduplicates requests
Cancels inflight calls on unmount

keepUnusedDataFor: 60, // seconds
refetchOnFocus: true,
refetchOnReconnect: true

Why This Scales Perfectly

Add new APIs → injectEndpoints
No duplicated loading/error logic
Auth logic isolated
Zero memory leaks
Works with SSR, micro-frontends

Why This Is Enterprise-Grade

✔ RTK Query cache cleanup
✔ Zero memory leaks
✔ Secure cookie support
✔ Centralized auth
✔ Easy role-based access
✔ Future-proof API scaling