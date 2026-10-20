CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE risk_level AS ENUM ('low', 'moderate', 'high');

CREATE TABLE stock (
    id          UUID PRIMARY KEY,
    close_price NUMERIC(18, 6) CHECK (close_price IS NULL OR close_price >= 0),
    sector      VARCHAR(50),
    exchange    VARCHAR(50),
    risk_level  risk_level,
    revenue     NUMERIC(18, 6) CHECK (revenue IS NULL OR revenue >= 0),
    vector      VECTOR(5),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);

CREATE TABLE stock_prices (
    id         UUID PRIMARY KEY,
    stock_id   UUID NOT NULL REFERENCES stock(id),
    price      NUMERIC(18, 6) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT stock_prices_stock_id_created_at_key
        UNIQUE (stock_id, created_at)
);

CREATE TABLE app_user (
    id                UUID PRIMARY KEY,
    age               INTEGER CHECK (age IS NULL OR age >= 0),
    risk_tolerance    risk_level,
    investment_goal   VARCHAR(50),
    preferred_sectors TEXT[],
    vector            VECTOR(5),
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE portfolio_assets (
    id         UUID PRIMARY KEY,
    user_id    UUID NOT NULL REFERENCES app_user(id),
    stock_id   UUID NOT NULL REFERENCES stock(id),
    quantity   NUMERIC(18, 8) NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT portfolio_assets_user_stock_key UNIQUE (user_id, stock_id)
);

CREATE TABLE user_train_data (
    id            UUID PRIMARY KEY,
    user_id       UUID NOT NULL REFERENCES app_user(id),
    model_version INTEGER CHECK (model_version IS NULL OR model_version > 0),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMPTZ
);

CREATE TABLE stock_train_data (
    id            UUID PRIMARY KEY,
    stock_id      UUID NOT NULL REFERENCES stock(id),
    model_version INTEGER CHECK (model_version IS NULL OR model_version > 0),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMPTZ
);
