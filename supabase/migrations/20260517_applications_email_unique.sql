ALTER TABLE applications
  ADD CONSTRAINT applications_email_unique UNIQUE (email);
