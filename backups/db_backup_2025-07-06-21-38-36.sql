--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

-- Started on 2025-07-07 00:38:36 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS guided_tours;
--
-- TOC entry 3719 (class 1262 OID 30057)
-- Name: guided_tours; Type: DATABASE; Schema: -; Owner: sez
--

CREATE DATABASE guided_tours WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE guided_tours OWNER TO sez;

\connect guided_tours

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 39158)
-- Name: Article; Type: TABLE; Schema: public; Owner: sez
--

CREATE TABLE public."Article" (
    id integer NOT NULL,
    sections jsonb NOT NULL
);


ALTER TABLE public."Article" OWNER TO sez;

--
-- TOC entry 216 (class 1259 OID 39157)
-- Name: Article_id_seq; Type: SEQUENCE; Schema: public; Owner: sez
--

CREATE SEQUENCE public."Article_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Article_id_seq" OWNER TO sez;

--
-- TOC entry 3720 (class 0 OID 0)
-- Dependencies: 216
-- Name: Article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sez
--

ALTER SEQUENCE public."Article_id_seq" OWNED BY public."Article".id;


--
-- TOC entry 215 (class 1259 OID 38564)
-- Name: Location; Type: TABLE; Schema: public; Owner: sez
--

CREATE TABLE public."Location" (
    id integer NOT NULL,
    name text NOT NULL,
    images text[],
    description text NOT NULL,
    popular boolean NOT NULL,
    about text NOT NULL
);


ALTER TABLE public."Location" OWNER TO sez;

--
-- TOC entry 214 (class 1259 OID 38563)
-- Name: Location_id_seq; Type: SEQUENCE; Schema: public; Owner: sez
--

CREATE SEQUENCE public."Location_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Location_id_seq" OWNER TO sez;

--
-- TOC entry 3721 (class 0 OID 0)
-- Dependencies: 214
-- Name: Location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sez
--

ALTER SEQUENCE public."Location_id_seq" OWNED BY public."Location".id;


--
-- TOC entry 213 (class 1259 OID 30126)
-- Name: Tour; Type: TABLE; Schema: public; Owner: sez
--

CREATE TABLE public."Tour" (
    id integer NOT NULL,
    title text NOT NULL,
    location text NOT NULL,
    price double precision NOT NULL,
    tags text[],
    images text[],
    description text NOT NULL,
    "tourDetails" jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    duration text NOT NULL,
    "shortDescription" text NOT NULL,
    label text,
    status text DEFAULT 'active'::text NOT NULL
);


ALTER TABLE public."Tour" OWNER TO sez;

--
-- TOC entry 212 (class 1259 OID 30125)
-- Name: Tour_id_seq; Type: SEQUENCE; Schema: public; Owner: sez
--

CREATE SEQUENCE public."Tour_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tour_id_seq" OWNER TO sez;

--
-- TOC entry 3722 (class 0 OID 0)
-- Dependencies: 212
-- Name: Tour_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sez
--

ALTER SEQUENCE public."Tour_id_seq" OWNED BY public."Tour".id;


--
-- TOC entry 211 (class 1259 OID 30072)
-- Name: User; Type: TABLE; Schema: public; Owner: sez
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."User" OWNER TO sez;

--
-- TOC entry 210 (class 1259 OID 30071)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: sez
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO sez;

--
-- TOC entry 3723 (class 0 OID 0)
-- Dependencies: 210
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sez
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 209 (class 1259 OID 30060)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: sez
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO sez;

--
-- TOC entry 3554 (class 2604 OID 39161)
-- Name: Article id; Type: DEFAULT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."Article" ALTER COLUMN id SET DEFAULT nextval('public."Article_id_seq"'::regclass);


--
-- TOC entry 3553 (class 2604 OID 38567)
-- Name: Location id; Type: DEFAULT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."Location" ALTER COLUMN id SET DEFAULT nextval('public."Location_id_seq"'::regclass);


--
-- TOC entry 3550 (class 2604 OID 30129)
-- Name: Tour id; Type: DEFAULT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."Tour" ALTER COLUMN id SET DEFAULT nextval('public."Tour_id_seq"'::regclass);


--
-- TOC entry 3549 (class 2604 OID 30075)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3713 (class 0 OID 39158)
-- Dependencies: 217
-- Data for Name: Article; Type: TABLE DATA; Schema: public; Owner: sez
--



--
-- TOC entry 3711 (class 0 OID 38564)
-- Dependencies: 215
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: sez
--

