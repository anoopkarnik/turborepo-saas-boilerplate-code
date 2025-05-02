--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg20.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: aicompanion_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA aicompanion_schema;


ALTER SCHEMA aicompanion_schema OWNER TO postgres;

--
-- Name: boilerplate_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA boilerplate_schema;


ALTER SCHEMA boilerplate_schema OWNER TO postgres;

--
-- Name: github_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA github_schema;


ALTER SCHEMA github_schema OWNER TO postgres;

--
-- Name: n8n_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA n8n_schema;


ALTER SCHEMA n8n_schema OWNER TO postgres;

--
-- Name: photoai_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA photoai_schema;


ALTER SCHEMA photoai_schema OWNER TO postgres;

--
-- Name: scrapeflow_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA scrapeflow_schema;


ALTER SCHEMA scrapeflow_schema OWNER TO postgres;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA n8n_schema;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: APPROVED_SUBMIT_FOR_ORDER; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."APPROVED_SUBMIT_FOR_ORDER" AS ENUM (
    'NO',
    'WAITING_CONFIRMATION',
    'YES'
);


ALTER TYPE public."APPROVED_SUBMIT_FOR_ORDER" OWNER TO postgres;

--
-- Name: From; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."From" AS ENUM (
    'BUYER',
    'SELLER'
);


ALTER TYPE public."From" OWNER TO postgres;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'CANCELED',
    'COMPLETED'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

--
-- Name: Period; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Period" AS ENUM (
    'MONTHLY',
    'YEARLY'
);


ALTER TYPE public."Period" OWNER TO postgres;

--
-- Name: Provider; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Provider" AS ENUM (
    'LOCAL',
    'GITHUB',
    'GOOGLE',
    'FARCASTER'
);


ALTER TYPE public."Provider" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'SUPERADMIN',
    'ADMIN',
    'USER'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: State; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."State" AS ENUM (
    'QUEUE',
    'PUBLISHED',
    'ERROR',
    'DRAFT'
);


ALTER TYPE public."State" OWNER TO postgres;

--
-- Name: SubscriptionTier; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SubscriptionTier" AS ENUM (
    'STANDARD',
    'PRO',
    'TEAM',
    'ULTIMATE'
);


