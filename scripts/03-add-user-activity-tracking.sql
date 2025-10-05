-- Add last_sign_in_at column to track user activity
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS last_sign_in_at timestamp with time zone;

-- Create an index for faster queries on last_sign_in_at
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_sign_in 
ON user_profiles(last_sign_in_at DESC);

-- Update existing users with their auth.users last_sign_in_at if available
UPDATE user_profiles up
SET last_sign_in_at = au.last_sign_in_at
FROM auth.users au
WHERE up.id = au.id
AND up.last_sign_in_at IS NULL;
