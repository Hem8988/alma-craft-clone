create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view own roles" on public.user_roles
for select to authenticated using (auth.uid() = user_id);

create policy "Admins can manage roles" on public.user_roles
for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
for select to authenticated using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
for insert to authenticated with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
for update to authenticated using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles
for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create table public.admission_enquiries (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  dob date not null,
  gender text,
  class_applying text not null,
  previous_school text,
  category text,
  father_name text not null,
  mother_name text not null,
  phone text not null,
  email text,
  address text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant insert on public.admission_enquiries to anon;
grant select, insert, update, delete on public.admission_enquiries to authenticated;
grant all on public.admission_enquiries to service_role;
alter table public.admission_enquiries enable row level security;

create policy "Anyone can submit an enquiry" on public.admission_enquiries
for insert to anon, authenticated with check (true);
create policy "Admins can view enquiries" on public.admission_enquiries
for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update enquiries" on public.admission_enquiries
for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete enquiries" on public.admission_enquiries
for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon;
grant select, insert, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;

create policy "Anyone can send a message" on public.contact_messages
for insert to anon, authenticated with check (true);
create policy "Admins can view messages" on public.contact_messages
for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update messages" on public.contact_messages
for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete messages" on public.contact_messages
for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  notice_date date not null default current_date,
  category text not null default 'General',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.notices to anon;
grant select, insert, update, delete on public.notices to authenticated;
grant all on public.notices to service_role;
alter table public.notices enable row level security;

create policy "Anyone can view published notices" on public.notices
for select to anon, authenticated using (is_published = true);
create policy "Admins can view all notices" on public.notices
for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can insert notices" on public.notices
for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update notices" on public.notices
for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete notices" on public.notices
for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  published_at date not null default current_date,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.news to anon;
grant select, insert, update, delete on public.news to authenticated;
grant all on public.news to service_role;
alter table public.news enable row level security;

create policy "Anyone can view published news" on public.news
for select to anon, authenticated using (is_published = true);
create policy "Admins can view all news" on public.news
for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can insert news" on public.news
for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update news" on public.news
for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete news" on public.news
for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  location text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.events to anon;
grant select, insert, update, delete on public.events to authenticated;
grant all on public.events to service_role;
alter table public.events enable row level security;

create policy "Anyone can view published events" on public.events
for select to anon, authenticated using (is_published = true);
create policy "Admins can view all events" on public.events
for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can insert events" on public.events
for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update events" on public.events
for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete events" on public.events
for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

insert into public.notices (title, description, notice_date, category) values
('Admissions Open for Session 2026-27', 'Admission forms for Classes 1 to 11 are now available at the school office and online. Last date for submission is 31 March 2026.', '2026-08-20', 'Admissions'),
('Half-Yearly Examination Schedule', 'Half-yearly examinations for all classes will commence from 15 September 2026. Detailed date sheet is available on the notice board.', '2026-08-18', 'Examinations'),
('Parent-Teacher Meeting', 'PTM for all classes will be held on Saturday, 5 September 2026 from 10:00 AM to 1:00 PM. Parents are requested to attend.', '2026-08-15', 'General'),
('Fee Submission Reminder', 'Parents are requested to deposit the quarterly fee by the 10th of every quarter to avoid late fine.', '2026-08-10', 'Fee'),
('Independence Day Celebration', 'All students must report by 8:30 AM on 15 August for the Independence Day function. Cultural programme rehearsals from 10 August.', '2026-08-05', 'Events');

insert into public.news (title, excerpt, published_at) values
('GSSS Sangla Shines in Board Results 2026', 'Our students achieved a 98% pass percentage in the HP Board Class 10 and 12 examinations, with five students securing district-level merit positions.', '2026-08-12'),
('School Wins District Science Exhibition', 'The science model on glacier conservation prepared by Class 11 students won first prize at the district-level exhibition in Reckong Peo.', '2026-07-28'),
('New Computer Lab Inaugurated', 'A modern 40-system computer lab with smart classroom facilities was inaugurated, strengthening digital learning at the school.', '2026-07-10'),
('Annual Sports Meet Held', 'The annual sports meet saw enthusiastic participation across all houses. Tagore House lifted the overall championship trophy.', '2026-06-22');

insert into public.events (title, description, event_date, event_time, location) values
('Parent-Teacher Meeting', 'Class-wise PTM for all sections. Progress report discussion with subject teachers.', '2026-09-05', '10:00 AM - 1:00 PM', 'School Campus'),
('Half-Yearly Examinations Begin', 'Written examinations for Classes 1-12 as per the date sheet.', '2026-09-15', '9:00 AM onwards', 'Examination Halls'),
('Hindi Diwas Celebration', 'Essay writing, poetry recitation and debate competitions in Hindi.', '2026-09-14', '11:00 AM', 'School Auditorium'),
('Teachers Day Function', 'Cultural programme organised by students to honour the teaching staff.', '2026-09-05', '9:30 AM', 'School Ground'),
('Swachh Bharat Abhiyan Drive', 'Campus and village cleanliness drive with NSS volunteers.', '2026-10-02', '8:00 AM', 'Sangla Village');