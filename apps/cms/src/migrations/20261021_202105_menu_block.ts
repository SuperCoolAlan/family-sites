import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_menu_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_menu_sections_items_locales" (
  	"name" varchar,
  	"description" varchar,
  	"price" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_menu_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_menu_sections_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menu_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_sections_items_locales" (
  	"name" varchar,
  	"description" varchar,
  	"price" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menu_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_sections_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_menu_sections_items" ADD CONSTRAINT "pages_blocks_menu_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_sections_items" ADD CONSTRAINT "pages_blocks_menu_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_sections_items_locales" ADD CONSTRAINT "pages_blocks_menu_sections_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_sections_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_sections" ADD CONSTRAINT "pages_blocks_menu_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_sections" ADD CONSTRAINT "pages_blocks_menu_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_sections_locales" ADD CONSTRAINT "pages_blocks_menu_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu" ADD CONSTRAINT "pages_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_locales" ADD CONSTRAINT "pages_blocks_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_sections_items" ADD CONSTRAINT "_pages_v_blocks_menu_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_sections_items" ADD CONSTRAINT "_pages_v_blocks_menu_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_sections_items_locales" ADD CONSTRAINT "_pages_v_blocks_menu_sections_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_sections_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_sections" ADD CONSTRAINT "_pages_v_blocks_menu_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_sections" ADD CONSTRAINT "_pages_v_blocks_menu_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_sections_locales" ADD CONSTRAINT "_pages_v_blocks_menu_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu" ADD CONSTRAINT "_pages_v_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_locales" ADD CONSTRAINT "_pages_v_blocks_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_menu_sections_items_order_idx" ON "pages_blocks_menu_sections_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_sections_items_parent_id_idx" ON "pages_blocks_menu_sections_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_sections_items_image_idx" ON "pages_blocks_menu_sections_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_menu_sections_items_locales_locale_parent_id_un" ON "pages_blocks_menu_sections_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_sections_items_locales_parent_id_idx" ON "pages_blocks_menu_sections_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_sections_order_idx" ON "pages_blocks_menu_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_sections_parent_id_idx" ON "pages_blocks_menu_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_sections_image_idx" ON "pages_blocks_menu_sections" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_menu_sections_locales_locale_parent_id_unique" ON "pages_blocks_menu_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_sections_locales_parent_id_idx" ON "pages_blocks_menu_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_order_idx" ON "pages_blocks_menu" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_parent_id_idx" ON "pages_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_path_idx" ON "pages_blocks_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_menu_locales_locale_parent_id_unique" ON "pages_blocks_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_locales_parent_id_idx" ON "pages_blocks_menu_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_sections_items_order_idx" ON "_pages_v_blocks_menu_sections_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_sections_items_parent_id_idx" ON "_pages_v_blocks_menu_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_sections_items_image_idx" ON "_pages_v_blocks_menu_sections_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_sections_items_locales_locale_parent_id" ON "_pages_v_blocks_menu_sections_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_sections_items_locales_parent_id_idx" ON "_pages_v_blocks_menu_sections_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_sections_order_idx" ON "_pages_v_blocks_menu_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_sections_parent_id_idx" ON "_pages_v_blocks_menu_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_sections_image_idx" ON "_pages_v_blocks_menu_sections" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_sections_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_menu_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_sections_locales_parent_id_idx" ON "_pages_v_blocks_menu_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_order_idx" ON "_pages_v_blocks_menu" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_parent_id_idx" ON "_pages_v_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_path_idx" ON "_pages_v_blocks_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_locales_locale_parent_id_unique" ON "_pages_v_blocks_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_locales_parent_id_idx" ON "_pages_v_blocks_menu_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_menu_sections_items" CASCADE;
  DROP TABLE "pages_blocks_menu_sections_items_locales" CASCADE;
  DROP TABLE "pages_blocks_menu_sections" CASCADE;
  DROP TABLE "pages_blocks_menu_sections_locales" CASCADE;
  DROP TABLE "pages_blocks_menu" CASCADE;
  DROP TABLE "pages_blocks_menu_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_sections_items" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_sections_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_sections_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_menu" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_locales" CASCADE;`)
}
