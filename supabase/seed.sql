-- =======================================================
-- MIND FLARE ACADEMY - SEED DATA
-- =======================================================

-- Insert Academic Programs
INSERT INTO public.academic_programs (id, name, category, grades, subjects, monthly_fee, package_fee, description)
VALUES
('pre-primary', 'Pre-Primary & Primary Section', 'pre-primary', 'Nursery to Class 5', '["English", "Urdu", "Mathematics", "General Science", "Islamiyat", "Social Studies", "General Knowledge"]', 2500, NULL, 'Montessori-based early learning through primary classes focusing on reading, writing, and numeracy skills.'),
('middle', 'Middle Section', 'middle', 'Class 6 to Class 8', '["English", "Urdu", "Mathematics", "General Science", "Islamiyat", "Pakistan Studies", "Computer Science"]', 4000, NULL, 'Core foundation building and preparation for Matriculation studies.'),
('matric', 'Matric Section', 'matric', 'Class 9 & Class 10', '["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "English", "Urdu", "Islamiyat", "Pakistan Studies"]', 2300, 7500, 'BISE Rawalpindi Board exam preparation with solved past papers and guess papers.'),
('intermediate', 'Intermediate (HSSC / FSc / ICS / I.Com)', 'intermediate', 'Class 11 & Class 12', '["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "Statistics", "Accounting", "Economics", "English", "Urdu"]', 2800, 9500, 'Pre-Medical, Pre-Engineering, ICS, Commerce, and Arts board coaching.'),
('bachelor', 'Bachelor Support (BS 4-Year)', 'bachelor', 'BS Students', '["Programming Fundamentals", "Calculus", "Linear Algebra", "Accounting", "Economics", "Core Sciences"]', 3500, NULL, 'Subject-wise coaching and semester exam prep support.'),
('entry-test', 'Entry Test Prep (MDCAT / ECAT)', 'entry-test', 'FSc Pre-Medical & Pre-Engineering', '["Biology", "Physics", "Chemistry", "Mathematics", "English", "Logical Reasoning"]', 6500, 35000, 'Comprehensive entrance test preparation with regular mock test series.')
ON CONFLICT (id) DO NOTHING;

-- Insert Short Courses
INSERT INTO public.short_courses (id, title, category, duration, fee, fee_type, shift_options, tools_modules, description, popular)
VALUES
('graphic-design', 'Graphic Designing', 'digital-skills', '2 Months', 8000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Photoshop", "Illustrator", "Canva", "Branding"]', 'Master visual aesthetics, marketing graphics, and freelance design.', true),
('web-dev', 'Web Development Basics', 'digital-skills', '2 Months', 8500, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["HTML5", "CSS3", "JavaScript", "GitHub"]', 'Build responsive websites with real-world project portfolios.', true),
('python-ai', 'Python Programming & AI Basics', 'digital-skills', '6 Weeks', 6500, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Python Syntax", "OOP", "AI Tools", "Automation"]', 'Hands-on programming and introductory artificial intelligence.', true),
('data-science', 'Data Science & Data Analysis', 'digital-skills', '2 Months', 9000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Pandas", "NumPy", "Matplotlib", "SQL"]', 'Turn raw data into business intelligence and predictive graphs.', false),
('freelancing', 'Freelancing & Digital Marketing', 'digital-skills', '6 Weeks', 6000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Upwork", "Fiverr", "SEO", "SMM"]', 'Acquire international clients and monetize digital skills online.', true),
('wordpress', 'WordPress & Website Building', 'digital-skills', '4 Weeks', 5000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Elementor", "WooCommerce", "Hosting"]', 'Create professional business websites with no coding required.', false),
('ms-office', 'Microsoft Office Suite', 'digital-skills', '4 Weeks', 4000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Word", "Excel", "PowerPoint"]', 'Essential office automation and business productivity skills.', false),
('ielts', 'IELTS Preparation (Academic & General)', 'language', '2 Months', 9000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Listening", "Reading", "Writing", "Speaking"]', 'Cambridge-certified strategies for Band 7.5+ with mock interviews.', true),
('spoken-english', 'Spoken English & Grammar', 'language', '6 Weeks', 5000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Fluency", "Grammar", "Pronunciation"]', 'Build speaking confidence and natural English communication.', false),
('css-pms', 'CSS / PMS Coaching', 'competitive', '3 Months', 12000, 'one-time', '["Morning Shift (8-12)", "Evening Shift (3-7)"]', '["Essay", "Precis", "Current Affairs"]', 'Civil service competitive examination preparation with officer mentors.', true)
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Announcements
INSERT INTO public.announcements (title, content, author_name, target_audience, priority)
VALUES
('📢 Grand Monthly Test Series Schedule Announced', 'Monthly examinations for Matric & Inter start on Monday. Minimum 80% attendance is required to sit in tests.', 'Administration Office', 'all', 'urgent'),
('✨ Special Sunday MDCAT & ECAT Speed Drills', 'Intensive numerical solving session this Sunday from 9:00 AM to 1:00 PM.', 'Prof. Tariq Mahmood', 'students', 'normal');
