# Add Tenant Functionality Plan

1. Update server/controllers/tenantController.js: add getAllTenants (users role='tenant'), createTenant (userModel.create role='tenant')

2. Update server/routes/tenantRoutes.js: POST '/' roleMiddleware('admin')

3. Update server/models/userModel.js if needed (add findTenants)

4. client/src/services/tenantService.js: addTenant, getTenants

5. client/src/pages/Admin/Tenants.jsx: Form + table, fetch tenants, add button using tenantService, Modal with inputs (full_name, age, email, pw)

6. db/schema.sql: No change (uses users)

7. Test: Admin login → Tenants → Add → list updates

Proceed?
