CREATE TABLE "files" (
  "id" serial NOT NULL,
  "name" text NOT NULL,
  "original_name" text NOT NULL,
  "size" integer NOT NULL,
  "mime_type" text NOT NULL,
  "etag" text NOT NULL,
  "path" text NOT NULL,
  "reference_type" text NULL,
  "reference_id" integer NULL,
  "is_public" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  UNIQUE ("name"),
  UNIQUE ("path")
);
