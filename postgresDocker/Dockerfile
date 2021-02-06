FROM postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=postgres
EXPOSE 5432
COPY init.sql /docker-entrypoint-initdb.d/
