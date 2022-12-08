--
-- PostgreSQL database cluster dump
--

-- Started on 2022-12-08 20:23:39

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:nJLdMzlD+5ksXIxSH/vGxw==$JfkewSagrQm93I4FbO/HuJHvfZpYnoQcqqK4+4TPc5U=:KWqwDz/dh1yshd35v82r+onFpwIx6OoIqt23GbEhyxQ=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.0

-- Started on 2022-12-08 20:23:39

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

-- Completed on 2022-12-08 20:23:39

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.0

-- Started on 2022-12-08 20:23:39

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

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16398)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    chatid character varying(50),
    donatorid character varying(50),
    interrested_doneeid character varying(50),
    petid character varying(50)
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16401)
-- Name: donationrequests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.donationrequests (
    donationrequestid character varying(50),
    donatorid character varying(50),
    interresteddoneeid character varying(50),
    petid character varying(50),
    isadopted boolean
);


ALTER TABLE public.donationrequests OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16404)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    chatid character varying(50),
    "timestamp" character varying(100),
    user_messageid character varying(50),
    user_message text
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24576)
-- Name: pets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pets (
    petid text,
    donatorid character varying(100),
    ownerid character varying(100),
    petname character varying(100),
    petphoto text,
    city character varying(100),
    sstate character varying(100),
    address text,
    age character varying(10),
    medicalcondition character varying(50),
    pettype character varying(20),
    isadopted boolean
);


ALTER TABLE public.pets OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16414)
-- Name: social; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social (
    follower_user_id text,
    follower_username text,
    follower_user_avatarurl text,
    following_user_id text,
    following_username text,
    following_user_avatarurl text
);


ALTER TABLE public.social OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16419)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text,
    username text,
    email text,
    avatarurl text
);


ALTER TABLE public.users OWNER TO postgres;

-- Completed on 2022-12-08 20:23:39

--
-- PostgreSQL database dump complete
--

-- Completed on 2022-12-08 20:23:39

--
-- PostgreSQL database cluster dump complete
--