ALTER TYPE public."SubscriptionTier" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: annotation_tag_entity; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.annotation_tag_entity (
    id character varying(16) NOT NULL,
    name character varying(24) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.annotation_tag_entity OWNER TO postgres;

--
-- Name: auth_identity; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.auth_identity (
    "userId" uuid,
    "providerId" character varying(64) NOT NULL,
    "providerType" character varying(32) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.auth_identity OWNER TO postgres;

--
-- Name: auth_provider_sync_history; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.auth_provider_sync_history (
    id integer NOT NULL,
    "providerType" character varying(32) NOT NULL,
    "runMode" text NOT NULL,
    status text NOT NULL,
    "startedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    scanned integer NOT NULL,
    created integer NOT NULL,
    updated integer NOT NULL,
    disabled integer NOT NULL,
    error text
);


ALTER TABLE n8n_schema.auth_provider_sync_history OWNER TO postgres;

--
-- Name: auth_provider_sync_history_id_seq; Type: SEQUENCE; Schema: n8n_schema; Owner: postgres
--

CREATE SEQUENCE n8n_schema.auth_provider_sync_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE n8n_schema.auth_provider_sync_history_id_seq OWNER TO postgres;

--
-- Name: auth_provider_sync_history_id_seq; Type: SEQUENCE OWNED BY; Schema: n8n_schema; Owner: postgres
--

ALTER SEQUENCE n8n_schema.auth_provider_sync_history_id_seq OWNED BY n8n_schema.auth_provider_sync_history.id;


--
-- Name: credentials_entity; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.credentials_entity (
    name character varying(128) NOT NULL,
    data text NOT NULL,
    type character varying(128) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    id character varying(36) NOT NULL,
    "isManaged" boolean DEFAULT false NOT NULL
);


ALTER TABLE n8n_schema.credentials_entity OWNER TO postgres;

--
-- Name: event_destinations; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.event_destinations (
    id uuid NOT NULL,
    destination jsonb NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.event_destinations OWNER TO postgres;

--
-- Name: execution_annotation_tags; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.execution_annotation_tags (
    "annotationId" integer NOT NULL,
    "tagId" character varying(24) NOT NULL
);


ALTER TABLE n8n_schema.execution_annotation_tags OWNER TO postgres;

--
-- Name: execution_annotations; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.execution_annotations (
    id integer NOT NULL,
    "executionId" integer NOT NULL,
    vote character varying(6),
    note text,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.execution_annotations OWNER TO postgres;

--
-- Name: execution_annotations_id_seq; Type: SEQUENCE; Schema: n8n_schema; Owner: postgres
--

CREATE SEQUENCE n8n_schema.execution_annotations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE n8n_schema.execution_annotations_id_seq OWNER TO postgres;

--
-- Name: execution_annotations_id_seq; Type: SEQUENCE OWNED BY; Schema: n8n_schema; Owner: postgres
--

ALTER SEQUENCE n8n_schema.execution_annotations_id_seq OWNED BY n8n_schema.execution_annotations.id;


--
-- Name: execution_data; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.execution_data (
    "executionId" integer NOT NULL,
    "workflowData" json NOT NULL,
    data text NOT NULL
);


ALTER TABLE n8n_schema.execution_data OWNER TO postgres;

--
-- Name: execution_entity; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.execution_entity (
    id integer NOT NULL,
    finished boolean NOT NULL,
    mode character varying NOT NULL,
    "retryOf" character varying,
    "retrySuccessId" character varying,
    "startedAt" timestamp(3) with time zone,
    "stoppedAt" timestamp(3) with time zone,
    "waitTill" timestamp(3) with time zone,
    status character varying NOT NULL,
    "workflowId" character varying(36) NOT NULL,
    "deletedAt" timestamp(3) with time zone,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.execution_entity OWNER TO postgres;

--
-- Name: execution_entity_id_seq; Type: SEQUENCE; Schema: n8n_schema; Owner: postgres
--

CREATE SEQUENCE n8n_schema.execution_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE n8n_schema.execution_entity_id_seq OWNER TO postgres;

--
-- Name: execution_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: n8n_schema; Owner: postgres
--

ALTER SEQUENCE n8n_schema.execution_entity_id_seq OWNED BY n8n_schema.execution_entity.id;


--
-- Name: execution_metadata; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.execution_metadata (
    id integer NOT NULL,
    "executionId" integer NOT NULL,
    key character varying(255) NOT NULL,
    value text NOT NULL
);


ALTER TABLE n8n_schema.execution_metadata OWNER TO postgres;

--
-- Name: execution_metadata_temp_id_seq; Type: SEQUENCE; Schema: n8n_schema; Owner: postgres
--

CREATE SEQUENCE n8n_schema.execution_metadata_temp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE n8n_schema.execution_metadata_temp_id_seq OWNER TO postgres;

--
-- Name: execution_metadata_temp_id_seq; Type: SEQUENCE OWNED BY; Schema: n8n_schema; Owner: postgres
--

ALTER SEQUENCE n8n_schema.execution_metadata_temp_id_seq OWNED BY n8n_schema.execution_metadata.id;


--
-- Name: folder; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.folder (
    id character varying(36) NOT NULL,
    name character varying(128) NOT NULL,
    "parentFolderId" character varying(36),
    "projectId" character varying(36) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.folder OWNER TO postgres;

--
-- Name: folder_tag; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.folder_tag (
    "folderId" character varying(36) NOT NULL,
    "tagId" character varying(36) NOT NULL
);


ALTER TABLE n8n_schema.folder_tag OWNER TO postgres;

--
-- Name: installed_nodes; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.installed_nodes (
    name character varying(200) NOT NULL,
    type character varying(200) NOT NULL,
    "latestVersion" integer DEFAULT 1 NOT NULL,
    package character varying(241) NOT NULL
);


ALTER TABLE n8n_schema.installed_nodes OWNER TO postgres;

--
-- Name: installed_packages; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.installed_packages (
    "packageName" character varying(214) NOT NULL,
    "installedVersion" character varying(50) NOT NULL,
    "authorName" character varying(70),
    "authorEmail" character varying(70),
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.installed_packages OWNER TO postgres;

--
-- Name: invalid_auth_token; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.invalid_auth_token (
    token character varying(512) NOT NULL,
    "expiresAt" timestamp(3) with time zone NOT NULL
);


ALTER TABLE n8n_schema.invalid_auth_token OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE n8n_schema.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: n8n_schema; Owner: postgres
--

CREATE SEQUENCE n8n_schema.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE n8n_schema.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: n8n_schema; Owner: postgres
--

ALTER SEQUENCE n8n_schema.migrations_id_seq OWNED BY n8n_schema.migrations.id;


--
-- Name: processed_data; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.processed_data (
    "workflowId" character varying(36) NOT NULL,
    context character varying(255) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    value text NOT NULL
);


ALTER TABLE n8n_schema.processed_data OWNER TO postgres;

--
-- Name: project; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.project (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(36) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    icon json
);


ALTER TABLE n8n_schema.project OWNER TO postgres;

--
-- Name: project_relation; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.project_relation (
    "projectId" character varying(36) NOT NULL,
    "userId" uuid NOT NULL,
    role character varying NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.project_relation OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.role (
    id integer NOT NULL,
    name character varying(32) NOT NULL,
    scope character varying(255) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: n8n_schema; Owner: postgres
--

CREATE SEQUENCE n8n_schema.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE n8n_schema.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: n8n_schema; Owner: postgres
--

ALTER SEQUENCE n8n_schema.role_id_seq OWNED BY n8n_schema.role.id;


--
-- Name: settings; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.settings (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    "loadOnStartup" boolean DEFAULT false NOT NULL
);


ALTER TABLE n8n_schema.settings OWNER TO postgres;

--
-- Name: shared_credentials; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.shared_credentials (
    "credentialsId" character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    role text NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.shared_credentials OWNER TO postgres;

--
-- Name: shared_workflow; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.shared_workflow (
    "workflowId" character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    role text NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.shared_workflow OWNER TO postgres;

--
-- Name: tag_entity; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.tag_entity (
    name character varying(24) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    id character varying(36) NOT NULL
);


ALTER TABLE n8n_schema.tag_entity OWNER TO postgres;

--
-- Name: test_case_execution; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.test_case_execution (
    id character varying(36) NOT NULL,
    "testRunId" character varying(36) NOT NULL,
    "pastExecutionId" integer,
    "executionId" integer,
    "evaluationExecutionId" integer,
    status character varying NOT NULL,
    "runAt" timestamp(3) with time zone,
    "completedAt" timestamp(3) with time zone,
    "errorCode" character varying,
    "errorDetails" json,
    metrics json,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.test_case_execution OWNER TO postgres;

--
-- Name: test_definition; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.test_definition (
    name character varying(255) NOT NULL,
    "workflowId" character varying(36) NOT NULL,
    "evaluationWorkflowId" character varying(36),
    "annotationTagId" character varying(16),
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    description text,
    id character varying(36) NOT NULL,
    "mockedNodes" json DEFAULT '[]'::json NOT NULL
);


ALTER TABLE n8n_schema.test_definition OWNER TO postgres;

--
-- Name: test_metric; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.test_metric (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    "testDefinitionId" character varying(36) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.test_metric OWNER TO postgres;

--
-- Name: test_run; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.test_run (
    id character varying(36) NOT NULL,
    "testDefinitionId" character varying(36) NOT NULL,
    status character varying NOT NULL,
    "runAt" timestamp(3) with time zone,
    "completedAt" timestamp(3) with time zone,
    metrics json,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "totalCases" integer,
    "passedCases" integer,
    "failedCases" integer,
    "errorCode" character varying(255),
    "errorDetails" text,
    CONSTRAINT test_run_check CHECK (
CASE
    WHEN ((status)::text = 'new'::text) THEN ("totalCases" IS NULL)
    WHEN ((status)::text = ANY ((ARRAY['cancelled'::character varying, 'error'::character varying])::text[])) THEN (("totalCases" IS NULL) OR ("totalCases" >= 0))
    ELSE ("totalCases" >= 0)
END),
    CONSTRAINT test_run_check1 CHECK (
CASE
    WHEN ((status)::text = 'new'::text) THEN ("passedCases" IS NULL)
    WHEN ((status)::text = ANY ((ARRAY['cancelled'::character varying, 'error'::character varying])::text[])) THEN (("passedCases" IS NULL) OR ("passedCases" >= 0))
    ELSE ("passedCases" >= 0)
END),
    CONSTRAINT test_run_check2 CHECK (
CASE
    WHEN ((status)::text = 'new'::text) THEN ("failedCases" IS NULL)
    WHEN ((status)::text = ANY ((ARRAY['cancelled'::character varying, 'error'::character varying])::text[])) THEN (("failedCases" IS NULL) OR ("failedCases" >= 0))
    ELSE ("failedCases" >= 0)
END)
);


ALTER TABLE n8n_schema.test_run OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema."user" (
    id uuid DEFAULT uuid_in((OVERLAY(OVERLAY(md5((((random())::text || ':'::text) || (clock_timestamp())::text)) PLACING '4'::text FROM 13) PLACING to_hex((floor(((random() * (((11 - 8) + 1))::double precision) + (8)::double precision)))::integer) FROM 17))::cstring) NOT NULL,
    email character varying(255),
    "firstName" character varying(32),
    "lastName" character varying(32),
    password character varying(255),
    "personalizationAnswers" json,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    settings json,
    disabled boolean DEFAULT false NOT NULL,
    "mfaEnabled" boolean DEFAULT false NOT NULL,
    "mfaSecret" text,
    "mfaRecoveryCodes" text,
    role text NOT NULL
);


ALTER TABLE n8n_schema."user" OWNER TO postgres;

--
-- Name: user_api_keys; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.user_api_keys (
    id character varying(36) NOT NULL,
    "userId" uuid NOT NULL,
    label character varying(100) NOT NULL,
    "apiKey" character varying NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE n8n_schema.user_api_keys OWNER TO postgres;

--
-- Name: variables; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.variables (
    key character varying(50) NOT NULL,
    type character varying(50) DEFAULT 'string'::character varying NOT NULL,
    value character varying(255),
    id character varying(36) NOT NULL
);


ALTER TABLE n8n_schema.variables OWNER TO postgres;

--
-- Name: webhook_entity; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.webhook_entity (
    "webhookPath" character varying NOT NULL,
    method character varying NOT NULL,
    node character varying NOT NULL,
    "webhookId" character varying,
    "pathLength" integer,
    "workflowId" character varying(36) NOT NULL
);


ALTER TABLE n8n_schema.webhook_entity OWNER TO postgres;

--
-- Name: workflow_entity; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.workflow_entity (
    name character varying(128) NOT NULL,
    active boolean NOT NULL,
    nodes json NOT NULL,
    connections json NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    settings json,
    "staticData" json,
    "pinData" json,
    "versionId" character(36),
    "triggerCount" integer DEFAULT 0 NOT NULL,
    id character varying(36) NOT NULL,
    meta json,
    "parentFolderId" character varying(36) DEFAULT NULL::character varying
);


ALTER TABLE n8n_schema.workflow_entity OWNER TO postgres;

--
-- Name: workflow_history; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.workflow_history (
    "versionId" character varying(36) NOT NULL,
    "workflowId" character varying(36) NOT NULL,
    authors character varying(255) NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
    nodes json NOT NULL,
    connections json NOT NULL
);


ALTER TABLE n8n_schema.workflow_history OWNER TO postgres;

--
-- Name: workflow_statistics; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.workflow_statistics (
    count integer DEFAULT 0,
    "latestEvent" timestamp(3) with time zone,
    name character varying(128) NOT NULL,
    "workflowId" character varying(36) NOT NULL
);


ALTER TABLE n8n_schema.workflow_statistics OWNER TO postgres;

--
-- Name: workflows_tags; Type: TABLE; Schema: n8n_schema; Owner: postgres
--

CREATE TABLE n8n_schema.workflows_tags (
    "workflowId" character varying(36) NOT NULL,
    "tagId" character varying(36) NOT NULL
);


ALTER TABLE n8n_schema.workflows_tags OWNER TO postgres;

--
-- Name: Comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comments" (
    id text NOT NULL,
    content text NOT NULL,
    "organizationId" text NOT NULL,
    "postId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Comments" OWNER TO postgres;

--
-- Name: Credits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Credits" (
    id text NOT NULL,
    "organizationId" text NOT NULL,
    credits integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Credits" OWNER TO postgres;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer" (
    id text NOT NULL,
    name text NOT NULL,
    "orgId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Customer" OWNER TO postgres;

--
-- Name: ExisingPlugData; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExisingPlugData" (
    id text NOT NULL,
    "integrationId" text NOT NULL,
    "methodName" text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public."ExisingPlugData" OWNER TO postgres;

--
-- Name: GitHub; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GitHub" (
    id text NOT NULL,
    login text,
    name text,
    token text NOT NULL,
    "jobId" text,
    "organizationId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."GitHub" OWNER TO postgres;

--
-- Name: Integration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Integration" (
    id text NOT NULL,
    "internalId" text NOT NULL,
    "organizationId" text NOT NULL,
    name text NOT NULL,
    picture text,
    "providerIdentifier" text NOT NULL,
    type text NOT NULL,
    token text NOT NULL,
    disabled boolean DEFAULT false NOT NULL,
    "tokenExpiration" timestamp(3) without time zone,
    "refreshToken" text,
    profile text,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    "inBetweenSteps" boolean DEFAULT false NOT NULL,
    "refreshNeeded" boolean DEFAULT false NOT NULL,
    "postingTimes" text DEFAULT '[{"time":120}, {"time":400}, {"time":700}]'::text NOT NULL,
    "customInstanceDetails" text,
    "customerId" text,
    "rootInternalId" text,
    "additionalSettings" text DEFAULT '[]'::text
);


ALTER TABLE public."Integration" OWNER TO postgres;

--
-- Name: ItemUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ItemUser" (
    id text NOT NULL,
    "userId" text NOT NULL,
    key text NOT NULL
);


ALTER TABLE public."ItemUser" OWNER TO postgres;

--
-- Name: Media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Media" (
    id text NOT NULL,
    name text NOT NULL,
    path text NOT NULL,
    "organizationId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Media" OWNER TO postgres;

--
-- Name: Messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Messages" (
    id text NOT NULL,
    "from" public."From" NOT NULL,
    content text,
    "groupId" text NOT NULL,
    special text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Messages" OWNER TO postgres;

--
-- Name: MessagesGroup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MessagesGroup" (
    id text NOT NULL,
    "buyerOrganizationId" text NOT NULL,
    "buyerId" text NOT NULL,
    "sellerId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MessagesGroup" OWNER TO postgres;

--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    id text NOT NULL,
    "organizationId" text NOT NULL,
    content text NOT NULL,
    link text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- Name: OrderItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItems" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "integrationId" text NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public."OrderItems" OWNER TO postgres;

--
-- Name: Orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orders" (
    id text NOT NULL,
    "buyerId" text NOT NULL,
    "sellerId" text NOT NULL,
    status public."OrderStatus" NOT NULL,
    "messageGroupId" text NOT NULL,
    "captureId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Orders" OWNER TO postgres;

--
-- Name: Organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Organization" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "apiKey" text,
    "paymentId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "allowTrial" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Organization" OWNER TO postgres;

--
-- Name: PayoutProblems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PayoutProblems" (
    id text NOT NULL,
    status text NOT NULL,
    "orderId" text NOT NULL,
    "userId" text NOT NULL,
    "postId" text,
    amount integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PayoutProblems" OWNER TO postgres;

--
-- Name: Plugs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Plugs" (
    id text NOT NULL,
    "organizationId" text NOT NULL,
    "plugFunction" text NOT NULL,
    data text NOT NULL,
    "integrationId" text NOT NULL,
    activated boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Plugs" OWNER TO postgres;

--
-- Name: PopularPosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PopularPosts" (
    id text NOT NULL,
    category text NOT NULL,
    topic text NOT NULL,
    content text NOT NULL,
    hook text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PopularPosts" OWNER TO postgres;

--
-- Name: Post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Post" (
    id text NOT NULL,
    state public."State" DEFAULT 'QUEUE'::public."State" NOT NULL,
    "publishDate" timestamp(3) without time zone NOT NULL,
    "organizationId" text NOT NULL,
    "integrationId" text NOT NULL,
    content text NOT NULL,
    "group" text NOT NULL,
    title text,
    description text,
    "parentPostId" text,
    "releaseId" text,
    "releaseURL" text,
    settings text,
    image text,
    "submittedForOrderId" text,
    "submittedForOrganizationId" text,
    "approvedSubmitForOrder" public."APPROVED_SUBMIT_FOR_ORDER" DEFAULT 'NO'::public."APPROVED_SUBMIT_FOR_ORDER" NOT NULL,
    "lastMessageId" text,
    error text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Post" OWNER TO postgres;

--
-- Name: SocialMediaAgency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SocialMediaAgency" (
    id text NOT NULL,
    "userId" text NOT NULL,
    name text NOT NULL,
    "logoId" text,
    website text,
    slug text,
    facebook text,
    instagram text,
    twitter text,
    "linkedIn" text,
    youtube text,
    tiktok text,
    "otherSocialMedia" text,
    "shortDescription" text NOT NULL,
    description text NOT NULL,
    approved boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."SocialMediaAgency" OWNER TO postgres;

--
-- Name: SocialMediaAgencyNiche; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SocialMediaAgencyNiche" (
    "agencyId" text NOT NULL,
    niche text NOT NULL
);


ALTER TABLE public."SocialMediaAgencyNiche" OWNER TO postgres;

--
-- Name: Star; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Star" (
    id text NOT NULL,
    stars integer NOT NULL,
    "totalStars" integer NOT NULL,
    forks integer NOT NULL,
    "totalForks" integer NOT NULL,
    login text NOT NULL,
    date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Star" OWNER TO postgres;

--
-- Name: Subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Subscription" (
    id text NOT NULL,
    "organizationId" text NOT NULL,
    "subscriptionTier" public."SubscriptionTier" NOT NULL,
    identifier text,
    "cancelAt" timestamp(3) without time zone,
    period public."Period" NOT NULL,
    "totalChannels" integer NOT NULL,
    "isLifetime" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Subscription" OWNER TO postgres;

--
-- Name: Trending; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Trending" (
    id text NOT NULL,
    "trendingList" text NOT NULL,
    language text,
    hash text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Trending" OWNER TO postgres;

--
-- Name: TrendingLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TrendingLog" (
    id text NOT NULL,
    language text,
    date timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TrendingLog" OWNER TO postgres;

--
-- Name: UsedCodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsedCodes" (
    id text NOT NULL,
    code text NOT NULL,
    "orgId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UsedCodes" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text,
    "providerName" public."Provider" NOT NULL,
    name text,
    "lastName" text,
    "isSuperAdmin" boolean DEFAULT false NOT NULL,
    bio text,
    audience integer DEFAULT 0 NOT NULL,
    "pictureId" text,
    "providerId" text,
    timezone integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastReadNotifications" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "inviteId" text,
    activated boolean DEFAULT true NOT NULL,
    marketplace boolean DEFAULT true NOT NULL,
    account text,
    "connectedAccount" boolean DEFAULT false NOT NULL,
    "lastOnline" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip text,
    agent text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserOrganization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserOrganization" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "organizationId" text NOT NULL,
    disabled boolean DEFAULT false NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UserOrganization" OWNER TO postgres;

--
-- Name: auth_provider_sync_history id; Type: DEFAULT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.auth_provider_sync_history ALTER COLUMN id SET DEFAULT nextval('n8n_schema.auth_provider_sync_history_id_seq'::regclass);


--
-- Name: execution_annotations id; Type: DEFAULT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_annotations ALTER COLUMN id SET DEFAULT nextval('n8n_schema.execution_annotations_id_seq'::regclass);


--
-- Name: execution_entity id; Type: DEFAULT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_entity ALTER COLUMN id SET DEFAULT nextval('n8n_schema.execution_entity_id_seq'::regclass);


--
-- Name: execution_metadata id; Type: DEFAULT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_metadata ALTER COLUMN id SET DEFAULT nextval('n8n_schema.execution_metadata_temp_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.migrations ALTER COLUMN id SET DEFAULT nextval('n8n_schema.migrations_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.role ALTER COLUMN id SET DEFAULT nextval('n8n_schema.role_id_seq'::regclass);


--
-- Data for Name: annotation_tag_entity; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.annotation_tag_entity (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: auth_identity; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.auth_identity ("userId", "providerId", "providerType", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: auth_provider_sync_history; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.auth_provider_sync_history (id, "providerType", "runMode", status, "startedAt", "endedAt", scanned, created, updated, disabled, error) FROM stdin;
\.


--
-- Data for Name: credentials_entity; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.credentials_entity (name, data, type, "createdAt", "updatedAt", id, "isManaged") FROM stdin;
OpenAi account	U2FsdGVkX1+1aaJziCFQaf0Du6/n9/LGIqiSGDV0Yeds1jIerntG+wBKCA6Ndrv1gTbMkzgrJiV0oEjGKZaAW+CoDVhqF47+NW2Il5qSztYWezCrVlBIlhtEbWrtkTvSNACAr0/vh3sKFz5lUYdo4V2hMplovS5LMlpSLqYhz7w2ms84KcPTBc2cNG18ChK+xW0VwDBgC3GO4I7GNhpitnrlVn+yaNhUGwIKOzj+jBcbdAT2/M9/VoR/nFSuD38NbJp/S4V9sGeVge0KpdPAMQ==	openAiApi	2025-03-05 04:07:42.28+00	2025-03-05 04:07:42.279+00	lQG76FeAV4wYRYKI	f
Notion account	U2FsdGVkX1/YzebwmNbP8uT59bLi7dF4e5NSsJN+IrsUaS180ALS+LOO16LiFP7uv6NhEnCJOybsLSfuRawAauXKr1hFDCvQsBBfTk+IJc8=	notionApi	2025-03-05 04:09:42.812+00	2025-03-05 04:09:42.81+00	QdgVf5BHy8oV0hoa	f
Google Drive account	U2FsdGVkX18q/GcTPJW3xYH8txn/FcjOpZQ4emOSJzCVcQT8xxSh5psLV/mKYJfFbB20YDBgMLOv0p6XMT07vdqULhScsM6PHf9lreUIDHy5j6k4lvK/KIGb1+Q4YDr9Iu7uXPfzLQubLMP6t4tMn7XUHs+US0C0M8ltp6tqYU/vNLY6z3dKscQZpg3QX3uhDZkTRulrM87QZ85xycJWtzf66haDN6eWENKZWtNJ6cFC2GDNoNLoml2sBC0EV+J6tD16Uz3shv9ICJKbLGtu+KMhBa1XomMg3i+KBd40PGIZD3nWvkBNWnK0aVXfDrrgs5mq8T9DDNxvFcj6ZsP6WgOqENoH6/bnG6ZUXVs25LI51ioNhB7bikrcm3ix1KQKypvwTfJHyhqY9JMiI+2kAYku3p7yREz8xgxrpIWBWwmrO5QZh2gbunOeU4sEfVTZDa4YvxUk4s28P5K1hUE3Uq6+oMhWTmsW0PgrulA+CfaiJ8LzEdJ6tm3jwOEDITuzkCusrod/7pbqvEDd+7WniGaClFLmJSmXv+RQbNhF9M/QdYtemqCxR6ee2yWctGxIrumiUUiCNEszrPi1gp/fs7vXAzN1xTUYXCp5zmy2n2Q3I88SoFhPmTk8/KNavCV+IiLJc9kTdtCThLRygRbiqTJ/cTCbm6qQngTmDZYOT7aV2ZR1UO8YedOgPqmWKH9t3ZyWzqwIB4dvUIsseERWoqa4uxx5NFtGWRJ4hx2Dy15d0VVs1YLtSVMQTFv0G5ySmcFfVR0zmLkVlpBs+Fw3AbjqeJ2IrIcANHFCESnSimdbmF2j0JLlY0BaoGeO8VhQkfQjuLlQaOWFk4sodYqf2Qasorg42LLMoHqkqmlcBGKv++/W/y0IL9ct83ScR9GXvFSvC2OlkpUbGV6AgamLSIRTl1D3In3NtsJjmhijTGIyH2qrzsPLrqNxzOQ5lBbdMtZrtjXZNgBJehDbdCH7In4eIo191BL5IYkYalmkFFfP0mZjowCPZe3qF0+8tEpTWp6pEPTqum0Q/Bg4T1okPeA5DqmHFYNUoCj/0gvBqeGcY/MVkXBgEqulIzSgYEeO6HXuzxfC/zaTGwSiCD73JlefGZgImUvbtla3NVnsEz4nG9dJZ2m2s1m8gHJ9vbScSTa99LLdpRT5QmUiahUe7WYrueTjJNcp0kXMqgD8oKJQ5+fnWO/QfVjWIWqXVk4VLV/1y/9S4RlI+7T4c5om2qHnoYefddPjuGeMXPGk58w=	googleDriveOAuth2Api	2025-03-05 04:16:31.473+00	2025-03-05 04:16:51.69+00	rjYwrb2HxMR4xBjD	f
LinkedIn account	U2FsdGVkX19gQfMcksPwUHkYblq5fGBtdO0prSDI9RRBDchwQnmknwBwAxzbbmz7VO22yqdkDhRps2eV4uZjaslchevl5UO+0ZW862z7e8AUAkULX6FDRAH5uxo71AyBybjMeoKsBgJnqgE5BtINGH3O4Cy7BxmIQd7eNT/zv/dlBBqA3GpXyQMfA74LFwbUHxx3WpxDNRb88ln1ud7vtcbK2oUejsguGa3k3lVvp7ZRiVkFc3wgrm4qxDHHh2bzLPccN0xhgCXwiJ16TyWNCMzNmz7B5eoYHGhXAc/JHllLWYkrMgJkcr26NliC5XtkYIYoQ9OFYGxuJMmzKFVVMO8p1vgQXadVGJe2xDC9NA+zED4qaijME+8Q+8vZyNWh1xN6eDxk3LzeUubLCkyJvkQ8cZXxPYXy/OhOvhrXGXLjV85TWjWfM+EcnhFrsSmvXfFqg7V1l0pkJ98bxmXWvPjy5Nr4pEjLHBdgK3X/Dau4I5RRz9cz9Dk5oTle9e89it7wYLiwX4vbBj/mP7XcioNHKplf+aHfFW0uqdwV43tcgKVqYh06SECTexnSOi3X3mipC0UYNc9FenAMiY8qwoV+eAvo4bAdttX6W57JC7LQGxfmA1AerwzSPn9g6Qs02Y+RUiTE4mPQETxEyJdj+BE+B8+2M4SGLZZP6RMAmzigE6zy4IqfI3Xpm/DhG1hn0xd0f8hQvVO/DvSSgC/KuNBSgA8Tm5eCEzlOBa8vIwnD8RMnuGTJgMOOylXNKzuUWhx2gmq8Z6nkB8p2aCDWzIllgZFC+Sr9Xzm2aboimGBBGHRuJu5bcSQLEgFcj5llhBXBhxuTj/wM7RrDm+xUJ/e0xvdVrB7NftW2IqUQFXbTZRsAPmqvv1t8jEAn/577RWH7e1hoMImp0DeQBj4tfMg5HVq62fr2X57L4COazF77V/dPvMPeSoSPRuKdlIVMKnwiyoMUfUvDSiKQ2uJhaQGIcj0+3O3dNWYncnV3y5wutTQVrttD7GW8hB0jOZ1wfbAygtrIyzWcAAOI9VtAOnd8xqXraAQxTCrBCOhcMBzHR0VR5K/qhAF/+kFkChzIbTsVdbVPgmRXA/D4TKLnFlzz020H2olzy6qM4WpJtlIDNXe6JoAVnKvaBn1VapwJTNllQQdgknMPdwG7cBsnC1Otet2Yk+l+pVmQ8FXXiaz5P+2xgaP99bvM5Wf4282zaY89cunbf3pHRRtqNB6MZlsGna+kOjUJogXadBoUTygTWkH0sb7Jt+GNgie7iK+NDiFrfjbFCvFGoKrR8S574Pvyyv6Wz4WjxWR2HHspidFd1RLdxJ0NlodbIZTVaNOvXztuiLU8dtkCNBaichFU4b/PN3MbPoOHRQhTDLe6oyh4RxIQI3pjCPobrg8HhRDhUcH61CaEfBxqjSKdl97K7vm0hglwoVkp59fJvlxgK9wkN9JfThKQ6OO9TUXN/o4ZUlw0Y4C7CcDfByPIKxuSFIYqkah+dS9vsaAIAnBqIimbVxGpq8GoonfZeeor1Gp01vpjfMrRZKP16hGDFywMJhagZAGo9+qo280JtPLyh7Rfd3O+hJ+nSggjJis2ZHcK/M9wHAJbglxwpIKWEuzFx7fjw95iI5zWHEVP4gfpecioPve/JIxXwPi15dovi5ZdMMlO0fhneA60aqPJfCOfo2DnoN1nYl6p9jcH+g9h+hjhGY5SX6mrGiQyATwMHWvkBvdd5PsUEax6wiUFKPE/pgzgUQ+jpnAb13MEeBEMnXEO4wJb8srrlXwAdYZ6OsdOigHkLDWde1mpS5jwvAYahNnvGcdH+KpUAAyXYZPpzfgkhj8Sky7EgSKlJdl1MHyLdn7Fc0pgE1S7hKZkhy0LycWTRY4YYAx2iaJJ0JT7OQhxL8Yp8NuJ0CCLgaoqJQW+gDt8y8dhtNOaldA9SvlePtpn+FI/LAdWflnUEpsFdmvNjqtaQ+x8P9FR97/W7I2dAoKy8VCt4DnfCeVGHNolYQAwKaHGU1AiSxBDdxQTPUqIqeKvx2juMGG0rRUbIbPSI3wSfM1d9LV9Hn9t2QRTKuk/sBDxvfDd9Lw6F1VKQ7XUpDtJbpW+d06oe16WfoqZfGlrHeOsAs5d68KlheMHrP8E4EEWm1JHMH8Uec1bhceYepD4kFfaBPJQSKSoHh7ObSbEojd4OunxED9x8DBM5B6WaKpLGd5WJHOJTfGpubpQk0L68GjaQIedov+r0cz+KOgjO8PiHrGvsePLilF00hpHUmUGs+or1H77mp2TqK7dAu/MTfPBhDwXQdK1RQ/Svpmr+nG95msyM2kPLutL4pzNm6Czgr9UvgyDnL9HZzBJ4xXDGWtHR9lPULOyI777uD+HFngBqlQC7cxd6YhsZGWryKxzcWWsA6qQ9kdY4MgB290BWz3SkZT8RXpjERJPoX5gXtUZ3ea48Qt3wcqqRgcxCXU2LxczrE0SF1jsiZ3Bt5x34D3rfrQ1WXrDgLWTFOqRidf8xe48HKaHiCXaDOpf+d/ARpht/p/zkbpiEWNMDW34tn1/rLNHQYOyKl6Kl+BT7SbwoB5IrIi1XZ+eZ6PoypVrihJYRgYyrUMmYmH+WZ037CkNuyX+OGf9/6ODaN+D8kbO/GfojwkdUt+qsOTCi4MovlSBqr35AErPJAkJJefwkpJXuiR9mjrLpUwIEw5kFhJi+2tMCxIHIrFIP98Vavzny0HyRKIN5y6zjOw=	linkedInOAuth2Api	2025-03-05 04:18:35.783+00	2025-03-05 04:19:32.455+00	r0EjeLd020yM2inx	f
Ollama account	U2FsdGVkX1/VYKW76Sm0hETpFKipJB3UvkzKiV4bs2c=	ollamaApi	2025-03-05 04:20:06.354+00	2025-03-05 04:20:06.353+00	iamHaKetBZTSKqo0	f
Groq account	U2FsdGVkX1/T5H6swlPT7mpdN8B/taD98xH/retHe0noHgB3yJSxBEAH8W6OHclDe5J010KwMxqZZfwXdfX1NlC3G5Cq6TKjaaA6YwwkK9dIsPhJ9nuAaM36TmCbDLuh	groqApi	2025-03-05 04:25:37.662+00	2025-03-05 04:25:37.66+00	JtyjVaUju7By2vIc	f
\.


--
-- Data for Name: event_destinations; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.event_destinations (id, destination, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: execution_annotation_tags; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.execution_annotation_tags ("annotationId", "tagId") FROM stdin;
\.


--
-- Data for Name: execution_annotations; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.execution_annotations (id, "executionId", vote, note, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: execution_data; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.execution_data ("executionId", "workflowData", data) FROM stdin;
1	{"id":"rS4kdv6PzY4xx6wg","name":"My workflow","active":false,"nodes":[{"parameters":{"notice":""},"type":"n8n-nodes-base.manualTrigger","typeVersion":1,"position":[0,0],"id":"063bfbc5-7cfc-4c14-9a5a-1e694b13b4cf","name":"When clicking ‘Test workflow’"},{"parameters":{"executeOnce":true,"command":"echo test"},"type":"n8n-nodes-base.executeCommand","typeVersion":1,"position":[220,0],"id":"e3fa0938-92c8-483b-bb41-94654e184c69","name":"Execute Command"}],"connections":{"When clicking ‘Test workflow’":{"main":[[{"node":"Execute Command","type":"main","index":0}]]}},"settings":{"executionOrder":"v1"},"pinData":{}}	[{"startData":"1","resultData":"2","executionData":"3"},{"destinationNode":"4","runNodeFilter":"5"},{"runData":"6","pinData":"7","lastNodeExecuted":"4"},{"contextData":"8","nodeExecutionStack":"9","metadata":"10","waitingExecution":"11","waitingExecutionSource":"12"},"Execute Command",["13","4"],{"When clicking ‘Test workflow’":"14","Execute Command":"15"},{},{},[],{},{},{},"When clicking ‘Test workflow’",["16"],["17"],{"hints":"18","startTime":1741153749620,"executionTime":1,"source":"19","executionStatus":"20","data":"21"},{"hints":"22","startTime":1741153749623,"executionTime":9,"source":"23","executionStatus":"20","data":"24"},[],[],"success",{"main":"25"},[],["26"],{"main":"27"},["28"],{"previousNode":"13"},["29"],["30"],["31"],{"json":"32","pairedItem":"33"},{"json":"34","pairedItem":"35"},{},{"item":0},{"exitCode":0,"stderr":"36","stdout":"37"},{"item":0},"","test"]
\.


--
-- Data for Name: execution_entity; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.execution_entity (id, finished, mode, "retryOf", "retrySuccessId", "startedAt", "stoppedAt", "waitTill", status, "workflowId", "deletedAt", "createdAt") FROM stdin;
1	t	manual	\N	\N	2025-03-05 05:49:09.609+00	2025-03-05 05:49:09.633+00	\N	success	rS4kdv6PzY4xx6wg	\N	2025-03-05 05:49:09.595+00
\.


--
-- Data for Name: execution_metadata; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.execution_metadata (id, "executionId", key, value) FROM stdin;
\.


--
-- Data for Name: folder; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.folder (id, name, "parentFolderId", "projectId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: folder_tag; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.folder_tag ("folderId", "tagId") FROM stdin;
\.


--
-- Data for Name: installed_nodes; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.installed_nodes (name, type, "latestVersion", package) FROM stdin;
\.


--
-- Data for Name: installed_packages; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.installed_packages ("packageName", "installedVersion", "authorName", "authorEmail", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: invalid_auth_token; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.invalid_auth_token (token, "expiresAt") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.migrations (id, "timestamp", name) FROM stdin;
1	1587669153312	InitialMigration1587669153312
2	1589476000887	WebhookModel1589476000887
3	1594828256133	CreateIndexStoppedAt1594828256133
4	1607431743768	MakeStoppedAtNullable1607431743768
5	1611144599516	AddWebhookId1611144599516
6	1617270242566	CreateTagEntity1617270242566
7	1620824779533	UniqueWorkflowNames1620824779533
8	1626176912946	AddwaitTill1626176912946
9	1630419189837	UpdateWorkflowCredentials1630419189837
10	1644422880309	AddExecutionEntityIndexes1644422880309
11	1646834195327	IncreaseTypeVarcharLimit1646834195327
12	1646992772331	CreateUserManagement1646992772331
13	1648740597343	LowerCaseUserEmail1648740597343
14	1652254514002	CommunityNodes1652254514002
15	1652367743993	AddUserSettings1652367743993
16	1652905585850	AddAPIKeyColumn1652905585850
17	1654090467022	IntroducePinData1654090467022
18	1658932090381	AddNodeIds1658932090381
19	1659902242948	AddJsonKeyPinData1659902242948
20	1660062385367	CreateCredentialsUserRole1660062385367
21	1663755770893	CreateWorkflowsEditorRole1663755770893
22	1664196174001	WorkflowStatistics1664196174001
23	1665484192212	CreateCredentialUsageTable1665484192212
24	1665754637025	RemoveCredentialUsageTable1665754637025
25	1669739707126	AddWorkflowVersionIdColumn1669739707126
26	1669823906995	AddTriggerCountColumn1669823906995
27	1671535397530	MessageEventBusDestinations1671535397530
28	1671726148421	RemoveWorkflowDataLoadedFlag1671726148421
29	1673268682475	DeleteExecutionsWithWorkflows1673268682475
30	1674138566000	AddStatusToExecutions1674138566000
31	1674509946020	CreateLdapEntities1674509946020
32	1675940580449	PurgeInvalidWorkflowConnections1675940580449
33	1676996103000	MigrateExecutionStatus1676996103000
34	1677236854063	UpdateRunningExecutionStatus1677236854063
35	1677501636754	CreateVariables1677501636754
36	1679416281778	CreateExecutionMetadataTable1679416281778
37	1681134145996	AddUserActivatedProperty1681134145996
38	1681134145997	RemoveSkipOwnerSetup1681134145997
39	1690000000000	MigrateIntegerKeysToString1690000000000
40	1690000000020	SeparateExecutionData1690000000020
41	1690000000030	RemoveResetPasswordColumns1690000000030
42	1690000000030	AddMfaColumns1690000000030
43	1690787606731	AddMissingPrimaryKeyOnExecutionData1690787606731
44	1691088862123	CreateWorkflowNameIndex1691088862123
45	1692967111175	CreateWorkflowHistoryTable1692967111175
46	1693491613982	ExecutionSoftDelete1693491613982
47	1693554410387	DisallowOrphanExecutions1693554410387
48	1694091729095	MigrateToTimestampTz1694091729095
49	1695128658538	AddWorkflowMetadata1695128658538
50	1695829275184	ModifyWorkflowHistoryNodesAndConnections1695829275184
51	1700571993961	AddGlobalAdminRole1700571993961
52	1705429061930	DropRoleMapping1705429061930
53	1711018413374	RemoveFailedExecutionStatus1711018413374
54	1711390882123	MoveSshKeysToDatabase1711390882123
55	1712044305787	RemoveNodesAccess1712044305787
56	1714133768519	CreateProject1714133768519
57	1714133768521	MakeExecutionStatusNonNullable1714133768521
58	1717498465931	AddActivatedAtUserSetting1717498465931
59	1720101653148	AddConstraintToExecutionMetadata1720101653148
60	1721377157740	FixExecutionMetadataSequence1721377157740
61	1723627610222	CreateInvalidAuthTokenTable1723627610222
62	1723796243146	RefactorExecutionIndices1723796243146
63	1724753530828	CreateAnnotationTables1724753530828
64	1724951148974	AddApiKeysTable1724951148974
65	1726606152711	CreateProcessedDataTable1726606152711
66	1727427440136	SeparateExecutionCreationFromStart1727427440136
67	1728659839644	AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644
68	1729607673464	UpdateProcessedDataValueColumnToText1729607673464
69	1729607673469	AddProjectIcons1729607673469
70	1730386903556	CreateTestDefinitionTable1730386903556
71	1731404028106	AddDescriptionToTestDefinition1731404028106
72	1731582748663	MigrateTestDefinitionKeyToString1731582748663
73	1732271325258	CreateTestMetricTable1732271325258
74	1732549866705	CreateTestRun1732549866705
75	1733133775640	AddMockedNodesColumnToTestDefinition1733133775640
76	1734479635324	AddManagedColumnToCredentialsTable1734479635324
77	1736172058779	AddStatsColumnsToTestRun1736172058779
78	1736947513045	CreateTestCaseExecutionTable1736947513045
79	1737715421462	AddErrorColumnsToTestRuns1737715421462
80	1738709609940	CreateFolderTable1738709609940
\.


--
-- Data for Name: processed_data; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.processed_data ("workflowId", context, "createdAt", "updatedAt", value) FROM stdin;
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.project (id, name, type, "createdAt", "updatedAt", icon) FROM stdin;
u1wH6PK5Wcyh599s	Anoop Dasika <anoopkarnikofficial@gmail.com>	personal	2025-03-05 03:38:13.144+00	2025-03-05 03:54:33.941+00	\N
\.


--
-- Data for Name: project_relation; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.project_relation ("projectId", "userId", role, "createdAt", "updatedAt") FROM stdin;
u1wH6PK5Wcyh599s	0dfda7b4-57b7-4cf6-a455-7928af7827cf	project:personalOwner	2025-03-05 03:38:13.144+00	2025-03-05 03:38:13.144+00
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.role (id, name, scope, "createdAt", "updatedAt") FROM stdin;
1	owner	global	2025-03-05 03:38:12.659+00	2025-03-05 03:38:12.659+00
2	member	global	2025-03-05 03:38:12.659+00	2025-03-05 03:38:12.659+00
3	owner	workflow	2025-03-05 03:38:12.659+00	2025-03-05 03:38:12.659+00
4	owner	credential	2025-03-05 03:38:12.659+00	2025-03-05 03:38:12.659+00
5	user	credential	2025-03-05 03:38:12.705+00	2025-03-05 03:38:12.705+00
6	editor	workflow	2025-03-05 03:38:12.708+00	2025-03-05 03:38:12.708+00
7	admin	global	2025-03-05 03:38:13.032+00	2025-03-05 03:38:13.032+00
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.settings (key, value, "loadOnStartup") FROM stdin;
ui.banners.dismissed	["V1"]	t
features.ldap	{"loginEnabled":false,"loginLabel":"","connectionUrl":"","allowUnauthorizedCerts":false,"connectionSecurity":"none","connectionPort":389,"baseDn":"","bindingAdminDn":"","bindingAdminPassword":"","firstNameAttribute":"","lastNameAttribute":"","emailAttribute":"","loginIdAttribute":"","ldapIdAttribute":"","userFilter":"","synchronizationEnabled":false,"synchronizationInterval":60,"searchPageSize":0,"searchTimeout":60}	t
features.sourceControl.sshKeys	{"encryptedPrivateKey":"U2FsdGVkX1+5mzkheg/Q5AyGVmh0oCqyKk3BpjMD8cOtqqZw6Trl8SoFeNcadrh8vETIs+xYBjF0aH/Bdrtcsvf3IgwDL/dR9du3VTAt0mkajX+NWJ9yjEYWHs9ltllGXi/Uq4BeZU+8eICur2841PR8QA4noTzo9WZmaYr5s8rbI9ofXgV6T1ovcU3r+1QBfzPdsi+A8PkRzkzyi7UZEaLNzJoeZcroxqi2u0B6NhnH6feZkZVtdkxwhMOes82DjiUAKTiTWxsvQd31mRr+JLaxcyIyZ9Dk5OxRajFXPgY3BN1/lipUiBH6t22OYvV/WTlu8WnaCuumZVxrYuuLxJ8q7rGhplJhN/aBD0OAqjtU6IJiGBbwLcw19UKsJACtkCs7cfzANfoWjnirFw6DJlBYKmlt/yYV1nKPoSOt3ZjV596/015I3udz/dyK74abBOGgG1wIP1fH3KYjC1gCr2+5U6rumBKFTPdRWQMwSQYAqFr6CtcUOgF2GNXGT5uNcqrPq72rNa3NC3APRe549HrJtcPJPVy/0GgsFjcDIZ+MvJeBxtOulD5dguPVyy0e","publicKey":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGNu1Kg02pn1ZPzR3fa74vIhAP9pg7acek1oVZH/JmX8 n8n deploy key"}	t
features.sourceControl	{"branchName":"main","keyGeneratorType":"ed25519"}	t
userManagement.isInstanceOwnerSetUp	true	t
license.cert	eyJsaWNlbnNlS2V5IjoiLS0tLS1CRUdJTiBMSUNFTlNFIEtFWS0tLS0tXG5nb21qblhrbGQzQmRJZEt4YXJXampOc3lDbWMrUDV6a3E2TjBmQlovVDRFQmNjWnd6WFZyay94YXZIOEhzQTQ1XG51MnJ0S1AzbHQ3L2w0NlVPL3d1WTVBSUhhWW11UVRnVE9iQ1lxK2FJM0tvR0p6UVY5SGQxUHd6dUlUUTNMUkY3XG42TitpS0hZRlhLaG9nMjVkS29LajF3Q0FCN1lNcmFwMnFqOTh4U2FPb0RWU25GYlBtMDB2eUJ6cGxjVUNROTJDXG5Gcmo3cHFsanlJUXBSNzFEbVZsNkxwSG1mZmN3d2NoQVFNTVJ4TE5oUGd6MFZhWU0waFdpUmlyNVI5U20yVzkyXG4xVGlGTUZDaTg3dHdGZnhwVEJSc1Y2eE1OZjBOK2FWdDI0TkNEMVpuVVRpS2lxV0xjd25pS1V6TVZ4S2F5d0l5XG44bUZCZXZVU21jQkNqcmRaRnBhdE9BPT18fFUyRnNkR1ZrWDE5NFJuanFNenFid01VYjM4SGV3b09MMnZtTHFWXG5NVHZLVDJaY3k1cnJXTm1GblVRUlJOSnduUUxKN0xlbU8zRTUzRll2a3gxOFlrWlhBNjZ5Z0NHQnhvdWI0NzFGXG5Vd1pCYXJiYWovUmJkY3RwY0ZvYXBmRVVFMUorZVRFNDRWVGJkUGFiUDZmOWVqdFZzcC8vUWV2c2IrdCtoOTJSXG43RUh3d1NodlBXMW5Sd0p5ekF2UVVBcnA3ME5RS0syU1Z5THVEOUxvU0hHUXBPOVllN2VjRXhTRFVjeEpSYmZ0XG5zWTUrb0NCcFJTUytCb0gyQUkzdkNKT0xwTGNOKzNjN1pCekpiZ09DTTQ5VkgraTJybmVsaEMxN3gzOTJJTXVSXG4rQmkxUGRXeFd0NithUUE0dmVtcmRpMElCdnptaFdtVHFiZXNxR1RYMDMwUDdQZGdRa0NYMmhGQjhkRjZZMFdJXG5aVUhhdittNFV2RSs1OUVmNHNmUGJDb2JuRXBnM0R0b01sUEVyaGFLYitDUEZmd3FFcGhiWkQwenVaOVVxOXYvXG5LVmM3aXdjaTFrN3JDL1NrOFJCM1Q4WHoyZjhEZHJnVWZzUkxZUFFJRTNiNWtXNG9PbzFZWnJ0ZFZCQ0lTMU81XG5HTFBwZWVTZTBGR0Nta01sVHRWWm5QcDliS095UnVJaEhzTk8vTUhYWThoTVZJK0oveHVRRHozUWUwM0V3U2dSXG5kQWJlVEdBNzJQN3dTbC9VdDJJbE9kRmJuZ3BpOWRmVWFxSms4R0JPN3puTzBxMisrMER3STNpcE1uOURsdG5FXG5mYUFBMkpyV2paeVhZSTdWcUJHak1ia2k5akhLMXN5R3dKWURlbWtVS25jUUw1dWFaL2FxWFVXK1RjV2F2Z2xtXG5QdXEyektzK1ZsOWpqMXNEd1FsTWJqajdPY0JlWTRKQkdCSHI3NjVJY29YQkxqUkhVNjlBWkZ4YzhEdkNRTVRYXG5ZWUord3Ntc3VYWHA2Nm9ZN0dORmFpNGV2R2hGeW5MMkUrb1F5b0d3NEhSOFZ1VlgvOXMxZVVuczJoeVZTelU0XG5uTFBOdkdZKzRuVTd1K2ljdHc1VjhsSDB0VlVlRVk3OEtibE04LzlhZ2JyWnVtWE5DSXhZY1RuNzhtU2lFRitGXG41ajk5RStveTZsVzFBQ0RwS01RVnp6Wnc0akNBR1lLcG9TTmxkdWluVWFzZHMyazl6L1dhQ01yT2FDSDF6bUx0XG56TzhPN3VzLzU1N3ZmRzRLNEJBQWxlWkhUWHR1ZGJabnc5bFdGdGxPd1Yxb0dCQ0c5Ri9wd2U1UWNHemJieGphXG5CVnNHMUxVZEhiZHlzT3k1MDZHclhOeW5hdSt6cFFyZXZOQ1JDMExUaldteWhQUDdaTEkrdmE5Rm9uaktyZjNiXG5zL1pvRmppdUQ2V0Z2UDBTNExIaWtjMVRHdjBaS2JoeW1WczdWcU1LWkNLQ3V5TklSa3RmMWNxY2V2MkhpVitRXG5yaDVEWFlOTDRmbFRzOHBRNkpiQlhMUGJ1L1pCWW5SMTZVU3l2T0lCRml4K1BmWE8xd29ub2VZK1dseFhROE15XG42VTEwa2h2WldJWlBRanRSa0IzdWlULzF2SkdhVkFVL3BzZGRiYmlNbzJ5MmhBREpxQW43RkdCaDNEQllCREdGXG5GbzZsZk1uWXBsV0RXZi9hcWdyM2prdVVBTEJuK2IreGxvWkdGU1BLakczSGdnemhORER3ZzdUQ3VmOGx2czFTXG4yZEt6SGFUUEFCbGk1dkhITGovalM2bjJPcWh2cVdhbmNpQ1ROWGdWYVhsa3BkUG1tdXZaL1FpT2w2eG9ZMGVmXG5ZVTdja0JkNWlpUlBQZFl4aStMWW1JV3pNaUgwaDRwc00yYUdRRzhnUHd2MFhPSXpKL2tOUVd6S2tEaTdVZ09FXG5HVEV2Uk5UeWdmaU5FS1NEbTFzZjhNTEs5NVhvaENEdEYxU21yaWVpdHJ0SUo4dkdtTnM2Ull0WUYvMWVRa1FZXG5FWGlhMnhLOFcxZjh3eUE2anJ6dWlQOG15MTRHcGswM21JbU04SElZRkEzblR3c1BTemxJNExXNG9VNnUzVzFNXG55djRzaGpPRTNsQTFpUDNFbkpIUFZJeHltMXBydnRDRkV2OG10b3d6d3B3VjBjdno4ZmpKY3Z5ai9RZ3FXNDg0XG5DZTVrdWR0VHJNVDZBYndQNjIxd3Vjbm8ycFAvSkEwN0hpTEJrajJZNHltRHhFT0JrVDc5U04zcSsvMVNxc2phXG5EOTBqU3pjdUQrZ0pkcG9RaUZqYTJrSHJTaDAyaFJzWW9MOGdDeVVQcFRQNy9VSEcwV2l1S21lT2ZnUDdrOXcvXG5CaEZ3S1lsM2xpWXR2VkhaQ0IxZGFwaXVMRmhmMFJpaDN6SE1GaDAyNTFNeXVtL0piNy85TFNxbnFuNUtLUEVsXG5ZWUtPWVhEc1ZyOEFKVWpGQW5ZRFVFWFlLcnRsUEExbSsvNVBnUGJUelBObUNVMWFWVDBjQ0dlcjU4eVBqNmpaXG5KaXBRMjV6MytxQXpDakxTQUw0WFMvakU3M0d1bEdEMUtKTWE0Q1c4RDZqaUladEpBMFVrOXk0ZldLTFpaajBLXG5pS0ZSZGhSS21XN2ZQQzNldVN4bFZSYm5RZExDb0cxdm54MW03ckVPUnBveDd1YVNuNFFVN1R6akZDWFlHcmRiXG5kd1FWK1cyVzljYnlHMzRLaHdpdG9Hd0RQN0crd1ZSUi9DUHd1ZjNiMzNyUkJaUnNPN3V1V0Rab0N4SDE5SVlqXG5tNEhrUkVrdDZkYktKa3F0L05hVW5mamlxQjMveDQ4L1I5R3paUkJmQ1d1VldSNHc9PXx8blM1U2QwWkpmaDhhXG40Um01c0I3bmZYZ0hwYmp6Wklxd3drUzJJNmduUGVDM2dqU21nTjNCK0ZPRW1QYUlTSXhEL3NSNnVMeFpLaWxJXG54UmcrTXdFbWg1N2FrWHgwL0RjYVdjZENSL2Y2SEdvbkRVMmE0RjA3OGRmam15S3RsZjdWVFhMSG9JMllHRGs1XG4yM042cmVjaUhJbHpjWDEvMHB5NE9tTmE0SGpabHRKQ1FCdUIvU3k2Ky95OElZeVZhQ1RuTDZmSWVpT0lPTTZDXG5mM0o5V0tSa3d5RmtnZDVPbzVjalZsME5YVDJjL1Z3Vzd1eVRyVzluNDBoVndyTFNKQUY4d0VDT1NRVzdTMWZTXG53YmV6aE90Z0Q3R3VKUjVZUTl6bUNDN0IzRVRNMFBMMldlS2pLZDVkWVBsUCtGemU1bmNqS1lWZm1aOE42NUVUXG5FWnNDT1RiTkNnPT1cbi0tLS0tRU5EIExJQ0VOU0UgS0VZLS0tLS0iLCJ4NTA5IjoiLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlFRERDQ0FmUUNDUUNxZzJvRFQ4MHh3akFOQmdrcWhraUc5dzBCQVFVRkFEQklNUXN3Q1FZRFZRUUdFd0pFXG5SVEVQTUEwR0ExVUVDQXdHUW1WeWJHbHVNUTh3RFFZRFZRUUhEQVpDWlhKc2FXNHhGekFWQmdOVkJBTU1EbXhwXG5ZMlZ1YzJVdWJqaHVMbWx2TUI0WERUSXlNRFl5TkRBME1UQTBNRm9YRFRJek1EWXlOREEwTVRBME1Gb3dTREVMXG5NQWtHQTFVRUJoTUNSRVV4RHpBTkJnTlZCQWdNQmtKbGNteHBiakVQTUEwR0ExVUVCd3dHUW1WeWJHbHVNUmN3XG5GUVlEVlFRRERBNXNhV05sYm5ObExtNDRiaTVwYnpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDXG5BUW9DZ2dFQkFNQk0wNVhCNDRnNXhmbUNMd2RwVVR3QVQ4K0NCa3lMS0ZzZXprRDVLLzZXaGFYL1hyc2QvUWQwXG4yMEo3d2w1V2RIVTRjVkJtRlJqVndWemtsQ0syeVlKaThtang4c1hzR3E5UTFsYlVlTUtmVjlkc2dmdWhubEFTXG50blFaZ2x1Z09uRjJGZ1JoWGIvakswdHhUb2FvK2JORTZyNGdJRXpwa3RITEJUWXZ2aXVKbXJlZjdXYlBSdDRJXG5uZDlEN2xoeWJlYnloVjdrdXpqUUEvcFBLSFRGczhNVEhaOGhZVXhSeXJwbTMrTVl6UUQrYmpBMlUxRkljdGFVXG53UVhZV2FON3QydVR3Q3Q5ekFLc21ZL1dlT2J2bDNUWk41T05MQXp5V0dDdWxtNWN3S1IzeGJsQlp6WG5CNmdzXG5Pbk4yT0FkU3RjelRWQ3ljbThwY0ZVcnl0S1NLa0dFQ0F3RUFBVEFOQmdrcWhraUc5dzBCQVFVRkFBT0NBZ0VBXG5sSjAxd2NuMXZqWFhDSHVvaTdSMERKMWxseDErZGFmcXlFcVBBMjdKdStMWG1WVkdYUW9yUzFiOHhqVXFVa2NaXG5UQndiV0ZPNXo1ZFptTnZuYnlqYXptKzZvT2cwUE1hWXhoNlRGd3NJMlBPYmM3YkZ2MmVheXdQdC8xQ3BuYzQwXG5xVU1oZnZSeC9HQ1pQQ1d6My8yUlBKV1g5alFEU0hYQ1hxOEJXK0kvM2N1TERaeVkzZkVZQkIwcDNEdlZtYWQ2XG42V0hRYVVyaU4wL0xxeVNPcC9MWmdsbC90MDI5Z1dWdDA1WmliR29LK2NWaFpFY3NMY1VJaHJqMnVGR0ZkM0ltXG5KTGcxSktKN2pLU0JVUU9kSU1EdnNGVUY3WWRNdk11ckNZQTJzT05OOENaK0k1eFFWMUtTOWV2R0hNNWZtd2dTXG5PUEZ2UHp0RENpMC8xdVc5dE9nSHBvcnVvZGFjdCtFWk5rQVRYQ3ZaaXUydy9xdEtSSkY0VTRJVEVtNWFXMGt3XG42enVDOHh5SWt0N3ZoZHM0OFV1UlNHSDlqSnJBZW1sRWl6dEdJTGhHRHF6UUdZYmxoVVFGR01iQmI3amhlTHlDXG5MSjFXT0c2MkYxc3B4Q0tCekVXNXg2cFIxelQxbWhFZ2Q0TWtMYTZ6UFRwYWNyZDk1QWd4YUdLRUxhMVJXU0ZwXG5NdmRoR2s0TnY3aG5iOHIrQnVNUkM2aWVkUE1DelhxL001MGNOOEFnOGJ3K0oxYUZvKzBFSzJoV0phN2tpRStzXG45R3ZGalNkekNGbFVQaEtra1Vaa1NvNWFPdGNRcTdKdTZrV0JoTG9GWUtncHJscDFRVkIwc0daQTZvNkR0cWphXG5HNy9SazZ2YmFZOHdzTllLMnpCWFRUOG5laDVab1JaL1BKTFV0RUV0YzdZPVxuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLVxuIn0=	f
\.


--
-- Data for Name: shared_credentials; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.shared_credentials ("credentialsId", "projectId", role, "createdAt", "updatedAt") FROM stdin;
lQG76FeAV4wYRYKI	u1wH6PK5Wcyh599s	credential:owner	2025-03-05 04:07:42.28+00	2025-03-05 04:07:42.28+00
QdgVf5BHy8oV0hoa	u1wH6PK5Wcyh599s	credential:owner	2025-03-05 04:09:42.812+00	2025-03-05 04:09:42.812+00
rjYwrb2HxMR4xBjD	u1wH6PK5Wcyh599s	credential:owner	2025-03-05 04:16:31.473+00	2025-03-05 04:16:31.473+00
r0EjeLd020yM2inx	u1wH6PK5Wcyh599s	credential:owner	2025-03-05 04:18:35.783+00	2025-03-05 04:18:35.783+00
iamHaKetBZTSKqo0	u1wH6PK5Wcyh599s	credential:owner	2025-03-05 04:20:06.354+00	2025-03-05 04:20:06.354+00
JtyjVaUju7By2vIc	u1wH6PK5Wcyh599s	credential:owner	2025-03-05 04:25:37.662+00	2025-03-05 04:25:37.662+00
\.


--
-- Data for Name: shared_workflow; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.shared_workflow ("workflowId", "projectId", role, "createdAt", "updatedAt") FROM stdin;
rS4kdv6PzY4xx6wg	u1wH6PK5Wcyh599s	workflow:owner	2025-03-05 05:49:09.506+00	2025-03-05 05:49:09.506+00
\.


--
-- Data for Name: tag_entity; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.tag_entity (name, "createdAt", "updatedAt", id) FROM stdin;
\.


--
-- Data for Name: test_case_execution; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.test_case_execution (id, "testRunId", "pastExecutionId", "executionId", "evaluationExecutionId", status, "runAt", "completedAt", "errorCode", "errorDetails", metrics, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: test_definition; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.test_definition (name, "workflowId", "evaluationWorkflowId", "annotationTagId", "createdAt", "updatedAt", description, id, "mockedNodes") FROM stdin;
\.


--
-- Data for Name: test_metric; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.test_metric (id, name, "testDefinitionId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: test_run; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.test_run (id, "testDefinitionId", status, "runAt", "completedAt", metrics, "createdAt", "updatedAt", "totalCases", "passedCases", "failedCases", "errorCode", "errorDetails") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema."user" (id, email, "firstName", "lastName", password, "personalizationAnswers", "createdAt", "updatedAt", settings, disabled, "mfaEnabled", "mfaSecret", "mfaRecoveryCodes", role) FROM stdin;
0dfda7b4-57b7-4cf6-a455-7928af7827cf	anoopkarnikofficial@gmail.com	Anoop	Dasika	$2a$10$Eh8XQAq.W7fCkjCMrvgYAe9zf/FFEOWaILfBuDNQvQwha1HARAn2S	{"version":"v4","personalization_survey_submitted_at":"2025-03-05T03:55:14.444Z","personalization_survey_n8n_version":"1.81.4","automationGoalDevops":["ci-cd","monitoring-alerting","data-syncing","cloud-infrastructure-orchestration"],"companySize":"<20","companyType":"saas","role":"it","reportedSource":"youtube"}	2025-03-05 03:38:12.659+00	2025-03-05 03:55:14.464+00	{"userActivated": false}	f	f	\N	\N	global:owner
\.


--
-- Data for Name: user_api_keys; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.user_api_keys (id, "userId", label, "apiKey", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: variables; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.variables (key, type, value, id) FROM stdin;
\.


--
-- Data for Name: webhook_entity; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.webhook_entity ("webhookPath", method, node, "webhookId", "pathLength", "workflowId") FROM stdin;
\.


--
-- Data for Name: workflow_entity; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.workflow_entity (name, active, nodes, connections, "createdAt", "updatedAt", settings, "staticData", "pinData", "versionId", "triggerCount", id, meta, "parentFolderId") FROM stdin;
My workflow	f	[{"parameters":{},"type":"n8n-nodes-base.manualTrigger","typeVersion":1,"position":[0,0],"id":"063bfbc5-7cfc-4c14-9a5a-1e694b13b4cf","name":"When clicking ‘Test workflow’"},{"parameters":{"command":"echo test"},"type":"n8n-nodes-base.executeCommand","typeVersion":1,"position":[220,0],"id":"e3fa0938-92c8-483b-bb41-94654e184c69","name":"Execute Command"}]	{"When clicking ‘Test workflow’":{"main":[[{"node":"Execute Command","type":"main","index":0}]]}}	2025-03-05 05:49:09.506+00	2025-03-05 05:49:09.506+00	{"executionOrder":"v1"}	\N	{}	94500d81-d6f3-466e-b171-80328e50f6fa	0	rS4kdv6PzY4xx6wg	\N	\N
\.


--
-- Data for Name: workflow_history; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.workflow_history ("versionId", "workflowId", authors, "createdAt", "updatedAt", nodes, connections) FROM stdin;
94500d81-d6f3-466e-b171-80328e50f6fa	rS4kdv6PzY4xx6wg	Anoop Dasika	2025-03-05 05:49:09.524+00	2025-03-05 05:49:09.524+00	[{"parameters":{},"type":"n8n-nodes-base.manualTrigger","typeVersion":1,"position":[0,0],"id":"063bfbc5-7cfc-4c14-9a5a-1e694b13b4cf","name":"When clicking ‘Test workflow’"},{"parameters":{"command":"echo test"},"type":"n8n-nodes-base.executeCommand","typeVersion":1,"position":[220,0],"id":"e3fa0938-92c8-483b-bb41-94654e184c69","name":"Execute Command"}]	{"When clicking ‘Test workflow’":{"main":[[{"node":"Execute Command","type":"main","index":0}]]}}
\.


--
-- Data for Name: workflow_statistics; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.workflow_statistics (count, "latestEvent", name, "workflowId") FROM stdin;
1	2025-03-05 05:49:09.655+00	manual_success	rS4kdv6PzY4xx6wg
\.


--
-- Data for Name: workflows_tags; Type: TABLE DATA; Schema: n8n_schema; Owner: postgres
--

COPY n8n_schema.workflows_tags ("workflowId", "tagId") FROM stdin;
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comments" (id, content, "organizationId", "postId", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Credits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Credits" (id, "organizationId", credits, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customer" (id, name, "orgId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: ExisingPlugData; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExisingPlugData" (id, "integrationId", "methodName", value) FROM stdin;
\.


--
-- Data for Name: GitHub; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GitHub" (id, login, name, token, "jobId", "organizationId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Integration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Integration" (id, "internalId", "organizationId", name, picture, "providerIdentifier", type, token, disabled, "tokenExpiration", "refreshToken", profile, "deletedAt", "createdAt", "updatedAt", "inBetweenSteps", "refreshNeeded", "postingTimes", "customInstanceDetails", "customerId", "rootInternalId", "additionalSettings") FROM stdin;
\.


--
-- Data for Name: ItemUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ItemUser" (id, "userId", key) FROM stdin;
\.


--
-- Data for Name: Media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Media" (id, name, path, "organizationId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Messages" (id, "from", content, "groupId", special, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: MessagesGroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MessagesGroup" (id, "buyerOrganizationId", "buyerId", "sellerId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notifications" (id, "organizationId", content, link, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: OrderItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItems" (id, "orderId", "integrationId", quantity, price) FROM stdin;
\.


--
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Orders" (id, "buyerId", "sellerId", status, "messageGroupId", "captureId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Organization" (id, name, description, "apiKey", "paymentId", "createdAt", "updatedAt", "allowTrial") FROM stdin;
3d6e9fd1-2038-4f4d-99e2-5e23ab81c1a9	Bayesian Labs	\N	7ab0a4aa6ad9253125ecf001719d10015461e44dc3c91ec31a47d73faa42e2a4	\N	2025-01-20 18:12:05.508	2025-01-20 18:12:05.508	t
\.


--
-- Data for Name: PayoutProblems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PayoutProblems" (id, status, "orderId", "userId", "postId", amount, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Plugs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Plugs" (id, "organizationId", "plugFunction", data, "integrationId", activated) FROM stdin;
\.


--
-- Data for Name: PopularPosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PopularPosts" (id, category, topic, content, hook, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Post" (id, state, "publishDate", "organizationId", "integrationId", content, "group", title, description, "parentPostId", "releaseId", "releaseURL", settings, image, "submittedForOrderId", "submittedForOrganizationId", "approvedSubmitForOrder", "lastMessageId", error, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: SocialMediaAgency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SocialMediaAgency" (id, "userId", name, "logoId", website, slug, facebook, instagram, twitter, "linkedIn", youtube, tiktok, "otherSocialMedia", "shortDescription", description, approved, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: SocialMediaAgencyNiche; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SocialMediaAgencyNiche" ("agencyId", niche) FROM stdin;
\.


--
-- Data for Name: Star; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Star" (id, stars, "totalStars", forks, "totalForks", login, date, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Subscription" (id, "organizationId", "subscriptionTier", identifier, "cancelAt", period, "totalChannels", "isLifetime", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Trending; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Trending" (id, "trendingList", language, hash, date, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: TrendingLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TrendingLog" (id, language, date) FROM stdin;
\.


--
-- Data for Name: UsedCodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UsedCodes" (id, code, "orgId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, "providerName", name, "lastName", "isSuperAdmin", bio, audience, "pictureId", "providerId", timezone, "createdAt", "updatedAt", "lastReadNotifications", "inviteId", activated, marketplace, account, "connectedAccount", "lastOnline", ip, agent) FROM stdin;
e1ef135a-1903-4943-b951-cfa844794005	danoopkarnik@gmail.com	$2b$10$gazkaHY2ahuXa8KodPyYgu6W1JN.2s4s7hSJukdJBZMwgXxy/fce.	LOCAL	\N	\N	f	\N	0	\N		0	2025-01-20 18:12:05.508	2025-01-20 18:12:05.508	2025-01-20 18:12:05.508	\N	t	t	\N	f	2025-01-20 18:12:05.508	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
\.


--
-- Data for Name: UserOrganization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserOrganization" (id, "userId", "organizationId", disabled, role, "createdAt", "updatedAt") FROM stdin;
9b4db333-7ba8-4d1a-9372-f76ee4e0a351	e1ef135a-1903-4943-b951-cfa844794005	3d6e9fd1-2038-4f4d-99e2-5e23ab81c1a9	f	SUPERADMIN	2025-01-20 18:12:05.508	2025-01-20 18:12:05.508
\.


--
-- Name: auth_provider_sync_history_id_seq; Type: SEQUENCE SET; Schema: n8n_schema; Owner: postgres
--

SELECT pg_catalog.setval('n8n_schema.auth_provider_sync_history_id_seq', 1, false);


--
-- Name: execution_annotations_id_seq; Type: SEQUENCE SET; Schema: n8n_schema; Owner: postgres
--

SELECT pg_catalog.setval('n8n_schema.execution_annotations_id_seq', 1, false);


--
-- Name: execution_entity_id_seq; Type: SEQUENCE SET; Schema: n8n_schema; Owner: postgres
--

SELECT pg_catalog.setval('n8n_schema.execution_entity_id_seq', 1, true);


--
-- Name: execution_metadata_temp_id_seq; Type: SEQUENCE SET; Schema: n8n_schema; Owner: postgres
--

SELECT pg_catalog.setval('n8n_schema.execution_metadata_temp_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: n8n_schema; Owner: postgres
--

SELECT pg_catalog.setval('n8n_schema.migrations_id_seq', 80, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: n8n_schema; Owner: postgres
--

SELECT pg_catalog.setval('n8n_schema.role_id_seq', 7, true);


--
-- Name: test_run PK_011c050f566e9db509a0fadb9b9; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_run
    ADD CONSTRAINT "PK_011c050f566e9db509a0fadb9b9" PRIMARY KEY (id);


--
-- Name: installed_packages PK_08cc9197c39b028c1e9beca225940576fd1a5804; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.installed_packages
    ADD CONSTRAINT "PK_08cc9197c39b028c1e9beca225940576fd1a5804" PRIMARY KEY ("packageName");


--
-- Name: execution_metadata PK_17a0b6284f8d626aae88e1c16e4; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_metadata
    ADD CONSTRAINT "PK_17a0b6284f8d626aae88e1c16e4" PRIMARY KEY (id);


--
-- Name: project_relation PK_1caaa312a5d7184a003be0f0cb6; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.project_relation
    ADD CONSTRAINT "PK_1caaa312a5d7184a003be0f0cb6" PRIMARY KEY ("projectId", "userId");


--
-- Name: folder_tag PK_27e4e00852f6b06a925a4d83a3e; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.folder_tag
    ADD CONSTRAINT "PK_27e4e00852f6b06a925a4d83a3e" PRIMARY KEY ("folderId", "tagId");


--
-- Name: test_metric PK_3e98b8e20acc19c5030a8644142; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_metric
    ADD CONSTRAINT "PK_3e98b8e20acc19c5030a8644142" PRIMARY KEY (id);


--
-- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


--
-- Name: invalid_auth_token PK_5779069b7235b256d91f7af1a15; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.invalid_auth_token
    ADD CONSTRAINT "PK_5779069b7235b256d91f7af1a15" PRIMARY KEY (token);


--
-- Name: shared_workflow PK_5ba87620386b847201c9531c58f; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.shared_workflow
    ADD CONSTRAINT "PK_5ba87620386b847201c9531c58f" PRIMARY KEY ("workflowId", "projectId");


--
-- Name: folder PK_6278a41a706740c94c02e288df8; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.folder
    ADD CONSTRAINT "PK_6278a41a706740c94c02e288df8" PRIMARY KEY (id);


--
-- Name: annotation_tag_entity PK_69dfa041592c30bbc0d4b84aa00; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.annotation_tag_entity
    ADD CONSTRAINT "PK_69dfa041592c30bbc0d4b84aa00" PRIMARY KEY (id);


--
-- Name: execution_annotations PK_7afcf93ffa20c4252869a7c6a23; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_annotations
    ADD CONSTRAINT "PK_7afcf93ffa20c4252869a7c6a23" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: installed_nodes PK_8ebd28194e4f792f96b5933423fc439df97d9689; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.installed_nodes
    ADD CONSTRAINT "PK_8ebd28194e4f792f96b5933423fc439df97d9689" PRIMARY KEY (name);


--
-- Name: shared_credentials PK_8ef3a59796a228913f251779cff; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.shared_credentials
    ADD CONSTRAINT "PK_8ef3a59796a228913f251779cff" PRIMARY KEY ("credentialsId", "projectId");


--
-- Name: test_case_execution PK_90c121f77a78a6580e94b794bce; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_case_execution
    ADD CONSTRAINT "PK_90c121f77a78a6580e94b794bce" PRIMARY KEY (id);


--
-- Name: user_api_keys PK_978fa5caa3468f463dac9d92e69; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.user_api_keys
    ADD CONSTRAINT "PK_978fa5caa3468f463dac9d92e69" PRIMARY KEY (id);


--
-- Name: execution_annotation_tags PK_979ec03d31294cca484be65d11f; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_annotation_tags
    ADD CONSTRAINT "PK_979ec03d31294cca484be65d11f" PRIMARY KEY ("annotationId", "tagId");


--
-- Name: webhook_entity PK_b21ace2e13596ccd87dc9bf4ea6; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.webhook_entity
    ADD CONSTRAINT "PK_b21ace2e13596ccd87dc9bf4ea6" PRIMARY KEY ("webhookPath", method);


--
-- Name: workflow_history PK_b6572dd6173e4cd06fe79937b58; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflow_history
    ADD CONSTRAINT "PK_b6572dd6173e4cd06fe79937b58" PRIMARY KEY ("versionId");


--
-- Name: processed_data PK_ca04b9d8dc72de268fe07a65773; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.processed_data
    ADD CONSTRAINT "PK_ca04b9d8dc72de268fe07a65773" PRIMARY KEY ("workflowId", context);


--
-- Name: settings PK_dc0fe14e6d9943f268e7b119f69ab8bd; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.settings
    ADD CONSTRAINT "PK_dc0fe14e6d9943f268e7b119f69ab8bd" PRIMARY KEY (key);


--
-- Name: role PK_e853ce24e8200abe5721d2c6ac552b73; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.role
    ADD CONSTRAINT "PK_e853ce24e8200abe5721d2c6ac552b73" PRIMARY KEY (id);


--
-- Name: user PK_ea8f538c94b6e352418254ed6474a81f; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema."user"
    ADD CONSTRAINT "PK_ea8f538c94b6e352418254ed6474a81f" PRIMARY KEY (id);


--
-- Name: role UQ_5b49d0f504f7ef31045a1fb2eb8; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.role
    ADD CONSTRAINT "UQ_5b49d0f504f7ef31045a1fb2eb8" UNIQUE (scope, name);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e2; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e2" UNIQUE (email);


--
-- Name: auth_identity auth_identity_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.auth_identity
    ADD CONSTRAINT auth_identity_pkey PRIMARY KEY ("providerId", "providerType");


--
-- Name: auth_provider_sync_history auth_provider_sync_history_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.auth_provider_sync_history
    ADD CONSTRAINT auth_provider_sync_history_pkey PRIMARY KEY (id);


--
-- Name: credentials_entity credentials_entity_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.credentials_entity
    ADD CONSTRAINT credentials_entity_pkey PRIMARY KEY (id);


--
-- Name: event_destinations event_destinations_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.event_destinations
    ADD CONSTRAINT event_destinations_pkey PRIMARY KEY (id);


--
-- Name: execution_data execution_data_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_data
    ADD CONSTRAINT execution_data_pkey PRIMARY KEY ("executionId");


--
-- Name: execution_entity pk_e3e63bbf986767844bbe1166d4e; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_entity
    ADD CONSTRAINT pk_e3e63bbf986767844bbe1166d4e PRIMARY KEY (id);


--
-- Name: workflow_statistics pk_workflow_statistics; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflow_statistics
    ADD CONSTRAINT pk_workflow_statistics PRIMARY KEY ("workflowId", name);


--
-- Name: workflows_tags pk_workflows_tags; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflows_tags
    ADD CONSTRAINT pk_workflows_tags PRIMARY KEY ("workflowId", "tagId");


--
-- Name: tag_entity tag_entity_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.tag_entity
    ADD CONSTRAINT tag_entity_pkey PRIMARY KEY (id);


--
-- Name: test_definition test_definition_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_definition
    ADD CONSTRAINT test_definition_pkey PRIMARY KEY (id);


--
-- Name: variables variables_key_key; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.variables
    ADD CONSTRAINT variables_key_key UNIQUE (key);


--
-- Name: variables variables_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.variables
    ADD CONSTRAINT variables_pkey PRIMARY KEY (id);


--
-- Name: workflow_entity workflow_entity_pkey; Type: CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflow_entity
    ADD CONSTRAINT workflow_entity_pkey PRIMARY KEY (id);


--
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: Credits Credits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credits"
    ADD CONSTRAINT "Credits_pkey" PRIMARY KEY (id);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: ExisingPlugData ExisingPlugData_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExisingPlugData"
    ADD CONSTRAINT "ExisingPlugData_pkey" PRIMARY KEY (id);


--
-- Name: GitHub GitHub_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GitHub"
    ADD CONSTRAINT "GitHub_pkey" PRIMARY KEY (id);


--
-- Name: Integration Integration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Integration"
    ADD CONSTRAINT "Integration_pkey" PRIMARY KEY (id);


--
-- Name: ItemUser ItemUser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemUser"
    ADD CONSTRAINT "ItemUser_pkey" PRIMARY KEY (id);


--
-- Name: Media Media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (id);


--
-- Name: MessagesGroup MessagesGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesGroup"
    ADD CONSTRAINT "MessagesGroup_pkey" PRIMARY KEY (id);


--
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);


--
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- Name: OrderItems OrderItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItems"
    ADD CONSTRAINT "OrderItems_pkey" PRIMARY KEY (id);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: Organization Organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT "Organization_pkey" PRIMARY KEY (id);


--
-- Name: PayoutProblems PayoutProblems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PayoutProblems"
    ADD CONSTRAINT "PayoutProblems_pkey" PRIMARY KEY (id);


--
-- Name: Plugs Plugs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plugs"
    ADD CONSTRAINT "Plugs_pkey" PRIMARY KEY (id);


--
-- Name: PopularPosts PopularPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PopularPosts"
    ADD CONSTRAINT "PopularPosts_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: SocialMediaAgencyNiche SocialMediaAgencyNiche_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SocialMediaAgencyNiche"
    ADD CONSTRAINT "SocialMediaAgencyNiche_pkey" PRIMARY KEY ("agencyId", niche);


--
-- Name: SocialMediaAgency SocialMediaAgency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SocialMediaAgency"
    ADD CONSTRAINT "SocialMediaAgency_pkey" PRIMARY KEY (id);


--
-- Name: Star Star_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Star"
    ADD CONSTRAINT "Star_pkey" PRIMARY KEY (id);


--
-- Name: Subscription Subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (id);


--
-- Name: TrendingLog TrendingLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrendingLog"
    ADD CONSTRAINT "TrendingLog_pkey" PRIMARY KEY (id);


--
-- Name: Trending Trending_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trending"
    ADD CONSTRAINT "Trending_pkey" PRIMARY KEY (id);


--
-- Name: UsedCodes UsedCodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsedCodes"
    ADD CONSTRAINT "UsedCodes_pkey" PRIMARY KEY (id);


--
-- Name: UserOrganization UserOrganization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserOrganization"
    ADD CONSTRAINT "UserOrganization_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: IDX_14f68deffaf858465715995508; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_14f68deffaf858465715995508" ON n8n_schema.folder USING btree ("projectId", id);


--
-- Name: IDX_1e31657f5fe46816c34be7c1b4; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_1e31657f5fe46816c34be7c1b4" ON n8n_schema.workflow_history USING btree ("workflowId");


--
-- Name: IDX_1ef35bac35d20bdae979d917a3; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_1ef35bac35d20bdae979d917a3" ON n8n_schema.user_api_keys USING btree ("apiKey");


--
-- Name: IDX_3a4e9cf37111ac3270e2469b47; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_3a4e9cf37111ac3270e2469b47" ON n8n_schema.test_metric USING btree ("testDefinitionId");


--
-- Name: IDX_3a81713a76f2295b12b46cdfca; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_3a81713a76f2295b12b46cdfca" ON n8n_schema.test_run USING btree ("testDefinitionId");


--
-- Name: IDX_5f0643f6717905a05164090dde; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_5f0643f6717905a05164090dde" ON n8n_schema.project_relation USING btree ("userId");


--
-- Name: IDX_61448d56d61802b5dfde5cdb00; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_61448d56d61802b5dfde5cdb00" ON n8n_schema.project_relation USING btree ("projectId");


--
-- Name: IDX_63d7bbae72c767cf162d459fcc; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_63d7bbae72c767cf162d459fcc" ON n8n_schema.user_api_keys USING btree ("userId", label);


--
-- Name: IDX_8e4b4774db42f1e6dda3452b2a; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_8e4b4774db42f1e6dda3452b2a" ON n8n_schema.test_case_execution USING btree ("testRunId");


--
-- Name: IDX_97f863fa83c4786f1956508496; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_97f863fa83c4786f1956508496" ON n8n_schema.execution_annotations USING btree ("executionId");


--
-- Name: IDX_9ec1ce6fbf82305f489adb971d; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_9ec1ce6fbf82305f489adb971d" ON n8n_schema.test_definition USING btree ("evaluationWorkflowId");


--
-- Name: IDX_a3697779b366e131b2bbdae297; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_a3697779b366e131b2bbdae297" ON n8n_schema.execution_annotation_tags USING btree ("tagId");


--
-- Name: IDX_ae51b54c4bb430cf92f48b623f; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_ae51b54c4bb430cf92f48b623f" ON n8n_schema.annotation_tag_entity USING btree (name);


--
-- Name: IDX_b0dd0087fe3da02b0ffa4b9c5b; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_b0dd0087fe3da02b0ffa4b9c5b" ON n8n_schema.test_definition USING btree ("workflowId");


--
-- Name: IDX_c1519757391996eb06064f0e7c; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_c1519757391996eb06064f0e7c" ON n8n_schema.execution_annotation_tags USING btree ("annotationId");


--
-- Name: IDX_cec8eea3bf49551482ccb4933e; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_cec8eea3bf49551482ccb4933e" ON n8n_schema.execution_metadata USING btree ("executionId", key);


--
-- Name: IDX_execution_entity_deletedAt; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_execution_entity_deletedAt" ON n8n_schema.execution_entity USING btree ("deletedAt");


--
-- Name: IDX_workflow_entity_name; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX "IDX_workflow_entity_name" ON n8n_schema.workflow_entity USING btree (name);


--
-- Name: idx_07fde106c0b471d8cc80a64fc8; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX idx_07fde106c0b471d8cc80a64fc8 ON n8n_schema.credentials_entity USING btree (type);


--
-- Name: idx_16f4436789e804e3e1c9eeb240; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX idx_16f4436789e804e3e1c9eeb240 ON n8n_schema.webhook_entity USING btree ("webhookId", method, "pathLength");


--
-- Name: idx_812eb05f7451ca757fb98444ce; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX idx_812eb05f7451ca757fb98444ce ON n8n_schema.tag_entity USING btree (name);


--
-- Name: idx_execution_entity_stopped_at_status_deleted_at; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX idx_execution_entity_stopped_at_status_deleted_at ON n8n_schema.execution_entity USING btree ("stoppedAt", status, "deletedAt") WHERE (("stoppedAt" IS NOT NULL) AND ("deletedAt" IS NULL));


--
-- Name: idx_execution_entity_wait_till_status_deleted_at; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX idx_execution_entity_wait_till_status_deleted_at ON n8n_schema.execution_entity USING btree ("waitTill", status, "deletedAt") WHERE (("waitTill" IS NOT NULL) AND ("deletedAt" IS NULL));


--
-- Name: idx_execution_entity_workflow_id_started_at; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX idx_execution_entity_workflow_id_started_at ON n8n_schema.execution_entity USING btree ("workflowId", "startedAt") WHERE (("startedAt" IS NOT NULL) AND ("deletedAt" IS NULL));


--
-- Name: idx_workflows_tags_workflow_id; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE INDEX idx_workflows_tags_workflow_id ON n8n_schema.workflows_tags USING btree ("workflowId");


--
-- Name: pk_credentials_entity_id; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX pk_credentials_entity_id ON n8n_schema.credentials_entity USING btree (id);


--
-- Name: pk_tag_entity_id; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX pk_tag_entity_id ON n8n_schema.tag_entity USING btree (id);


--
-- Name: pk_test_definition_id; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX pk_test_definition_id ON n8n_schema.test_definition USING btree (id);


--
-- Name: pk_variables_id; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX pk_variables_id ON n8n_schema.variables USING btree (id);


--
-- Name: pk_workflow_entity_id; Type: INDEX; Schema: n8n_schema; Owner: postgres
--

CREATE UNIQUE INDEX pk_workflow_entity_id ON n8n_schema.workflow_entity USING btree (id);


--
-- Name: Comments_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Comments_createdAt_idx" ON public."Comments" USING btree ("createdAt");


--
-- Name: Comments_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Comments_deletedAt_idx" ON public."Comments" USING btree ("deletedAt");


--
-- Name: Comments_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Comments_organizationId_idx" ON public."Comments" USING btree ("organizationId");


--
-- Name: Comments_postId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Comments_postId_idx" ON public."Comments" USING btree ("postId");


--
-- Name: Comments_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Comments_userId_idx" ON public."Comments" USING btree ("userId");


--
-- Name: Credits_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Credits_createdAt_idx" ON public."Credits" USING btree ("createdAt");


--
-- Name: Credits_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Credits_organizationId_idx" ON public."Credits" USING btree ("organizationId");


--
-- Name: Customer_orgId_name_deletedAt_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_orgId_name_deletedAt_key" ON public."Customer" USING btree ("orgId", name, "deletedAt");


--
-- Name: ExisingPlugData_integrationId_methodName_value_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ExisingPlugData_integrationId_methodName_value_key" ON public."ExisingPlugData" USING btree ("integrationId", "methodName", value);


--
-- Name: GitHub_login_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "GitHub_login_idx" ON public."GitHub" USING btree (login);


--
-- Name: GitHub_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "GitHub_organizationId_idx" ON public."GitHub" USING btree ("organizationId");


--
-- Name: Integration_customerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Integration_customerId_idx" ON public."Integration" USING btree ("customerId");


--
-- Name: Integration_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Integration_deletedAt_idx" ON public."Integration" USING btree ("deletedAt");


--
-- Name: Integration_organizationId_internalId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Integration_organizationId_internalId_key" ON public."Integration" USING btree ("organizationId", "internalId");


--
-- Name: Integration_rootInternalId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Integration_rootInternalId_idx" ON public."Integration" USING btree ("rootInternalId");


--
-- Name: Integration_updatedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Integration_updatedAt_idx" ON public."Integration" USING btree ("updatedAt");


--
-- Name: ItemUser_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ItemUser_key_idx" ON public."ItemUser" USING btree (key);


--
-- Name: ItemUser_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ItemUser_userId_idx" ON public."ItemUser" USING btree ("userId");


--
-- Name: ItemUser_userId_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ItemUser_userId_key_key" ON public."ItemUser" USING btree ("userId", key);


--
-- Name: Media_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Media_organizationId_idx" ON public."Media" USING btree ("organizationId");


--
-- Name: MessagesGroup_buyerId_sellerId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "MessagesGroup_buyerId_sellerId_key" ON public."MessagesGroup" USING btree ("buyerId", "sellerId");


--
-- Name: MessagesGroup_buyerOrganizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MessagesGroup_buyerOrganizationId_idx" ON public."MessagesGroup" USING btree ("buyerOrganizationId");


--
-- Name: MessagesGroup_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MessagesGroup_createdAt_idx" ON public."MessagesGroup" USING btree ("createdAt");


--
-- Name: MessagesGroup_updatedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MessagesGroup_updatedAt_idx" ON public."MessagesGroup" USING btree ("updatedAt");


--
-- Name: Messages_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Messages_createdAt_idx" ON public."Messages" USING btree ("createdAt");


--
-- Name: Messages_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Messages_deletedAt_idx" ON public."Messages" USING btree ("deletedAt");


--
-- Name: Messages_groupId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Messages_groupId_idx" ON public."Messages" USING btree ("groupId");


--
-- Name: Notifications_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notifications_createdAt_idx" ON public."Notifications" USING btree ("createdAt");


--
-- Name: Notifications_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notifications_deletedAt_idx" ON public."Notifications" USING btree ("deletedAt");


--
-- Name: Notifications_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notifications_organizationId_idx" ON public."Notifications" USING btree ("organizationId");


--
-- Name: OrderItems_integrationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItems_integrationId_idx" ON public."OrderItems" USING btree ("integrationId");


--
-- Name: OrderItems_orderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItems_orderId_idx" ON public."OrderItems" USING btree ("orderId");


--
-- Name: Orders_buyerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Orders_buyerId_idx" ON public."Orders" USING btree ("buyerId");


--
-- Name: Orders_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Orders_createdAt_idx" ON public."Orders" USING btree ("createdAt");


--
-- Name: Orders_messageGroupId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Orders_messageGroupId_idx" ON public."Orders" USING btree ("messageGroupId");


--
-- Name: Orders_sellerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Orders_sellerId_idx" ON public."Orders" USING btree ("sellerId");


--
-- Name: Orders_updatedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Orders_updatedAt_idx" ON public."Orders" USING btree ("updatedAt");


--
-- Name: Plugs_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Plugs_organizationId_idx" ON public."Plugs" USING btree ("organizationId");


--
-- Name: Plugs_plugFunction_integrationId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Plugs_plugFunction_integrationId_key" ON public."Plugs" USING btree ("plugFunction", "integrationId");


--
-- Name: Post_approvedSubmitForOrder_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_approvedSubmitForOrder_idx" ON public."Post" USING btree ("approvedSubmitForOrder");


--
-- Name: Post_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_createdAt_idx" ON public."Post" USING btree ("createdAt");


--
-- Name: Post_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_deletedAt_idx" ON public."Post" USING btree ("deletedAt");


--
-- Name: Post_group_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_group_idx" ON public."Post" USING btree ("group");


--
-- Name: Post_integrationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_integrationId_idx" ON public."Post" USING btree ("integrationId");


--
-- Name: Post_lastMessageId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_lastMessageId_idx" ON public."Post" USING btree ("lastMessageId");


--
-- Name: Post_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_organizationId_idx" ON public."Post" USING btree ("organizationId");


--
-- Name: Post_parentPostId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_parentPostId_idx" ON public."Post" USING btree ("parentPostId");


--
-- Name: Post_publishDate_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_publishDate_idx" ON public."Post" USING btree ("publishDate");


--
-- Name: Post_releaseURL_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_releaseURL_idx" ON public."Post" USING btree ("releaseURL");


--
-- Name: Post_state_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_state_idx" ON public."Post" USING btree (state);


--
-- Name: Post_submittedForOrderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_submittedForOrderId_idx" ON public."Post" USING btree ("submittedForOrderId");


--
-- Name: Post_updatedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Post_updatedAt_idx" ON public."Post" USING btree ("updatedAt");


--
-- Name: SocialMediaAgency_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SocialMediaAgency_deletedAt_idx" ON public."SocialMediaAgency" USING btree ("deletedAt");


--
-- Name: SocialMediaAgency_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SocialMediaAgency_id_idx" ON public."SocialMediaAgency" USING btree (id);


--
-- Name: SocialMediaAgency_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SocialMediaAgency_userId_idx" ON public."SocialMediaAgency" USING btree ("userId");


--
-- Name: SocialMediaAgency_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SocialMediaAgency_userId_key" ON public."SocialMediaAgency" USING btree ("userId");


--
-- Name: Star_login_date_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Star_login_date_key" ON public."Star" USING btree (login, date);


--
-- Name: Subscription_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Subscription_deletedAt_idx" ON public."Subscription" USING btree ("deletedAt");


--
-- Name: Subscription_organizationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Subscription_organizationId_idx" ON public."Subscription" USING btree ("organizationId");


--
-- Name: Subscription_organizationId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Subscription_organizationId_key" ON public."Subscription" USING btree ("organizationId");


--
-- Name: Trending_hash_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Trending_hash_idx" ON public."Trending" USING btree (hash);


--
-- Name: Trending_language_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Trending_language_key" ON public."Trending" USING btree (language);


--
-- Name: UsedCodes_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "UsedCodes_code_idx" ON public."UsedCodes" USING btree (code);


--
-- Name: UserOrganization_disabled_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "UserOrganization_disabled_idx" ON public."UserOrganization" USING btree (disabled);


--
-- Name: UserOrganization_userId_organizationId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UserOrganization_userId_organizationId_key" ON public."UserOrganization" USING btree ("userId", "organizationId");


--
-- Name: User_account_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_account_idx" ON public."User" USING btree (account);


--
-- Name: User_email_providerName_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_providerName_key" ON public."User" USING btree (email, "providerName");


--
-- Name: User_inviteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_inviteId_idx" ON public."User" USING btree ("inviteId");


--
-- Name: User_lastOnline_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_lastOnline_idx" ON public."User" USING btree ("lastOnline");


--
-- Name: User_lastReadNotifications_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_lastReadNotifications_idx" ON public."User" USING btree ("lastReadNotifications");


--
-- Name: User_pictureId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_pictureId_idx" ON public."User" USING btree ("pictureId");


--
-- Name: processed_data FK_06a69a7032c97a763c2c7599464; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.processed_data
    ADD CONSTRAINT "FK_06a69a7032c97a763c2c7599464" FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: workflow_history FK_1e31657f5fe46816c34be7c1b4b; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflow_history
    ADD CONSTRAINT "FK_1e31657f5fe46816c34be7c1b4b" FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: test_case_execution FK_258d954733841d51edd826a562b; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_case_execution
    ADD CONSTRAINT "FK_258d954733841d51edd826a562b" FOREIGN KEY ("pastExecutionId") REFERENCES n8n_schema.execution_entity(id) ON DELETE SET NULL;


--
-- Name: execution_metadata FK_31d0b4c93fb85ced26f6005cda3; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_metadata
    ADD CONSTRAINT "FK_31d0b4c93fb85ced26f6005cda3" FOREIGN KEY ("executionId") REFERENCES n8n_schema.execution_entity(id) ON DELETE CASCADE;


--
-- Name: test_metric FK_3a4e9cf37111ac3270e2469b475; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_metric
    ADD CONSTRAINT "FK_3a4e9cf37111ac3270e2469b475" FOREIGN KEY ("testDefinitionId") REFERENCES n8n_schema.test_definition(id) ON DELETE CASCADE;


--
-- Name: test_run FK_3a81713a76f2295b12b46cdfcab; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_run
    ADD CONSTRAINT "FK_3a81713a76f2295b12b46cdfcab" FOREIGN KEY ("testDefinitionId") REFERENCES n8n_schema.test_definition(id) ON DELETE CASCADE;


--
-- Name: shared_credentials FK_416f66fc846c7c442970c094ccf; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.shared_credentials
    ADD CONSTRAINT "FK_416f66fc846c7c442970c094ccf" FOREIGN KEY ("credentialsId") REFERENCES n8n_schema.credentials_entity(id) ON DELETE CASCADE;


--
-- Name: project_relation FK_5f0643f6717905a05164090dde7; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.project_relation
    ADD CONSTRAINT "FK_5f0643f6717905a05164090dde7" FOREIGN KEY ("userId") REFERENCES n8n_schema."user"(id) ON DELETE CASCADE;


--
-- Name: project_relation FK_61448d56d61802b5dfde5cdb002; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.project_relation
    ADD CONSTRAINT "FK_61448d56d61802b5dfde5cdb002" FOREIGN KEY ("projectId") REFERENCES n8n_schema.project(id) ON DELETE CASCADE;


--
-- Name: installed_nodes FK_73f857fc5dce682cef8a99c11dbddbc969618951; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.installed_nodes
    ADD CONSTRAINT "FK_73f857fc5dce682cef8a99c11dbddbc969618951" FOREIGN KEY (package) REFERENCES n8n_schema.installed_packages("packageName") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: folder FK_804ea52f6729e3940498bd54d78; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.folder
    ADD CONSTRAINT "FK_804ea52f6729e3940498bd54d78" FOREIGN KEY ("parentFolderId") REFERENCES n8n_schema.folder(id) ON DELETE CASCADE;


--
-- Name: shared_credentials FK_812c2852270da1247756e77f5a4; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.shared_credentials
    ADD CONSTRAINT "FK_812c2852270da1247756e77f5a4" FOREIGN KEY ("projectId") REFERENCES n8n_schema.project(id) ON DELETE CASCADE;


--
-- Name: test_case_execution FK_8e4b4774db42f1e6dda3452b2af; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_case_execution
    ADD CONSTRAINT "FK_8e4b4774db42f1e6dda3452b2af" FOREIGN KEY ("testRunId") REFERENCES n8n_schema.test_run(id) ON DELETE CASCADE;


--
-- Name: folder_tag FK_94a60854e06f2897b2e0d39edba; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.folder_tag
    ADD CONSTRAINT "FK_94a60854e06f2897b2e0d39edba" FOREIGN KEY ("folderId") REFERENCES n8n_schema.folder(id) ON DELETE CASCADE;


--
-- Name: execution_annotations FK_97f863fa83c4786f19565084960; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_annotations
    ADD CONSTRAINT "FK_97f863fa83c4786f19565084960" FOREIGN KEY ("executionId") REFERENCES n8n_schema.execution_entity(id) ON DELETE CASCADE;


--
-- Name: test_definition FK_9ec1ce6fbf82305f489adb971d3; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_definition
    ADD CONSTRAINT "FK_9ec1ce6fbf82305f489adb971d3" FOREIGN KEY ("evaluationWorkflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE SET NULL;


--
-- Name: execution_annotation_tags FK_a3697779b366e131b2bbdae2976; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_annotation_tags
    ADD CONSTRAINT "FK_a3697779b366e131b2bbdae2976" FOREIGN KEY ("tagId") REFERENCES n8n_schema.annotation_tag_entity(id) ON DELETE CASCADE;


--
-- Name: shared_workflow FK_a45ea5f27bcfdc21af9b4188560; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.shared_workflow
    ADD CONSTRAINT "FK_a45ea5f27bcfdc21af9b4188560" FOREIGN KEY ("projectId") REFERENCES n8n_schema.project(id) ON DELETE CASCADE;


--
-- Name: folder FK_a8260b0b36939c6247f385b8221; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.folder
    ADD CONSTRAINT "FK_a8260b0b36939c6247f385b8221" FOREIGN KEY ("projectId") REFERENCES n8n_schema.project(id) ON DELETE CASCADE;


--
-- Name: test_definition FK_b0dd0087fe3da02b0ffa4b9c5bb; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_definition
    ADD CONSTRAINT "FK_b0dd0087fe3da02b0ffa4b9c5bb" FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: execution_annotation_tags FK_c1519757391996eb06064f0e7c8; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_annotation_tags
    ADD CONSTRAINT "FK_c1519757391996eb06064f0e7c8" FOREIGN KEY ("annotationId") REFERENCES n8n_schema.execution_annotations(id) ON DELETE CASCADE;


--
-- Name: test_definition FK_d5d7ea64662dbc62f5e266fbeb0; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_definition
    ADD CONSTRAINT "FK_d5d7ea64662dbc62f5e266fbeb0" FOREIGN KEY ("annotationTagId") REFERENCES n8n_schema.annotation_tag_entity(id) ON DELETE SET NULL;


--
-- Name: shared_workflow FK_daa206a04983d47d0a9c34649ce; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.shared_workflow
    ADD CONSTRAINT "FK_daa206a04983d47d0a9c34649ce" FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: folder_tag FK_dc88164176283de80af47621746; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.folder_tag
    ADD CONSTRAINT "FK_dc88164176283de80af47621746" FOREIGN KEY ("tagId") REFERENCES n8n_schema.tag_entity(id) ON DELETE CASCADE;


--
-- Name: test_case_execution FK_dfbe194e3ebdfe49a87bc4692ca; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_case_execution
    ADD CONSTRAINT "FK_dfbe194e3ebdfe49a87bc4692ca" FOREIGN KEY ("evaluationExecutionId") REFERENCES n8n_schema.execution_entity(id) ON DELETE SET NULL;


--
-- Name: user_api_keys FK_e131705cbbc8fb589889b02d457; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.user_api_keys
    ADD CONSTRAINT "FK_e131705cbbc8fb589889b02d457" FOREIGN KEY ("userId") REFERENCES n8n_schema."user"(id) ON DELETE CASCADE;


--
-- Name: test_case_execution FK_e48965fac35d0f5b9e7f51d8c44; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.test_case_execution
    ADD CONSTRAINT "FK_e48965fac35d0f5b9e7f51d8c44" FOREIGN KEY ("executionId") REFERENCES n8n_schema.execution_entity(id) ON DELETE SET NULL;


--
-- Name: auth_identity auth_identity_userId_fkey; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.auth_identity
    ADD CONSTRAINT "auth_identity_userId_fkey" FOREIGN KEY ("userId") REFERENCES n8n_schema."user"(id);


--
-- Name: execution_data execution_data_fk; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_data
    ADD CONSTRAINT execution_data_fk FOREIGN KEY ("executionId") REFERENCES n8n_schema.execution_entity(id) ON DELETE CASCADE;


--
-- Name: execution_entity fk_execution_entity_workflow_id; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.execution_entity
    ADD CONSTRAINT fk_execution_entity_workflow_id FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: webhook_entity fk_webhook_entity_workflow_id; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.webhook_entity
    ADD CONSTRAINT fk_webhook_entity_workflow_id FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: workflow_statistics fk_workflow_statistics_workflow_id; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflow_statistics
    ADD CONSTRAINT fk_workflow_statistics_workflow_id FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: workflows_tags fk_workflows_tags_tag_id; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflows_tags
    ADD CONSTRAINT fk_workflows_tags_tag_id FOREIGN KEY ("tagId") REFERENCES n8n_schema.tag_entity(id) ON DELETE CASCADE;


--
-- Name: workflows_tags fk_workflows_tags_workflow_id; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflows_tags
    ADD CONSTRAINT fk_workflows_tags_workflow_id FOREIGN KEY ("workflowId") REFERENCES n8n_schema.workflow_entity(id) ON DELETE CASCADE;


--
-- Name: workflow_entity workflow_entity_parentFolderId_fkey; Type: FK CONSTRAINT; Schema: n8n_schema; Owner: postgres
--

ALTER TABLE ONLY n8n_schema.workflow_entity
    ADD CONSTRAINT "workflow_entity_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES n8n_schema.folder(id) ON DELETE SET NULL;


--
-- Name: Comments Comments_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comments Comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comments Comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Credits Credits_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credits"
    ADD CONSTRAINT "Credits_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Customer Customer_orgId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ExisingPlugData ExisingPlugData_integrationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExisingPlugData"
    ADD CONSTRAINT "ExisingPlugData_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES public."Integration"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GitHub GitHub_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GitHub"
    ADD CONSTRAINT "GitHub_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Integration Integration_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Integration"
    ADD CONSTRAINT "Integration_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Integration Integration_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Integration"
    ADD CONSTRAINT "Integration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ItemUser ItemUser_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemUser"
    ADD CONSTRAINT "ItemUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Media Media_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MessagesGroup MessagesGroup_buyerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesGroup"
    ADD CONSTRAINT "MessagesGroup_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MessagesGroup MessagesGroup_buyerOrganizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesGroup"
    ADD CONSTRAINT "MessagesGroup_buyerOrganizationId_fkey" FOREIGN KEY ("buyerOrganizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MessagesGroup MessagesGroup_sellerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesGroup"
    ADD CONSTRAINT "MessagesGroup_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Messages Messages_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."MessagesGroup"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Notifications Notifications_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItems OrderItems_integrationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItems"
    ADD CONSTRAINT "OrderItems_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES public."Integration"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItems OrderItems_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItems"
    ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Orders"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Orders Orders_buyerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Orders Orders_messageGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_messageGroupId_fkey" FOREIGN KEY ("messageGroupId") REFERENCES public."MessagesGroup"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Orders Orders_sellerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PayoutProblems PayoutProblems_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PayoutProblems"
    ADD CONSTRAINT "PayoutProblems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Orders"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PayoutProblems PayoutProblems_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PayoutProblems"
    ADD CONSTRAINT "PayoutProblems_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PayoutProblems PayoutProblems_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PayoutProblems"
    ADD CONSTRAINT "PayoutProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Plugs Plugs_integrationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plugs"
    ADD CONSTRAINT "Plugs_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES public."Integration"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Plugs Plugs_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plugs"
    ADD CONSTRAINT "Plugs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_integrationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES public."Integration"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_lastMessageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES public."Messages"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Post Post_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_parentPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Post Post_submittedForOrderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_submittedForOrderId_fkey" FOREIGN KEY ("submittedForOrderId") REFERENCES public."Orders"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Post Post_submittedForOrganizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_submittedForOrganizationId_fkey" FOREIGN KEY ("submittedForOrganizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SocialMediaAgencyNiche SocialMediaAgencyNiche_agencyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SocialMediaAgencyNiche"
    ADD CONSTRAINT "SocialMediaAgencyNiche_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES public."SocialMediaAgency"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SocialMediaAgency SocialMediaAgency_logoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SocialMediaAgency"
    ADD CONSTRAINT "SocialMediaAgency_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SocialMediaAgency SocialMediaAgency_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SocialMediaAgency"
    ADD CONSTRAINT "SocialMediaAgency_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Subscription Subscription_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UsedCodes UsedCodes_orgId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsedCodes"
    ADD CONSTRAINT "UsedCodes_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserOrganization UserOrganization_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserOrganization"
    ADD CONSTRAINT "UserOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserOrganization UserOrganization_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserOrganization"
    ADD CONSTRAINT "UserOrganization_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_pictureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

