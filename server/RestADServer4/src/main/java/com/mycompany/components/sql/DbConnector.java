package com.mycompany.components.sql;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

public class DbConnector {

    private Connection conn;
    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    public void open() {
        try {
            logger.info("Opening SQL Connection");
            String dbConnection = "jdbc:derby://db:1527/pr2;user=pr2;password=pr2";
            this.conn = DriverManager.getConnection(dbConnection);
            logger.info("Printing schemas.");
            ResultSet rs = conn.getMetaData().getCatalogs();
            while (rs.next()) {
                logger.info("TABLE_CAT = " + rs.getString("TABLE_CAT") );
            }
        } catch (SQLException e) {
            System.out.println("Opening database-connection failed.");
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }

    public PreparedStatement prepareStatement(String query) {
        try {
            return conn.prepareStatement(query);
        } catch (SQLException e) {
            System.out.println("Error while creating PreparedStatement.");
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }

    public ResultSet executeQuery(PreparedStatement statement) {
        try {
            return statement.executeQuery();
        } catch (SQLException e) {
            System.out.println("Error while executing query.");
            throw new RuntimeException(e);
        }
    }

    public void executeUpdate(PreparedStatement statement) {
        try {
            statement.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error while executing update.");
            throw new RuntimeException(e);
        }
    }

    public void closeResultSet(ResultSet rs) {
        try { rs.close(); } catch (Exception e) { /* Ignored */ }
    }

    public void closePreparedStatement(PreparedStatement ps) {
        try { ps.close(); } catch (Exception e) { /* Ignored */ }
    }

    public void closeConnection() {
        try { conn.close(); } catch (Exception e) { /* Ignored */ }
    }

    public void closeAll(ResultSet rs, PreparedStatement ps) {
        closeResultSet(rs);
        closePreparedStatement(ps);
        closeConnection();
    }

    public boolean isValid(int timeout) throws SQLException {
        return conn.isValid(timeout);
    }
}
