CREATE SEQUENCE public.tb_url_encurtada_id_seq START 1;

CREATE TABLE public.tb_url_encurtada
(
    id bigint NOT NULL DEFAULT nextval('tb_url_encurtada_id_seq'::regclass),
    url_original character varying(500)  NOT NULL,
    url_encurtada character varying(500) NOT NULL,
    data date NOT NULL,
    CONSTRAINT tb_url_encurtada_pkey PRIMARY KEY (id)
);

ALTER TABLE public.tb_url_encurtada
    OWNER to postgres;