package com.catcards.backend.config;

import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;



@Configuration
public class DatabaseCleanUp {

    @Autowired
    private DataSource dataSource;

    @Bean
    public DatabaseCleanup databaseCleanup(){
        return new DatabaseCleanup(dataSource);
    }


    public static class DatabaseCleanup {
        private DataSource dataSource;
        private final Logger logger = LoggerFactory.getLogger(DatabaseCleanup.class);

        public DatabaseCleanup(DataSource dataSource) {
            this.dataSource = dataSource;
        }



        @PreDestroy
        public void dropDatabaseTable(){
            try(Connection connection = dataSource.getConnection()){

                Statement statement = connection.createStatement();

                statement.executeUpdate("SET FOREIGN_KEY_CHECKS = 0");

                statement.executeUpdate("DROP TABLE IF EXISTS music");
                statement.executeUpdate("DROP TABLE IF EXISTS user");

                statement.executeUpdate("SET FOREIGN_KEY_CHECKS = 1");

                logger.info("Table dropped successfully");
            } catch(Exception e) {
                e.printStackTrace();
            }

        }

    }
}