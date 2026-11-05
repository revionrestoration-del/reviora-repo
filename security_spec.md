# Security Specification for REVIORA RESTORATION

## 1. Data Invariants
- Public users can view only active services (`resource.data.isActive == true`), active categories (`isActive == true`), active gallery items (`isActive == true`), and siteSettings.
- Anonymous and unauthenticated visitors cannot create, update, or delete any catalog services, categories, gallery items, or settings.
- Only authenticated administrators (verified via `/admins/{uid}` or pre-authorized runtime admin `revion.restoration@gmail.com`) can write, mutate, or delete catalog services, categories, gallery showcases, and website settings.
- All IDs must be sanitized with `isValidId()`.
- Unbounded array injection is forbidden; lists must be strictly bounded in length.
- Timestamps must follow temporal integrity.

## 2. The "Dirty Dozen" Payloads (Red Team Test Matrix)
1. Unauthenticated write to `/services/spoofed-service`: `{ name: "Hacked Shoe", price: 10 }` -> PERMISSION_DENIED.
2. Unauthenticated read of inactive service `/services/inactive-item`: `{ isActive: false }` -> PERMISSION_DENIED.
3. Unauthenticated mutation of `/siteSettings/general`: `{ whatsappNumber: "000" }` -> PERMISSION_DENIED.
4. Non-admin authenticated user write to `/categories/bags`: `{ name: "Fake Category" }` -> PERMISSION_DENIED.
5. Injected oversized junk ID `/services/a`.repeat(200) -> PERMISSION_DENIED.
6. Malformed service update missing required fields -> PERMISSION_DENIED.
7. Shadow update with arbitrary injected ghost keys -> PERMISSION_DENIED.
8. Unauthenticated delete of `/gallery/item1` -> PERMISSION_DENIED.
9. Attempt by non-admin to grant themselves admin privileges in `/admins/{uid}` -> PERMISSION_DENIED.
10. Blanket read of `/adminUsers` by unauthenticated visitor -> PERMISSION_DENIED.
11. Injecting 50,000-character description to cause storage denial -> PERMISSION_DENIED.
12. Attempt to bypass price type enum with non-conforming string -> PERMISSION_DENIED.
