-- Add guest role to the user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'guest';

-- Update the hasPersonalAccess function to include guest role
-- (This is handled in the permissions.ts file)
