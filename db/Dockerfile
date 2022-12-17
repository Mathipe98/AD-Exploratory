FROM openjdk:11-jre-slim

ENV DERBY_VERSION=10.14.2.0
ENV DERBY_HOME=/derby
ENV DERBY_LIB=${DERBY_HOME}/lib
ENV DERBY_SCHEMA=${DERBY_SCHEMA:-app}
ENV CLASSPATH=${DERBY_LIB}/derby.jar:${DERBY_LIB}/derbynet.jar:${DERBY_LIB}/derbytools.jar:${DERBY_LIB}/derbyoptionaltools.jar:${DERBY_LIB}/derbyclient.jar

ADD init.sh /init.sh

RUN \
    apt-get update && apt-get install -y wget netcat && \
    wget https://dist.apache.org/repos/dist/release/db/derby/db-derby-${DERBY_VERSION}/db-derby-${DERBY_VERSION}-bin.tar.gz && \
    tar xzf /db-derby-${DERBY_VERSION}-bin.tar.gz && \
    mv /db-derby-${DERBY_VERSION}-bin /derby && \
    rm -Rf /*.tar.gz ${DERBY_HOME}/demo ${DERBY_HOME}/javadoc ${DERBY_HOME}/docs ${DERBY_HOME}/test ${DERBY_HOME}/*.html ${DERBY_HOME}/KEYS \
    apt-get purge wget && \
    chmod +x /init.sh && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /dbs
EXPOSE 1527

HEALTHCHECK CMD nc -z localhost 1527 || exit 1

CMD ["sh", "-c", "/init.sh"]