INSERT INTO public."Location" (id, name, images, description, popular, about) VALUES (31, 'Cappadocia', '{/static/1744644718078-E10DUZ2-min.png,/static/1744644718086-E101BVNA-min.png,/static/1744644718092-E101IDQX-min.png,/static/1744644718096-E104AGHC-min.png,/static/1744644718098-E108X3XD-min.png}', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. ', true, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>');
INSERT INTO public."Location" (id, name, images, description, popular, about) VALUES (32, 'Antalya', '{/static/1744644758915-E101ABFP-min.png,/static/1744644758924-E101ACUJ-min.png,/static/1744644758936-E1070HXK-min.png}', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.', false, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>');
INSERT INTO public."Location" (id, name, images, description, popular, about) VALUES (33, 'Istanbul', '{/static/1744644783170-E10SQ6M-min.png,/static/1744644783176-E113CE15-min.png,/static/1744644783178-E118FJ5P-min.png,/static/1744644783179-E1081UPO-min.png}', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.', true, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>');
INSERT INTO public."Location" (id, name, images, description, popular, about) VALUES (34, 'Ephesus', '{/static/1744644808060-E109K7EW-min.png,/static/1744644808067-E113IV08-min.png,/static/1744644808069-E1141CUS-min.png,/static/1744644808071-E11403YI-min.png}', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.', true, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>');
INSERT INTO public."Location" (id, name, images, description, popular, about) VALUES (35, 'Gelibolu', '{/static/1744644847268-E10A3PRO-min.png,/static/1744644847272-E105KA50-min.png,/static/1744644847275-E109FU9M-min.png,/static/1744644847277-E11411S3-min.png}', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.', true, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>');
INSERT INTO public."Location" (id, name, images, description, popular, about) VALUES (36, 'Pamukkale', '{/static/1744644868743-E113IX6M-min.png,/static/1744644868745-E113MV9Z-min.png,/static/1744644868748-E1019T8K-min.png,/static/1744644868749-E1033JXA-min.png}', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.', true, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>');
INSERT INTO public."Location" (id, name, images, description, popular, about) VALUES (37, 'Gobeklitepe', '{/static/1744644893213-E104VCI0-min.png,/static/1744644893216-E113QLF7-min.png,/static/1744644893220-E1140IZ6-min.png}', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.', false, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><p><br></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>');


--
-- TOC entry 3709 (class 0 OID 30126)
-- Dependencies: 213
-- Data for Name: Tour; Type: TABLE DATA; Schema: public; Owner: sez
--

INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (87, 'Turkey Historical Exploration', 'Turkey', 850, '{History,Culture,Archaeology}', '{/static/test8.png,/static/test6.png,/static/test10.png}', '<h2>Step Back in Time at Turkey</h2><p>Explore one of the most important archaeological sites in the world, Turkey. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Turkey</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Turkey. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Turkey', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (88, 'Istanbul Historical Exploration', 'Istanbul', 850, '{History,Culture,Archaeology}', '{/static/test9.png,/static/test5.png,/static/test10.png}', '<h2>Step Back in Time at Istanbul</h2><p>Explore one of the most important archaeological sites in the world, Istanbul. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Istanbul</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Istanbul. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Istanbul', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (89, 'Gobeklitepe Historical Exploration', 'Gobeklitepe', 850, '{History,Culture,Archaeology}', '{/static/test2.png,/static/test8.png,/static/test9.png}', '<h2>Step Back in Time at Gobeklitepe</h2><p>Explore one of the most important archaeological sites in the world, Gobeklitepe. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Gobeklitepe</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Gobeklitepe. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Gobeklitepe', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (90, 'Antalya Historical Exploration', 'Antalya', 850, '{History,Culture,Archaeology}', '{/static/test5.png,/static/test10.png,/static/test2.png}', '<h2>Step Back in Time at Antalya</h2><p>Explore one of the most important archaeological sites in the world, Antalya. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Antalya</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Antalya. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Antalya', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (91, 'Gelibolu Historical Exploration', 'Gelibolu', 850, '{History,Culture,Archaeology}', '{/static/test4.png,/static/test6.png,/static/test2.png}', '<h2>Step Back in Time at Gelibolu</h2><p>Explore one of the most important archaeological sites in the world, Gelibolu. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Gelibolu</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Gelibolu. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Gelibolu', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (92, 'Cappadocia Historical Exploration', 'Cappadocia', 850, '{History,Culture,Archaeology}', '{/static/test7.png,/static/test5.png,/static/test8.png}', '<h2>Step Back in Time at Cappadocia</h2><p>Explore one of the most important archaeological sites in the world, Cappadocia. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Cappadocia</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Cappadocia. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Cappadocia', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (93, 'Istanbul Historical Exploration', 'Istanbul', 850, '{History,Culture,Archaeology}', '{/static/test6.png,/static/test9.png,/static/test2.png}', '<h2>Step Back in Time at Istanbul</h2><p>Explore one of the most important archaeological sites in the world, Istanbul. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Istanbul</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Istanbul. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Istanbul', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (94, 'Gelibolu Historical Exploration', 'Gelibolu', 850, '{History,Culture,Archaeology}', '{/static/test5.png,/static/test10.png,/static/test4.png}', '<h2>Step Back in Time at Gelibolu</h2><p>Explore one of the most important archaeological sites in the world, Gelibolu. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Gelibolu</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Gelibolu. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Gelibolu', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (95, 'Pamukkale Historical Exploration', 'Pamukkale', 850, '{History,Culture,Archaeology}', '{/static/test10.png,/static/test8.png,/static/test7.png}', '<h2>Step Back in Time at Pamukkale</h2><p>Explore one of the most important archaeological sites in the world, Pamukkale. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Pamukkale</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Pamukkale. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Pamukkale', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (96, 'Turkey Historical Exploration', 'Turkey', 850, '{History,Culture,Archaeology}', '{/static/test7.png,/static/test4.png,/static/test2.png}', '<h2>Step Back in Time at Turkey</h2><p>Explore one of the most important archaeological sites in the world, Turkey. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Turkey</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Turkey. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Turkey', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (97, 'Pamukkale Historical Exploration', 'Pamukkale', 850, '{History,Culture,Archaeology}', '{/static/test2.png,/static/test5.png,/static/test6.png}', '<h2>Step Back in Time at Pamukkale</h2><p>Explore one of the most important archaeological sites in the world, Pamukkale. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Pamukkale</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Pamukkale. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Pamukkale', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (98, 'Cappadocia Historical Exploration', 'Cappadocia', 850, '{History,Culture,Archaeology}', '{/static/test2.png,/static/test5.png,/static/test8.png}', '<h2>Step Back in Time at Cappadocia</h2><p>Explore one of the most important archaeological sites in the world, Cappadocia. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Cappadocia</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Cappadocia. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Cappadocia', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (99, 'Cappadocia Historical Exploration', 'Cappadocia', 850, '{History,Culture,Archaeology}', '{/static/test5.png,/static/test7.png,/static/test1.png}', '<h2>Step Back in Time at Cappadocia</h2><p>Explore one of the most important archaeological sites in the world, Cappadocia. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Cappadocia</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Cappadocia. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Cappadocia', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (100, 'Antalya Historical Exploration', 'Antalya', 850, '{History,Culture,Archaeology}', '{/static/test6.png,/static/test10.png,/static/test7.png}', '<h2>Step Back in Time at Antalya</h2><p>Explore one of the most important archaeological sites in the world, Antalya. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Antalya</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Antalya. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Antalya', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (101, 'Turkey Historical Exploration', 'Turkey', 850, '{History,Culture,Archaeology}', '{/static/test7.png,/static/test9.png,/static/test8.png}', '<h2>Step Back in Time at Turkey</h2><p>Explore one of the most important archaeological sites in the world, Turkey. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Turkey</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Turkey. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Turkey', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (102, 'Gobeklitepe Historical Exploration', 'Gobeklitepe', 850, '{History,Culture,Archaeology}', '{/static/test6.png,/static/test5.png,/static/test10.png}', '<h2>Step Back in Time at Gobeklitepe</h2><p>Explore one of the most important archaeological sites in the world, Gobeklitepe. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Gobeklitepe</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Gobeklitepe. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Gobeklitepe', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (103, 'Istanbul Historical Exploration', 'Istanbul', 850, '{History,Culture,Archaeology}', '{/static/test4.png,/static/test6.png,/static/test9.png}', '<h2>Step Back in Time at Istanbul</h2><p>Explore one of the most important archaeological sites in the world, Istanbul. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Istanbul</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Istanbul. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Istanbul', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (104, 'Eskisehir Historical Exploration', 'Eskisehir', 850, '{History,Culture,Archaeology}', '{/static/test5.png,/static/test8.png,/static/test1.png}', '<h2>Step Back in Time at Eskisehir</h2><p>Explore one of the most important archaeological sites in the world, Eskisehir. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Eskisehir</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Eskisehir. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Eskisehir', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (105, 'Ephesus Historical Exploration', 'Ephesus', 850, '{History,Culture,Archaeology}', '{/static/test6.png,/static/test2.png,/static/test1.png}', '<h2>Step Back in Time at Ephesus</h2><p>Explore one of the most important archaeological sites in the world, Ephesus. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Ephesus</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Ephesus. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Ephesus', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (106, 'Gelibolu Historical Exploration', 'Gelibolu', 850, '{History,Culture,Archaeology}', '{/static/test3.png,/static/test1.png,/static/test9.png}', '<h2>Step Back in Time at Gelibolu</h2><p>Explore one of the most important archaeological sites in the world, Gelibolu. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Gelibolu</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Gelibolu. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu", "Explore top landmarks in Gelibolu"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Gelibolu", "Gelibolu", "Gelibolu"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:38:31.906', '2025-04-13 13:38:31.906', '2 days', 'Explore the ancient city of Gelibolu', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (107, 'Ephesus Historical Exploration', 'Ephesus', 850, '{History,Culture,Archaeology}', '{/static/test1.png,/static/test2.png,/static/test3.png}', '<h2>Step Back in Time at Ephesus</h2><p>Explore one of the most important archaeological sites in the world, Ephesus. This tour takes you through its ancient streets, grand theatres, and sacred sites that date back thousands of years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive and explore the ancient city of <em>Ephesus</em>. Walk through its famous streets, admire the Library of Celsus, and see the impressive Temple of Artemis.</p><p><strong>Day 2:</strong> Visit the House of Virgin Mary and the Theatre of Ephesus. Learn about its rich history from expert guides.</p>', '{"remarks": ["Wear comfortable walking shoes", "Dress modestly when visiting religious sites"], "itinerary": ["Visit Ephesus Archaeological Site", "Explore the Temple of Artemis", "See the House of Virgin Mary", "Visit the Theatre of Ephesus"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Ephesus", "Temple of Artemis", "House of Virgin Mary"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '2 days', 'Explore the ancient city of Ephesus', 'Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (108, 'Mystical Konya Journey', 'Konya', 750, '{Spirituality,Culture,History}', '{/static/test4.png,/static/test5.png,/static/test6.png}', '<h2>Discover the Spiritual Heart of Turkey</h2><p>Experience the mystical city of Konya, the home of the whirling dervishes and Rumi''s final resting place. This tour connects you with centuries of Sufi tradition and Turkish Islamic heritage.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Visit the <em>Mevlana Museum</em> and learn about the life of Rumi, one of the world''s greatest poets and spiritual leaders.</p><p><strong>Day 2:</strong> Attend an authentic Whirling Dervish ceremony and explore the ancient Seljuk architecture throughout the city.</p>', '{"remarks": ["Dress modestly when visiting religious sites", "Photography may be restricted in certain areas"], "itinerary": ["Visit Mevlana Museum", "Attend Whirling Dervish ceremony", "Explore Alaeddin Hill", "Tour Karatay Medrese"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Mevlana Museum", "Whirling Dervish Ceremony", "Seljuk Architecture"], "inclusions": ["Accommodation", "Meals (Breakfast and Dinner)", "Guided Tour", "Transport"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '2 days', 'Experience the mystical city of Konya', 'Cultural', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (109, 'Istanbul: Bridge Between Continents', 'Istanbul', 1200, '{Culture,History,Cuisine}', '{/static/test7.png,/static/test8.png,/static/test9.png}', '<h2>Experience the Magic of Istanbul</h2><p>Straddling two continents, Istanbul offers a unique blend of European and Asian cultures. Explore its magnificent mosques, bustling bazaars, and enjoy the vibrant atmosphere of this ancient city.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Visit the iconic <em>Hagia Sophia</em> and <em>Blue Mosque</em> in the historic Sultanahmet district.</p><p><strong>Day 2:</strong> Explore Topkapi Palace and enjoy a Bosphorus cruise witnessing the city from both European and Asian shores.</p><p><strong>Day 3:</strong> Experience the Grand Bazaar and Spice Market, followed by a traditional Turkish hamam experience.</p>', '{"remarks": ["Comfortable walking shoes recommended", "Dress modestly when visiting mosques"], "itinerary": ["Tour Hagia Sophia and Blue Mosque", "Visit Topkapi Palace", "Enjoy Bosphorus Cruise", "Explore Grand Bazaar and Spice Market", "Experience traditional Turkish hamam"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Hagia Sophia", "Bosphorus Cruise", "Grand Bazaar"], "inclusions": ["Accommodation", "Daily Breakfast", "Guided Tours", "Bosphorus Cruise", "Transport"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '3 days', 'Discover the wonders of Istanbul', 'Best Seller', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (110, 'Gallipoli Battlefield Tour', 'Gelibolu', 680, '{History,Memorial,Education}', '{/static/test10.png,/static/test1.png,/static/test2.png}', '<h2>Honor the Fallen at Gallipoli</h2><p>Take a poignant journey through the Gallipoli Peninsula, site of one of World War I''s most significant campaigns. This tour offers profound insights into the ANZAC legend and the birth of modern Turkey.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Visit ANZAC Cove, Lone Pine Australian Memorial, and the 57th Regiment Turkish Memorial.</p><p><strong>Day 2:</strong> Explore Chunuk Bair New Zealand Memorial, Turkish trenches, and the Kabatepe War Museum.</p>', '{"remarks": ["Comfortable walking shoes essential", "Tour involves moderate walking", "Weather appropriate clothing recommended"], "itinerary": ["Visit ANZAC Cove", "Explore Lone Pine Memorial", "Tour Chunuk Bair", "Visit Kabatepe War Museum"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["ANZAC Cove", "War Memorials", "Historical Battlefields"], "inclusions": ["Accommodation", "Meals (Breakfast and Lunch)", "Expert Historical Guide", "Transport"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '2 days', 'Journey through the historic Gallipoli battlefields', 'Educational', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (111, 'Eskisehir: City of Innovation', 'Eskisehir', 580, '{Culture,Modern,University}', '{/static/test3.png,/static/test4.png,/static/test5.png}', '<h2>Discover Turkey''s Most Livable City</h2><p>Known as the ''Venice of Turkey'', Eskisehir combines traditional charm with modern innovation. Experience its beautiful canals, thriving university culture, and unique blend of Ottoman and European influences.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Explore Odunpazarı historical district with its colorful Ottoman houses and visit the Museum of Modern Glass Art.</p><p><strong>Day 2:</strong> Enjoy a boat trip along the Porsuk River and visit Eskisehir''s famous theme park, Sazova Science, Art and Culture Park.</p>', '{"remarks": ["Ideal for all age groups", "Combination of walking and transport"], "itinerary": ["Tour Odunpazarı Historical District", "Visit Museum of Modern Glass Art", "Enjoy Porsuk River boat trip", "Explore Sazova Science Park"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Odunpazarı", "Porsuk River", "Modern Glass Art Museum"], "inclusions": ["Accommodation", "Meals (Breakfast)", "Guided Tours", "River Cruise", "Transport"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '2 days', 'Experience Eskisehir''s unique blend of old and new', 'Hidden Gem', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (112, 'Ultimate Turkey Adventure', 'Turkey', 2800, '{Adventure,Culture,History}', '{/static/test6.png,/static/test7.png,/static/test8.png}', '<h2>From Coast to Highlands: The Complete Turkish Experience</h2><p>This comprehensive tour takes you through Turkey''s most iconic destinations. Journey from Istanbul''s bustling markets to Cappadocia''s otherworldly landscapes and the turquoise coast of the Mediterranean.</p><h3>Highlights of Your Journey</h3><p><strong>Days 1-2:</strong> Explore Istanbul''s historic sites and vibrant culture.</p><p><strong>Days 3-4:</strong> Discover the ancient treasures of Ephesus.</p><p><strong>Days 5-6:</strong> Marvel at Pamukkale''s white terraces and ancient Hierapolis.</p><p><strong>Days 7-8:</strong> Experience the unique landscapes and balloon rides of Cappadocia.</p><p><strong>Days 9-10:</strong> Relax at the beautiful beaches of Antalya.</p>', '{"remarks": ["Suitable for all fitness levels", "Optional hot air balloon ride available", "Customizations available upon request"], "itinerary": ["Tour Istanbul''s iconic sites", "Explore ancient Ephesus", "Visit Pamukkale''s white terraces", "Experience Cappadocia''s unique landscape", "Relax at Antalya''s beautiful beaches"], "exclusions": ["International Flights", "Personal Expenses", "Optional Activities"], "highlights": ["Istanbul", "Ephesus", "Pamukkale", "Cappadocia", "Antalya"], "inclusions": ["Luxury Accommodation", "All Meals", "Private Guided Tours", "Domestic Flights", "All Transport"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '10 days', 'Experience the best of Turkey in one journey', 'Premium', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (113, 'Cappadocia Wonderland', 'Cappadocia', 950, '{Adventure,Nature,Culture}', '{/static/test9.png,/static/test10.png,/static/test1.png}', '<h2>Explore Turkey''s Fairy Tale Landscape</h2><p>Journey through the magical region of Cappadocia, famous for its unique ''fairy chimney'' rock formations, ancient cave dwellings, and spectacular hot air balloon rides at dawn.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Experience a breathtaking hot air balloon ride at sunrise over the unique lunar landscape.</p><p><strong>Day 2:</strong> Explore the Göreme Open Air Museum with its ancient rock-cut churches and stunning Byzantine frescoes.</p><p><strong>Day 3:</strong> Discover underground cities and hike through the Rose Valley, followed by a traditional pottery workshop in Avanos.</p>', '{"remarks": ["Early morning start for balloon ride", "Comfortable walking shoes essential", "Weather may affect balloon ride schedule"], "itinerary": ["Hot air balloon ride at sunrise", "Visit Göreme Open Air Museum", "Explore underground cities", "Hike through Rose Valley", "Attend pottery workshop in Avanos"], "exclusions": ["Flights to Cappadocia", "Personal Expenses", "Travel Insurance"], "highlights": ["Hot Air Balloon Ride", "Göreme Open Air Museum", "Underground Cities"], "inclusions": ["Cave Hotel Accommodation", "Daily Breakfast", "Hot Air Balloon Ride", "Guided Tours", "Transport"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '3 days', 'Marvel at Cappadocia''s unique landscapes', 'Most Popular', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (114, 'Antalya: Turquoise Coast Paradise', 'Antalya', 1100, '{Beach,History,Luxury}', '{/static/test2.png,/static/test3.png,/static/test4.png}', '<h2>Sun, Sea and Ancient Wonders</h2><p>Experience the perfect blend of relaxation and exploration on Turkey''s stunning Mediterranean coast. Antalya offers pristine beaches, ancient ruins, and luxurious resorts all in one spectacular setting.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Explore Antalya''s charming old town, Kaleiçi, with its Ottoman mansions and Roman harbor.</p><p><strong>Day 2:</strong> Visit the ancient city of Perge and the spectacular Düden Waterfalls.</p><p><strong>Day 3:</strong> Enjoy a boat trip along the coast with swimming opportunities in crystal-clear waters.</p><p><strong>Day 4:</strong> Relax at one of Antalya''s premium beaches and enjoy optional water sports activities.</p>', '{"remarks": ["Sunscreen and beachwear essential", "Optional water sports available", "Perfect for families and couples"], "itinerary": ["Tour Kaleiçi old town", "Visit ancient city of Perge", "See Düden Waterfalls", "Enjoy coastal boat trip", "Relax at premium beaches"], "exclusions": ["Flights", "Personal Expenses", "Optional Activities"], "highlights": ["Kaleiçi Old Town", "Ancient Perge", "Mediterranean Beaches"], "inclusions": ["Premium Resort Accommodation", "Daily Breakfast and Dinner", "Guided Tours", "Boat Trip", "Airport Transfers"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '4 days', 'Relax and explore on Turkey''s Mediterranean coast', 'Luxury', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (115, 'Göbeklitepe: Cradle of Civilization', 'Gobeklitepe', 780, '{Archaeology,History,Education}', '{/static/test5.png,/static/test6.png,/static/test7.png}', '<h2>Discover the World''s Oldest Temple</h2><p>Journey to southeastern Turkey to visit Göbeklitepe, a revolutionary archaeological discovery that has changed our understanding of human history. Dating back to 10,000 BCE, this site predates Stonehenge by 6,000 years.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Arrive in Şanlıurfa and visit the Archaeological Museum featuring artifacts from Göbeklitepe.</p><p><strong>Day 2:</strong> Full day exploration of the Göbeklitepe archaeological site with expert archaeologist guides.</p><p><strong>Day 3:</strong> Visit nearby Harran with its unique beehive houses and ancient university.</p>', '{"remarks": ["Moderate fitness level required", "Hat and sunscreen recommended", "Weather appropriate clothing essential"], "itinerary": ["Visit Şanlıurfa Archaeological Museum", "Guided tour of Göbeklitepe site", "Explore Harran ancient city", "Visit Balıklıgöl (Pool of Sacred Fish)"], "exclusions": ["Flights to Şanlıurfa", "Personal Expenses", "Travel Insurance"], "highlights": ["Göbeklitepe Archaeological Site", "Şanlıurfa Museum", "Harran"], "inclusions": ["Accommodation", "Meals (Breakfast and Lunch)", "Expert Archaeological Guides", "All Transport", "Site Entrance Fees"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '3 days', 'Explore the world''s oldest known temple complex', 'Educational', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (116, 'Pamukkale & Hierapolis Discovery', 'Pamukkale', 720, '{Nature,History,Wellness}', '{/static/test8.png,/static/test9.png,/static/test10.png}', '<h2>Natural Wonders and Ancient Splendors</h2><p>Marvel at the stunning white terraces of Pamukkale (''Cotton Castle'') and the adjacent ancient city of Hierapolis. This UNESCO World Heritage site combines natural beauty with fascinating history.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Explore the brilliant white travertine terraces of Pamukkale and bathe in the mineral-rich thermal waters.</p><p><strong>Day 2:</strong> Discover the ancient city of Hierapolis with its well-preserved theatre, necropolis, and the sacred Cleopatra''s Pool.</p>', '{"remarks": ["Bring swimwear for thermal pools", "Walking barefoot required on terraces", "Sun protection essential"], "itinerary": ["Visit Pamukkale white terraces", "Bathe in thermal pools", "Explore ancient Hierapolis", "Visit Cleopatra''s Pool"], "exclusions": ["Flights", "Personal Expenses", "Cleopatra''s Pool Entry Fee"], "highlights": ["White Travertine Terraces", "Ancient Hierapolis", "Thermal Pools"], "inclusions": ["Accommodation", "Meals (Breakfast)", "Guided Tours", "Transport", "Entrance Fees"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '2 days', 'Explore the white terraces of Pamukkale', 'Natural Wonder', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (117, 'Troy: Myth and Reality', 'Troy', 650, '{Archaeology,Mythology,History}', '{/static/test1.png,/static/test2.png,/static/test3.png}', '<h2>Journey to the Legendary City</h2><p>Step into the world of Homer''s Iliad at the archaeological site of Troy. Discover the reality behind the legend of the Trojan War and the famous Trojan Horse in this UNESCO World Heritage site.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Explore the archaeological site of Troy with its nine different settlement layers spanning 3,500 years of history.</p><p><strong>Day 2:</strong> Visit the Troy Museum housing artifacts from excavations and learn about the separation of myth from historical reality.</p>', '{"remarks": ["Moderate walking required", "Sun protection recommended", "Can be combined with Gallipoli tour"], "itinerary": ["Tour Troy archaeological site", "Visit Troy Museum", "See the replica Trojan Horse", "Explore nearby Çanakkale"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Troy Archaeological Site", "Troy Museum", "Trojan Horse Replica"], "inclusions": ["Accommodation in Çanakkale", "Meals (Breakfast)", "Expert Archaeological Guide", "Transport", "Entrance Fees"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '2 days', 'Discover the legendary city of Troy', 'Historical', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (118, 'Ancient Treasures of Ephesus & Pamukkale', 'Ephesus', 1050, '{History,Culture,Nature}', '{/static/test4.png,/static/test5.png,/static/test6.png}', '<h2>Two UNESCO Wonders in One Journey</h2><p>Combine the magnificent ancient city of Ephesus with the stunning natural terraces of Pamukkale on this comprehensive tour of Turkey''s most impressive UNESCO World Heritage sites.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1-2:</strong> Explore ancient Ephesus with its well-preserved Library of Celsus, Grand Theatre, and Temple of Artemis.</p><p><strong>Day 3-4:</strong> Marvel at Pamukkale''s white calcium terraces and explore the ancient ruins of Hierapolis.</p>', '{"remarks": ["Comfortable walking shoes essential", "Swimwear needed for Pamukkale", "Moderate fitness level recommended"], "itinerary": ["Visit Ephesus Archaeological Site", "Explore Temple of Artemis", "Tour Pamukkale''s white terraces", "Discover ancient Hierapolis"], "exclusions": ["Flights", "Personal Expenses", "Optional Activities"], "highlights": ["Ephesus Library of Celsus", "Pamukkale Terraces", "Hierapolis"], "inclusions": ["Premium Accommodation", "Daily Breakfast and Dinner", "Expert Guides", "Luxury Transport", "All Entrance Fees"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '4 days', 'Experience two UNESCO sites in one journey', 'UNESCO Special', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (119, 'Turkish Delights Culinary Tour', 'Istanbul', 890, '{Culinary,Culture,Foodie}', '{/static/test7.png,/static/test8.png,/static/test9.png}', '<h2>Taste the Flavors of Turkey</h2><p>Embark on a gastronomic adventure through Istanbul''s rich culinary landscape. From street food to fine dining, discover the diverse flavors that make Turkish cuisine one of the world''s most celebrated.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Explore the Spice Bazaar and participate in a cooking class learning classic Turkish dishes.</p><p><strong>Day 2:</strong> Food tour through different neighborhoods, sampling street food specialties and visiting local eateries.</p><p><strong>Day 3:</strong> Experience fine dining Turkish cuisine and enjoy a Bosphorus dinner cruise with traditional entertainment.</p>', '{"remarks": ["Dietary restrictions accommodated with advance notice", "Comfortable walking shoes recommended", "Come hungry to each experience!"], "itinerary": ["Visit Spice Bazaar", "Participate in cooking class", "Enjoy neighborhood food tour", "Experience fine dining", "Bosphorus dinner cruise"], "exclusions": ["Flights", "Personal Expenses", "Alcoholic Beverages (except welcome drink)"], "highlights": ["Cooking Class", "Spice Bazaar", "Street Food Tour"], "inclusions": ["Boutique Hotel Accommodation", "All Meals and Tastings", "Cooking Class Materials", "Food Tour Guide", "Bosphorus Dinner Cruise"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '3 days', 'Savor the authentic flavors of Turkish cuisine', 'Culinary', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (120, 'Cappadocia Photography Expedition', 'Cappadocia', 1200, '{Photography,Landscape,Adventure}', '{/static/test10.png,/static/test1.png,/static/test2.png}', '<h2>Capture the Magic of Cappadocia</h2><p>Designed specifically for photography enthusiasts, this tour takes you to the most photogenic locations in Cappadocia at the optimal times for lighting. Learn techniques from professional photographers while exploring this otherworldly landscape.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Sunrise hot air balloon ride for aerial photography, followed by a workshop on landscape photography.</p><p><strong>Day 2:</strong> Dawn photoshoot at Pasabag (Monks Valley), followed by exploring cave churches and hidden valleys.</p><p><strong>Day 3:</strong> Night photography session capturing star trails over the unique rock formations, with instruction on long exposure techniques.</p>', '{"remarks": ["Suitable for all photography levels", "Tripod recommended for night photography", "Early morning starts required"], "itinerary": ["Hot air balloon ride with photography focus", "Landscape photography workshop", "Dawn shoot at Pasabag", "Explore cave churches", "Night photography session"], "exclusions": ["Flights", "Camera Equipment", "Personal Expenses"], "highlights": ["Sunrise Balloon Photography", "Fairy Chimneys", "Night Sky Photography"], "inclusions": ["Boutique Cave Hotel", "Daily Breakfast", "Professional Photography Guide", "Hot Air Balloon Ride", "Transport to Photo Locations"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '3 days', 'Perfect your photography in stunning Cappadocia', 'Specialized', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (121, 'Black Sea Coastal Explorer', 'Turkey', 1350, '{Nature,Culture,Off-the-beaten-path}', '{/static/test3.png,/static/test4.png,/static/test5.png}', '<h2>Discover Turkey''s Verdant North Coast</h2><p>Experience the lush landscapes, unique culture, and hidden treasures of Turkey''s Black Sea region. From misty mountains to ancient monasteries, this tour reveals a side of Turkey few tourists see.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1-2:</strong> Explore the alpine meadows and traditional villages of the Kaçkar Mountains.</p><p><strong>Day 3-4:</strong> Visit Trabzon and the historic Sumela Monastery clinging to a steep cliff.</p><p><strong>Day 5-6:</strong> Discover Amasya with its Ottoman houses and rock tombs of Pontic kings.</p>', '{"remarks": ["Moderate fitness level required", "Weather appropriate clothing essential", "Some remote locations with basic facilities"], "itinerary": ["Explore Kaçkar Mountains", "Visit traditional Black Sea villages", "Tour Sumela Monastery", "Discover historic Amasya", "See Pontic rock tombs"], "exclusions": ["Flights", "Personal Expenses", "Travel Insurance"], "highlights": ["Kaçkar Mountains", "Sumela Monastery", "Amasya Ottoman Houses"], "inclusions": ["Accommodation", "Daily Breakfast and Dinner", "Expert Local Guide", "All Transport", "Entrance Fees"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '6 days', 'Experience Turkey''s lush Black Sea coastline', 'Off the Beaten Path', 'active');
INSERT INTO public."Tour" (id, title, location, price, tags, images, description, "tourDetails", "createdAt", "updatedAt", duration, "shortDescription", label, status) VALUES (122, 'Turkish Hammam Wellness Retreat', 'Istanbul', 1500, '{Wellness,Luxury,Relaxation}', '{/static/test6.png,/static/test7.png,/static/test8.png}', '<h2>Rejuvenate in Traditional Turkish Style</h2><p>Immerse yourself in the centuries-old tradition of the Turkish hammam. This wellness retreat combines authentic bathing rituals with modern spa treatments for complete relaxation and rejuvenation.</p><h3>Highlights of Your Journey</h3><p><strong>Day 1:</strong> Experience a traditional hammam ceremony in a historic 16th-century bath house.</p><p><strong>Day 2:</strong> Enjoy aromatherapy treatments and a private yoga session overlooking the Bosphorus.</p><p><strong>Day 3:</strong> Learn about Turkish herbal remedies and tea traditions, followed by a luxury spa experience.</p>', '{"remarks": ["Suitable for all fitness levels", "Bring swimwear for spa facilities", "Inform of any health conditions in advance"], "itinerary": ["Traditional hammam ceremony", "Aromatherapy treatments", "Private yoga session", "Turkish herbal remedies workshop", "Luxury spa experience"], "exclusions": ["Flights", "Personal Expenses", "Additional Treatments"], "highlights": ["Historic Hammam", "Bosphorus View Yoga", "Luxury Spa Treatments"], "inclusions": ["Luxury Hotel Accommodation", "Daily Breakfast", "All Wellness Treatments", "Private Wellness Guide", "Transfers"]}', '2025-04-13 13:42:13.098', '2025-04-13 13:42:13.098', '3 days', 'Relax with traditional Turkish bath experiences', 'Wellness', 'active');


--
-- TOC entry 3707 (class 0 OID 30072)
-- Dependencies: 211
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: sez
--



--
-- TOC entry 3705 (class 0 OID 30060)
-- Dependencies: 209
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: sez
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('e4343dbe-1896-4804-a989-1f1530ed1895', '136997de50222631d24f17b82e261788cf1a339d70a5245358367e33ad30638f', '2025-04-07 19:33:43.816+03', '20250407163343_init', NULL, NULL, '2025-04-07 19:33:43.807319+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('033f90fa-a64d-4dc8-be0b-ac92db624e7a', '69d4d66dc78e6c901e9f65b852577c3a3a200e15845e2ae2db085adc249f3b2a', '2025-04-08 03:22:47.23446+03', '20250408002247_tour_schema', NULL, NULL, '2025-04-08 03:22:47.229516+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('169c1b1f-72ba-40af-ab7e-24d6152a5b4a', 'e2cf2f34f8a5890dbe575ea87975f2d644ec118b04aebb5cd30ed1f0f189a1bc', '2025-04-09 03:16:03.364114+03', '20250409001603_add_shortdescription_duration', NULL, NULL, '2025-04-09 03:16:03.360957+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f7f06a7b-dd64-4289-a537-b9f9d101a149', '1cf7c57dc66d07c68ba5bfb487835f0de0735190c89bc4630affab71c8a6cbea', '2025-04-09 05:06:18.315041+03', '20250409020618_add_tour_label', NULL, NULL, '2025-04-09 05:06:18.313609+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('9c17bf5a-38d8-403d-8781-7c8e564412f3', 'eef44bf4b271f06f2c6cdf87ee13525436adee2893f0aab968246811e5bc12d9', '2025-04-12 21:03:51.744833+03', '20250412180351_location', NULL, NULL, '2025-04-12 21:03:51.734502+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('62e13dfe-93f8-49c4-8c52-a132b5f62f79', '8f71ba3f8b2841ed7c81f3dfbf93f397471debea2cbbd73895542e1f9d0fa66f', '2025-04-12 21:05:34.67331+03', '20250412180534_location2', NULL, NULL, '2025-04-12 21:05:34.671816+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('180e01dd-6e12-4c54-aa43-82dd3d5141ef', 'c051dff8208e02521012a59677eb0e91750e87d7652801f7efdf79e530a7e335', '2025-04-12 23:12:57.796314+03', '20250412201257_status', NULL, NULL, '2025-04-12 23:12:57.794325+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('79705c76-cc9f-4e76-872d-d4cf1badf8a4', 'b91ffe1ee47fe7ec43b79e8301526af1924e80b16aebba5ab8bfdacca07e8cca', '2025-04-13 02:53:43.029465+03', '20250412235342_popular', NULL, NULL, '2025-04-13 02:53:43.027183+03', 1);


--
-- TOC entry 3724 (class 0 OID 0)
-- Dependencies: 216
-- Name: Article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sez
--

SELECT pg_catalog.setval('public."Article_id_seq"', 1, false);


--
-- TOC entry 3725 (class 0 OID 0)
-- Dependencies: 214
-- Name: Location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sez
--

SELECT pg_catalog.setval('public."Location_id_seq"', 37, true);


--
-- TOC entry 3726 (class 0 OID 0)
-- Dependencies: 212
-- Name: Tour_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sez
--

SELECT pg_catalog.setval('public."Tour_id_seq"', 123, true);


--
-- TOC entry 3727 (class 0 OID 0)
-- Dependencies: 210
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sez
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- TOC entry 3565 (class 2606 OID 39165)
-- Name: Article Article_pkey; Type: CONSTRAINT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY (id);


--
-- TOC entry 3563 (class 2606 OID 38571)
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- TOC entry 3561 (class 2606 OID 30134)
-- Name: Tour Tour_pkey; Type: CONSTRAINT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."Tour"
    ADD CONSTRAINT "Tour_pkey" PRIMARY KEY (id);


--
-- TOC entry 3559 (class 2606 OID 30079)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3556 (class 2606 OID 30068)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: sez
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3557 (class 1259 OID 30080)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: sez
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


-- Completed on 2025-07-07 00:38:36 EEST

--
-- PostgreSQL database dump complete
--

