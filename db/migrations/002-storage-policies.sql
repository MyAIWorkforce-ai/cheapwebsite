-- Row-level security on storage.objects for the skillzy-products bucket.
-- Run this once in Supabase SQL editor after the bucket exists.
--
-- Folder convention: skillzy-products/<creator_id>/<listing_id>/<file>
-- The first path segment must equal the auth.uid() of the uploader.
-- Reads are denied at the policy level — buyers only ever get signed URLs
-- generated server-side after a verified purchase.

-- Allow authenticated users to upload to their own folder.
drop policy if exists "skillzy_products_creator_upload" on storage.objects;
create policy "skillzy_products_creator_upload"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow creators to update / replace files in their own folder.
drop policy if exists "skillzy_products_creator_update" on storage.objects;
create policy "skillzy_products_creator_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow creators to delete files in their own folder.
drop policy if exists "skillzy_products_creator_delete" on storage.objects;
create policy "skillzy_products_creator_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'skillzy-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- No public select policy. The service-role client (used by the
-- /api/download/[id] endpoint after verifying the buyer owns a paid
-- purchase) bypasses RLS and issues short-lived signed URLs.
