CREATE SCHEMA IF NOT EXISTS contec;


CREATE TABLE contec.endereco (
    endercod SERIAL PRIMARY KEY,
    lgdr VARCHAR(100) NOT NULL,
    numero BIGINT,
    complmt VARCHAR(200),
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cep VARCHAR(50) NOT NULL
);

CREATE TABLE contec.pecas (
    codpeca SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco BIGINT NOT NULL
);

CREATE TABLE contec.cliente (
    cpf BIGINT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    fone BIGINT,
    email VARCHAR(50),
    endercli INTEGER NOT NULL,
    CONSTRAINT fk_cliente_endereco FOREIGN KEY (endercli) REFERENCES contec.endereco(endercod)
);

CREATE TABLE contec.instalador (
    cpf BIGINT PRIMARY KEY,
    fone BIGINT NOT NULL,
    email VARCHAR(60) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    habilit VARCHAR(5) NOT NULL
);

CREATE TABLE contec.pedido (
    codped SERIAL PRIMARY KEY,
    cliente BIGINT NOT NULL,
    statped VARCHAR(30) NOT NULL,
    valped BIGINT NOT NULL,
    comp NUMERIC(10,0) NOT NULL,
    altura NUMERIC(10,0) NOT NULL,
    dtpdd DATE,
    dtentg DATE,
    enderped INTEGER NOT NULL,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (cliente) REFERENCES contec.cliente(cpf),
    CONSTRAINT fk_pedido_endereco FOREIGN KEY (enderped) REFERENCES contec.endereco(endercod)
);

CREATE TABLE contec.servico (
    codserv SERIAL PRIMARY KEY,
    inst BIGINT,
    valserv BIGINT NOT NULL,
    tipserv VARCHAR(20) NOT NULL,
    dtserv DATE NOT NULL,
    codped INTEGER,
    CONSTRAINT fk_servico_instalador FOREIGN KEY (inst) REFERENCES contec.instalador(cpf),
    CONSTRAINT fk_servico_pedido FOREIGN KEY (codped) REFERENCES contec.pedido(codped)
);

CREATE TABLE contec.usuario (
    codusuario SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    telefone BIGINT NOT NULL,
    cargo VARCHAR(30) NOT NULL
);

CREATE TABLE contec.itempedido (
    peca INTEGER NOT NULL,
    pedido INTEGER NOT NULL,
    qtd BIGINT NOT NULL,
    PRIMARY KEY (peca, pedido),
    CONSTRAINT fk_itempedido_peca FOREIGN KEY (peca) REFERENCES contec.pecas(codpeca),
    CONSTRAINT fk_itempedido_pedido FOREIGN KEY (pedido) REFERENCES contec.pedido(codped)
);