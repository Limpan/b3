FROM python:3.12.3-slim-bookworm as base

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PYTHONDONTWRITEBYTECODE=1 \
    VENV_DIR="/app/.venv"


FROM base as builder

ENV POETRY_VERSION=1.8.2 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_NO_INTERACTION=1 

ENV PATH="$POETRY_HOME/bin:$VENV_PATH:$PATH"

# Install dependencies
RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        build-essential

# Install Poetry
RUN python3 -m venv $POETRY_HOME && \
    $POETRY_HOME/bin/pip install poetry==$POETRY_VERSION && \
    $POETRY_HOME/bin/poetry --version

WORKDIR /app

# Install dependencies
COPY poetry.lock pyproject.toml ./
RUN poetry install --no-root --no-ansi --only main

# Build and install application package
COPY . ./
RUN poetry build --format wheel && $VENV_DIR/bin/pip install dist/*.whl


FROM base as final

ENV FASTAPI_ENV=production

COPY --from=builder $VENV_DIR $VENV_DIR

WORKDIR /app

COPY --chmod=775 entrypoint.sh ./

EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "bytardag.main:app"]
