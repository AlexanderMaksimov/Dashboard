package ru.dashboard.backenddashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.dashboard.backenddashboard.controller.PriorityController;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication
public class BackendDashboardApplication {

    public static void main(String[] args) {
        try
        {
            SpringApplication.run(BackendDashboardApplication.class, args);
        }
        catch (Exception ex)
        {
            System.out.print(ex.toString());
        }
    }
}


