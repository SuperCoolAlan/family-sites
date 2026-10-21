import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."_locales" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum_tenants_languages" AS ENUM('es', 'en');
  CREATE TABLE "pages_blocks_hero_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_hero_locales" (
  	"heading" varchar,
  	"tagline" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_services_grid_locales" (
  	"heading" varchar DEFAULT 'Our Services',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_features_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_features_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"heading" varchar DEFAULT 'What Our Customers Say',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_cta_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_cta_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_contact_form_locales" (
  	"heading" varchar DEFAULT 'Send Us a Message',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_booking_embed_locales" (
  	"heading" varchar DEFAULT 'Book Online',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_faq_locales" (
  	"heading" varchar DEFAULT 'Frequently Asked Questions',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_hero_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"heading" varchar,
  	"tagline" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_services_grid_locales" (
  	"heading" varchar DEFAULT 'Our Services',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_features_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_features_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_gallery_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"heading" varchar DEFAULT 'What Our Customers Say',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_cta_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_contact_form_locales" (
  	"heading" varchar DEFAULT 'Send Us a Message',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_booking_embed_locales" (
  	"heading" varchar DEFAULT 'Book Online',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"heading" varchar DEFAULT 'Frequently Asked Questions',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "projects_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"category" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_projects_v_version_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_category" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "site_settings_hours_locales" (
  	"days" varchar NOT NULL,
  	"hours" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar,
  	"description" varchar,
  	"service_area" varchar,
  	"booking_button_label" varchar DEFAULT 'Book Online',
  	"footer_blurb" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "tenants_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_tenants_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "_services_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_services_v" ADD COLUMN "published_locale" "enum__services_v_published_locale";
  ALTER TABLE "_projects_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_projects_v" ADD COLUMN "published_locale" "enum__projects_v_published_locale";
  ALTER TABLE "pages_blocks_hero_buttons_locales" ADD CONSTRAINT "pages_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_locales" ADD CONSTRAINT "pages_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items_locales" ADD CONSTRAINT "pages_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_locales" ADD CONSTRAINT "pages_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images_locales" ADD CONSTRAINT "pages_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items_locales" ADD CONSTRAINT "pages_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons_locales" ADD CONSTRAINT "pages_blocks_cta_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_locales" ADD CONSTRAINT "pages_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_embed_locales" ADD CONSTRAINT "pages_blocks_booking_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_booking_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_locales" ADD CONSTRAINT "_pages_v_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items_locales" ADD CONSTRAINT "_pages_v_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_locales" ADD CONSTRAINT "_pages_v_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_cta_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_locales" ADD CONSTRAINT "_pages_v_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_booking_embed_locales" ADD CONSTRAINT "_pages_v_blocks_booking_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_booking_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery_locales" ADD CONSTRAINT "projects_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery_locales" ADD CONSTRAINT "_projects_v_version_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_hours_locales" ADD CONSTRAINT "site_settings_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenants_languages" ADD CONSTRAINT "tenants_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_hero_buttons_locales_locale_parent_id_unique" ON "pages_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_buttons_locales_parent_id_idx" ON "pages_blocks_hero_buttons_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_locales_parent_id_idx" ON "pages_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_grid_locales_locale_parent_id_unique" ON "pages_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_grid_locales_parent_id_idx" ON "pages_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_features_items_locales_locale_parent_id_unique" ON "pages_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_items_locales_parent_id_idx" ON "pages_blocks_features_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_features_locales_locale_parent_id_unique" ON "pages_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_locales_parent_id_idx" ON "pages_blocks_features_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_images_locales_locale_parent_id_unique" ON "pages_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_locales_parent_id_idx" ON "pages_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_locales_parent_id_idx" ON "pages_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_items_locales_locale_parent_id_uni" ON "pages_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_locales_parent_id_idx" ON "pages_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_locales_parent_id_idx" ON "pages_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_buttons_locales_locale_parent_id_unique" ON "pages_blocks_cta_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_buttons_locales_parent_id_idx" ON "pages_blocks_cta_buttons_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_form_locales_locale_parent_id_unique" ON "pages_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_form_locales_parent_id_idx" ON "pages_blocks_contact_form_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_booking_embed_locales_locale_parent_id_unique" ON "pages_blocks_booking_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_booking_embed_locales_parent_id_idx" ON "pages_blocks_booking_embed_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_locales_parent_id_idx" ON "_pages_v_blocks_hero_buttons_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_locales_parent_id_idx" ON "_pages_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_services_grid_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_locales_parent_id_idx" ON "_pages_v_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_items_locales_locale_parent_id_uniq" ON "_pages_v_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_locales_parent_id_idx" ON "_pages_v_blocks_features_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_locales_locale_parent_id_unique" ON "_pages_v_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_locales_parent_id_idx" ON "_pages_v_blocks_features_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_images_locales_locale_parent_id_uniq" ON "_pages_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_locales_parent_id_idx" ON "_pages_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_locales_locale_parent_id_unique" ON "_pages_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_locales_parent_id_idx" ON "_pages_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_items_locales_locale_parent_id_" ON "_pages_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_locales_parent_id_idx" ON "_pages_v_blocks_testimonials_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_locales_parent_id_idx" ON "_pages_v_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_buttons_locales_parent_id_idx" ON "_pages_v_blocks_cta_buttons_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_locales_parent_id_idx" ON "_pages_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_form_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_locales_parent_id_idx" ON "_pages_v_blocks_contact_form_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_booking_embed_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_booking_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_booking_embed_locales_parent_id_idx" ON "_pages_v_blocks_booking_embed_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_locales_parent_id_idx" ON "_services_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_gallery_locales_locale_parent_id_unique" ON "projects_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_gallery_locales_parent_id_idx" ON "projects_gallery_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_gallery_locales_locale_parent_id_unique" ON "_projects_v_version_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_gallery_locales_parent_id_idx" ON "_projects_v_version_gallery_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_hours_locales_locale_parent_id_unique" ON "site_settings_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_hours_locales_parent_id_idx" ON "site_settings_hours_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "tenants_languages_order_idx" ON "tenants_languages" USING btree ("order");
  CREATE INDEX "tenants_languages_parent_idx" ON "tenants_languages" USING btree ("parent_id");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_checkbox_locales_parent_id_idx" ON "forms_blocks_checkbox_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_locales_parent_id_idx" ON "forms_blocks_email_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_locales_parent_id_idx" ON "forms_blocks_message_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_locales_parent_id_idx" ON "forms_blocks_number_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_locales_parent_id_idx" ON "forms_blocks_select_options_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_locales_parent_id_idx" ON "forms_blocks_select_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_state_locales_parent_id_idx" ON "forms_blocks_state_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_locales_parent_id_idx" ON "forms_blocks_text_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_locales_parent_id_idx" ON "forms_blocks_textarea_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_emails_locales_parent_id_idx" ON "forms_emails_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_locales_parent_id_idx" ON "forms_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  `)
  // Every row that predates localization is Fuel Mechanical's English copy, so it must land in `en` before the columns go.
  await db.execute(sql`
  INSERT INTO "pages_blocks_hero_buttons_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "pages_blocks_hero_buttons";
  INSERT INTO "pages_blocks_hero_locales" ("heading", "tagline", "subheading", "_locale", "_parent_id") SELECT "heading", "tagline", "subheading", 'en', "id" FROM "pages_blocks_hero";
  INSERT INTO "pages_blocks_rich_text_locales" ("heading", "content", "_locale", "_parent_id") SELECT "heading", "content", 'en', "id" FROM "pages_blocks_rich_text";
  INSERT INTO "pages_blocks_services_grid_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "pages_blocks_services_grid";
  INSERT INTO "pages_blocks_features_items_locales" ("title", "text", "_locale", "_parent_id") SELECT "title", "text", 'en', "id" FROM "pages_blocks_features_items";
  INSERT INTO "pages_blocks_features_locales" ("heading", "_locale", "_parent_id") SELECT "heading", 'en', "id" FROM "pages_blocks_features";
  INSERT INTO "pages_blocks_gallery_images_locales" ("caption", "_locale", "_parent_id") SELECT "caption", 'en', "id" FROM "pages_blocks_gallery_images";
  INSERT INTO "pages_blocks_gallery_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "pages_blocks_gallery";
  INSERT INTO "pages_blocks_testimonials_items_locales" ("quote", "_locale", "_parent_id") SELECT "quote", 'en', "id" FROM "pages_blocks_testimonials_items";
  INSERT INTO "pages_blocks_testimonials_locales" ("heading", "_locale", "_parent_id") SELECT "heading", 'en', "id" FROM "pages_blocks_testimonials";
  INSERT INTO "pages_blocks_cta_buttons_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "pages_blocks_cta_buttons";
  INSERT INTO "pages_blocks_cta_locales" ("heading", "text", "_locale", "_parent_id") SELECT "heading", "text", 'en', "id" FROM "pages_blocks_cta";
  INSERT INTO "pages_blocks_contact_form_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "pages_blocks_contact_form";
  INSERT INTO "pages_blocks_booking_embed_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "pages_blocks_booking_embed";
  INSERT INTO "pages_blocks_faq_items_locales" ("question", "answer", "_locale", "_parent_id") SELECT "question", "answer", 'en', "id" FROM "pages_blocks_faq_items";
  INSERT INTO "pages_blocks_faq_locales" ("heading", "_locale", "_parent_id") SELECT "heading", 'en', "id" FROM "pages_blocks_faq";
  INSERT INTO "pages_locales" ("title", "meta_title", "meta_description", "_locale", "_parent_id") SELECT "title", "meta_title", "meta_description", 'en', "id" FROM "pages";
  INSERT INTO "_pages_v_blocks_hero_buttons_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "_pages_v_blocks_hero_buttons";
  INSERT INTO "_pages_v_blocks_hero_locales" ("heading", "tagline", "subheading", "_locale", "_parent_id") SELECT "heading", "tagline", "subheading", 'en', "id" FROM "_pages_v_blocks_hero";
  INSERT INTO "_pages_v_blocks_rich_text_locales" ("heading", "content", "_locale", "_parent_id") SELECT "heading", "content", 'en', "id" FROM "_pages_v_blocks_rich_text";
  INSERT INTO "_pages_v_blocks_services_grid_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "_pages_v_blocks_services_grid";
  INSERT INTO "_pages_v_blocks_features_items_locales" ("title", "text", "_locale", "_parent_id") SELECT "title", "text", 'en', "id" FROM "_pages_v_blocks_features_items";
  INSERT INTO "_pages_v_blocks_features_locales" ("heading", "_locale", "_parent_id") SELECT "heading", 'en', "id" FROM "_pages_v_blocks_features";
  INSERT INTO "_pages_v_blocks_gallery_images_locales" ("caption", "_locale", "_parent_id") SELECT "caption", 'en', "id" FROM "_pages_v_blocks_gallery_images";
  INSERT INTO "_pages_v_blocks_gallery_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "_pages_v_blocks_gallery";
  INSERT INTO "_pages_v_blocks_testimonials_items_locales" ("quote", "_locale", "_parent_id") SELECT "quote", 'en', "id" FROM "_pages_v_blocks_testimonials_items";
  INSERT INTO "_pages_v_blocks_testimonials_locales" ("heading", "_locale", "_parent_id") SELECT "heading", 'en', "id" FROM "_pages_v_blocks_testimonials";
  INSERT INTO "_pages_v_blocks_cta_buttons_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "_pages_v_blocks_cta_buttons";
  INSERT INTO "_pages_v_blocks_cta_locales" ("heading", "text", "_locale", "_parent_id") SELECT "heading", "text", 'en', "id" FROM "_pages_v_blocks_cta";
  INSERT INTO "_pages_v_blocks_contact_form_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "_pages_v_blocks_contact_form";
  INSERT INTO "_pages_v_blocks_booking_embed_locales" ("heading", "intro", "_locale", "_parent_id") SELECT "heading", "intro", 'en', "id" FROM "_pages_v_blocks_booking_embed";
  INSERT INTO "_pages_v_blocks_faq_items_locales" ("question", "answer", "_locale", "_parent_id") SELECT "question", "answer", 'en', "id" FROM "_pages_v_blocks_faq_items";
  INSERT INTO "_pages_v_blocks_faq_locales" ("heading", "_locale", "_parent_id") SELECT "heading", 'en', "id" FROM "_pages_v_blocks_faq";
  INSERT INTO "_pages_v_locales" ("version_title", "version_meta_title", "version_meta_description", "_locale", "_parent_id") SELECT "version_title", "version_meta_title", "version_meta_description", 'en', "id" FROM "_pages_v";
  INSERT INTO "services_locales" ("title", "summary", "description", "_locale", "_parent_id") SELECT "title", "summary", "description", 'en', "id" FROM "services";
  INSERT INTO "_services_v_locales" ("version_title", "version_summary", "version_description", "_locale", "_parent_id") SELECT "version_title", "version_summary", "version_description", 'en', "id" FROM "_services_v";
  INSERT INTO "projects_gallery_locales" ("caption", "_locale", "_parent_id") SELECT "caption", 'en', "id" FROM "projects_gallery";
  INSERT INTO "projects_locales" ("title", "category", "summary", "description", "_locale", "_parent_id") SELECT "title", "category", "summary", "description", 'en', "id" FROM "projects";
  INSERT INTO "_projects_v_version_gallery_locales" ("caption", "_locale", "_parent_id") SELECT "caption", 'en', "id" FROM "_projects_v_version_gallery";
  INSERT INTO "_projects_v_locales" ("version_title", "version_category", "version_summary", "version_description", "_locale", "_parent_id") SELECT "version_title", "version_category", "version_summary", "version_description", 'en', "id" FROM "_projects_v";
  INSERT INTO "media_locales" ("alt", "caption", "_locale", "_parent_id") SELECT "alt", "caption", 'en', "id" FROM "media";
  INSERT INTO "site_settings_hours_locales" ("days", "hours", "_locale", "_parent_id") SELECT "days", "hours", 'en', "id" FROM "site_settings_hours";
  INSERT INTO "site_settings_locales" ("tagline", "description", "service_area", "booking_button_label", "footer_blurb", "_locale", "_parent_id") SELECT "tagline", "description", "service_area", "booking_button_label", "footer_blurb", 'en', "id" FROM "site_settings";
  INSERT INTO "forms_blocks_checkbox_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_checkbox";
  INSERT INTO "forms_blocks_email_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_email";
  INSERT INTO "forms_blocks_message_locales" ("message", "_locale", "_parent_id") SELECT "message", 'en', "id" FROM "forms_blocks_message";
  INSERT INTO "forms_blocks_number_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_number";
  INSERT INTO "forms_blocks_select_options_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_select_options";
  INSERT INTO "forms_blocks_select_locales" ("label", "default_value", "_locale", "_parent_id") SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_select";
  INSERT INTO "forms_blocks_state_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_state";
  INSERT INTO "forms_blocks_text_locales" ("label", "default_value", "_locale", "_parent_id") SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_text";
  INSERT INTO "forms_blocks_textarea_locales" ("label", "default_value", "_locale", "_parent_id") SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_textarea";
  INSERT INTO "forms_emails_locales" ("subject", "message", "_locale", "_parent_id") SELECT "subject", "message", 'en', "id" FROM "forms_emails";
  INSERT INTO "forms_locales" ("submit_button_label", "confirmation_message", "_locale", "_parent_id") SELECT "submit_button_label", "confirmation_message", 'en', "id" FROM "forms";
  INSERT INTO "tenants_languages" ("order", "parent_id", "value") SELECT 1, "id", 'en' FROM "tenants";
  `)
  await db.execute(sql`
  ALTER TABLE "pages_blocks_hero_buttons" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subheading";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "content";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_features_items" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_features_items" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_gallery_images" DROP COLUMN "caption";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "quote";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_cta_buttons" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_booking_embed" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_booking_embed" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "question";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "heading";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "_pages_v_blocks_hero_buttons" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "tagline";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "subheading";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_services_grid" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_services_grid" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_features_items" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_features_items" DROP COLUMN "text";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_gallery_images" DROP COLUMN "caption";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_testimonials_items" DROP COLUMN "quote";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_cta_buttons" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "text";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_booking_embed" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_booking_embed" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "question";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "services" DROP COLUMN "title";
  ALTER TABLE "services" DROP COLUMN "summary";
  ALTER TABLE "services" DROP COLUMN "description";
  ALTER TABLE "_services_v" DROP COLUMN "version_title";
  ALTER TABLE "_services_v" DROP COLUMN "version_summary";
  ALTER TABLE "_services_v" DROP COLUMN "version_description";
  ALTER TABLE "projects_gallery" DROP COLUMN "caption";
  ALTER TABLE "projects" DROP COLUMN "title";
  ALTER TABLE "projects" DROP COLUMN "category";
  ALTER TABLE "projects" DROP COLUMN "summary";
  ALTER TABLE "projects" DROP COLUMN "description";
  ALTER TABLE "_projects_v_version_gallery" DROP COLUMN "caption";
  ALTER TABLE "_projects_v" DROP COLUMN "version_title";
  ALTER TABLE "_projects_v" DROP COLUMN "version_category";
  ALTER TABLE "_projects_v" DROP COLUMN "version_summary";
  ALTER TABLE "_projects_v" DROP COLUMN "version_description";
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "site_settings_hours" DROP COLUMN "days";
  ALTER TABLE "site_settings_hours" DROP COLUMN "hours";
  ALTER TABLE "site_settings" DROP COLUMN "tagline";
  ALTER TABLE "site_settings" DROP COLUMN "description";
  ALTER TABLE "site_settings" DROP COLUMN "service_area";
  ALTER TABLE "site_settings" DROP COLUMN "booking_button_label";
  ALTER TABLE "site_settings" DROP COLUMN "footer_blurb";
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_email" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_message" DROP COLUMN "message";
  ALTER TABLE "forms_blocks_number" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select_options" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_state" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "default_value";
  ALTER TABLE "forms_emails" DROP COLUMN "subject";
  ALTER TABLE "forms_emails" DROP COLUMN "message";
  ALTER TABLE "forms" DROP COLUMN "submit_button_label";
  ALTER TABLE "forms" DROP COLUMN "confirmation_message";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX "_pages_v_snapshot_idx";
  DROP INDEX "_pages_v_published_locale_idx";
  DROP INDEX "_services_v_snapshot_idx";
  DROP INDEX "_services_v_published_locale_idx";
  DROP INDEX "_projects_v_snapshot_idx";
  DROP INDEX "_projects_v_published_locale_idx";
  ALTER TABLE "pages_blocks_hero_buttons" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "tagline" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subheading" varchar;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "heading" varchar DEFAULT 'Our Services';
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_features_items" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_features_items" ADD COLUMN "text" varchar;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_gallery_images" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "quote" varchar;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "heading" varchar DEFAULT 'What Our Customers Say';
  ALTER TABLE "pages_blocks_cta_buttons" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "text" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "heading" varchar DEFAULT 'Send Us a Message';
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_booking_embed" ADD COLUMN "heading" varchar DEFAULT 'Book Online';
  ALTER TABLE "pages_blocks_booking_embed" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "question" varchar;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "answer" varchar;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "heading" varchar DEFAULT 'Frequently Asked Questions';
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "tagline" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "subheading" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD COLUMN "heading" varchar DEFAULT 'Our Services';
  ALTER TABLE "_pages_v_blocks_services_grid" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_features_items" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_features_items" ADD COLUMN "text" varchar;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD COLUMN "caption" varchar;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD COLUMN "quote" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "heading" varchar DEFAULT 'What Our Customers Say';
  ALTER TABLE "_pages_v_blocks_cta_buttons" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "text" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "heading" varchar DEFAULT 'Send Us a Message';
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_booking_embed" ADD COLUMN "heading" varchar DEFAULT 'Book Online';
  ALTER TABLE "_pages_v_blocks_booking_embed" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "question" varchar;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "answer" varchar;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "heading" varchar DEFAULT 'Frequently Asked Questions';
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "services" ADD COLUMN "title" varchar;
  ALTER TABLE "services" ADD COLUMN "summary" varchar;
  ALTER TABLE "services" ADD COLUMN "description" jsonb;
  ALTER TABLE "_services_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_description" jsonb;
  ALTER TABLE "projects_gallery" ADD COLUMN "caption" varchar;
  ALTER TABLE "projects" ADD COLUMN "title" varchar;
  ALTER TABLE "projects" ADD COLUMN "category" varchar;
  ALTER TABLE "projects" ADD COLUMN "summary" varchar;
  ALTER TABLE "projects" ADD COLUMN "description" jsonb;
  ALTER TABLE "_projects_v_version_gallery" ADD COLUMN "caption" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_category" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_description" jsonb;
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "site_settings_hours" ADD COLUMN "days" varchar;
  ALTER TABLE "site_settings_hours" ADD COLUMN "hours" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "tagline" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "service_area" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "booking_button_label" varchar DEFAULT 'Book Online';
  ALTER TABLE "site_settings" ADD COLUMN "footer_blurb" varchar;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_message" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms_blocks_number" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN "subject" varchar DEFAULT 'You''ve received a new message.';
  ALTER TABLE "forms_emails" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms" ADD COLUMN "submit_button_label" varchar;
  ALTER TABLE "forms" ADD COLUMN "confirmation_message" jsonb;
  `)
  // Prefer the default locale (es) where it exists, else en, so rolling back keeps each tenant's main copy.
  await db.execute(sql`
  UPDATE "pages_blocks_hero_buttons" SET "label" = COALESCE(l."label", "pages_blocks_hero_buttons"."label") FROM "pages_blocks_hero_buttons_locales" l WHERE l."_parent_id" = "pages_blocks_hero_buttons"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_hero" SET "heading" = COALESCE(l."heading", "pages_blocks_hero"."heading"), "tagline" = COALESCE(l."tagline", "pages_blocks_hero"."tagline"), "subheading" = COALESCE(l."subheading", "pages_blocks_hero"."subheading") FROM "pages_blocks_hero_locales" l WHERE l."_parent_id" = "pages_blocks_hero"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_rich_text" SET "heading" = COALESCE(l."heading", "pages_blocks_rich_text"."heading"), "content" = COALESCE(l."content", "pages_blocks_rich_text"."content") FROM "pages_blocks_rich_text_locales" l WHERE l."_parent_id" = "pages_blocks_rich_text"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_services_grid" SET "heading" = COALESCE(l."heading", "pages_blocks_services_grid"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_services_grid"."intro") FROM "pages_blocks_services_grid_locales" l WHERE l."_parent_id" = "pages_blocks_services_grid"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_features_items" SET "title" = COALESCE(l."title", "pages_blocks_features_items"."title"), "text" = COALESCE(l."text", "pages_blocks_features_items"."text") FROM "pages_blocks_features_items_locales" l WHERE l."_parent_id" = "pages_blocks_features_items"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_features" SET "heading" = COALESCE(l."heading", "pages_blocks_features"."heading") FROM "pages_blocks_features_locales" l WHERE l."_parent_id" = "pages_blocks_features"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_gallery_images" SET "caption" = COALESCE(l."caption", "pages_blocks_gallery_images"."caption") FROM "pages_blocks_gallery_images_locales" l WHERE l."_parent_id" = "pages_blocks_gallery_images"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_gallery" SET "heading" = COALESCE(l."heading", "pages_blocks_gallery"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_gallery"."intro") FROM "pages_blocks_gallery_locales" l WHERE l."_parent_id" = "pages_blocks_gallery"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_testimonials_items" SET "quote" = COALESCE(l."quote", "pages_blocks_testimonials_items"."quote") FROM "pages_blocks_testimonials_items_locales" l WHERE l."_parent_id" = "pages_blocks_testimonials_items"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_testimonials" SET "heading" = COALESCE(l."heading", "pages_blocks_testimonials"."heading") FROM "pages_blocks_testimonials_locales" l WHERE l."_parent_id" = "pages_blocks_testimonials"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_cta_buttons" SET "label" = COALESCE(l."label", "pages_blocks_cta_buttons"."label") FROM "pages_blocks_cta_buttons_locales" l WHERE l."_parent_id" = "pages_blocks_cta_buttons"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_cta" SET "heading" = COALESCE(l."heading", "pages_blocks_cta"."heading"), "text" = COALESCE(l."text", "pages_blocks_cta"."text") FROM "pages_blocks_cta_locales" l WHERE l."_parent_id" = "pages_blocks_cta"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_contact_form" SET "heading" = COALESCE(l."heading", "pages_blocks_contact_form"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_contact_form"."intro") FROM "pages_blocks_contact_form_locales" l WHERE l."_parent_id" = "pages_blocks_contact_form"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_booking_embed" SET "heading" = COALESCE(l."heading", "pages_blocks_booking_embed"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_booking_embed"."intro") FROM "pages_blocks_booking_embed_locales" l WHERE l."_parent_id" = "pages_blocks_booking_embed"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_faq_items" SET "question" = COALESCE(l."question", "pages_blocks_faq_items"."question"), "answer" = COALESCE(l."answer", "pages_blocks_faq_items"."answer") FROM "pages_blocks_faq_items_locales" l WHERE l."_parent_id" = "pages_blocks_faq_items"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_faq" SET "heading" = COALESCE(l."heading", "pages_blocks_faq"."heading") FROM "pages_blocks_faq_locales" l WHERE l."_parent_id" = "pages_blocks_faq"."id" AND l."_locale" = 'en';
  UPDATE "pages" SET "title" = COALESCE(l."title", "pages"."title"), "meta_title" = COALESCE(l."meta_title", "pages"."meta_title"), "meta_description" = COALESCE(l."meta_description", "pages"."meta_description") FROM "pages_locales" l WHERE l."_parent_id" = "pages"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_hero_buttons" SET "label" = COALESCE(l."label", "_pages_v_blocks_hero_buttons"."label") FROM "_pages_v_blocks_hero_buttons_locales" l WHERE l."_parent_id" = "_pages_v_blocks_hero_buttons"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_hero" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_hero"."heading"), "tagline" = COALESCE(l."tagline", "_pages_v_blocks_hero"."tagline"), "subheading" = COALESCE(l."subheading", "_pages_v_blocks_hero"."subheading") FROM "_pages_v_blocks_hero_locales" l WHERE l."_parent_id" = "_pages_v_blocks_hero"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_rich_text" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_rich_text"."heading"), "content" = COALESCE(l."content", "_pages_v_blocks_rich_text"."content") FROM "_pages_v_blocks_rich_text_locales" l WHERE l."_parent_id" = "_pages_v_blocks_rich_text"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_services_grid" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_services_grid"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_services_grid"."intro") FROM "_pages_v_blocks_services_grid_locales" l WHERE l."_parent_id" = "_pages_v_blocks_services_grid"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_features_items" SET "title" = COALESCE(l."title", "_pages_v_blocks_features_items"."title"), "text" = COALESCE(l."text", "_pages_v_blocks_features_items"."text") FROM "_pages_v_blocks_features_items_locales" l WHERE l."_parent_id" = "_pages_v_blocks_features_items"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_features" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_features"."heading") FROM "_pages_v_blocks_features_locales" l WHERE l."_parent_id" = "_pages_v_blocks_features"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_gallery_images" SET "caption" = COALESCE(l."caption", "_pages_v_blocks_gallery_images"."caption") FROM "_pages_v_blocks_gallery_images_locales" l WHERE l."_parent_id" = "_pages_v_blocks_gallery_images"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_gallery" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_gallery"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_gallery"."intro") FROM "_pages_v_blocks_gallery_locales" l WHERE l."_parent_id" = "_pages_v_blocks_gallery"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_testimonials_items" SET "quote" = COALESCE(l."quote", "_pages_v_blocks_testimonials_items"."quote") FROM "_pages_v_blocks_testimonials_items_locales" l WHERE l."_parent_id" = "_pages_v_blocks_testimonials_items"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_testimonials" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_testimonials"."heading") FROM "_pages_v_blocks_testimonials_locales" l WHERE l."_parent_id" = "_pages_v_blocks_testimonials"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_cta_buttons" SET "label" = COALESCE(l."label", "_pages_v_blocks_cta_buttons"."label") FROM "_pages_v_blocks_cta_buttons_locales" l WHERE l."_parent_id" = "_pages_v_blocks_cta_buttons"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_cta" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_cta"."heading"), "text" = COALESCE(l."text", "_pages_v_blocks_cta"."text") FROM "_pages_v_blocks_cta_locales" l WHERE l."_parent_id" = "_pages_v_blocks_cta"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_contact_form" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_contact_form"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_contact_form"."intro") FROM "_pages_v_blocks_contact_form_locales" l WHERE l."_parent_id" = "_pages_v_blocks_contact_form"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_booking_embed" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_booking_embed"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_booking_embed"."intro") FROM "_pages_v_blocks_booking_embed_locales" l WHERE l."_parent_id" = "_pages_v_blocks_booking_embed"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_faq_items" SET "question" = COALESCE(l."question", "_pages_v_blocks_faq_items"."question"), "answer" = COALESCE(l."answer", "_pages_v_blocks_faq_items"."answer") FROM "_pages_v_blocks_faq_items_locales" l WHERE l."_parent_id" = "_pages_v_blocks_faq_items"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v_blocks_faq" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_faq"."heading") FROM "_pages_v_blocks_faq_locales" l WHERE l."_parent_id" = "_pages_v_blocks_faq"."id" AND l."_locale" = 'en';
  UPDATE "_pages_v" SET "version_title" = COALESCE(l."version_title", "_pages_v"."version_title"), "version_meta_title" = COALESCE(l."version_meta_title", "_pages_v"."version_meta_title"), "version_meta_description" = COALESCE(l."version_meta_description", "_pages_v"."version_meta_description") FROM "_pages_v_locales" l WHERE l."_parent_id" = "_pages_v"."id" AND l."_locale" = 'en';
  UPDATE "services" SET "title" = COALESCE(l."title", "services"."title"), "summary" = COALESCE(l."summary", "services"."summary"), "description" = COALESCE(l."description", "services"."description") FROM "services_locales" l WHERE l."_parent_id" = "services"."id" AND l."_locale" = 'en';
  UPDATE "_services_v" SET "version_title" = COALESCE(l."version_title", "_services_v"."version_title"), "version_summary" = COALESCE(l."version_summary", "_services_v"."version_summary"), "version_description" = COALESCE(l."version_description", "_services_v"."version_description") FROM "_services_v_locales" l WHERE l."_parent_id" = "_services_v"."id" AND l."_locale" = 'en';
  UPDATE "projects_gallery" SET "caption" = COALESCE(l."caption", "projects_gallery"."caption") FROM "projects_gallery_locales" l WHERE l."_parent_id" = "projects_gallery"."id" AND l."_locale" = 'en';
  UPDATE "projects" SET "title" = COALESCE(l."title", "projects"."title"), "category" = COALESCE(l."category", "projects"."category"), "summary" = COALESCE(l."summary", "projects"."summary"), "description" = COALESCE(l."description", "projects"."description") FROM "projects_locales" l WHERE l."_parent_id" = "projects"."id" AND l."_locale" = 'en';
  UPDATE "_projects_v_version_gallery" SET "caption" = COALESCE(l."caption", "_projects_v_version_gallery"."caption") FROM "_projects_v_version_gallery_locales" l WHERE l."_parent_id" = "_projects_v_version_gallery"."id" AND l."_locale" = 'en';
  UPDATE "_projects_v" SET "version_title" = COALESCE(l."version_title", "_projects_v"."version_title"), "version_category" = COALESCE(l."version_category", "_projects_v"."version_category"), "version_summary" = COALESCE(l."version_summary", "_projects_v"."version_summary"), "version_description" = COALESCE(l."version_description", "_projects_v"."version_description") FROM "_projects_v_locales" l WHERE l."_parent_id" = "_projects_v"."id" AND l."_locale" = 'en';
  UPDATE "media" SET "alt" = COALESCE(l."alt", "media"."alt"), "caption" = COALESCE(l."caption", "media"."caption") FROM "media_locales" l WHERE l."_parent_id" = "media"."id" AND l."_locale" = 'en';
  UPDATE "site_settings_hours" SET "days" = COALESCE(l."days", "site_settings_hours"."days"), "hours" = COALESCE(l."hours", "site_settings_hours"."hours") FROM "site_settings_hours_locales" l WHERE l."_parent_id" = "site_settings_hours"."id" AND l."_locale" = 'en';
  UPDATE "site_settings" SET "tagline" = COALESCE(l."tagline", "site_settings"."tagline"), "description" = COALESCE(l."description", "site_settings"."description"), "service_area" = COALESCE(l."service_area", "site_settings"."service_area"), "booking_button_label" = COALESCE(l."booking_button_label", "site_settings"."booking_button_label"), "footer_blurb" = COALESCE(l."footer_blurb", "site_settings"."footer_blurb") FROM "site_settings_locales" l WHERE l."_parent_id" = "site_settings"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_checkbox" SET "label" = COALESCE(l."label", "forms_blocks_checkbox"."label") FROM "forms_blocks_checkbox_locales" l WHERE l."_parent_id" = "forms_blocks_checkbox"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_email" SET "label" = COALESCE(l."label", "forms_blocks_email"."label") FROM "forms_blocks_email_locales" l WHERE l."_parent_id" = "forms_blocks_email"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_message" SET "message" = COALESCE(l."message", "forms_blocks_message"."message") FROM "forms_blocks_message_locales" l WHERE l."_parent_id" = "forms_blocks_message"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_number" SET "label" = COALESCE(l."label", "forms_blocks_number"."label") FROM "forms_blocks_number_locales" l WHERE l."_parent_id" = "forms_blocks_number"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_select_options" SET "label" = COALESCE(l."label", "forms_blocks_select_options"."label") FROM "forms_blocks_select_options_locales" l WHERE l."_parent_id" = "forms_blocks_select_options"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_select" SET "label" = COALESCE(l."label", "forms_blocks_select"."label"), "default_value" = COALESCE(l."default_value", "forms_blocks_select"."default_value") FROM "forms_blocks_select_locales" l WHERE l."_parent_id" = "forms_blocks_select"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_state" SET "label" = COALESCE(l."label", "forms_blocks_state"."label") FROM "forms_blocks_state_locales" l WHERE l."_parent_id" = "forms_blocks_state"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_text" SET "label" = COALESCE(l."label", "forms_blocks_text"."label"), "default_value" = COALESCE(l."default_value", "forms_blocks_text"."default_value") FROM "forms_blocks_text_locales" l WHERE l."_parent_id" = "forms_blocks_text"."id" AND l."_locale" = 'en';
  UPDATE "forms_blocks_textarea" SET "label" = COALESCE(l."label", "forms_blocks_textarea"."label"), "default_value" = COALESCE(l."default_value", "forms_blocks_textarea"."default_value") FROM "forms_blocks_textarea_locales" l WHERE l."_parent_id" = "forms_blocks_textarea"."id" AND l."_locale" = 'en';
  UPDATE "forms_emails" SET "subject" = COALESCE(l."subject", "forms_emails"."subject"), "message" = COALESCE(l."message", "forms_emails"."message") FROM "forms_emails_locales" l WHERE l."_parent_id" = "forms_emails"."id" AND l."_locale" = 'en';
  UPDATE "forms" SET "submit_button_label" = COALESCE(l."submit_button_label", "forms"."submit_button_label"), "confirmation_message" = COALESCE(l."confirmation_message", "forms"."confirmation_message") FROM "forms_locales" l WHERE l."_parent_id" = "forms"."id" AND l."_locale" = 'en';
  UPDATE "pages_blocks_hero_buttons" SET "label" = COALESCE(l."label", "pages_blocks_hero_buttons"."label") FROM "pages_blocks_hero_buttons_locales" l WHERE l."_parent_id" = "pages_blocks_hero_buttons"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_hero" SET "heading" = COALESCE(l."heading", "pages_blocks_hero"."heading"), "tagline" = COALESCE(l."tagline", "pages_blocks_hero"."tagline"), "subheading" = COALESCE(l."subheading", "pages_blocks_hero"."subheading") FROM "pages_blocks_hero_locales" l WHERE l."_parent_id" = "pages_blocks_hero"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_rich_text" SET "heading" = COALESCE(l."heading", "pages_blocks_rich_text"."heading"), "content" = COALESCE(l."content", "pages_blocks_rich_text"."content") FROM "pages_blocks_rich_text_locales" l WHERE l."_parent_id" = "pages_blocks_rich_text"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_services_grid" SET "heading" = COALESCE(l."heading", "pages_blocks_services_grid"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_services_grid"."intro") FROM "pages_blocks_services_grid_locales" l WHERE l."_parent_id" = "pages_blocks_services_grid"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_features_items" SET "title" = COALESCE(l."title", "pages_blocks_features_items"."title"), "text" = COALESCE(l."text", "pages_blocks_features_items"."text") FROM "pages_blocks_features_items_locales" l WHERE l."_parent_id" = "pages_blocks_features_items"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_features" SET "heading" = COALESCE(l."heading", "pages_blocks_features"."heading") FROM "pages_blocks_features_locales" l WHERE l."_parent_id" = "pages_blocks_features"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_gallery_images" SET "caption" = COALESCE(l."caption", "pages_blocks_gallery_images"."caption") FROM "pages_blocks_gallery_images_locales" l WHERE l."_parent_id" = "pages_blocks_gallery_images"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_gallery" SET "heading" = COALESCE(l."heading", "pages_blocks_gallery"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_gallery"."intro") FROM "pages_blocks_gallery_locales" l WHERE l."_parent_id" = "pages_blocks_gallery"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_testimonials_items" SET "quote" = COALESCE(l."quote", "pages_blocks_testimonials_items"."quote") FROM "pages_blocks_testimonials_items_locales" l WHERE l."_parent_id" = "pages_blocks_testimonials_items"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_testimonials" SET "heading" = COALESCE(l."heading", "pages_blocks_testimonials"."heading") FROM "pages_blocks_testimonials_locales" l WHERE l."_parent_id" = "pages_blocks_testimonials"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_cta_buttons" SET "label" = COALESCE(l."label", "pages_blocks_cta_buttons"."label") FROM "pages_blocks_cta_buttons_locales" l WHERE l."_parent_id" = "pages_blocks_cta_buttons"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_cta" SET "heading" = COALESCE(l."heading", "pages_blocks_cta"."heading"), "text" = COALESCE(l."text", "pages_blocks_cta"."text") FROM "pages_blocks_cta_locales" l WHERE l."_parent_id" = "pages_blocks_cta"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_contact_form" SET "heading" = COALESCE(l."heading", "pages_blocks_contact_form"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_contact_form"."intro") FROM "pages_blocks_contact_form_locales" l WHERE l."_parent_id" = "pages_blocks_contact_form"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_booking_embed" SET "heading" = COALESCE(l."heading", "pages_blocks_booking_embed"."heading"), "intro" = COALESCE(l."intro", "pages_blocks_booking_embed"."intro") FROM "pages_blocks_booking_embed_locales" l WHERE l."_parent_id" = "pages_blocks_booking_embed"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_faq_items" SET "question" = COALESCE(l."question", "pages_blocks_faq_items"."question"), "answer" = COALESCE(l."answer", "pages_blocks_faq_items"."answer") FROM "pages_blocks_faq_items_locales" l WHERE l."_parent_id" = "pages_blocks_faq_items"."id" AND l."_locale" = 'es';
  UPDATE "pages_blocks_faq" SET "heading" = COALESCE(l."heading", "pages_blocks_faq"."heading") FROM "pages_blocks_faq_locales" l WHERE l."_parent_id" = "pages_blocks_faq"."id" AND l."_locale" = 'es';
  UPDATE "pages" SET "title" = COALESCE(l."title", "pages"."title"), "meta_title" = COALESCE(l."meta_title", "pages"."meta_title"), "meta_description" = COALESCE(l."meta_description", "pages"."meta_description") FROM "pages_locales" l WHERE l."_parent_id" = "pages"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_hero_buttons" SET "label" = COALESCE(l."label", "_pages_v_blocks_hero_buttons"."label") FROM "_pages_v_blocks_hero_buttons_locales" l WHERE l."_parent_id" = "_pages_v_blocks_hero_buttons"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_hero" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_hero"."heading"), "tagline" = COALESCE(l."tagline", "_pages_v_blocks_hero"."tagline"), "subheading" = COALESCE(l."subheading", "_pages_v_blocks_hero"."subheading") FROM "_pages_v_blocks_hero_locales" l WHERE l."_parent_id" = "_pages_v_blocks_hero"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_rich_text" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_rich_text"."heading"), "content" = COALESCE(l."content", "_pages_v_blocks_rich_text"."content") FROM "_pages_v_blocks_rich_text_locales" l WHERE l."_parent_id" = "_pages_v_blocks_rich_text"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_services_grid" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_services_grid"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_services_grid"."intro") FROM "_pages_v_blocks_services_grid_locales" l WHERE l."_parent_id" = "_pages_v_blocks_services_grid"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_features_items" SET "title" = COALESCE(l."title", "_pages_v_blocks_features_items"."title"), "text" = COALESCE(l."text", "_pages_v_blocks_features_items"."text") FROM "_pages_v_blocks_features_items_locales" l WHERE l."_parent_id" = "_pages_v_blocks_features_items"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_features" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_features"."heading") FROM "_pages_v_blocks_features_locales" l WHERE l."_parent_id" = "_pages_v_blocks_features"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_gallery_images" SET "caption" = COALESCE(l."caption", "_pages_v_blocks_gallery_images"."caption") FROM "_pages_v_blocks_gallery_images_locales" l WHERE l."_parent_id" = "_pages_v_blocks_gallery_images"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_gallery" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_gallery"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_gallery"."intro") FROM "_pages_v_blocks_gallery_locales" l WHERE l."_parent_id" = "_pages_v_blocks_gallery"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_testimonials_items" SET "quote" = COALESCE(l."quote", "_pages_v_blocks_testimonials_items"."quote") FROM "_pages_v_blocks_testimonials_items_locales" l WHERE l."_parent_id" = "_pages_v_blocks_testimonials_items"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_testimonials" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_testimonials"."heading") FROM "_pages_v_blocks_testimonials_locales" l WHERE l."_parent_id" = "_pages_v_blocks_testimonials"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_cta_buttons" SET "label" = COALESCE(l."label", "_pages_v_blocks_cta_buttons"."label") FROM "_pages_v_blocks_cta_buttons_locales" l WHERE l."_parent_id" = "_pages_v_blocks_cta_buttons"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_cta" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_cta"."heading"), "text" = COALESCE(l."text", "_pages_v_blocks_cta"."text") FROM "_pages_v_blocks_cta_locales" l WHERE l."_parent_id" = "_pages_v_blocks_cta"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_contact_form" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_contact_form"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_contact_form"."intro") FROM "_pages_v_blocks_contact_form_locales" l WHERE l."_parent_id" = "_pages_v_blocks_contact_form"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_booking_embed" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_booking_embed"."heading"), "intro" = COALESCE(l."intro", "_pages_v_blocks_booking_embed"."intro") FROM "_pages_v_blocks_booking_embed_locales" l WHERE l."_parent_id" = "_pages_v_blocks_booking_embed"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_faq_items" SET "question" = COALESCE(l."question", "_pages_v_blocks_faq_items"."question"), "answer" = COALESCE(l."answer", "_pages_v_blocks_faq_items"."answer") FROM "_pages_v_blocks_faq_items_locales" l WHERE l."_parent_id" = "_pages_v_blocks_faq_items"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v_blocks_faq" SET "heading" = COALESCE(l."heading", "_pages_v_blocks_faq"."heading") FROM "_pages_v_blocks_faq_locales" l WHERE l."_parent_id" = "_pages_v_blocks_faq"."id" AND l."_locale" = 'es';
  UPDATE "_pages_v" SET "version_title" = COALESCE(l."version_title", "_pages_v"."version_title"), "version_meta_title" = COALESCE(l."version_meta_title", "_pages_v"."version_meta_title"), "version_meta_description" = COALESCE(l."version_meta_description", "_pages_v"."version_meta_description") FROM "_pages_v_locales" l WHERE l."_parent_id" = "_pages_v"."id" AND l."_locale" = 'es';
  UPDATE "services" SET "title" = COALESCE(l."title", "services"."title"), "summary" = COALESCE(l."summary", "services"."summary"), "description" = COALESCE(l."description", "services"."description") FROM "services_locales" l WHERE l."_parent_id" = "services"."id" AND l."_locale" = 'es';
  UPDATE "_services_v" SET "version_title" = COALESCE(l."version_title", "_services_v"."version_title"), "version_summary" = COALESCE(l."version_summary", "_services_v"."version_summary"), "version_description" = COALESCE(l."version_description", "_services_v"."version_description") FROM "_services_v_locales" l WHERE l."_parent_id" = "_services_v"."id" AND l."_locale" = 'es';
  UPDATE "projects_gallery" SET "caption" = COALESCE(l."caption", "projects_gallery"."caption") FROM "projects_gallery_locales" l WHERE l."_parent_id" = "projects_gallery"."id" AND l."_locale" = 'es';
  UPDATE "projects" SET "title" = COALESCE(l."title", "projects"."title"), "category" = COALESCE(l."category", "projects"."category"), "summary" = COALESCE(l."summary", "projects"."summary"), "description" = COALESCE(l."description", "projects"."description") FROM "projects_locales" l WHERE l."_parent_id" = "projects"."id" AND l."_locale" = 'es';
  UPDATE "_projects_v_version_gallery" SET "caption" = COALESCE(l."caption", "_projects_v_version_gallery"."caption") FROM "_projects_v_version_gallery_locales" l WHERE l."_parent_id" = "_projects_v_version_gallery"."id" AND l."_locale" = 'es';
  UPDATE "_projects_v" SET "version_title" = COALESCE(l."version_title", "_projects_v"."version_title"), "version_category" = COALESCE(l."version_category", "_projects_v"."version_category"), "version_summary" = COALESCE(l."version_summary", "_projects_v"."version_summary"), "version_description" = COALESCE(l."version_description", "_projects_v"."version_description") FROM "_projects_v_locales" l WHERE l."_parent_id" = "_projects_v"."id" AND l."_locale" = 'es';
  UPDATE "media" SET "alt" = COALESCE(l."alt", "media"."alt"), "caption" = COALESCE(l."caption", "media"."caption") FROM "media_locales" l WHERE l."_parent_id" = "media"."id" AND l."_locale" = 'es';
  UPDATE "site_settings_hours" SET "days" = COALESCE(l."days", "site_settings_hours"."days"), "hours" = COALESCE(l."hours", "site_settings_hours"."hours") FROM "site_settings_hours_locales" l WHERE l."_parent_id" = "site_settings_hours"."id" AND l."_locale" = 'es';
  UPDATE "site_settings" SET "tagline" = COALESCE(l."tagline", "site_settings"."tagline"), "description" = COALESCE(l."description", "site_settings"."description"), "service_area" = COALESCE(l."service_area", "site_settings"."service_area"), "booking_button_label" = COALESCE(l."booking_button_label", "site_settings"."booking_button_label"), "footer_blurb" = COALESCE(l."footer_blurb", "site_settings"."footer_blurb") FROM "site_settings_locales" l WHERE l."_parent_id" = "site_settings"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_checkbox" SET "label" = COALESCE(l."label", "forms_blocks_checkbox"."label") FROM "forms_blocks_checkbox_locales" l WHERE l."_parent_id" = "forms_blocks_checkbox"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_email" SET "label" = COALESCE(l."label", "forms_blocks_email"."label") FROM "forms_blocks_email_locales" l WHERE l."_parent_id" = "forms_blocks_email"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_message" SET "message" = COALESCE(l."message", "forms_blocks_message"."message") FROM "forms_blocks_message_locales" l WHERE l."_parent_id" = "forms_blocks_message"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_number" SET "label" = COALESCE(l."label", "forms_blocks_number"."label") FROM "forms_blocks_number_locales" l WHERE l."_parent_id" = "forms_blocks_number"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_select_options" SET "label" = COALESCE(l."label", "forms_blocks_select_options"."label") FROM "forms_blocks_select_options_locales" l WHERE l."_parent_id" = "forms_blocks_select_options"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_select" SET "label" = COALESCE(l."label", "forms_blocks_select"."label"), "default_value" = COALESCE(l."default_value", "forms_blocks_select"."default_value") FROM "forms_blocks_select_locales" l WHERE l."_parent_id" = "forms_blocks_select"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_state" SET "label" = COALESCE(l."label", "forms_blocks_state"."label") FROM "forms_blocks_state_locales" l WHERE l."_parent_id" = "forms_blocks_state"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_text" SET "label" = COALESCE(l."label", "forms_blocks_text"."label"), "default_value" = COALESCE(l."default_value", "forms_blocks_text"."default_value") FROM "forms_blocks_text_locales" l WHERE l."_parent_id" = "forms_blocks_text"."id" AND l."_locale" = 'es';
  UPDATE "forms_blocks_textarea" SET "label" = COALESCE(l."label", "forms_blocks_textarea"."label"), "default_value" = COALESCE(l."default_value", "forms_blocks_textarea"."default_value") FROM "forms_blocks_textarea_locales" l WHERE l."_parent_id" = "forms_blocks_textarea"."id" AND l."_locale" = 'es';
  UPDATE "forms_emails" SET "subject" = COALESCE(l."subject", "forms_emails"."subject"), "message" = COALESCE(l."message", "forms_emails"."message") FROM "forms_emails_locales" l WHERE l."_parent_id" = "forms_emails"."id" AND l."_locale" = 'es';
  UPDATE "forms" SET "submit_button_label" = COALESCE(l."submit_button_label", "forms"."submit_button_label"), "confirmation_message" = COALESCE(l."confirmation_message", "forms"."confirmation_message") FROM "forms_locales" l WHERE l."_parent_id" = "forms"."id" AND l."_locale" = 'es';
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "site_settings_hours" ALTER COLUMN "days" SET NOT NULL;
  ALTER TABLE "site_settings_hours" ALTER COLUMN "hours" SET NOT NULL;
  ALTER TABLE "forms_blocks_select_options" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET NOT NULL;
  `)
  await db.execute(sql`
  ALTER TABLE "pages_blocks_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_booking_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_booking_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_hours_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tenants_languages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_checkbox_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_message_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_number_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_state_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_emails_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_services_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_features_items_locales" CASCADE;
  DROP TABLE "pages_blocks_features_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_form_locales" CASCADE;
  DROP TABLE "pages_blocks_booking_embed_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_booking_embed_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "projects_gallery_locales" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "_projects_v_version_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "site_settings_hours_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "tenants_languages" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";
  ALTER TABLE "_services_v" DROP COLUMN "snapshot";
  ALTER TABLE "_services_v" DROP COLUMN "published_locale";
  ALTER TABLE "_projects_v" DROP COLUMN "snapshot";
  ALTER TABLE "_projects_v" DROP COLUMN "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_tenants_languages";
  `)
}
