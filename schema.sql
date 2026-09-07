-- ==============================================================================
-- GSSS SANGLA - POSTGRESQL DATABASE SCHEMA (schema.sql)
-- Compatible with all PostgreSQL versions (Uses pgcrypto / gen_random_uuid)
-- ==============================================================================

-- Try enabling pgcrypto for UUID support (or gen_random_uuid natively)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. ADMISSIONS TABLE
CREATE TABLE IF NOT EXISTS admission_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    mother_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(50),
    category VARCHAR(100),
    class_applying VARCHAR(50) NOT NULL,
    previous_school VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. NOTICES TABLE
CREATE TABLE IF NOT EXISTS notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'General',
    notice_date DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. NEWS TABLE
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    published_at DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time VARCHAR(50),
    location VARCHAR(255),
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. STUDENTS & MARKSHEETS TABLE
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admission_no VARCHAR(100) UNIQUE NOT NULL,
    roll_no VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    mother_name VARCHAR(255),
    dob DATE,
    gender VARCHAR(20),
    category VARCHAR(50),
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10),
    stream VARCHAR(50),
    phone VARCHAR(20),
    address TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS marksheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    admission_no VARCHAR(100) NOT NULL,
    roll_no VARCHAR(50) NOT NULL,
    exam_term VARCHAR(100) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    subjects JSONB NOT NULL,
    total_max_marks NUMERIC DEFAULT 500,
    total_obtained_marks NUMERIC NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    result_status VARCHAR(50) DEFAULT 'PASS',
    overall_grade VARCHAR(10),
    remarks TEXT,
    issued_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) DEFAULT 'Principal GSSS Sangla',
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin User
INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES ('principal5010sangla@gmail.com', 'principal5010sangla@123', 'Principal GSSS Sangla', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Initial Notices Seed
INSERT INTO notices (title, description, category, notice_date, is_published)
VALUES 
('Annual Examination 2025-26 Date Sheet Released', 'The date sheet for 6th to 12th standard annual examinations has been published. Check portal.', 'Academic', CURRENT_DATE, TRUE),
('Admissions Open for Session 2025-26', 'Online registration is now open for classes 6th to 11th (Science, Arts, Commerce).', 'Admissions', CURRENT_DATE, TRUE)
ON CONFLICT DO NOTHING;

-- Create Indexes for fast searches
CREATE INDEX IF NOT EXISTS idx_students_admission ON students(admission_no);
CREATE INDEX IF NOT EXISTS idx_marksheets_search ON marksheets(admission_no, roll_no, exam_term);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_status ON admission_enquiries(status);
